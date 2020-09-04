import AbstractComponent from './abstract-component.js';

export default class FilmsListView extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list"></section>`;
  }
}
