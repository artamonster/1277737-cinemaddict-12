import UserRankView from "./view/user-rank.js";
import SiteMenuView from "./view/site-menu.js";
import SortListView from "./view/site-sorting.js";
import FilmsListView from "./view/film-list.js";
import FilmCardView from "./view/film-card.js";
import FilmsListExtraView from "./view/film-list-extra.js";
import FilmDetailsView from "./view/film-details.js";
import LoadMoreButtonView from "./view/button-show-more.js";
import MoviesAmountView from "./view/movies-amount.js";
import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/utils.js';

const FILM_CARD_COUNT = 15;
const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;

const renderFilm = (container, film) => {
  const FilmCard = new FilmCardView(film);
  const FilmDetails = new FilmDetailsView(film);
  const filmPosterElement = FilmCard.getElement().querySelector(`.film-card__poster`);
  const filmTitleElement = FilmCard.getElement().querySelector(`.film-card__title`);
  const filmTitleCommentsElement = FilmCard.getElement().querySelector(`.film-card__comments`);
  const closeDetailsButton = FilmDetails.getElement().querySelector(`.film-details__close-btn`);

  const openFilmDetails = (evt) => {
    evt.preventDefault();
    render(siteMainElement, FilmDetails.getElement(), RenderPosition.BEFOREEND);
  };

  const closeFilmDetails = (evt) => {
    evt.preventDefault();
    FilmDetails.getElement().remove();
  };

  filmPosterElement.addEventListener(`click`, openFilmDetails);
  filmTitleElement.addEventListener(`click`, openFilmDetails);
  filmTitleCommentsElement.addEventListener(`click`, openFilmDetails);
  closeDetailsButton.addEventListener(`click`, closeFilmDetails);

  render(container, FilmCard.getElement(), RenderPosition.BEFOREEND);
};

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmsListExtraTitles = [`Top rated`, `Most commented`];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const filmsWatchList = filmCards.filter(({isInWatchlist}) => isInWatchlist);
const filmsWatched = filmCards.filter(({isWatched}) => isWatched);
const filmFavorite = filmCards.filter(({isFavorite}) => isFavorite);

render(siteHeaderElement, new UserRankView(filmsWatchList.length).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filmsWatchList.length, filmsWatched.length, filmFavorite.length).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortListView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);
const filmsListElement = filmsElement.querySelector(`.films-list`);

let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

filmCards
  .slice(0, showingFilmCardsCount)
  .forEach((card) => renderFilm(filmListContainer, card));

render(filmsListElement, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCardsCount = showingFilmCardsCount;
  showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

  filmCards
    .slice(prevFilmCardsCount, showingFilmCardsCount)
    .forEach((card) => renderFilm(filmListContainer, card));

  if (showingFilmCardsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

const rateSum = filmCards.reduce((acc, {rate}) => rate + acc, 0);
const commentsSum = filmCards.reduce((acc, {commentsCount}) => commentsCount + acc, 0);

if (rateSum > 0) {
  render(filmsElement, new FilmsListExtraView(filmsListExtraTitles[0]).getElement(), RenderPosition.BEFOREEND);

  const sortedFilmCardsByRate = filmCards
    .slice()
    .sort((a, b) => b.rate - a.rate);

  const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

  sortedFilmCardsByRate
    .slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA)
    .forEach((card) => renderFilm(topRatedContainerElements, card));
}
if (commentsSum > 0) {
  render(filmsElement, new FilmsListExtraView(filmsListExtraTitles[1]).getElement(), RenderPosition.BEFOREEND);

  const sortedFilmCardsByCommentCount = filmCards
    .slice()
    .sort((a, b) => b.commentsCount - a.commentsCount);

  const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

  sortedFilmCardsByCommentCount
    .slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA)
    .forEach((card) => renderFilm(mostCommentedContainerElements, card));
}
render(siteMainElement, new MoviesAmountView().getElement(), RenderPosition.BEFOREEND);


