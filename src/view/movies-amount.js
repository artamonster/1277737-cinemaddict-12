import AbstractComponent from './abstract-component.js';

export default class MoviesAmountView extends AbstractComponent {
  getTemplate() {
    return `<p>130 291 movies inside</p>`;
  }
}
