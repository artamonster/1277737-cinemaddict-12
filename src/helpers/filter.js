
export const sortFilmsByDate = (firstFilm, secondFilm) => {
  return secondFilm.date.getTime() - firstFilm.date.getTime();
};

export const sortFilmsByRating = (firstFilm, secondFilm) => {
  return secondFilm.rating - firstFilm.rating;
};
