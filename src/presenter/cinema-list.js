import FilmsView from "../view/films.js";
import FilmsListView from "../view/film-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
import FilmsListNoMoviesView from "../view/film-list-no-movies.js";
import FilmsListTitleView from "../view/film-list-title.js";
import SortListView from "../view/site-sorting.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import LoadMoreButtonView from "../view/button-show-more.js";
import FilmsListTopRatedView from "../view/film-list-top-rated.js";
import FilmsListMostCommentedView from "../view/film-list-most-commented.js";
import {RenderPosition, render, remove} from '../helpers/render';
import {SHOWING_FILM_CARD_COUNT_BY_BUTTON, SHOWING_FILM_CARD_COUNT_ON_START} from "../helpers/const";

class CinemaListPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._sortComponent = new SortListView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListTopRatedComponent = new FilmsListTopRatedView();
    this._filmsListMostCommentedComponent = new FilmsListMostCommentedView();
  }

  init(films, topRatedFilms, mostCommentedFilms) {
    this._films = films.slice();

    this._topRatedFilms = topRatedFilms;
    this._mostCommentedFilms = mostCommentedFilms;

    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }
  _renderSort() {
    render(this._filmsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoFilms() {
    render(this._filmsListComponent, new FilmsListNoMoviesView(), RenderPosition.BEFOREEND);
  }

  _renderFilm(film, container = this._filmListContainerComponent) {
    const filmCard = new FilmCardView(film);
    const filmDetails = new FilmDetailsView(film);
    const footerElement = document.querySelector(`.footer`);

    const onEscKeyDown = (evt) => {
      const escKey = evt.key === `Escape` || evt.key === `Esc`;
      if (escKey) {
        closeFilmDetails(evt);
      }
    };

    const openFilmDetails = (evt) => {
      render(footerElement, filmDetails, RenderPosition.AFTEREND);
      evt.preventDefault();
      filmDetails.setCloseDetailsButtonClickHandler(closeFilmDetails);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closeFilmDetails = (evt) => {
      evt.preventDefault();
      remove(filmDetails);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    filmCard.setFilmPosterClickHandler(openFilmDetails);
    filmCard.setFilmTitleClickHandler(openFilmDetails);
    filmCard.setFilmCommentsClickHandler(openFilmDetails);

    render(container, filmCard, RenderPosition.BEFOREEND);
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

  _renderMostRecommendedFilmsList() {
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

    let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmCardsCount = showingFilmCardsCount;
      showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;
      this._films
        .slice(prevFilmCardsCount, showingFilmCardsCount)
        .forEach((film) => this._renderFilm(film));

      if (showingFilmCardsCount >= this._films.length) {
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

    this._renderMostRecommendedFilmsList();
  }
}

export default CinemaListPresenter;
