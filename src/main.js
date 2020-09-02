import UserRankView from "./view/user-rank.js";
import SiteMenuView from "./view/site-menu.js";
import FilmsView from "./view/films.js";
import FilmsListTitleView from "./view/film-list-title.js";
import MoviesAmountView from "./view/movies-amount.js";
import CinemaListPresenter from "./presenter/cinema-list.js";
import {generateFilmCards} from "./mocks/film-card.js";
import {RenderPosition, render} from './helpers/render';

const FILM_COUNT = 15;

const films = generateFilmCards(FILM_COUNT);

const filmsWatchList = films.filter(({isInWatchlist}) => isInWatchlist);
const filmsWatched = films.filter(({isWatched}) => isWatched);
const filmFavorite = films.filter(({isFavorite}) => isFavorite);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const filmsContainer = new FilmsView();

render(headerElement, new UserRankView(filmsWatchList.length), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filmsWatchList.length, filmsWatched.length, filmFavorite.length), RenderPosition.BEFOREEND);
render(mainElement, new FilmsView(), RenderPosition.BEFOREEND);
render(mainElement, filmsContainer, RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);

const filmsListElement = filmsElement.querySelector(`.films-list`);

render(filmsListElement, new FilmsListTitleView(films), RenderPosition.BEFOREEND);

const cinemaListPresenter = new CinemaListPresenter(mainElement);

cinemaListPresenter.init(films);


render(mainElement, new MoviesAmountView(), RenderPosition.BEFOREEND);
