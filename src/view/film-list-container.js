import AbstractComponent from './abstract-component.js';

const createFilmsListContainer = () => `<div class="films-list__container"></div>`;


export default class FilmsListContainerView extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainer();
  }
}
