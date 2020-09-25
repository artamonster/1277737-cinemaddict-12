import AbstractView from "./abstract";

export default class StatisticView extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    const formattedCount = new Intl.NumberFormat(`ru-RU`).format(this._count);
    return (
      `<p>${formattedCount} movies inside</p>`
    );
  }
}
