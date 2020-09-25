import FilterView from "../view/filter.js";
import {renderElement, replaceElement, removeElement} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType, RenderPosition, PageMode, UserAction} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmModel, pageModeModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmModel = filmModel;
    this._pageModeModel = pageModeModel;
    this._currentFilter = null;
    this._currentPageMode = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);

    this._filmModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._currentPageMode = this._pageModeModel.getMode();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter, this._currentPageMode);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setChangePageModeHandler(this._handleChangeMode);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replaceElement(this._filterComponent, prevFilterComponent);
    removeElement(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleChangeMode(mode) {
    this._pageModeModel.setMode(UserAction.CHANGE_MODE, mode);
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._pageModeModel.getMode() !== PageMode.FILM_VIEW) {
      this._pageModeModel.setMode(UserAction.CHANGE_MODE, PageMode.FILM_VIEW);
      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
      return;
    }

    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: films.length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `favorites`,
        count: filter[FilterType.FAVORITES](films).length
      },
    ];
  }
}
