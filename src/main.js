import {
  RenderPosition,
  END_POINT,
  AUTHORIZATION, UpdateType, STORE_NAME
} from "./const";
import {renderElement} from "./utils/render";
import {getRandomInteger} from "./utils/common";

import StatisticView from "./view/statistic";

import AppPageModePresenter from "./presenter/page-mode";
import CinemaListPresenter from "./presenter/cinema-list";
import FilterPresenter from "./presenter/filter";
import StatisticsPresenter from "./presenter/statistics";
import FilmModel from "./model/film";
import FilterModel from "./model/filter";
import PageModeModel from "./model/page-mode";
import Api from "./api/index";
import Store from "./api/store";
import Provider from "./api/provider";

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const filmModel = new FilmModel();
const filterModel = new FilterModel();

const filmsCountInBase = getRandomInteger(10000, 1000000);

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticElement = footerElement.querySelector(`.footer__statistics`);

const pageModeModel = new PageModeModel();

const movieListPresenter = new CinemaListPresenter(mainElement, headerElement, filmModel, filterModel, apiWithProvider);
const statisticsPresenter = new StatisticsPresenter(mainElement, filmModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmModel, pageModeModel);
filterPresenter.init();
movieListPresenter.init(true);

const appPageModePresenter = new AppPageModePresenter(mainElement, pageModeModel, movieListPresenter, statisticsPresenter);
appPageModePresenter.init();

renderElement(footerStatisticElement, new StatisticView(filmsCountInBase), RenderPosition.BEFOREEND);

apiWithProvider.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // ServiceWorker available
    }).catch(() => {
    // ServiceWorker is not available
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  if (apiWithProvider.isNeedUpdate()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
