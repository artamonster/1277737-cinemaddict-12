import SmartComponent from "./smart";
import {
  formatFilmDuration,
  getFileName,
  createRatingText,
  formatFilmDetailReleaseDate,
  humanizeCommentDate,
} from '../helpers/common';
import {EMOJI_WIDTH, EMOJI_HEIGHT} from "../helpers/const";

const createGenresMarkup = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(`\n`);

const createControlItemMarkup = (name, labelText, isActive) => {
  return `<input
    type="checkbox"
    class="film-details__control-input visually-hidden"
    id="${name}"
    name="${name}"
    ${isActive ? `checked` : ``}>
  <label
    for="${name}"
    class="film-details__control-label film-details__control-label--${name}"
  >${labelText}</label>`;
};

const createCommentsListMarkup = (comments) => comments
  .map((comment) => {
    const {text, emotions, author, date} = comment;
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotions}.png" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  })
  .join(`\n`);

const createGenresTitleText = (genres) => genres.length > 1 ? `Genres` : `Genre`;

const createFilmDetails = (film) => {
  const {
    title,
    rating,
    date,
    duration,
    genres,
    description,
    comments,
    isInWatchlist,
    isWatched,
    isFavorite,
  } = film;

  const filmDate = formatFilmDetailReleaseDate(date);
  const fileName = getFileName(title);
  const watchlistItem = createControlItemMarkup(`watchlist`, `Add to watchlist`, isInWatchlist);
  const watchedItem = createControlItemMarkup(`watched`, `Already watched`, isWatched);
  const favoriteItem = createControlItemMarkup(`favorite`, `Add to favorites`, isFavorite);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${fileName}.jpg" alt="">
            <p class="film-details__age">18+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${createRatingText(rating)}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatFilmDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${createGenresTitleText(genres)}</td>
                <td class="film-details__cell">${createGenresMarkup(genres)}</td>
              </tr>
            </table>
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
        <section class="film-details__controls">
          ${watchlistItem}
          ${watchedItem}
          ${favoriteItem}
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentsListMarkup(comments)}
          </ul>
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetailsView extends SmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._data = FilmDetailsView.parseFilmToData(film);

    this._closePopupFilmDetailHandler = this._closePopupFilmDetailHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);
    this._emotionClickHandler = this._emotionClickHandler.bind(this);

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

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClosePopupFilmDetailHandler(this._callback.closeFilmDetail);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setAlreadyWatchClickHandler(this._callback.alreadyWatchClick);
    this.setInWatchlistClickHandler(this._callback.inWatchlistClick);
  }

  getTemplate() {
    return createFilmDetails(this._data);
  }
}
