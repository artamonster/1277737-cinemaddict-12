import {getRandomArrayItem, getRandomIntInclusive} from "../helpers/common";
import {generateDescription, generateId} from "./film-card";

const Emotions = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const Users = [
  `Vasya`,
  `Druzhok-Kuraek`,
  `Armin Van Buuren`,
  `Shia LaBeouf`,
  `Christopher Lawrence`,
  `Laure Sainclair`,
  `Lizzy Burden`,
  `Ostap Bender`,
  `Johan Gielen`,
  `Markus Schulz`,
  `Joyful Grape`,
  `Jason Statham`,
];

const getRandomCommentDate = () => {
  const currentDate = Date.now();
  const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
  const diffDate = getRandomIntInclusive(0, threeDaysInMs);
  return new Date(currentDate - diffDate);
};

export const generateComment = () => {
  return {
    id: generateId(),
    text: generateDescription(),
    emotions: getRandomArrayItem(Emotions),
    author: getRandomArrayItem(Users),
    date: getRandomCommentDate(),
  };
};

export const generateComments = () => {
  const commentsAmount = getRandomIntInclusive(0, 5);
  const comments = [];
  for (let i = 0; i < commentsAmount; i++) {
    comments.push(generateComment());
  }

  return comments;
};
