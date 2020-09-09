import {MAX_DAY_GAP, DATE_LOCALE} from "./const";

const getRandomErratic = (min, max) => Math.random() * (max - min) + min;

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);

  return array[randomIndex];
};

const getRandomBooleanValue = () => Math.random() >= 0.5;

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formatingHours = hours > 0 ? `${hours}h` : ``;
  const formatingMinutes = minutes > 10 ? `${minutes}m` : `0${minutes}m`;

  return `${formatingHours} ${formatingMinutes}`;
};

const getFileName = (title) => title
  .split(` `)
  .map((word) => word.toLowerCase())
  .join(`-`);

export const humanizeFilmReleaseDate = (date) => {
  const day = (`0` + date.getDate()).slice(-2);
  const month = date.toLocaleString(DATE_LOCALE, {month: `long`});
  return `${day} ${month} ${date.getFullYear()}`;
};

export const humanizeFilmReleaseYear = (date) => {
  return date.toLocaleString(DATE_LOCALE, {year: `numeric`});
};

const generateDate = () => {
  const daysGap = getRandomIntInclusive(-MAX_DAY_GAP, MAX_DAY_GAP);
  const currentDate = new Date();

  currentDate.setHours(getRandomIntInclusive(0, 23), getRandomIntInclusive(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

export {
  getRandomErratic,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue,
  formatDuration,
  getFileName,
  generateDate
};
