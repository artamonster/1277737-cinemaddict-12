import {MAX_DAY_GAP} from "../const";

export const getCurrentDate = () => new Date();

export const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElements = (data, count) => {
  const tmp = data.slice();
  let result = [];

  for (let i = 0; i < count; i++) {
    let elementInd = getRandomInteger(0, tmp.length - 1);
    result = result.concat(tmp.splice(elementInd, 1));
  }

  return result;
};

export const generateDate = (start = -MAX_DAY_GAP, to = MAX_DAY_GAP) => {
  const daysGap = getRandomInteger(start, to);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};
