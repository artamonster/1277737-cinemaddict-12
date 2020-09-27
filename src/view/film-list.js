import AbstractView from "./abstract";

export default class FilmsListView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
      </section>`
    );
  }
}
