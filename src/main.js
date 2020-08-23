import UserRankView from "./view/user-rank.js";
import SiteMenuView from "./view/site-menu.js";
import SortListView from "./view/site-sorting.js";
import FilmsListView from "./view/film-list.js";
import FilmCardView from "./view/film-card.js";
import FilmsListExtraView from "./view/film-list-extra.js";
// import FilmDetailsView from "./view/film-details.js";
import LoadMoreButtonView from "./view/button-show-more.js";
import MoviesAmountView from "./view/movies-amount.js";
import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/utils.js';

const FILM_CARD_COUNT = 15;
const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmsListExtraTitles = [`Top rated`, `Most commented`];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const renderCardsAmount = (cards, sliceFrom, sliceTo, container) => {
  cards
    .slice(sliceFrom, sliceTo)
    .forEach((card) => render(container, new FilmCardView(card).getElement(), RenderPosition.BEFOREEND));
};

const filmsWatchList = filmCards.filter(({isInWatchlist}) => isInWatchlist);
const filmsWatched = filmCards.filter(({isWatched}) => isWatched);
const filmFavorite = filmCards.filter(({isFavorite}) => isFavorite);

render(siteHeaderElement, new UserRankView(filmsWatchList.length).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filmsWatchList.length, filmsWatched.length, filmFavorite.length).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortListView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
// render(siteMainElement, new FilmDetailsView(filmCards[0]).getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);
const filmsListElement = filmsElement.querySelector(`.films-list`);

let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

renderCardsAmount(filmCards, 0, showingFilmCardsCount, filmListContainer);

render(filmsListElement, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmCardsCount = showingFilmCardsCount;
  showingFilmCardsCount += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

  filmCards
    .slice(prevFilmCardsCount, showingFilmCardsCount)
    .forEach((card) => renderCardsAmount(filmListContainer, card));

  if (showingFilmCardsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

const rateSum = filmCards.reduce((acc, {rate}) => rate + acc, 0);
const commentsSum = filmCards.reduce((acc, {commentsCount}) => commentsCount + acc, 0);

if (rateSum > 0) {
  render(filmsElement, new FilmsListExtraView(filmsListExtraTitles[0]).getElement(), RenderPosition.BEFOREEND);

  const sortedFilmCardsByRate = filmCards.slice().sort((a, b) => {
    return b.rate - a.rate;
  });

  const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

  renderCardsAmount(sortedFilmCardsByRate, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, topRatedContainerElements);
}
if (commentsSum > 0) {
  render(filmsElement, new FilmsListExtraView(filmsListExtraTitles[1]).getElement(), RenderPosition.BEFOREEND);

  const sortedFilmCardsByCommentCount = filmCards.slice().sort((a, b) => {
    return b.commentsCount - a.commentsCount;
  });

  const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

  renderCardsAmount(sortedFilmCardsByCommentCount, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, mostCommentedContainerElements);
}
render(siteMainElement, new MoviesAmountView().getElement(), RenderPosition.BEFOREEND);


