import {getRandomInteger} from "./utils/common";

export const FILMS_COUNT_PER_STEP = 5;
export const TOP_RATED_COUNT = 2;
export const MOST_COMMENTED_COUNT = 2;
export const MAX_FILM_DESCRIPTION_LENGTH = 140;
export const FILM_DESCRIPTION_AFTER_SIGN = `...`;
export const filmsCountInBase = getRandomInteger(10000, 1000000);
export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFORE: `before`
};
export const Mode = {
  CLOSED: `CLOSED`,
  OPENED: `OPENED`
};
export const EMOJI_WIDTH = 55;
export const EMOJI_HEIGHT = 55;
export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`,
  SET_COMMENTS: `SET_COMMENTS`,
  CHANGE_MODE: `CHANGE_MODE`,
  UPDATE_FILM_MODEL: `UPDATE_FILM_MODEL`,
  UPDATE_MOST_COMMENTED_BLOCK: `UPDATE_MOST_COMMENTED_BLOCK`
};
export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  PATCH_MODEL: `PATCH_MODEL`,
  MAJOR_COMMENT_BLOCK: `MAJOR_COMMENT_BLOCK`,
  INIT: `INIT`
};
export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};
export const FILM_DETAIL_RELEASE_DATE_FORMAT = `DD MMMM YYYY`;
export const FILM_PREVIEW_RELEASE_DATE_FORMAT = `YYYY`;

export const PageMode = {
  FILM_VIEW: `FILM_VIEW`,
  STATISTICS: `STATISTICS`
};

export const StatisticPeriods = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const BAR_HEIGHT = 50;

export const AUTHORIZATION = `Basic lOkrtev0OPRTYZZMESCq2j`;
export const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export const USER_RATING_TOP_COUNT = 20;
export const USER_RATING_MIDDLE_COUNT = 10;
export const USER_RATING_MIN_COUNT = 1;
export const USER_RATING_MIN_NAME = `novice`;
export const USER_RATING_MIDDLE_NAME = `fan`;
export const USER_RATING_TOP_NAME = `movie buff`;
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const FILMS_COUNT_FORMAT = `ru-RU`;

export const STORE_PREFIX = `1277737-cinemaddict-localstorage`;
export const STORE_VER = `v12`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const FILM_TYPE = {
  MAIN: `MAIN`,
  TOP_RATED: `TOP_RATED`,
  MOST_COMMENTED: `MOST_COMMENTED`,
};

export const ESC_KEY_FULL_CODE = `Escape`;
export const ESC_KEY_SHORT_CODE = `Esc`;
