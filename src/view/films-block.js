import AbstractView from "./abstract";

export default class FilmsBlock extends AbstractView {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
