import AbstractComponent from './abstract-component.js';
import {SortType} from "../helpers/const";

export default class SortListView extends AbstractComponent {
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
  getTemplate() {
    const activeClass = `sort__button--active`;
    return `<ul class="sort">
    <li><a href="#" class="sort__button ${this._sortType === SortType.DEFAULT ? activeClass : ``}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button ${this._sortType === SortType.DATE ? activeClass : ``}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button ${this._sortType === SortType.RATING ? activeClass : ``}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
  }
}

