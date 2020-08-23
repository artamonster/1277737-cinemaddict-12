import {createElement} from '../helpers/utils.js';

const createMoviesAmount = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class MoviesAmountView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoviesAmount();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
