import Film from "./film";
import FilmsView from "../view/films.js";
import FilmsListView from "../view/film-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
import FilmsListNoMoviesView from "../view/film-list-no-movies.js";
import FilmsListTitleView from "../view/film-list-title.js";
import SortListView from "../view/site-sorting.js";
import LoadMoreButtonView from "../view/button-show-more.js";
import FilmsListTopRatedView from "../view/film-list-top-rated.js";
import FilmsListMostCommentedView from "../view/film-list-most-commented.js";
import {RenderPosition, render, remove} from '../helpers/render';
import {SHOWING_FILM_CARD_COUNT_BY_BUTTON, SHOWING_FILM_CARD_COUNT_ON_START, SortType} from "../helpers/const";
import {sortFilmsByDate, sortFilmsByRating} from "../helpers/filter.js";
import {updateItem} from "../helpers/common.js";

class CinemaListPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = SHOWING_FILM_CARD_COUNT_ON_START;

    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._sortComponent = new SortListView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films, topRatedFilms, mostCommentedFilms) {
    this._films = films;

    this._sourcedFilms = films.slice();
    this._topRatedFilms = topRatedFilms;
    this._mostCommentedFilms = mostCommentedFilms;

    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmsByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);

    this._clearFilmsList();
    this._clearSort();
    this._renderFilmsList();
    this._renderSort(this._filmsComponent, RenderPosition.BEFORE);
  }

  _clearSort() {
    this._sortComponent.getElement().remove();
    this._sortComponent.removeElement();
  }

  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = SHOWING_FILM_CARD_COUNT_ON_START;
  }

  _renderSort(container = this._filmsContainer, position = RenderPosition.AFTERBEGIN) {
    render(container, this._sortComponent, position);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._filmsListComponent, new FilmsListNoMoviesView(), RenderPosition.BEFOREEND);
  }

  _renderFilm(film, container = this._filmListContainerComponent) {
    const filmPresenter = new Film(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }
  _renderFilmsList() {
    render(this._filmsListComponent, new FilmsListTitleView(), RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, SHOWING_FILM_CARD_COUNT_BY_BUTTON);

    if (this._films.length > SHOWING_FILM_CARD_COUNT_BY_BUTTON) {
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

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }


  _renderShowMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      this._films
        .slice(this._renderedFilmCount, this._renderedFilmCount + SHOWING_FILM_CARD_COUNT_BY_BUTTON)
        .forEach((film) => this._renderFilm(film));

      this._renderedFilmCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

      if (this._renderedFilmCount >= this._films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();

    this._renderFilmsList();

    this._renderTopRatedFilmsList();

    this._renderMostCommentedFilmsList();
  }
}

export default CinemaListPresenter;
