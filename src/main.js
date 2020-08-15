import {createUserRank} from "./view/user-rank.js";
import {createSiteMenu} from "./view/site-menu.js";
import {createSiteSorting} from "./view/site-sorting.js";
import {createFilmsList} from "./view/film-list.js";
import {createFilmCard} from "./view/film-card.js";
import {createFilmsListExtra} from "./view/film-list-extra.js";
// import {createFilmDetails} from "./view/film-details.js";
import {createButtonShowMore} from "./view/button-show-more.js";
import {createMoviesAmount} from "./view/movies-amount.js";
import {generateFilmCards} from "./mocks/film-card.js";

const FILM_CARD_COUNT = 15;
const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;

const filmCards = generateFilmCards(FILM_CARD_COUNT);
const filmsListExtraTitles = [`Top rated`, `Most commented`];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const renderCardsAmount = (cards, sliceFrom, sliceTo, container) => {
  cards
    .slice(sliceFrom, sliceTo)
    .forEach((card) => render(container, createFilmCard(card)));
};

const filmsWatchList = filmCards.filter(({isInWatchlist}) => isInWatchlist);
const filmsWatched = filmCards.filter(({isWatched}) => isWatched);
const filmFavorite = filmCards.filter(({isFavorite}) => isFavorite);

render(siteHeaderElement, createUserRank(filmsWatchList.length));
render(siteMainElement, createSiteMenu(filmsWatchList.length, filmsWatched.length, filmFavorite.length));
render(siteMainElement, createSiteSorting());
render(siteMainElement, createFilmsList());
// render(siteMainElement, createFilmDetails(filmCards[0]), `afterend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);
const filmsListElement = filmsElement.querySelector(`.films-list`);

let showingFilmCardsCount = SHOWING_FILM_CARD_COUNT_ON_START;

renderCardsAmount(filmCards, 0, showingFilmCardsCount, filmListContainer);

render(filmsListElement, createButtonShowMore());

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
  render(filmsElement, createFilmsListExtra(filmsListExtraTitles[0]));

  const sortedFilmCardsByRate = filmCards.slice().sort((a, b) => {
    return b.rate - a.rate;
  });

  const topRatedContainerElements = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

  renderCardsAmount(sortedFilmCardsByRate, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, topRatedContainerElements);
}
if (commentsSum > 0) {
  render(filmsElement, createFilmsListExtra(filmsListExtraTitles[1]));

  const sortedFilmCardsByCommentCount = filmCards.slice().sort((a, b) => {
    return b.commentsCount - a.commentsCount;
  });

  const mostCommentedContainerElements = document.querySelector(`.films-list--extra:last-child .films-list__container`);

  renderCardsAmount(sortedFilmCardsByCommentCount, 0, SHOWING_FILM_CARD_COUNT_BY_EXTRA, mostCommentedContainerElements);
}
render(siteMainElement, createMoviesAmount());


