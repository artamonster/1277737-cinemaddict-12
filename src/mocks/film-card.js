import {text} from '../helpers/const';
import {getRandomArbitrary,
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomBooleanValue} from '../helpers/utils';

const filmTitles = [
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

const genres = [
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
  title: getRandomArrayItem(filmTitles),
  rate: +getRandomArbitrary(0, 10).toFixed(1),
  year: getRandomIntInclusive(1940, 2020),
  genre: getRandomArrayItem(genres),
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
