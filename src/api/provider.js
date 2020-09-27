import FilmModel from "../model/film";
import Store from "./store";
import {STORE_NAME} from "../const";

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._commentStore = {};
    this._isNeedUpdate = false;
  }

  getFilms() {
    if (this.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmModel.adaptToClient));
  }

  updateFilm(film) {
    if (this.isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._isNeedUpdate = true;

    this._store.setItem(film.id, FilmModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  getComments(film) {
    const commentStore = this._getCommentStore(film.id);
    if (this.isOnline()) {
      return this._api.getComments(film)
        .then((comments) => {
          const items = createStoreStructure(comments);
          commentStore.setItems(items);
          return comments;
        });
    }

    const storeComments = Object.values(commentStore.getItems());
    return Promise.resolve(storeComments);
  }

  addComment(comment) {
    return this._api.addComment(comment)
      .then((comments) => {
        return comments;
      });
  }

  deleteComment(commentId) {
    return this._api.deleteComment(commentId);
  }

  sync() {
    if (this.isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedTasks = getSyncedFilms(response.updated);

          const items = createStoreStructure([...updatedTasks]);

          this._store.setItems(items);

          this._isNeedUpdate = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  isNeedUpdate() {
    return this._isNeedUpdate;
  }


  _getCommentStoreName(filmId) {
    return `${STORE_NAME}-${filmId}`;
  }

  _getCommentStore(filmId) {
    const storeName = this._getCommentStoreName(filmId);
    if (this._commentStore[storeName]) {
      return this._commentStore[storeName];
    }

    this._commentStore[storeName] = new Store(storeName, window.localStorage);
    return this._commentStore[storeName];
  }

  isOnline() {
    return window.navigator.onLine;
  }
}
