import Observer from "../helpers/observer.js";
import {FilterType} from "../helpers/const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._broadcast(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
