import {createElement} from '../helpers/utils.js';

const createFilmsListContainer = () => `<div class="films-list__container"></div>`;


export default class FilmsListContainerView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListContainer();
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
