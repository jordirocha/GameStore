const API = "key=56535ae457a042b98b9e25a44bf265c6";
const BASE_URL = "https://api.rawg.io/api/games?";
const URL_GAMES = BASE_URL + API + "&page=1";
const GENRES = "https://api.rawg.io/api/genres?" + API;
const PLATFORMS = "https://api.rawg.io/api/platforms?" + API;
const BEST_GAMES = BASE_URL + API + "&ordering=-rating";
const WORST_GAMES = BASE_URL + API + "&ordering=rating";

const search = document.getElementById("searcher");
const main = document.getElementById("main");
const filterGeneres = document.getElementById("filterGeneres");
const filterPlatforms = document.getElementById("filterPlatforms");
const filters = document.getElementById("filters");

var selectedGenres = [];
var selectedPlatforms = [];

var checkGeneres = document.getElementsByName("genere");
var checkPlatform = document.getElementsByName("platform");

var nextPage = "";
var currentUrl = "";

onLoad();

function onLoad() {
    getGames(URL_GAMES);
    getGenres(GENRES);
    getPlatforms(PLATFORMS);
}

function getGames(url) {
    currentUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        if (data.results != 0) {
            nextPage = data.next;
            showGames(data.results);
        }
    })
}

function showGames(data) {
    data.forEach(game => {
        const { id, name, genres, rating, platforms, released, background_image } = game;
        const card = document.createElement("div");
        card.classList.add("col-auto");
        card.classList.add("mb-4");
        card.innerHTML = `
        <div id="${id}" class="card overflow-hidden border border-dark" style="width: 19rem;" onclick="getInfoAbout(this.id)">
                        <div class="bg-img"
                            style="background-image: url('${background_image ? background_image : "https://site.groupe-psa.com/content/uploads/sites/3/2016/12/white-background-2.jpg"}'); height: 24rem;">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${name}</h5>
                                <h6 class="vote p-2 bg-transparent <!--border border-success rounded-circle-->">${showScore(rating)}</h6>
                            </div>
                            <br class="d-none d-sm-block"/>
                            <h6 class="opacity-75 genres d-none d-sm-block">${genres ? showGenres(genres) : "Unknow"}</h6>
                            <h6 class="opacity-50 date d-none d-sm-block">${released ? released : "Unknow"}</h6>
                            <br class="d-none d-sm-block"/>
                            <div class="d-none d-sm-block">
                                <div class="d-flex justify-content-end align-items-center">
                                    ${showPlatformsCard(platforms)}
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        main.appendChild(card);
    });
}

function showScore(score) {
    return (score + 0.0).toString().substring(0, 3);
}

function showGenres(genres) {
    var genresGame = "";
    genres.forEach(genre => {
        genresGame += genre.name + ", ";
    });

    return genresGame.substring(0, genresGame.length - 2);

}

function showPlatformsCard(platforms) {
    var platformsGame = "";
    if (platforms) {
        platforms.forEach(platform => {
            var platformName = "";
            if (platform.platform.name == "PC") {
                platformName = "pc";
            } else if (platform.platform.name == "Xbox One") {
                platformName = "xbox";
            } else if (platform.platform.name == "PlayStation 4") {
                platformName = "sony";
            } else if (platform.platform.name == "Nintendo Switch") {
                platformName = "switch";
            }
            if (platformName) {
                platformsGame += `<img src="img/${platformName}.png" alt="${platformName}" class="platformsCard m-1 opacity-50" height="20" />`;
            }
        });
    }
    return platformsGame;
}

search.addEventListener("keyup", (e) => {
    clearMain();
    uncheckFilters();
    e.preventDefault();
    const searchGame = search.value;
    if (searchGame) {
        getGames(BASE_URL + API + "&search=" + searchGame.replace(" ", "+") + "&page=1");
    } else {
        getGames(URL_GAMES);
    }
});

function isTyping() {
    return search.value != "";
}

function getGenres(genres) {
    fetch(genres)
        .then(res => res.json())
        .then(data => {
            if (data.results != 0) {
                showGeneres(data.results);
            }
        });
}

function showGeneres(genre) {
    filterGeneres.innerHTML = "";
    genre.forEach(gen => {
        const { id, name, games_count } = gen;
        const checkBox = document.createElement("div");
        checkBox.classList.add("col-12");
        checkBox.innerHTML = `
      <div  class="d-flex justify-content-between align-items-center">
        <div class="form-check">
           <input class="form-check-input"  type="checkbox" id="${id}" name="genere" value="${id}" onclick="filterBy()">
           <label class="form-check-label" style="font-size: 0.8em" for="${id}">
               ${name}
           </label>
        </div>
        <h6 class="opacity-50 date"> ${games_count}</h6>
        </div>
      `;
        filterGeneres.appendChild(checkBox);
    });
};

function getPlatforms(platforms) {
    fetch(platforms).then(res => res.json()).then(data => {
        if (data.results != 0) {
            showPlatforms(data.results);
        }
    });
}

function showPlatforms(platforms) {
    filterPlatforms.innerHTML = "";
    platforms.forEach(platform => {
        const { id, slug, name, games_count } = platform;
        if (id == 1 || id == 18 || id == 4 || id == 7) {
            const checkPlatform = document.createElement("div");
            checkPlatform.innerHTML = `
    <div  class="d-flex justify-content-between align-items-center">
        <div class="form-check">
           <input class="form-check-input" name="platform" type="checkbox" value="${id}" id="${id}" onclick="filterBy()">
           <img src="img/${slug}.png" alt="${slug}" class="m-1" height="15" />
           <label class="form-check-label" style="font-size: 0.8em" for="${id}">
               ${name}
           </label>
        </div>
        <h6 class="opacity-50 date"> ${games_count}</h6>
        </div>`;
            filterPlatforms.appendChild(checkPlatform);
        }
    });
}

window.onscroll = function () {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;
    if (offset >= height) {
        getGames(nextPage);
    }
};


function highScore() {
    clearMain();
    getGames(BEST_GAMES);
}

function lowScore() {
    clearMain();
    getGames(WORST_GAMES);
}

function relevance() {
    clearMain();
    getGames(URL_GAMES);
}

function filterBy() {
    selectedGenres = [];
    selectedPlatforms = [];
    var genres = "";
    var platforms = "";
    var inputSearch = search.value || "";
    for (var i = 0, n = checkGeneres.length; i < n; i++) {
        if (checkGeneres[i].checked) {
            selectedGenres.push(checkGeneres[i].value);
        }
    }
    for (var i = 0, n = checkPlatform.length; i < n; i++) {
        if (checkPlatform[i].checked) {
            selectedPlatforms.push(checkPlatform[i].value);
        }
    }
    selectedGenres.length != 0 ? genres = "&genres=" + selectedGenres.toString() : "";
    selectedPlatforms.length != 0 ? platforms = "&platforms=" + selectedPlatforms.toString() : "";
    inputSearch ? inputSearch = "&search=" + inputSearch.replace(" ", "+") : "";
    clearMain();
    getGames(URL_GAMES + genres + platforms + inputSearch);
}

function getInfoAbout(id) {
    localStorage.setItem("game", id);
    window.location.href = "/game";

}

function clearMain() {
    main.innerHTML = "";
}

function uncheckFilters() {
    for (var i = 0, n = checkGeneres.length; i < n; i++) {
        if (checkGeneres[i].checked) {
            checkGeneres[i].checked = false;
        }
    }
    for (var i = 0, n = checkPlatform.length; i < n; i++) {
        if (checkPlatform[i].checked) {
            checkPlatform[i].checked = false;
        }
    }
}

window.onload = function () {
    $('#preloader').fadeOut('slow');
    $('#preloader').addClass('visually-hidden');
    $('body').removeClass('hidden');
}
