import {text, MAX_DAY_GAP} from '../helpers/const';
import {
  getRandomIntInclusive,
  getRandomErratic,
  getRandomArrayItem,
  getRandomBooleanValue,
  generateDate} from '../helpers/common';
import {generateComments} from "./comment";
const FilmTitles = [
  `Apocalypse Now`,
  `Blade Runner`,
  `Dark`,
  `Butterfly Effect`,
  `Dune`,
  `Hobo With A Shotgun`,
  `Mad Max Fury Road`,
  `Inception`,
  `Pulp Fiction`,
  `Snatch`,
  `The Shining`,
  `The Silence Of The Lambs`,
  `Waterworld`,
  `Terminator 2`,
  `Serenity`,
];

const Genres = [
  `Action`,
  `Animation`,
  `Cartoon`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Art House`,
  `Fantasy`,
  `Historical`,
  `Horror`,
  `Musical`,
  `Romance`,
  `Sci-Fi`,
  `Thriller`,
  `Western`,
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const generateDescription = () => {
  const sentences = text
    .trim()
    .slice(0, -1)
    .split(`. `)
    .map((sentence) => `${sentence}.`);

  const sentencesAmount = getRandomIntInclusive(1, 3);
  const result = [];

  for (let i = 0; i < sentencesAmount; i++) {
    result.push(getRandomArrayItem(sentences));
  }

  return result.join(` `);
};

const generateGenres = (genres) => genres
  .filter(getRandomBooleanValue)
  .slice(0, getRandomIntInclusive(1, 3));

const generateFilmCard = () => {
  const rating = getRandomErratic(1, 10);

  return {
    id: generateId(),
    title: getRandomArrayItem(FilmTitles),
    rating,
    date: generateDate(-MAX_DAY_GAP, 0),
    genres: [...new Set(generateGenres(Genres))],
    duration: getRandomIntInclusive(10, 180),
    description: generateDescription(),
    commentsCount: getRandomIntInclusive(0, 100),
    isInWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    comments: generateComments(),
  };
};

const generateFilmCards = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateFilmCard());
  }

  return result;
};

export {generateId, generateFilmCard, generateFilmCards, generateDescription};
