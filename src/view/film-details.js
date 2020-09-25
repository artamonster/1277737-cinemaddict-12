import SmartView from "./smart";
import {humanizeCommentDate, formatFilmDetailReleaseDate, formatFilmDuration} from "../utils/film";
import {EMOJI_WIDTH, EMOJI_HEIGHT} from "../const";
import he from "he";

export default class FilmDetail extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._closePopupFilmDetailHandler = this._closePopupFilmDetailHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);
    this._emotionClickHandler = this._emotionClickHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);

    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const emoji = this.getElement()
      .querySelectorAll(`.film-details__emoji-label`);

    emoji.forEach((element) => {
      element.addEventListener(`click`, this._emotionClickHandler);
    });
  }

  _emotionClickHandler(evt) {
    const emojiBlockElement = evt.currentTarget.closest(`.film-details__new-comment`).querySelector(`.film-details__add-emoji-label`);
    let img = document.createElement(`img`);
    img.width = EMOJI_WIDTH;
    img.heigth = EMOJI_HEIGHT;
    img.src = evt.currentTarget.querySelector(`img`).src;
    emojiBlockElement.innerHTML = ``;
    emojiBlockElement.append(img);
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

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const commentId = evt.target.dataset.commentId;
    this._callback.commentDeleteClick(commentId);
  }

  _commentAddHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && ((evt.keyCode === 10 || evt.keyCode === 13))) {
      const text = this.getElement().querySelector(`.film-details__inner [name=comment]`).value;
      const emotion = this.getElement().querySelector(`.film-details__inner [name=comment-emoji]:checked`).value;
      const date = new Date();

      evt.preventDefault();
      this._callback.commentAddHandler({
        text,
        emotion,
        date
      });
    }
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

  setCommentDeleteHandler(callback) {
    this._callback.commentDeleteClick = callback;

    const commentDeleteBtnElements = this.getElement()
      .querySelectorAll(`.film-details__comment-delete`);

    commentDeleteBtnElements.forEach((element) => {
      element.addEventListener(`click`, this._commentDeleteHandler);
    });
  }

  setCommentAddHandler(callback) {
    this._callback.commentAddHandler = callback;
    this.getElement().addEventListener(`keydown`, this._commentAddHandler);
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

  _createFilmDetailComments(comments) {
    return (`
      <ul class="film-details__comments-list">
        ${comments.map((comment) =>
        `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment.text)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
              </p>
            </div>
          </li>`
      ).join(``)}
      </ul>
    `);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClosePopupFilmDetailHandler(this._callback.closeFilmDetail);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setAlreadyWatchClickHandler(this._callback.alreadyWatchClick);
    this.setInWatchlistClickHandler(this._callback.inWatchlistClick);
    this.setCommentDeleteHandler(this._callback.commentDeleteClick);
  }

  getTemplate() {
    const {name, originalName, writers, producer, ageRating, fullPoster, actors, countries, date, genres, description, comments, duration, rating, inWatchlist, isAlreadyWatched, isFavorite} = this._film;

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
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
              ${this._createFilmDetailComments(comments)}
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
    );
  }
}
