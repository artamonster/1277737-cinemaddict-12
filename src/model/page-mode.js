import Observer from "../helpers/observer.js";
import {PageMode} from "../helpers/const.js";

export default class AppPageMode extends Observer {
  constructor() {
    super();
    this._pageMode = PageMode.FILM_VIEW;
  }

  setMode(updateType, mode) {
    this._pageMode = mode;
    this._broadcast(updateType, mode);
  }

  getMode() {
    return this._pageMode;
  }
}
