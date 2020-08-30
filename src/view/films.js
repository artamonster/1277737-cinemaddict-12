import AbstractComponent from './abstract-component.js';

const createFilms = () => `<section class="films"></section>`;

export default class FilmsView extends AbstractComponent {
  getTemplate() {
    return createFilms();
  }
}
