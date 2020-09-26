import FilmCardView from "../view/film-card";
import FilmDetailView from "../view/film-details";
import FilmDetailLoadingView from "../view/film-details-loading";
import CommentModel from "../model/comment";
import {renderElement, replaceElement, removeElement} from "../utils/render";
import {RenderPosition, Mode, UserAction, UpdateType} from "../const";
import {generateId} from "../utils/film";
import {getCurrentDate} from "../utils/common";

export default class FilmPresenter {
  constructor(filmListContainer, changeData, changeMode, api) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = new CommentModel();
    this._api = api;
    this._loadingComponent = new FilmDetailLoadingView();

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.CLOSED;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmDetailHandler = this._closeFilmDetailHandler.bind(this);
    this._openFilmDetailHandler = this._openFilmDetailHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);

    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._commentCtrlEnterAddHandler = this._commentCtrlEnterAddHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmComponent;

    this._filmComponent = new FilmCardView(film);

    this._filmComponent.setOpenPopupFilmDetailHandler(this._openFilmDetailHandler);

    this._filmComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmComponent.setAlreadyWatchClickHandler(this._alreadyWatchClickHandler);
    this._filmComponent.setInWatchlistClickHandler(this._inWatchlistClickHandler);

    if (prevFilmCardComponent === null) {
      renderElement(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replaceElement(this._filmComponent, prevFilmCardComponent);
    }

    removeElement(prevFilmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeFilmDetailHandler();
    }
  }

  destroy() {
    removeElement(this._filmComponent);
    removeElement(this._filmDetailComponent);
  }

  _closeFilmDetailHandler() {
    removeElement(this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _commentDeleteClickHandler(commentId) {
    this._commentsModel.deleteComment(UserAction.DELETE_COMMENT, commentId);
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentsModel.getComments()
            }
        )
    );
  }

  _generateBlankComment() {
    return {
      id: generateId(),
      text: ``,
      emotion: ``,
      author: ``,
      date: new Date(),
    };
  }

  _commentCtrlEnterAddHandler(update) {
    const comment = this._generateBlankComment();

    this._commentsModel.addComment(
        UserAction.ADD_COMMENT,
        Object.assign(
            {},
            comment,
            update
        )
    );

    this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: this._commentsModel.getComments()
            }
        )
    );
  }

  _favoriteClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _inWatchlistClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _alreadyWatchClickHandler() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isAlreadyWatched: !this._film.isAlreadyWatched,
              watchingDate: !this._film.isAlreadyWatched ? getCurrentDate() : null
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeFilmDetailHandler();
    }
  }

  _openFilmDetailHandler() {
    renderElement(this._filmListContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);

    this._api.getComments(this._film).then((response) => {
      removeElement(this._loadingComponent);

      this._commentsModel.setComments(response);
      this._film.comments = this._commentsModel.getComments();

      this._filmDetailComponent = new FilmDetailView(this._film);

      this._filmDetailComponent.setFavoriteClickHandler(this._favoriteClickHandler);
      this._filmDetailComponent.setAlreadyWatchClickHandler(this._alreadyWatchClickHandler);
      this._filmDetailComponent.setInWatchlistClickHandler(this._inWatchlistClickHandler);

      renderElement(this._filmListContainer, this._filmDetailComponent, RenderPosition.BEFOREEND);

      this._filmDetailComponent.setCommentDeleteHandler(this._commentDeleteClickHandler);
      this._filmDetailComponent.setCommentAddHandler(this._commentCtrlEnterAddHandler);
      this._filmDetailComponent.setClosePopupFilmDetailHandler(this._closeFilmDetailHandler);
      this._filmDetailComponent.restoreHandlers();

      document.addEventListener(`keydown`, this._escKeyDownHandler);
      this._changeMode();
      this._mode = Mode.OPENED;
    });
  }

}
