import {createElement} from '../helpers/utils.js';

const createFilmsListTitle = (films) => {
  return `<h2 class="films-list__title ${films.length ? `visually-hidden` : ``}">
    ${films.length ? `All movies. Upcoming` : `There are no movies in our database`}
  </h2>`;
};


export default class FilmsListTitleView {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTitle(this._films);
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
