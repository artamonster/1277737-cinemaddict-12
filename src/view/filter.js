import AbstractComponent from './abstract-component.js';
import {PageMode} from "../helpers/const.js";

export default class FilterView extends AbstractComponent {
  constructor(filters, currentFilterType) {
    super();

    this._currentFilterType = currentFilterType;
    this._filters = filters;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._changePageModeHandler = this._changePageModeHandler.bind(this);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const link = evt.target.href.split(`#`);
    this._callback.filterTypeChange(link[1]);
  }

  _changePageModeHandler(evt) {
    evt.preventDefault();
    this._callback.pageModeChange(PageMode.STATISTICS);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setChangePageModeHandler(callback) {
    this._callback.pageModeChange = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._changePageModeHandler);
  }

  _createFilterItemTemplate(filter, currentFilterType) {
    const {type, name, count} = filter;
    const link = type.toLowerCase();

    const filmsCount = link !== `all` ? ` <span class="main-navigation__item-count">${count}</span>` : ``;

    return (
      `<a href="#${link}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">${name}${filmsCount}</a>`
    );
  }

  getTemplate() {
    const filterItemsTemplate = this._filters
      .map((filter) => this._createFilterItemTemplate(filter, this._currentFilterType))
      .join(``);

    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
    );
  }
}
