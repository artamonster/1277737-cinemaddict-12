import AbstractComponent from './abstract-component.js';

const createButtonShowMore = () => `<button class="films-list__show-more">Show more</button>`;

export default class LoadMoreButtonView extends AbstractComponent {
  getTemplate() {
    return createButtonShowMore();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
