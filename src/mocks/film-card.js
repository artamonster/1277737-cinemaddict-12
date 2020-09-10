import {text} from '../helpers/const';
import {
  getRandomIntInclusive,
  getRandomErratic,
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

const Emotions = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`,
];

const Users = [
  `Vasya`,
  `Druzhok-Kuraek`,
  `Armin Van Buuren`,
  `Ferry Corsten`,
  `Christopher Lawrence`,
  `Laura`,
  `Lizzy`,
  `Benny Benassi`,
  `Johan Gielen`,
  `Markus Schulz`,
  `Joyful Grape`,
  `Max Graham`,
];

const getRandomCommentDate = () => {
  const currentDate = Date.now();
  const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
  const diffDate = getRandomIntInclusive(0, threeDaysInMs);
  return new Date(currentDate - diffDate);
};

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

const generateComment = () => {
  return {
    text: generateDescription(),
    emotions: getRandomArrayItem(Emotions),
    author: getRandomArrayItem(Users),
    date: getRandomCommentDate(),
  };
};

const generateComments = () => {
  const commentsAmount = getRandomIntInclusive(0, 5);
  const result = [];
  for (let i = 0; i < commentsAmount; i++) {
    result.push(generateComment());
  }

  return result;
};

const generateFilmCard = () => {
  const rating = getRandomErratic(1, 10);
  const userRating = getRandomBooleanValue() ? getRandomIntInclusive(1, 9) : null;
  const isWatched = getRandomBooleanValue();

  return {
    title: getRandomArrayItem(FilmTitles),
    rating,
    userRating: isWatched && rating ? userRating : null,
    date: generateDate(),
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

export {generateFilmCard, generateFilmCards};
