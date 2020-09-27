import SmartView from "./smart";
import {EMOJI_HEIGHT, EMOJI_WIDTH} from "../const";

export default class CommentFormView extends SmartView {
  constructor() {
    super();
    this._data = {
      isDisabled: false,
      comment: {}
    };

    this._emotionElement = null;

    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._emotionClickHandler = this._emotionClickHandler.bind(this);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this._emojiBlockElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const emoji = this.getElement()
      .querySelectorAll(`[name="comment-emoji"]`);

    emoji.forEach((element) => {
      element.addEventListener(`change`, this._emotionClickHandler);
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCommentAddHandler(this._callback.commentAddHandler);
  }

  _emotionClickHandler(evt) {
    const img = document.createElement(`img`);
    img.width = EMOJI_WIDTH;
    img.heigth = EMOJI_HEIGHT;
    img.src = evt.currentTarget.nextElementSibling.querySelector(`img`).src;
    this._emojiBlockElement.innerHTML = ``;
    this._emojiBlockElement.append(img);
    this._emotionElement = this._emojiBlockElement.innerHTML;
  }

  _restoreEmotion() {
    if (this._emotionElement === null) {
      return ``;
    }

    return this._emotionElement;
  }

  setCommentAddHandler(callback) {
    this._callback.commentAddHandler = callback;
    this.getElement().addEventListener(`keydown`, this._commentAddHandler);
  }

  _commentAddHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && ((evt.keyCode === 10 || evt.keyCode === 13))) {
      const text = this.getElement().querySelector(`.film-details__inner [name=comment]`).value;
      const emotionElement = this.getElement().querySelector(`.film-details__inner [name=comment-emoji]:checked`);
      const emotion = emotionElement ? emotionElement.value : null;
      const date = new Date();

      if (!text || !emotion) {
        this.shake();
        return;
      }

      evt.preventDefault();
      this._callback.commentAddHandler({
        text,
        emotion,
        date
      });
    }
  }

  getTemplate() {
    const {isDisabled, comment} = this._data;
    const text = (comment.text) ? comment.text : ``;
    const emotion = (comment.emotion) ? comment.emotion : ``;

    return (
      `<div class="film-details__new-comment ${isDisabled ? `film-details__new-comment--saving` : ``}">
        <div for="add-emoji" class="film-details__add-emoji-label">${this._restoreEmotion()}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? `disabled` : ``}>${text}</textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisabled ? `disabled` : ``} ${emotion === `smile` ? `checked` : ``}>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisabled ? `disabled` : ``} ${emotion === `sleeping` ? `checked` : ``}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisabled ? `disabled` : ``} ${emotion === `puke` ? `checked` : ``}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isDisabled ? `disabled` : ``} ${emotion === `angry` ? `checked` : ``}>
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>`
    );
  }
}
