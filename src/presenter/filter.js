import FilterView from "../view/filter.js";
import {render, replaceElement, remove, RenderPosition} from "../helpers/render.js";
import {filter} from "../helpers/filter.js";
import {FilterType, UpdateType, PageMode, UserAction} from "../helpers/const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, pageModeModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._pageModeModel = pageModeModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setChangePageModeHandler(this._handleChangeMode);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replaceElement(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleChangeMode(mode) {
    this._pageModeModel.setMode(UserAction.CHANGE_MODE, mode);
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
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: films.length
      },
      {
        type: FilterType.WATCHLIST,
        name: `watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `history`,
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
