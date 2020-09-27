import AbstractView from "./abstract";

export default class LoadingView extends AbstractView {
  getTemplate() {
    return (
      `<h2 class="films-list__title">Loading...</h2>`
    );
  }
}
