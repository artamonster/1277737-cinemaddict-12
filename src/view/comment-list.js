import AbstractView from "./abstract";

export default class CommentListView extends AbstractView {
  constructor(commentsLength) {
    super();
    this._commentsLength = commentsLength;
  }

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsLength}</span></h3>
            <ul class="film-details__comments-list"></ul>
        </section>`
    );
  }
}
