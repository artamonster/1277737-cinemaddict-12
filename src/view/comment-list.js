import AbstractView from "./abstract";

export default class CommentListView extends AbstractView {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsCount}</span></h3>
            <ul class="film-details__comments-list"></ul>
        </section>`
    );
  }
}
