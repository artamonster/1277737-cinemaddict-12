import {createElement} from '../helpers/utils.js';

const createFilmsListExtra = (filmsListTitle) => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTitle}</h2>
      <div class="films-list__container"></div>
  </section>`
  );
};

export default class FilmsListExtraView {
  constructor(filmsListTitle) {
    this._filmsListTitle = filmsListTitle;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtra(this._filmsListTitle);
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
