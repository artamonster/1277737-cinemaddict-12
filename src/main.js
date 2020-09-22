import UserRankView from "./view/user-rank.js";
import MoviesAmountView from "./view/movies-amount.js";

import AppPageModePresenter from "./presenter/page-mode";
import CinemaListPresenter from "./presenter/cinema-list.js";
import FilterPresenter from "./presenter/filter";
import StatisticsPresenter from "./presenter/statistics";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import AppPageModeModel from "./model/page-mode";
import {countWatchedFilms} from "./helpers/statistics";

import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/render';
import {FILM_COUNT} from "./helpers/const";

const films = generateFilmCards(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const watchedFilmsCount = countWatchedFilms(filmsModel.getFilms());

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new UserRankView(watchedFilmsCount), RenderPosition.BEFOREEND);

const pageModeModel = new AppPageModeModel();

const cinemaListPresenter = new CinemaListPresenter(mainElement, filmsModel, filterModel, pageModeModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, filmsModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, pageModeModel);
cinemaListPresenter.init();
filterPresenter.init();

const appPageModePresenter = new AppPageModePresenter(mainElement, pageModeModel, cinemaListPresenter, statisticsPresenter);
appPageModePresenter.init();

render(footerStatisticElement, new MoviesAmountView(), RenderPosition.BEFOREEND);
