import AbstractComponent from './abstract-component.js';

export default class FilmsListTitleView extends AbstractComponent {
  getTemplate() {
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  }
}
