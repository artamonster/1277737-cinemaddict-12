
import SmartView from "./smart";
import {formatFilmDetailReleaseDate, formatFilmDuration} from "../utils/film";

export default class FilmDetailView extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._closePopupFilmDetailHandler = this._closePopupFilmDetailHandler.bind(this);
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

  _closePopupFilmDetailHandler() {
    this._callback.closeFilmDetail();
  }

  setClosePopupFilmDetailHandler(callback) {
    this._callback.closeFilmDetail = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupFilmDetailHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setAlreadyWatchClickHandler(callback) {
    this._callback.alreadyWatchClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._alreadyWatchClickHandler);
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._inWatchlistClickHandler);
  }

  _createFilmDetailGenres(genres) {
    return (`
      <tr class="film-details__row">
        <td class="film-details__term">Genre${genres.length > 1 ? `s` : ``}</td>
        <td class="film-details__cell">
        ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
      </tr>
  `);
  }

  restoreHandlers() {
    this.setClosePopupFilmDetailHandler(this._callback.closeFilmDetail);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setAlreadyWatchClickHandler(this._callback.alreadyWatchClick);
    this.setInWatchlistClickHandler(this._callback.inWatchlistClick);
  }

  getTemplate() {
    const {name, originalName, writers, producer, ageRating, fullPoster, actors, countries, date, genres, description, duration, rating, inWatchlist, isAlreadyWatched, isFavorite} = this._film;

    const writersText = writers.join(`, `);
    const actorsText = actors.join(`, `);
    const countriesText = countries.join(`, `);

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${fullPoster}" alt="Film ${name}">
                <p class="film-details__age">${ageRating}+</p>
              </div>
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${name}</h3>
                    <p class="film-details__title-original">Original: ${originalName}</p>
                  </div>
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${producer}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writersText}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actorsText}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${formatFilmDetailReleaseDate(date)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${formatFilmDuration(duration)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${countriesText}</td>
                  </tr>
                  ${this._createFilmDetailGenres(genres)}
                </table>
                <p class="film-details__film-description">
                  ${description}
                </p>
              </div>
            </div>
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
          <div class="form-details__bottom-container">
          </div>
        </form>
      </section>`
    );
  }
}
