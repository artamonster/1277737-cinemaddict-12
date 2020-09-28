import AbstractView from "./abstract";

export default class FilmDetailLoadingView extends AbstractView {
  getTemplate() {
    return (
      `<div class="films-list__details-loading">
                <!--This markup was generated here https://loading.io/css/ Classes was added manually-->
        <div class="films-list__details-loading-block">
            <div class="films-list__details-loading-item"></div>
            <div class="films-list__details-loading-item films-list__details-loading-item--second"></div>
        </div>
      </div>`
    );
  }
}
