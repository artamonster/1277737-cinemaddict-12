import AbstractComponent from './abstract-component.js';

const createSiteSorting = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class SortListView extends AbstractComponent {
  getTemplate() {
    return createSiteSorting();
  }
}
