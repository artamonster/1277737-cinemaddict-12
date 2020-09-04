import AbstractComponent from './abstract-component.js';

export default class FilmsView extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
