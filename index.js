const API_KEY = "key=cf8090f7e7f94201ae3b0eacebd081f3";
const BASE = "https://api.rawg.io/api/games?" + API_KEY;
const URL_POPULAR =
  "https://api.rawg.io/api/games?" +
  API_KEY +
  "&dates=2019-10-10,2020-10-10&ordering=-added&page_size=16";
const GENRES = "https://api.rawg.io/api/genres?" + API_KEY;
const PLATFORMS = "https://api.rawg.io/api/platforms?" + API_KEY;

const main = document.getElementById("main");
const genres = document.getElementById("genres");

getGames(URL_POPULAR);
getGeneros(GENRES);

function getGames(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results != 0) {
        console.log(data.results);
        showGames(data.results);
      }
    });
}

function showGames(data) {
  main.innerHTML = "";
  data.forEach((game) => {
    const { name, genres, rating, platforms, released, background_image } =
      game;
    const gameCard = document.createElement("div");
    gameCard.classList.add("col-auto");
    gameCard.classList.add("m-1");
    gameCard.innerHTML = `
        <div class="carta border border-dark" style="width: 18rem;">
        <div class="img img-fluid" style="height: 20rem; background-image: url(${background_image});"></div>
        <div class="cuerpo p-3">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title text-white">
             ${name}
            </h5>
            <h6 class="card-title font-weight-bold text-white vote p-2 border border-2 rounded-circle">${getRating(
              rating
            )}</h6>
          </div>
          <br />
          <h6 class="text-light genre">${getGenres(genres)}</h6>
          <h6 class="text-light studio">${released}</h6>
          <br />
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-dark btn-sm">More</button>
            <div class="flex">${getPlatforms(platforms)}
            </div>
          </div>
        </div>
      </div>
        `;
    main.appendChild(gameCard);
  });
}

function getGenres(genres) {
  var generos = "";
  genres.forEach((genere) => {
    //  console.log(genere.name);
    if (genere.name) {
      generos += genere.name + ", ";
    }
  });

  return generos.substring(0, generos.length - 2);
}

function getRating(rating) {
  return rating.toString().substring(0, 3);
}

function getPlatforms(consolas) {
  var plataforma = "";
  consolas.forEach((consola) => {
    // console.log(consola.platform.name);
    if (consola.platform.name == "PC") {
      plataforma += `<img src="img/pc.png" alt="" class="m-1 platform" height="20" />`;
    } else if (consola.platform.name == "Xbox One") {
      plataforma += `<img src="img/xbox.png" alt="" class="m-1 platform" height="20" />`;
    } else if (consola.platform.name == "PlayStation 5") {
      plataforma += `<img src="img/sony.png" alt="" class="m-1 platform" height="20" />`;
    } else if (consola.platform.name == "Nintendo Switch") {
      plataforma += `<img src="img/switch.png" alt="" class="m-1 platform" height="20" />`;
    }
  });
  return plataforma;
}

function getGeneros(GENRES) {
  fetch(GENRES)
    .then((res) => res.json())
    .then((data) => {
      if (data.results != 0) {
        // console.log(data.results);
        showGeneres(data.results);
      }
    });
}

function showGeneres(genre) {
  genres.innerHTML = "";
  genre.forEach((gen) => {
    const { id, name, games_count } = gen;
    const checkBox = document.createElement("div");
    checkBox.classList.add("col-12");
    checkBox.innerHTML = `
    <div class="form-check">
    <input class="form-check-input"  type="checkbox" value="" id="${id}" onclick="filterBy(this.id)">
    <label class="form-check-label" style="font-size: 0.8em" for="${id}">
      ${name}
    </label>
  </div>
    `;
    genres.appendChild(checkBox);
  });
}

function filterBy(id) {
  if (document.getElementById(id).checked) {
    getGames(BASE + "&genres=" + id);
  } else {
    getGames(URL_POPULAR);
  }
}

function filterByYear(id) {
  getGames(BASE + "&dates=" + id + ",2000-12-30");
}
