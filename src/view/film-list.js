import AbstractComponent from './abstract-component.js';


export default class FilmsListView extends AbstractComponent {
  getTemplate() {
    const createFilmsList = () => `<section class="films-list"></section>`;
    return createFilmsList();
  }
}
