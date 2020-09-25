import AbstractView from "./abstract";

export default class FilmsList extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
      </section>`
    );
  }
}
