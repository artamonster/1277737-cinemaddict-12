import UserRankView from "./view/user-rank.js";
import MoviesAmountView from "./view/movies-amount.js";

import CinemaListPresenter from "./presenter/cinema-list.js";
import FilterPresenter from "./presenter/filter";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";

import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/render';
import {FILM_COUNT} from "./helpers/const";

const films = generateFilmCards(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const filmsWatchList = films.filter(({isInWatchlist}) => isInWatchlist);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new UserRankView(filmsWatchList.length), RenderPosition.BEFOREEND);


const cinemaListPresenter = new CinemaListPresenter(mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
cinemaListPresenter.init();
filterPresenter.init();

render(footerStatisticElement, new MoviesAmountView(), RenderPosition.BEFOREEND);
