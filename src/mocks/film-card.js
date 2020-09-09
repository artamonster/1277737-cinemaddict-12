import {text} from '../helpers/const';
import {getRandomErratic,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue,
  generateDate} from '../helpers/common';

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


const generateFilmCard = () => ({
  title: getRandomArrayItem(FilmTitles),
  rate: +getRandomErratic(0, 10).toFixed(1),
  date: generateDate(),
  genre: getRandomArrayItem(Genres),
  duration: getRandomIntInclusive(10, 180),
  description: generateDescription(),
  commentsCount: getRandomIntInclusive(0, 100),
  isInWatchlist: getRandomBooleanValue(),
  isWatched: getRandomBooleanValue(),
  isFavorite: getRandomBooleanValue(),
});


const generateFilmCards = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(generateFilmCard());
  }

  return result;
};

export {generateFilmCard, generateFilmCards};
