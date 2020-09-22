import {StatisticPeriods} from "../helpers/const.js";
import {remove, render, RenderPosition} from "../helpers/render.js";
import StatisticPageView from "../view/statistic-page";
import {statisticsPeriod} from "../helpers/statistics";

export default class StatisticsPresenter {
  constructor(boardContainer, filmsModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;

    this._currentFilter = StatisticPeriods.ALL;
    this._statisticsPageComponent = null;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  init(films = this._filmsModel.getFilms()) {
    const prevStatisticsPageComponent = this._statisticsPageComponent;

    const watchedFilms = films.filter((film) => film.isWatched);

    this._statisticsPageComponent = new StatisticPageView(this._currentFilter, watchedFilms);

    this._statisticsPageComponent.setFilterClickHandler(this._filterClickHandler);

    if (prevStatisticsPageComponent === null) {
      render(this._boardContainer, this._statisticsPageComponent, RenderPosition.BEFOREEND);
      return;
    }

    remove(prevStatisticsPageComponent);
  }

  destroy() {
    remove(this._statisticsPageComponent);
    this._statisticsPageComponent = null;
  }

  _filterClickHandler(filterType) {
    this._currentFilter = filterType;
    const films = statisticsPeriod[filterType](this._filmsModel.getFilms());
    this._destroy();
    this.init(films);
  }

  _destroy() {
    remove(this._statisticsPageComponent);
    this._statisticsPageComponent = null;
  }
}
