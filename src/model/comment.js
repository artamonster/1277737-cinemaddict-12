import Observer from "../utils/observer";

export default class CommentModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments, updateType = ``) {
    this._comments = comments.slice();

    if (updateType) {
      this._broadcast(updateType, comments);
    }
  }

  getComments() {
    return this._comments;
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
          date: new Date(comment.date),
          text: comment.comment,
        }
    );

    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          comment: comment.text
        }
    );

    delete adaptedComment.id;
    delete adaptedComment.text;
    delete adaptedComment.filmId;

    return adaptedComment;
  }
}
