import AbstractComponent from './abstract-component.js';

const createMoviesAmount = () => `<p>130 291 movies inside</p>`;

export default class MoviesAmountView extends AbstractComponent {
  getTemplate() {
    return createMoviesAmount();
  }
}
