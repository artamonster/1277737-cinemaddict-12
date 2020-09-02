import FilmsListExtraView from "../view/film-list-extra.js";
import FilmsListContainerView from "../view/film-list-container.js";
import FilmsListView from "../view/film-list.js";
import LoadMoreButtonView from "../view/button-show-more.js";
import SortListView from "../view/site-sorting.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {RenderPosition, render, remove} from '../helpers/render';

const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


class CinemaListPresenter {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsListComponent = new FilmsListView();
    this._sortComponent = new SortListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._filmsListTopRatedComponent = new FilmsListExtraView(`Top rated`);
    this._filmsListMostCommentedComponent = new FilmsListExtraView(`Most commented`);
  }


  init(films) {
    this._films = films.slice();

    this._renderMovieList();
    this._renderExtra(films);
  }
  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
  }

  _renderMovieList() {
    this._renderSort();
    if (this._films.length) {
      const filmsElement = this._filmsContainer.getElement();
      const filmsListElement = filmsElement.querySelector(`.films-list`);
      render(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderFilmCardsList();
  }

  _renderFilm(cardContainer, detailsContainer, film) {
    const filmCard = new FilmCardView(film);
    const filmDetails = new FilmDetailsView(film);

    const onEscKeyDown = (evt) => {
      const escKey = evt.key === `Escape` || evt.key === `Esc`;
      if (escKey) {
        closeFilmDetails(evt);
      }
    };

    const openFilmDetails = (evt) => {
      evt.preventDefault();
      render(this._filmsContainer, filmDetails, RenderPosition.BEFOREEND);
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
    filmDetails.setCloseDetailsButtonClickHandler(closeFilmDetails);

    render(cardContainer, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(this._filmsListComponent, film));
  }

  _renderShowMoreButton() {
    const filmsElement = this._filmsContainer.getElement();
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = this._filmListContainerComponent.getElement();
    let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

    this._films
      .slice(0, showingFilmCardsCount)
      .forEach((card) => this._renderFilm(filmsListContainerElement, filmsElement, card));

    render(filmsListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmCardsCount = showingFilmCardsCount;
      showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;
      this._films
        .slice(prevFilmCardsCount, showingFilmCardsCount)
        .forEach((card) => this._renderFilm(filmsListContainerElement, filmsElement, card));

      if (showingFilmCardsCount >= this._films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _renderExtra(films) {
    const rateSum = films.reduce((acc, {rate}) => rate + acc, 0);
    const commentsSum = films.reduce((acc, {commentsCount}) => commentsCount + acc, 0);
    const filmsElement = this._filmsContainer.getElement();

    if (rateSum > 0) {
      render(filmsElement, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);

      const sortedFilmCardsByRate = films
        .slice()
        .sort((a, b) => b.rate - a.rate);

      const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

      sortedFilmCardsByRate
        .slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA)
        .forEach((card) => this._renderFilm(topRatedContainerElements, card));
    }

    if (commentsSum > 0) {
      render(filmsElement, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

      const sortedFilmCardsByCommentCount = films
        .slice()
        .sort((a, b) => b.commentsCount - a.commentsCount);

      const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

      sortedFilmCardsByCommentCount
        .slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA)
        .forEach((card) => this._renderFilm(mostCommentedContainerElements, card));

    }
  }
  _renderFilmCardsList() {
    this._renderFilms(0, Math.min(this._films.length, SHOWING_FILM_CARD_COUNT_BY_BUTTON));

    if (this._films.length > SHOWING_FILM_CARD_COUNT_BY_BUTTON) {
      this._renderShowMoreButton();
    }
  }
}

export default CinemaListPresenter;
