import {createUserRank} from "./view/user-rank.js";
import {createSiteMenu} from "./view/site-menu.js";
import {createSiteSorting} from "./view/site-sorting.js";
import {createFilmsList} from "./view/film-list.js";
import {createFilmCard} from "./view/film-card.js";
import {createFilmsListExtra} from "./view/film-list-extra.js";
import {createButtonShowMore} from "./view/button-show-more.js";
import {createMoviesAmount} from "./view/movies-amount.js";

const filmCardCount = 5;
const filmsListExtraTitles = [`Top rated`, `Most commented`];
const filmsInExtraCount = filmsListExtraTitles.length;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const multipleRender = (container, template, place = `beforeend`, quantity = 1) => {
  for (let i = 0; i < quantity; i++) {
    render(container, template, place);
  }
};

render(siteHeaderElement, createUserRank());
render(siteMainElement, createSiteMenu());
render(siteMainElement, createSiteSorting());
render(siteMainElement, createFilmsList());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsElement.querySelector(`.films-list__container`);

multipleRender(filmListContainer, createFilmCard(), `beforeend`, filmCardCount);

render(filmsElement, createButtonShowMore());

filmsListExtraTitles.forEach((title) => render(filmsElement, createFilmsListExtra(title)));

const filmsListExtraContainerElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

filmsListExtraContainerElements.forEach((filmsListExtraContainerElement) => {
  multipleRender(filmsListExtraContainerElement, createFilmCard(), `beforeend`, filmsInExtraCount);
});

render(siteFooterElement, createMoviesAmount());


