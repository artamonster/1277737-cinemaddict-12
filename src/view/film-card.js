import AbstractComponent from './abstract-component.js';
import {formatFilmDuration, getFileName, formatFilmReleaseDate, createRatingText} from '../helpers/common';

const createControlItemMarkup = (name, buttonText, isActive) =>
  `<button
    class="film-card__controls-item button
    film-card__controls-item--${name}
    ${isActive ? `film-card__controls-item--active` : ``}
  ">${buttonText}</button>`;

const createCommentsTitleText = (comments) => {
  switch (comments.length) {
    case 0:
      return `no comments yet`;
    case 1:
      return `1 comment`;
    default:
      return `${comments.length} comments`;
  }
};

const createFilmCard = (film) => {
  const {
    title,
    rating,
    date,
    duration,
    genres,
    description,
    commentsCount,
    isInWatchlist,
    isWatched,
    isFavorite,
    comments,
  } = film;

  const filmDate = formatFilmReleaseDate(date);
  const [mainGenre] = genres;
  const watchlistButton = createControlItemMarkup(`add-to-watchlist`, `Add to watchlist`, isInWatchlist);
  const watchedButton = createControlItemMarkup(`mark-as-watched`, `Mark as watched`, isWatched);
  const favoriteButton = createControlItemMarkup(`favorite`, `Mark as favorite`, isFavorite);
  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${createRatingText(rating)}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmDate}</span>
      <span class="film-card__duration">${formatFilmDuration(duration)}</span>
      <span class="film-card__genre">${mainGenre}</span>
    </p>
    <img src="./images/posters/${getFileName(title)}.jpg" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <a class="film-card__comments">${createCommentsTitleText(comments)}</a>
    <form class="film-card__controls">
      ${watchlistButton}
      ${watchedButton}
      ${favoriteButton}
    </form>
  </article>`;
};

export default class FilmCardView extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
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

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    return data;
  }

  getTemplate() {
    return createFilmCard(this._data);
  }

}
