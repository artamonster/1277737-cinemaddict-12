import {PageMode, UserAction} from "../helpers/const.js";

export default class AppPageModePresenter {
  constructor(boardContainer, pageModeModel, movieListPresenter, statisticsPresenter) {
    this._movieListPresenter = movieListPresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._pageModeModel = pageModeModel;

    this._handleModeEvent = this._handleModeEvent.bind(this);
  }

  init() {
    this._pageModeModel.addObserver(this._handleModeEvent);
  }

  _handleModeEvent(actionType, pageMode) {
    switch (actionType) {
      case UserAction.CHANGE_MODE:
        this._proceedChangeMode(pageMode);
        break;
    }
  }

  _proceedChangeMode(pageMode) {
    switch (pageMode) {
      case PageMode.FILM_VIEW:
        this._statisticsPresenter.destroy();
        this._movieListPresenter.init(false);
        break;
      case PageMode.STATISTICS:
        this._movieListPresenter.destroy();
        this._statisticsPresenter.init();
        break;
    }
  }
}
