import AbstractView from "./abstract";

export default class FilmDetailLoadingView extends AbstractView {
  getTemplate() {
    return (
      `<div class="films-list__details-loading">
        <div class="films-list__details-loading-block"><div></div><div></div></div>
      </div>`
    );
  }
}
