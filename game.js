GAME_SERIES =
  "https://api.rawg.io/api/games/28632/game-series?key=cf8090f7e7f94201ae3b0eacebd081f3";
GAME_ADDITIONS =
  "https://api.rawg.io/api/games/28632/additions?key=cf8090f7e7f94201ae3b0eacebd081f3";

const main = document.getElementById("main");
const genres = document.getElementById("genres");
const content = document.getElementById("content");

getGames(GAME_SERIES);
// getAditions(GAME_ADDITIONS);

function getGames(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results != 0) {
        console.log(data.results);
        console.log(data.count);
        showGames(data.results);
      }
    });
}

function showGames(data) {
  // main.innerHTML = "";
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

function getAditions(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results != 0) {
        // console.log(data.results);
        showContent(data.results);
      }
    });
}

function showContent(data) {
    content.innerHTML = ""
    data.forEach((dlc) => {
    const { short_screenshots } = dlc;
    // for (const img in short_screenshots) {
    //     console.log(img);
    // }
    for (let index = 0; index < short_screenshots.length; index++) {
        console.log(short_screenshots[index].image);
//         const imgGallery = document.createElement("div");
//     imgGallery.classList.add("item");
//     imgGallery.innerHTML = `
//     <img
//     src="${short_screenshots[index].image}"
//     class="galleryItem rounded"
//     alt=""
//   />
    
//     `;
content.innerHTML = 
`
<div class="item">
          <img
            src="${short_screenshots[index].image}"
            class="galleryItem"
            alt=""
          />
        </div>
`;
    
    // content.appendChild(imgGallery);
    }
    
    
  });
}
