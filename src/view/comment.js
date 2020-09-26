
import SmartView from "./smart";
import he from "he";
import {humanizeCommentDate} from "../utils/film";

export default class CommentView extends SmartView {
  constructor(comment) {
    super();
    this._data = CommentView.parseCommentToData(comment);

    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const commentId = evt.target.dataset.commentId;
    this._callback.commentDeleteClick(commentId);
  }

  setCommentDeleteHandler(callback) {
    this._callback.commentDeleteClick = callback;

    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const commentDeleteBtnElement = this.getElement().querySelector(`.film-details__comment-delete`);
    commentDeleteBtnElement.addEventListener(`click`, this._commentDeleteHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  static parseCommentToData(comment) {
    return Object.assign(
        {},
        comment,
        {
          isDisabled: false,
          isDeleting: false,
        }
    );
  }

  getTemplate() {
    const {emotion, text, author, date, id, isDisabled, isDeleting} = this._data;

    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(text)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
                <button class="film-details__comment-delete" data-comment-id="${id}" ${isDisabled ? `disabled` : ``}>
                ${isDeleting ? `Deleting...` : `Delete`}
                </button>
              </p>
            </div>
          </li>`
    );
  }
}
