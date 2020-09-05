import AbstractComponent from './abstract-component.js';

export default class SiteMenuView extends AbstractComponent {
  constructor(watchListCount, watchedCount, favoriteCount) {
    super();
    this._watchListCount = watchListCount;
    this._watchedCount = watchedCount;
    this._favoriteCount = favoriteCount;
  }

  getTemplate() {
    const createSiteMenu = (watchListCount, watchedCount, favoriteCount) => {
      return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
    };
    return createSiteMenu(this._watchListCount, this._watchedCount, this._favoriteCount);
  }
}