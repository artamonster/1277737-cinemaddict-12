import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.inWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isAlreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
