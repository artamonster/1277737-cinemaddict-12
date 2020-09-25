import AbstractView from "./abstract";
import {SortType} from "../const";

export default class SortView extends AbstractView {
  constructor(currentSortType) {
    super();

    this._sortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._sortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _isActiveSort(type) {
    return this._sortType === type;
  }

  getTemplate() {
    const activeClass = `sort__button--active`;
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button ${this._isActiveSort(SortType.DEFAULT) ? activeClass : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button ${this._isActiveSort(SortType.DATE) ? activeClass : ``}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button ${this._isActiveSort(SortType.RATING) ? activeClass : ``}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
      </ul>`
    );
  }


}
