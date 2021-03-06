
import moment from "moment";
import {
  StatisticPeriods,
  USER_RATING_MIDDLE_COUNT, USER_RATING_MIDDLE_NAME,
  USER_RATING_MIN_COUNT,
  USER_RATING_MIN_NAME,
  USER_RATING_TOP_COUNT, USER_RATING_TOP_NAME
} from "../const";
import {getCurrentDate} from "./common";

export const countWatchedFilms = (films) => {
  return films.filter((film) => film.isAlreadyWatched).length;
};

export const makeItemsUniq = (items) => [...new Set(items)];

export const countFilmsByGenre = (films, genre) => {
  return films.filter((film) => film.genres.includes(genre)).length;
};

export const getWatchedFilmsDuration = (films) => {
  const duration = films.reduce((counter, film) => {
    return counter + film.duration;
  }, 0);


  if (duration === 0) {
    return {
      hours: 0,
      minutes: 0
    };
  }

  const momentDuration = moment.duration(duration, `minutes`);
  return {
    hours: momentDuration.hours(),
    minutes: momentDuration.minutes()
  };
};

const getTodayFilms = (films) => {
  const todayDate = getCurrentDate();
  return films.filter((film) => moment(film.watchingDate).isSame(todayDate));
};

const getFilmsBetweenDates = (films, type) => {
  const todayDate = getCurrentDate();
  const startDate = moment(todayDate).startOf(type);
  const endDate = moment(todayDate).endOf(type);
  return films.filter((film) => moment(film.watchingDate).isBetween(startDate, endDate));
};

const getWeekFilms = (films) => {
  return getFilmsBetweenDates(films, `week`);
};

const getMonthFilms = (films) => {
  return getFilmsBetweenDates(films, `month`);
};

const getYearFilms = (films) => {
  return getFilmsBetweenDates(films, `year`);
};

export const statisticsPeriod = {
  [StatisticPeriods.ALL]: (films) => films,
  [StatisticPeriods.TODAY]: (films) => getTodayFilms(films),
  [StatisticPeriods.WEEK]: (films) => getWeekFilms(films),
  [StatisticPeriods.MONTH]: (films) => getMonthFilms(films),
  [StatisticPeriods.YEAR]: (films) => getYearFilms(films),
};

export const getUserRank = (filmsCount) => {
  let rating = ``;

  if (filmsCount > USER_RATING_TOP_COUNT) {
    rating = USER_RATING_TOP_NAME;
  } else if (filmsCount > USER_RATING_MIDDLE_COUNT) {
    rating = USER_RATING_MIDDLE_NAME;
  } else if (filmsCount >= USER_RATING_MIN_COUNT) {
    rating = USER_RATING_MIN_NAME;
  }

  return rating;
};
