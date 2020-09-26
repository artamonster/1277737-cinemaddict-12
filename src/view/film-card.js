import AbstractView from "./abstract";
import {MAX_FILM_DESCRIPTION_LENGTH, FILM_DESCRIPTION_AFTER_SIGN} from "../const";
import {formatFilmReleaseDate, formatFilmDuration} from "../utils/film";


export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._data = FilmCardView.parseFilmToData(film);

    this._openPopupFilmDetailHandler = this._openPopupFilmDetailHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _alreadyWatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchClick();
  }

  _inWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchlistClick();
  }

  _openPopupFilmDetailHandler() {
    this._callback.openFilmDetail();
  }

  setOpenPopupFilmDetailHandler(callback) {
    this._callback.openFilmDetail = callback;

    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopupFilmDetailHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._openPopupFilmDetailHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopupFilmDetailHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setAlreadyWatchClickHandler(callback) {
    this._callback.alreadyWatchClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._alreadyWatchClickHandler);
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._inWatchlistClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }

  getTemplate() {
    const {name, poster, date, genres, shortDescription, comments, duration, rating, inWatchlist, isAlreadyWatched, isFavorite} = this._data;
    const filmGenres = genres.join(`, `);

    const filmDate = formatFilmReleaseDate(date);

    const description = shortDescription.length > MAX_FILM_DESCRIPTION_LENGTH
      ? shortDescription.substring(0, MAX_FILM_DESCRIPTION_LENGTH - 2) + FILM_DESCRIPTION_AFTER_SIGN
      : shortDescription;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmDate}</span>
          <span class="film-card__duration">${formatFilmDuration(duration)}</span>
          <span class="film-card__genre">${filmGenres}</span>
        </p>
        <img src="${poster}" alt="Film ${name}" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
    );
  }
}
