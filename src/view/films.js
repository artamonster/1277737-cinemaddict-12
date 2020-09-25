import AbstractView from "./abstract";

export default class Films extends AbstractView {
  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
