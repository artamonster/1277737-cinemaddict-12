import {renderElement, removeElement} from "../utils/render";
import {RenderPosition, UpdateType, UserAction} from "../const";
import CommentView from "../view/comment";

export default class CommentPresenter {
  constructor(commentContainer, changeData, api) {
    this._commentContainer = commentContainer;
    this._api = api;
    this._changeData = changeData;
    this._commentComponent = null;

    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
  }

  init(comment) {
    this._comment = comment;

    const prevCommentComponent = this._commentComponent;

    this._commentComponent = new CommentView(comment);

    this._commentComponent.setCommentDeleteHandler(this._commentDeleteClickHandler);

    if (prevCommentComponent === null) {
      renderElement(this._commentContainer, this._commentComponent, RenderPosition.BEFOREEND);
      return;
    }

    removeElement(prevCommentComponent);
  }

  destroy() {
    removeElement(this._commentComponent);
  }

  changeOnline() {
    this._commentComponent.updateData({
      isOnline: this._api.isOnline(),
    });
  }
  _setDeleting() {
    this._commentComponent.updateData({
      isDisabled: true,
      isDeleting: true
    });
  }

  _setAborting() {
    const resetFormState = () => {
      this._commentComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._commentComponent.shake(resetFormState);
  }

  _commentDeleteClickHandler(commentId) {
    this._setDeleting();
    this._api.deleteComment(commentId)
      .then(() => {
        this._changeData(
            UserAction.DELETE_COMMENT,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._comment
            )
        );
      })
      .catch(() => {
        this._setAborting();
      });
  }
}
