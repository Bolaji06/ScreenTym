import { getGenre, imageBaseUrl, redirectToDetailsPage } from "./utils/utils.js";
import { config } from "../../config/config.js";

const API_KEY = config.API_KEY;

const popularMovieWrapper = document.querySelector(".popular-movie-row");

async function popularMovieList() {
  try {
    const response = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=4`);
    const data = await response.json();

    const firstSixteenItems = data.results.splice(1, 16);
    firstSixteenItems.forEach((element) => {
      //console.log(element)

      const getPopItem = Object.values(element);
      //console.log(getPopItem);
      const isAvail = parseInt(getPopItem[9].split("-")[0]) || ""; // Check if value is a valid type
      const movieYear = isAvail;
      const popGenre = getPopItem[2][0];
      const popMovieName = getPopItem[5];
      const isAdult = getPopItem[0];
      const posterImage = getPopItem[8];

      const movieOverview = getPopItem[6];
      const movieId = getPopItem[3];
      const votesAverage = getPopItem[12];
      const totalVotes = getPopItem[13];

      // This function create the each popular movie UI
      function createPopluarUICard() {
        const movieThumbnailWrapper = document.createElement("div");
        movieThumbnailWrapper.setAttribute("class", "movie-thumbnail-wrapper");

        const movieLink = document.createElement("a");
        movieLink.setAttribute("class", "movie-link");
        movieLink.setAttribute("href", "#");
        

        const popImg = document.createElement("img");
        popImg.setAttribute("class", "movie-thumbnail");
        popImg.setAttribute("loading", "lazy");
        popImg.src = `${imageBaseUrl}${posterImage}`;

        movieLink.appendChild(popImg);
        movieThumbnailWrapper.appendChild(movieLink);

        popularMovieWrapper.appendChild(movieThumbnailWrapper);

        const popularMovieDetails = document.createElement("div");
        popularMovieDetails.setAttribute("class", "popular-details");

        const yearGenreWrapper = document.createElement("div");
        yearGenreWrapper.setAttribute("class", "year-genre");

        const popYearText = document.createElement("p");
        popYearText.setAttribute("class", "pop-year");
        movieYear == ""
          ? (popYearText.textContent = "")
          : (popYearText.textContent = `${movieYear},`);

        const popGenreText = document.createElement("P");
        popGenreText.setAttribute("class", "pop-genre");
        getGenre(popGenre, popGenreText);

        movieLink.addEventListener('click', (e) =>{
          e.preventDefault();
          redirectToDetailsPage(posterImage, popMovieName, movieYear, popGenre, movieOverview, movieId, votesAverage, totalVotes);
        })

        const pgWrapper = document.createElement("div");
        pgWrapper.setAttribute("class", "pg-wrapper");

        const detailsCol1 = document.createElement("div");
        detailsCol1.setAttribute("class", "d-col-1");

        detailsCol1.appendChild(popYearText);
        detailsCol1.appendChild(popGenreText);

        yearGenreWrapper.appendChild(detailsCol1);

        if (isAdult) {
          pgWrapper.textContent = "PG";
          yearGenreWrapper.appendChild(pgWrapper);
        }

        const popMovieTitle = document.createElement("h3");
        popMovieTitle.setAttribute("class", "pop-movie-title");
        popMovieTitle.textContent = popMovieName;

        popularMovieDetails.appendChild(yearGenreWrapper);
        popularMovieDetails.appendChild(popMovieTitle);

        movieLink.appendChild(popularMovieDetails);
      }
      createPopluarUICard();
    });
  } catch (e) {
    console.error(e.error);
  }
}

// function redirectToDetailsPage(image, title, year, genre, overview, id, votesAvg, totalVotes){
//   window.location.href = `movie.html?image=${encodeURIComponent(image)}
//   &title=${encodeURIComponent(title)} &year=${encodeURIComponent(year)}
//   &genre=${encodeURIComponent(genre)} &overview=${encodeURIComponent(overview)} &id=${encodeURIComponent(id)}
//   &vote_average=${encodeURIComponent(votesAvg)} &total_votes=${encodeURIComponent(totalVotes)}`;

// }

popularMovieList();
