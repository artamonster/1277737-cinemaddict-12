import {Method, SuccessHTTPStatusRange} from "../const";
import FilmModel from "../model/film";
import CommentModel from "../model/comment";

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map(FilmModel.adaptToClient));
  }

  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentModel.adaptToClient));
  }

  addComment(comment) {
    const filmId = comment.filmId;
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then((response) => response.comments.map(CommentModel.adaptToClient));
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE
    });
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }
}
