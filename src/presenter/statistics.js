import {RenderPosition, StatisticPeriods} from "../const";
import {removeElement, renderElement} from "../utils/render";
import StatisticPageView from "../view/statistic-page";
import {statisticsPeriod} from "../utils/statistics";

export default class StatisticsPresenter {
  constructor(boardContainer, filmModel) {
    this._boardContainer = boardContainer;
    this._filmModel = filmModel;

    this._currentFilter = StatisticPeriods.ALL;
    this._statisticsPageComponent = null;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  init(films = this._filmModel.getFilms()) {
    const prevStatisticsPageComponent = this._statisticsPageComponent;

    const watchedFilms = films.filter((film) => film.isAlreadyWatched);

    this._statisticsPageComponent = new StatisticPageView(this._currentFilter, watchedFilms);

    this._statisticsPageComponent.setFilterClickHandler(this._filterClickHandler);

    if (prevStatisticsPageComponent === null) {
      renderElement(this._boardContainer, this._statisticsPageComponent, RenderPosition.BEFOREEND);
      return;
    }

    removeElement(prevStatisticsPageComponent);
  }

  destroy() {
    removeElement(this._statisticsPageComponent);
    this._statisticsPageComponent = null;
  }

  _filterClickHandler(filterType) {
    this._currentFilter = filterType;
    const films = statisticsPeriod[filterType](this._filmModel.getFilms());
    this._destroy();
    this.init(films);
  }

  _destroy() {
    removeElement(this._statisticsPageComponent);
    this._statisticsPageComponent = null;
  }
}
