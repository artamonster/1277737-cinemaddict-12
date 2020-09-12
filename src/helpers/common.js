import {MAX_DAY_GAP} from "./const";
import moment from "moment";

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomErratic = (from = 1, to = 0) => {
  const lower = Math.min(from, to);
  const upper = Math.max(from, to);
  return (lower + Math.random() * (upper - lower)).toFixed(1);
};
export const getRandomBooleanValue = () => Math.random() >= 0.5;

export const getFileName = (title) => title
  .split(` `)
  .map((word) => word.toLowerCase())
  .join(`-`);

export const createRatingText = (rating) => rating || `N/A`;

const formatDateByTemplate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(format);
};

export const formatFilmReleaseDate = (dueDate) => {
  return formatDateByTemplate(dueDate, `YYYY`);
};

export const formatFilmDetailReleaseDate = (date) => {
  return formatDateByTemplate(date, `DD MMMM YYYY`);
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

export const generateDate = (start = -MAX_DAY_GAP, to = MAX_DAY_GAP) => {
  const daysGap = getRandomIntInclusive(start, to);
  const currentDate = new Date();

  currentDate.setHours(getRandomIntInclusive(0, 23), getRandomIntInclusive(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
