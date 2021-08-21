var id = localStorage.getItem("game");
const API = "key=56535ae457a042b98b9e25a44bf265c6";
const BASE_URL = "https://api.rawg.io/api/games/" + id + "?";
const GAME = BASE_URL + API;
const GAME_IMG = "https://api.rawg.io/api/games/" + id + "/screenshots?" + API;
const GAME_ADDITIONS = "https://api.rawg.io/api/games/" + id + "/additions?" + API;
const GAME_SERIES = "https://api.rawg.io/api/games/" + id + "/game-series?" + API;
const GAME_STORES = "https://api.rawg.io/api/games/" + id + "/stores?" + API;
const main = document.getElementById("main");
const screenGames = document.getElementById("screenshosts");
const imgScreen = document.getElementById("imgScreen");
const imgContent = document.getElementById("imgContent");
const market = document.getElementById("market");
const marketContent = document.getElementById("marketContent");
const releatedGames = document.getElementById("releatedGames");
const releatedtContent = document.getElementById("releatedtContent");

var owl = $('.owl-carousel');

id ? getGames(GAME) : "";
getScreenshots(GAME_IMG);
getReleated(GAME_SERIES);
getStores(GAME_STORES);

function getGames(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data != null) {
            document.title += " " + data.name;
            showGame(data);
        }
    })
}

function getStores(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data.count != 0) {
            showStores(data.results);
        } else {
            market.classList.add("d-none");
        }
    })
}

function showStores(stores) {
    stores.forEach(store => {
        const market = document.createElement("a");
        market.href = store.url;
        market.target = "_blank"
        if (store.store_id == 2 || store.store_id == 3 || store.store_id == 6 || store.store_id == 1 || store.store_id == 8 || store.store_id == 4 || store.store_id == 7) {
            market.innerHTML = `<img src="img/${store.store_id}.png" alt="" class="store" height="120" />`;
            marketContent.appendChild(market);
        }
    });
}

function showGame(data) {
    main.innerHTML = "";
    const style = document.createElement('style');
    const gameInfo = document.createElement("div");
    const {
        name,
        genres,
        description_raw,
        platforms,
        released,
        background_image
    } = data;
    style.innerHTML = `#main{
        background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0) 10%,
                rgba(3, 4, 13, 255)
            ),
            url('${background_image}');
        }`;
    document.head.appendChild(style);
    gameInfo.classList.add("m-5");
    gameInfo.innerHTML = `
        <h1 class="title text-capitalize">
        ${name}
        </h1>
        <br class="d-none d-sm-block" />
        <p class="description lh-sm col-7 d-none d-sm-block">
        ${description_raw}
        </p>
        <br class="d-none d-sm-block" />
        <p class="description"><strong>Genres:</strong> ${genres ? showGenres(genres) : "Unknow"}</p>
        <p class="description"><strong>Release date:</strong> ${released ? released : "Unknow"}</p>
        <p class="description">
        <strong>Platforms:</strong> ${showPlatformsCard(platforms)}
        </p>`
    main.appendChild(gameInfo);
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
            if (platform.platform.id == 7 || platform.platform.id == 1 || platform.platform.id == 4 || platform.platform.id == 18) {
                platformsGame += `<img src="img/${platform.platform.slug}.png" alt="${platform.platform.slug}" class="platformsCard m-1 opacity-50" height="20" />`;
            }
        });
    }
    return platformsGame;
}

function getScreenshots(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data != null) {
            showScreenshots(data.results)
        }
    })
}

function showScreenshots(screenshots) {
    imgScreen.innerHTML = ""
    if (screenshots.length != 0) {
        screenshots.forEach(screenshot => {
            const itemImg = document.createElement("div");
            itemImg.classList.add("item");
            itemImg.innerHTML = `<img src="${screenshot.image}" class="rounded gallery-item" alt=""/>`
            imgScreen.appendChild(itemImg);
        });
    } else {
        screenGames.classList.add("d-none");
    }
    owl.owlCarousel({
        stagePadding: 50,
        loop: true,
        dots: false,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
}
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY > 0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});

function getReleated(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data.count != 0) {
            showReleated(data.results);
        } else {
            releatedGames.classList.add("d-none");
        }
    })
}

function showReleated(releateds) {
    releateds.forEach(game => {
        const {
            id,
            name,
            genres,
            rating,
            platforms,
            released,
            background_image
        } = game;
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
        releatedtContent.appendChild(card);
    });
}

function getInfoAbout(id) {
    localStorage.setItem("game", id);
    window.location = "/game";
}

function showScore(score) {
    return (score + 0.0).toString().substring(0, 3);
}
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-item")) {
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;
        var myModal = new bootstrap.Modal(document.getElementById('gallery-game'));
        myModal.show();
    }
})
window.onload = function () {
    $('#preloader').fadeOut('slow');
    $('#preloader').addClass('visually-hidden');
    $('body').removeClass('hidden');
}