import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {RenderPosition, render, remove, replaceElement} from '../helpers/render';
import {Mode} from "../helpers/const";

export default class FilmPresenter {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.CLOSED;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmDetailHandler = this._closeFilmDetailHandler.bind(this);
    this._openFilmDetailHandler = this._openFilmDetailHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmComponent;
    const prevFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmDetailComponent = new FilmDetailsView(film);

    this._filmComponent.setOpenPopupFilmDetailHandler(this._openFilmDetailHandler);

    this._filmComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmComponent.setAlreadyWatchClickHandler(this._alreadyWatchClickHandler);
    this._filmComponent.setInWatchlistClickHandler(this._inWatchlistClickHandler);

    this._filmDetailComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmDetailComponent.setAlreadyWatchClickHandler(this._alreadyWatchClickHandler);
    this._filmDetailComponent.setInWatchlistClickHandler(this._inWatchlistClickHandler);

    if (prevFilmCardComponent === null || prevFilmDetailComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replaceElement(this._filmComponent, prevFilmCardComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmDetailComponent.getElement())) {
      replaceElement(this._filmDetailComponent, prevFilmDetailComponent);
      this._filmDetailComponent.setClosePopupFilmDetailHandler(this._closeFilmDetailHandler);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailComponent);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeFilmDetailHandler();
    }
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  _closeFilmDetailHandler() {
    remove(this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _inWatchlistClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _alreadyWatchClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isAlreadyWatched: !this._film.isAlreadyWatched
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeFilmDetailHandler();
    }
  }

  _openFilmDetailHandler() {
    render(this._filmListContainer, this._filmDetailComponent, RenderPosition.BEFOREEND);

    this._filmDetailComponent.setClosePopupFilmDetailHandler(this._closeFilmDetailHandler);
    this._filmDetailComponent.restoreHandlers();

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

}
