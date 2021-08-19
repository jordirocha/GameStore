var id = localStorage.getItem("game");

const API = "key=56535ae457a042b98b9e25a44bf265c6";
const BASE_URL = "https://api.rawg.io/api/games/" + id + "?";
const GAME = BASE_URL + API;
const GAME_IMG = "https://api.rawg.io/api/games/" + id + "/screenshots?" + API;
const GAME_ADDITIONS = "https://api.rawg.io/api/games/" + id + "/additions?" + API;
const GAME_SERIES = "https://api.rawg.io/api/games/" + id + "/game-series?" + API;

const main = document.getElementById("main");
const imgScreen = document.getElementById("imgScreen");

const screenGames = document.getElementById("screenshosts");
// const imgScreen = document.getElementById("imgScreen");

const aditions = document.getElementById("aditions");
const imgContent = document.getElementById("imgContent");

const market = document.getElementById("market");
const marketContent = document.getElementById("marketContent");

const releatedGames = document.getElementById("releatedGames");
const releatedtContent = document.getElementById("releatedtContent");



var owl = $('.owl-carousel');

id ? getGames(GAME) : "";
getScreenshots(GAME_IMG);
getReleated(GAME_SERIES);
getAddtions(GAME_ADDITIONS);

function getGames(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data != null) {
            // console.log(data);
            document.title += " " + data.name;
            console.log(data);
            // data.stores != [] ? showStores(data.stores) : market.classList.add("d-none");
            if (data.stores.length != 0) {
                console.log("hay datos");
                showStores(data.stores);
            } else {
                market.classList.add("d-none");
            }
            showGame(data);
        }
    })
}

function showStores(stores) {
    stores.forEach(store => {
        console.log(store.store);
        const market = document.createElement("a");
        market.href = store.store.domain;
        console.log(store.store.id);
        if (store.store.id == 2 ||
            store.store.id == 3 ||
            store.store.id == 1 ||
            store.store.id == 8 ||
            store.store.id == 4 ||
            store.store.id == 7) {
            market.innerHTML = `<img src="img/${store.store.slug}.png" alt="" height="120" />`;
            marketContent.appendChild(market);
        }

        // marketContent.innerHTML += `<a href=""> <img src="${store.store}.png" alt="" height="150" /></a>`
    });
}

function showGame(data) {
    main.innerHTML = "";
    const style = document.createElement('style');
    const gameInfo = document.createElement("div");
    const { name, genres, description_raw, platforms, released, background_image } = data;
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
                platformsGame += `<img src="img/${platformName}.png" alt="${platformName}" class="m-1" height="20" />`;
            }
        });
    }
    return platformsGame;
}

function getScreenshots(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data != null) {
            // console.log(data.results);
            showScreenshots(data.results)
        }
    })
}


function showScreenshots(screenshots) {
    imgScreen.innerHTML = ""
    // var content = $("#imgScreen");

    // console.log(screenshots.length + "length");
    if (screenshots.length != 0) {
        screenshots.forEach(screenshot => {
            const itemImg = document.createElement("div");
            itemImg.classList.add("item");
            itemImg.innerHTML = `<img src="${screenshot.image}" class="rounded gallery-item" alt=""/>`
            imgScreen.appendChild(itemImg);
        });
    } else {
        console.log("no hay datos");
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


function getAddtions(url) {
    fetch(url).then(res => res.json()).then(data => {
        if (data.count != 0) {
            console.log(data);
            showAdditions(data.results);
        } else {
            aditions.classList.add("d-none");
        }
    })
}

function showAdditions(additions) {
    // imgContent.innerHTML = "";
    // additions.forEach(addition => {
    //     var imagesContent = "";
    //     const additionContent = document.createElement("div");
    //     additionContent.classList.add("owl-carouselDlc");
    //     additionContent.classList.add("owl-theme");
    //     addition.short_screenshots.forEach(images => {
    //         imagesContent += `<div class="item"><img src="${images.image}" class="rounded" alt=""/></div>`
    //         console.log(imagesContent);

    //     });

    //     additionContent.innerHTML = imagesContent;
    //     console.log(additionContent);


    //     aditions.appendChild(additionContent);

    // });


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
            console.log(data);
            // showAdditions(data.results);
            showReleated(data.results);
        } else {
            releatedGames.classList.add("d-none");
        }
    })
}

function showReleated(releateds) {
    releateds.forEach(game => {
        const { id, name, genres, rating, platforms, released, background_image } = game;
        const card = document.createElement("div");
        card.classList.add("col-auto");
        card.classList.add("mb-4");
        card.innerHTML = `
        <div class="card overflow-hidden border border-dark" style="width: 19rem;">
                        <div class="bg-img"
                            style="background-image: url('${background_image ? background_image : "https://site.groupe-psa.com/content/uploads/sites/3/2016/12/white-background-2.jpg"}'); height: 24rem;">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${name}</h5>
                                <h6 class="vote p-2 bg-transparent <!--border border-success rounded-circle-->">${showScore(rating)}</h6>
                            </div>
                            <br/>
                            <h6 class="opacity-75 genres">${genres ? showGenres(genres) : "Unknow"}</h6>
                            <h6 class="opacity-50 date">${released ? released : "Unknow"}</h6>
                            <br/>
                            <div class="d-flex justify-content-between align-items-center">
                                <a id="${id}" type="button" class="btn btn-dark btn-sm" onclick="getInfoAbout(this.id)">More</a>
                                <div class="justify-content-between opacity-50">
                                   ${showPlatformsCard(platforms)}
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        releatedtContent.appendChild(card);
    });
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
                platformsGame += `<img src="img/${platformName}.png" alt="${platformName}" class="m-1" height="20" />`;
            }
        });
    }
    return platformsGame;
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