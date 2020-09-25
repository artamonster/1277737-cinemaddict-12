import Observer from "../utils/observer";
import moment from "moment";

export default class FilmModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._broadcast(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._broadcast(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          commentsCount: film.comments.length,
          poster: film.film_info.poster,
          fullPoster: film.film_info.poster,
          name: film.film_info.title,
          originalName: film.film_info.alternative_title,
          producer: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          rating: film.film_info.total_rating,
          date: new Date(film.film_info.release.date),
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          countries: [film.film_info.release.release_country],
          shortDescription: film.film_info.description,
          description: film.film_info.description,
          ageRating: film.film_info.age_rating,
          inWatchlist: film.user_details.watchlist,
          isAlreadyWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.name,
            "alternative_title": film.originalName,
            "total_rating": film.rating,
            "poster": film.poster,
            "age_rating": film.ageRating,
            "director": film.producer,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.date,
              "release_country": film.countries[0]
            },
            "runtime": film.duration,
            "genre": film.genres,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.inWatchlist,
            "already_watched": film.isAlreadyWatched,
            "watching_date": moment(film.watchingDate).toISOString(),
            "favorite": film.isFavorite
          }
        }
    );

    return adaptedFilm;
  }
}
