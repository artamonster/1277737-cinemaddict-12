import {removeElement, renderElement} from "../utils/render";
import {RenderPosition, UserAction} from "../const";
import CommentListView from "../view/comment-list";
import {generateId} from "../utils/film";
import CommentPresenter from "./comment";
import CommentFormView from "../view/comment-form";

export default class CommentListPresenter {
  constructor(commentContainer, commentModel, film, api) {
    this._commentContainer = commentContainer;
    this._commentModel = commentModel;
    this._commentsCount = commentModel.getComments().length;
    this._api = api;
    this._film = film;
    this._commentPresenter = {};

    this._commentsListComponent = new CommentListView(this._commentsCount);
    this._commentsAddFormComponent = new CommentFormView();
    this._commentsList = this._commentsListComponent.getElement().querySelector(`.film-details__comments-list`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._commentCtrlEnterAddHandler = this._commentCtrlEnterAddHandler.bind(this);
    this.changeOnline = this.changeOnline.bind(this);
    this._commentsAddFormComponent.setCommentAddHandler(this._commentCtrlEnterAddHandler);
  }

  init() {
    renderElement(this._commentContainer, this._commentsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._commentsListComponent, this._commentsAddFormComponent, RenderPosition.BEFOREEND);
    this._renderComments(this._commentModel.getComments());
    this._setInnerHandlers();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this._commentModel.deleteComment(actionType, update.id);
        break;
    }
  }

  _renderComments(comments) {
    comments
      .forEach((comment) => this._renderComment(comment));
  }

  _renderComment(comment) {
    const commentPresenter = new CommentPresenter(this._commentsList, this._handleViewAction, this._api);
    commentPresenter.init(comment);
    this._commentPresenter[comment.id] = commentPresenter;
  }

  _generateBlankComment() {
    return {
      id: generateId(),
      filmId: this._film.id,
      text: ``,
      emotion: ``,
      author: ``,
      date: new Date(),
    };
  }

  _setSaving(comment) {
    this._commentsAddFormComponent.updateData({
      isDisabled: true,
      comment
    });
  }

  _setAborting() {
    const resetFormState = () => {
      this._commentsAddFormComponent.updateData({
        isDisabled: false,
      });
    };

    this._commentsAddFormComponent.shake(resetFormState);
  }

  _commentCtrlEnterAddHandler(update) {
    const blankComment = this._generateBlankComment();
    const comment = Object.assign(
        {},
        blankComment,
        update
    );
    this._setSaving(comment);

    this._api.addComment(comment)
      .then((response) => {
        this._commentModel.setComments(response, UserAction.SET_COMMENTS);
      })
      .catch(() => {
        this._setAborting();
      });
  }

  destroy() {
    removeElement(this._commentsAddFormComponent);
    removeElement(this._commentsListComponent);
    Object
      .values(this._commentPresenter)
      .forEach((presenter) => presenter.destroy());
    this._commentPresenter = {};
    this._unsetInnerHandlers();
  }

  changeOnline() {
    Object
      .values(this._commentPresenter)
      .forEach((presenter) => presenter.changeOnline());

    this._commentsAddFormComponent.updateData({
      isDisabled: !this._api.isOnline(),
    });
  }

  _unsetInnerHandlers() {
    window.removeEventListener(`online`, this.changeOnline);
    window.removeEventListener(`offline`, this.changeOnline);
  }

  _setInnerHandlers() {
    window.addEventListener(`online`, this.changeOnline);
    window.addEventListener(`offline`, this.changeOnline);
  }
}
