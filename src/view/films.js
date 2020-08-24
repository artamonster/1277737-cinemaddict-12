import {createElement} from '../helpers/utils.js';

const createFilms = () => `<section class="films"></section>`;


export default class FilmsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilms();
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
