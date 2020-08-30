import AbstractComponent from './abstract-component.js';

const createFilmsListExtra = (filmsListTitle) => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">${filmsListTitle}</h2>
      <div class="films-list__container"></div>
  </section>`
  );
};

export default class FilmsListExtraView extends AbstractComponent {
  constructor(filmsListTitle) {
    super();
    this._filmsListTitle = filmsListTitle;
  }

  getTemplate() {
    return createFilmsListExtra(this._filmsListTitle);
  }
}
