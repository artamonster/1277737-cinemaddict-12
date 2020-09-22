import AbstractComponent from './abstract-component.js';
import {getUserRank} from "../helpers/statistics";

export default class UserProfileBlock extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    const rating = getUserRank(this._filmsCount);

    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${rating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
