import FilmPresenter from "./film";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/film-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
import FilmsListNoMoviesView from "../view/film-list-no-movies.js";
import FilmsListTitleView from "../view/film-list-title.js";
import SortListView from "../view/site-sorting.js";
import LoadMoreButtonView from "../view/button-show-more.js";
import FilmsListTopRatedView from "../view/film-list-top-rated.js";
import FilmsListMostCommentedView from "../view/film-list-most-commented.js";
import {filter} from "../helpers/filter";
import {RenderPosition, render, remove} from '../helpers/render';
import {SHOWING_FILM_CARD_COUNT_BY_BUTTON, SHOWING_FILM_CARD_COUNT_ON_START, TOP_RATED_COUNT, MOST_COMMENTED_COUNT, SortType, UpdateType, UserAction} from "../helpers/const";
import {sortFilmsByDate, sortFilmsByRating, sortByCommentsCount} from "../helpers/filter.js";


class CinemaListPresenter {
  constructor(filmsContainer, filmsModel, filterModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._renderedFilmCount = SHOWING_FILM_CARD_COUNT_ON_START;

    this._sortComponent = null;
    this._showMoreFilmsBtn = null;

    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();

    this._noFilmComponent = new FilmsListNoMoviesView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreFilmsBtn = this._handleShowMoreFilmsBtn.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();

  }

  destroy() {
    this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
    remove(this._filmsComponent);
    remove(this._sortComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);


    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.slice().sort(sortFilmsByDate);
      case SortType.RATING:
        return filteredFilms.slice().sort(sortFilmsByRating);
    }

    return filteredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleFilmChange(updatedFilm) {
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _handleShowMoreFilmsBtn() {
    const films = this._getFilms();

    this._renderFilms(
        films.slice(this._renderedFilmCount, this._renderedFilmCount + SHOWING_FILM_CARD_COUNT_ON_START)
    );

    this._renderedFilmCount += SHOWING_FILM_CARD_COUNT_ON_START;

    if (this._renderedFilmCount >= films.length) {
      remove(this._showMoreFilmsBtn);
    }
  }

  _renderSort(container = this._filmsContainer) {
    this._sortComponent = new SortListView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    this._renderFilmsWrapper();

    render(this._filmsListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film, container = this._filmListContainerComponent) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }
  _renderFilmsList() {
    const films = this._getFilms();

    render(this._filmsListComponent, new FilmsListTitleView(), RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, SHOWING_FILM_CARD_COUNT_BY_BUTTON));

    if (films.length > SHOWING_FILM_CARD_COUNT_BY_BUTTON) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRatedFilmsList() {
    if (this._topRatedFilms.length === 0) {
      return;
    }

    render(this._filmsComponent, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);

    const topRatedFilmsElement = this._filmsListTopRatedComponent.getElement().querySelector(`.films-list__container`);
    this._topRatedFilms
      .slice()
      .forEach((film) => this._renderFilm(film, topRatedFilmsElement));
  }

  _renderMostCommentedFilmsList() {
    if (this._mostCommentedFilms.length === 0) {
      return;
    }

    render(this._filmsComponent, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

    const mostCommentedFilmsElement = this._filmsListMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    this._mostCommentedFilms
      .slice()
      .forEach((film) => this._renderFilm(film, mostCommentedFilmsElement));
  }

  _renderFilms(films) {
    films
      .forEach((film) => this._renderFilm(film));
  }

  _renderShowMoreButton() {
    if (this._showMoreFilmsBtn !== null) {
      this._showMoreFilmsBtn = null;
    }

    this._showMoreFilmsBtn = new LoadMoreButtonView();
    this._showMoreFilmsBtn.setClickHandler(this._handleShowMoreFilmsBtn);

    render(this._filmsListComponent, this._showMoreFilmsBtn, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._filmListContainerComponent);
    remove(this._filmsListComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreFilmsBtn);
    remove(this._filmsListTopRatedComponent);
    remove(this._filmsListMostCommentedComponent);

    if (resetRenderedTaskCount) {
      this._renderedFilmCount = SHOWING_FILM_CARD_COUNT_BY_BUTTON;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmsWrapper() {
    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const films = this._getFilms();
    if (films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();

    this._renderFilmsWrapper();

    this._renderFilmsList();

    this._topRatedFilms = this._getTopRatedFilms();
    this._renderTopRatedFilmsList();

    this._mostCommentedFilms = this._getMostCommentedFilms();
    this._renderMostCommentedFilmsList();
  }

  _getTopRatedFilms() {
    const sortedFilms = this._filmsModel.getFilms()
      .slice()
      .filter((film) => film.rating > 0)
      .sort(sortFilmsByRating);
    return sortedFilms.splice(0, TOP_RATED_COUNT);
  }

  _getMostCommentedFilms() {
    const sortedFilms = this._filmsModel.getFilms()
      .slice()
      .filter((film) => film.commentsCount > 0)
      .sort(sortByCommentsCount);
    return sortedFilms.splice(0, MOST_COMMENTED_COUNT);
  }
}

export default CinemaListPresenter;
