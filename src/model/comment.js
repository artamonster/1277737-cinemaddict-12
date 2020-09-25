import Observer from "../utils/observer";

export default class CommentModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  updateComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1)
    ];

    this._broadcast(updateType, update);
  }

  addComment(updateType, update) {
    this._comments = [
      update,
      ...this._comments
    ];

    this._broadcast(updateType, update);
  }

  deleteComment(updateType, commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._broadcast(updateType);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment,
        }
    );

    delete adaptedComment.comment;

    return adaptedComment;
  }
}
