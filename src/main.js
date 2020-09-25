import {
  RenderPosition,
  END_POINT,
  AUTHORIZATION, UpdateType
} from "./const";
import {renderElement} from "./utils/render";
import {getRandomInteger} from "./utils/common";

import StatisticView from "./view/statistic";

import AppPageModePresenter from "./presenter/page-mode";
import MovieListPresenter from "./presenter/movie-list";
import FilterPresenter from "./presenter/filter";
import StatisticsPresenter from "./presenter/statistics";
import FilmModel from "./model/film";
import FilterModel from "./model/filter";
import PageModeModel from "./model/page-mode";
import Api from "./api";

const api = new Api(END_POINT, AUTHORIZATION);
const filmModel = new FilmModel();
const filterModel = new FilterModel();

const filmsCountInBase = getRandomInteger(10000, 1000000);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticElement = footerElement.querySelector(`.footer__statistics`);

const pageModeModel = new PageModeModel();

const movieListPresenter = new MovieListPresenter(mainElement, headerElement, filmModel, filterModel, api);
const statisticsPresenter = new StatisticsPresenter(mainElement, filmModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmModel, pageModeModel);
filterPresenter.init();
movieListPresenter.init(true);

const appPageModePresenter = new AppPageModePresenter(mainElement, pageModeModel, movieListPresenter, statisticsPresenter);
appPageModePresenter.init();

renderElement(footerStatisticElement, new StatisticView(filmsCountInBase), RenderPosition.BEFOREEND);

api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
  });
