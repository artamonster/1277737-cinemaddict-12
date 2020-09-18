import AbstractComponent from './abstract-component.js';

export default class FilterView extends AbstractComponent {
  constructor(filters, currentFilterType) {
    super();

    this._currentFilterType = currentFilterType;
    this._filters = filters;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const link = evt.target.href.split(`#`);
    this._callback.filterTypeChange(link[1]);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
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
