import AbstractView from "./abstract";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  countWatchedFilms,
  getWatchedFilmsDuration,
  makeItemsUniq,
  countFilmsByGenre, getUserRank
} from "../utils/statistics";
import {BAR_HEIGHT, StatisticPeriods} from "../const";

const renderDiagramChart = (statisticCtx, filmByGenresCount) => {
  statisticCtx.height = BAR_HEIGHT * filmByGenresCount.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: filmByGenresCount.map((item) => item.genre),
      datasets: [{
        data: filmByGenresCount.map((item) => item.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class StatisticPageView extends AbstractView {
  constructor(filter, films) {
    super();
    this._films = films;
    this._currentFilter = filter;
    this._topGenre = ``;
    this._statisticsData = [];
    this._getStatistics();

    this._periodChangeHandler = this._periodChangeHandler.bind(this);

    this._setDiagrams();
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._periodChangeHandler);
  }

  _periodChangeHandler(evt) {
    const filterType = evt.currentTarget.querySelector(`[name=statistic-filter]:checked`).value;
    this._callback.filterClick(filterType);
  }

  _getStatistics() {
    const filmGenres = this._films.reduce((acc, film) => acc.concat(film.genres), []);
    const uniqueGenres = makeItemsUniq(filmGenres);

    const filmByGenresCount = uniqueGenres.map((genre) => {
      return {
        genre,
        count: countFilmsByGenre(this._films, genre)
      };
    }).sort((firstItem, secondItem) => {
      return secondItem.count - firstItem.count;
    });

    if (filmByGenresCount.length > 0) {
      this._topGenre = filmByGenresCount[0].genre;
    }

    this._statisticsData = filmByGenresCount;
  }

  _setDiagrams() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    renderDiagramChart(statisticCtx, this._statisticsData);
  }

  getTemplate() {
    const filmsDuration = getWatchedFilmsDuration(this._films);
    const watchedFilmsCount = countWatchedFilms(this._films);
    const rating = getUserRank(watchedFilmsCount);

    return (
      `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rating}</span>
  </p>
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._currentFilter === StatisticPeriods.ALL ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._currentFilter === StatisticPeriods.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._currentFilter === StatisticPeriods.WEEK ? `checked` : ``}>
          <label for="statistic-week" class="statistic__filters-label">Week</label>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._currentFilter === StatisticPeriods.MONTH ? `checked` : ``}>
            <label for="statistic-month" class="statistic__filters-label">Month</label>
            <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._currentFilter === StatisticPeriods.YEAR ? `checked` : ``}>
              <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>
<ul class="statistic__text-list">
        <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${countWatchedFilms(this._films)} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${filmsDuration.hours} <span class="statistic__item-description">h</span> ${filmsDuration.minutes} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${this._topGenre}</p>
    </li>
</ul>
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
</section>`
    );
  }
}
