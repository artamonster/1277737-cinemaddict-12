import moment from "moment";
import {FILM_DETAIL_RELEASE_DATE_FORMAT, FILM_PREVIEW_RELEASE_DATE_FORMAT} from "../const";

const formatDateByTemplate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(format);
};

export const formatFilmReleaseDate = (dueDate) => {
  return formatDateByTemplate(dueDate, FILM_PREVIEW_RELEASE_DATE_FORMAT);
};

export const formatFilmDetailReleaseDate = (date) => {
  return formatDateByTemplate(date, FILM_DETAIL_RELEASE_DATE_FORMAT);
};

export const formatFilmDuration = (duration) => {
  if (!duration) {
    return ``;
  }

  const momentDuration = moment.duration(duration, `minutes`);
  return `${momentDuration.hours()}h ${momentDuration.minutes()}m`;
};

export const humanizeCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).fromNow();
};

export const sortFilmsByDate = (firstFilm, secondFilm) => {
  return secondFilm.date.getTime() - firstFilm.date.getTime();
};

export const sortFilmsByRating = (firstFilm, secondFilm) => {
  return secondFilm.rating - firstFilm.rating;
};

export const sortByCommentsCount = (firstFilm, secondFilm) => {
  return secondFilm.commentsCount - firstFilm.commentsCount;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
