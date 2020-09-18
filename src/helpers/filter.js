
export const sortFilmsByDate = (firstFilm, secondFilm) => {
  return secondFilm.date.getTime() - firstFilm.date.getTime();
};

export const sortFilmsByRating = (firstFilm, secondFilm) => {
  return secondFilm.rating - firstFilm.rating;
};
export const sortByCommentsCount = (firstFilm, secondFilm) => {
  return secondFilm.commentsCount - firstFilm.commentsCount;
};
import {FilterType} from "./const";

export const filter = {
  [FilterType.ALL]: (tasks) => tasks,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
