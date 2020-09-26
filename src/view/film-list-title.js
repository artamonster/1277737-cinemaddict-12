import AbstractView from "./abstract";

export default class FilmListTitleView extends AbstractView {
  getTemplate() {
    return (
      `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
    );
  }
}
