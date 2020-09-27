import AbstractView from "./abstract";
import {FILMS_COUNT_FORMAT} from "../const";

export default class StatisticView extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    const formattedCount = new Intl.NumberFormat(FILMS_COUNT_FORMAT).format(this._count);
    return (
      `<p>${formattedCount} movies inside</p>`
    );
  }
}
