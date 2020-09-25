import {generateDate} from "../utils/common";
import {getRandomElements, getRandomInteger} from "../utils/common";
import {MAX_DAY_GAP} from "../const";

const generateId = () => Math.random().toString(36).substr(2, 9);

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const text = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const authors = [
  `John Black`,
  `Anthony Tyler`,
  `Thomas Webster`,
  `Stewart Reynolds`,
  `Norah Bishop`,
  `Cameron Owens`
];

const generateEmotion = () => {
  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateText = () => {
  const sentenceCount = getRandomInteger(1, 4);

  return getRandomElements(text, sentenceCount).join(` `);
};

const generateAuthor = () => {
  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

export const generateComment = () => {
  return {
    id: generateId(),
    text: generateText(),
    emotion: generateEmotion(),
    author: generateAuthor(),
    date: generateDate(-MAX_DAY_GAP, 0),
  };
};

export const generateComments = (count) => {
  let comments = [];

  let i = 0;
  while (i < count) {
    comments.push(generateComment());
    i++;
  }

  return comments;
};
