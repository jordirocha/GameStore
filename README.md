<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://game-app-store.herokuapp.com/">
    <img src="https://github.com/jordirocha/GameApp/blob/main/src/public/img/favIcon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">GameApp</h3>

  <p align="center">
    Browse your favorite movies, actors and watch trailers. See what's playing in theaters right now. Discover upcoming, trending, and top-rated titles.
    <br />
    <br />
    <a href="https://game-app-store.herokuapp.com/" target="_blank">View Demo</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Features](#features)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#project-directories)
* [License](#before-to-start)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

# About The Project
<div align="center">
<img src="https://github.com/jordirocha/GameApp/blob/main/src/public/img/demo.gif" />
</div>

Like developer and gamer, I was thinking in develop a web application to get more information about games, so this is it.
Applying all my knowlegde about programming this personal project has been released, With my project you'll know more about your favorite game.</br>
Live demo [here](https://game-app-store.herokuapp.com/).

### Features
- listing games from movie api
- searching games by title
- on searching games will be displayed
- filters by genre and platform
- can get more about on click game 
- carrousel of images

### Built with
* [RAWG Video Games (API)](https://rawg.io/apidocs)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* HTML
* CSS
* JavaScript

## Project Directories
    ├── package.json
    ├── package-lock.json
    └── src
        ├── index.js
        ├── public
        │   ├── css
        │   │   ├── game.css
        │   │   ├── index.css
        │   │   └── main.css
        │   ├── img
        │   │   ├── 1.png
        │   │   ├── 2.png
        │   │   ├── 3.png
        │   │   ├── 4.png
        │   │   ├── 6.png
        │   │   ├── 7.png
        │   │   ├── 8.png
        │   │   ├── favIcon.png
        │   │   ├── nintendo-switch.png
        │   │   ├── pc.png
        │   │   ├── playstation4.png
        │   │   └── xbox-one.png
        │   └── js
        │       ├── game.js
        │       └── index.js
        ├── routes
        │   └── index.js
        └── views
            ├── game.ejs
            ├── index.ejs
            └── partials
                ├── footer.html
                ├── head.html
                ├── navigation.html
                └── preloader.html
## Before to start
Must install Node.js in your sistem:</br>

On Windows, <a href="https://nodejs.org/es/download/">here./a></br></br>
On macOS, with `brew`</br>
    
    brew install node
    
On Linux, installing by package
    
    $ apt install npm

## To run app
    git clone https://github.com/jordirocha/GameApp.git
    cd MyMovieList/
    npm i express ejs
    npm start
After compiling open your web browser and paste: `http://localhost:3000`.
