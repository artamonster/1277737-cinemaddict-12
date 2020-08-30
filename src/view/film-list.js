import AbstractComponent from './abstract-component.js';

const createFilmsList = () => `<section class="films-list"></section>`;

export default class FilmsListView extends AbstractComponent {
  getTemplate() {
    return createFilmsList();
  }
}
