import AbstractView from "./abstract";

export default class FilmsView extends AbstractView {
  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
