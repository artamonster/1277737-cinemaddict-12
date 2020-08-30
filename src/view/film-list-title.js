import AbstractComponent from './abstract-component.js';

const createFilmsListTitle = (films) => {
  return `<h2 class="films-list__title ${films.length ? `visually-hidden` : ``}">
    ${films.length ? `All movies. Upcoming` : `There are no movies in our database`}
  </h2>`;
};


export default class FilmsListTitleView extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsListTitle(this._films);
  }
}
