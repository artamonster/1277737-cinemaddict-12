import UserRankView from "./view/user-rank.js";
import SiteMenuView from "./view/site-menu.js";
import MoviesAmountView from "./view/movies-amount.js";
import CinemaListPresenter from "./presenter/cinema-list.js";
import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/render';
import {FILM_COUNT, TOP_RATED_COUNT, MOST_COMMENTED_COUNT} from "./helpers/const";

const films = generateFilmCards(FILM_COUNT);
const topRatedFilms = generateFilmCards(TOP_RATED_COUNT);
const mostCommentedFilms = generateFilmCards(MOST_COMMENTED_COUNT);
const filmsWatchList = films.filter(({isInWatchlist}) => isInWatchlist);
const filmsWatched = films.filter(({isWatched}) => isWatched);
const filmFavorite = films.filter(({isFavorite}) => isFavorite);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);


render(headerElement, new UserRankView(filmsWatchList.length), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filmsWatchList.length, filmsWatched.length, filmFavorite.length), RenderPosition.BEFOREEND);

const cinemaListPresenter = new CinemaListPresenter(mainElement);

cinemaListPresenter.init(films, topRatedFilms, mostCommentedFilms);

render(mainElement, new MoviesAmountView(), RenderPosition.BEFOREEND);
