import AbstractView from "./abstract";

export default class FilmListTitle extends AbstractView {
  getTemplate() {
    return (
      `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
    );
  }
}
