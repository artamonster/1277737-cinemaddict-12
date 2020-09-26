import FilmCardView from "../view/film-card";
import FilmDetailView from "../view/film-details";
import FilmDetailLoadingView from "../view/film-detail-loading";
import CommentModel from "../model/comment";
import {renderElement, replaceElement, removeElement} from "../utils/render";
import {RenderPosition, Mode, UserAction, UpdateType, FilterType} from "../const";
import {getCurrentDate} from "../utils/common";
import CommentListPresenter from "./comment-list";

export default class FilmPresenter {
  constructor(filmListContainer, filmsBlockContainer, changeData, changeMode, filterModel, api) {
    this._filmListContainer = filmListContainer;
    this._filmsBlockContainer = filmsBlockContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = new CommentModel();
    this._filterModel = filterModel;
    this._api = api;
    this._loadingComponent = new FilmDetailLoadingView();
    this._commentListPresenter = null;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.CLOSED;
    this._needUpdateBoard = this._fillUpdatesFlag();

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmDetailHandler = this._closeFilmDetailHandler.bind(this);
    this._openFilmDetailHandler = this._openFilmDetailHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._alreadyWatchClickHandler = this._alreadyWatchClickHandler.bind(this);
    this._inWatchlistClickHandler = this._inWatchlistClickHandler.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    this.renderFilmComponent(film);

    if (this._mode === Mode.OPENED) {
      this._replaceOpenedPopupInfo();
    }
  }

  renderFilmComponent(film) {
    this._film = film;

    this._film.loadedComments = this._commentsModel.getComments();

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

  _handleModelEvent(actionType) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
      case UserAction.SET_COMMENTS:
        const comments = this._commentsModel.getComments();
        this._renderComments();
        this._changeData(
            actionType,
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: comments.map((comment) => comment.id),
                  commentsLength: comments.length,
                  loadedComments: this._commentsModel.getComments()
                }
            )
        );
        break;
    }
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeFilmDetailHandler();
    }
  }

  destroy() {
    removeElement(this._filmComponent);
    removeElement(this._filmDetailComponent);
    this._commentsModel.removeObserver(this._handleModelEvent);
  }

  _closeFilmDetailHandler() {
    removeElement(this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
    if (Object.values(this._needUpdateBoard).includes(true)) {
      this._changeData(
          UserAction.UPDATE_FILM_MODEL,
          UpdateType.MINOR,
          Object.assign(
              {},
              this._film
          )
      );
    }
  }

  _favoriteClickHandler() {
    if (this._filterModel.getFilter() === FilterType.WATCHLIST) {
      this._needUpdateBoard[FilterType.FAVORITES] = !this._needUpdateBoard[FilterType.FAVORITES];
    }
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
    if (this._filterModel.getFilter() === FilterType.WATCHLIST) {
      this._needUpdateBoard[FilterType.WATCHLIST] = !this._needUpdateBoard[FilterType.WATCHLIST];
    }
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
    if (this._filterModel.getFilter() === FilterType.HISTORY) {
      this._needUpdateBoard[FilterType.HISTORY] = !this._needUpdateBoard[FilterType.HISTORY];
    }
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
    renderElement(this._filmsBlockContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);

    this._api.getComments(this._film).then((response) => {
      removeElement(this._loadingComponent);

      this._commentsModel.setComments(response);
      this._film.loadedComments = this._commentsModel.getComments();

      this._prepareFilmDetailComponent();

      renderElement(this._filmsBlockContainer, this._filmDetailComponent, RenderPosition.BEFOREEND);

      this._renderComments();

      document.addEventListener(`keydown`, this._escKeyDownHandler);
      this._changeMode();
      this._mode = Mode.OPENED;
    });
  }

  _prepareFilmDetailComponent() {
    this._filmDetailComponent = new FilmDetailView(this._film);

    this._filmDetailComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._filmDetailComponent.setAlreadyWatchClickHandler(this._alreadyWatchClickHandler);
    this._filmDetailComponent.setInWatchlistClickHandler(this._inWatchlistClickHandler);
    this._filmDetailComponent.setClosePopupFilmDetailHandler(this._closeFilmDetailHandler);
    this._filmDetailComponent.restoreHandlers();
  }

  _replaceOpenedPopupInfo() {
    const prevFilmDetailComponent = this._filmDetailComponent;
    this._prepareFilmDetailComponent();

    replaceElement(this._filmDetailComponent, prevFilmDetailComponent);

    removeElement(prevFilmDetailComponent);

    this._renderComments();
  }

  _renderComments() {
    const container = this._filmDetailComponent.getElement().querySelector(`.form-details__bottom-container`);
    if (this._commentListPresenter !== null) {
      this._commentListPresenter.destroy();
    }
    this._commentListPresenter = new CommentListPresenter(container, this._commentsModel, this._film, this._api);
    this._commentListPresenter.init();
  }

  _fillUpdatesFlag() {
    return Object.values(FilterType).reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {});
  }
}
