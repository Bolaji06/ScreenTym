import { getGenre, imageBaseUrl } from "./utils/utils.js";
import { config } from "../../config/config.js";

const API_KEY = config.API_KEY;

const heroBackDrop = document.querySelector(".hero-bg");
const bgOverlay = document.querySelector('.bg-overlay');
const movieTitle = document.querySelector(".movie-title");
const movieDate = document.querySelector(".rec-details-year");
const movieGenreTxt = document.querySelector(".rec-details-genre");
const moviePopularity = document.querySelector(".popularity");
//const gridItems = document.querySelectorAll('.item');
const skeleton = document.querySelector('.bg-skeleton')

const movieGridContainer = document.querySelector(".rec-movie-grid");
const recMovieTitle = document.querySelector(".movie-title");

async function fetchData() {
  try {
    const response = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

    if (response.ok){
      skeleton.style.display = 'none';
      
    }
    else {
      throw new Error('Error fetching data')
    }
   
    const data = await response.json();
    const firstNine = data.results.slice(1, 10); // Get the first nine movie items from list

    // Update the UI With the first movie item
    
    const updateInitial = firstNine[0];
    const getValue = Object.values(updateInitial);

    const heroBackDropData = getValue[1];
    const movieTitleData = getValue[5];
    const movieYearData = getValue[9].split("-")[0];
    const movieGenreData = getValue[2][0];
    const moviePopularityData = getValue[7].toFixed();

    updateUIOnLoad(
      heroBackDropData,
      movieTitleData,
      movieYearData,
      movieGenreData,
      moviePopularityData
    );

    firstNine.forEach((movie) => {
      //Data retrieve for each element
      const objList = Object.values(movie); // Get all data object values : return array

      const heroImg = objList[1];
      const recMovieName = objList[5];
      const moviePopText = objList[7].toFixed();
      const movieGenreText = objList[2][0];
      const movieYear = objList[9].split("-")[0];

      updateUIOnClick(
        recMovieName,
        moviePopText,
        heroImg,
        movieGenreText,
        movieYear
      );
    });
  } catch (e) {
    console.error(e.error);
    heroBackDrop.style.display = 'none';
  }
}

// Load first movie to the UI when page loads
function updateUIOnLoad(
  imgValue,
  movieTitleValue,
  movieYearValue,
  movieGenreValue,
  moviePopularityValue
) {
  heroBackDrop.src = `${imageBaseUrl}${imgValue}`;
  movieTitle.textContent = movieTitleValue;
  movieDate.textContent = movieYearValue;
  movieGenreTxt.textContent = movieGenreValue;
  moviePopularity.textContent = moviePopularityValue;
  getGenre(movieGenreValue, movieGenreTxt);
}

// Update UI when item is clicked in the recommended slider
function updateUIOnClick(
  movieTitleValue,
  moviePopValue,
  imgValue,
  genre,
  movieYearValue
  ) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("class", "item");
  imgEl.src = `https://image.tmdb.org/t/p/w200/${imgValue}`;
  movieGridContainer.appendChild(imgEl);

  imgEl.addEventListener("click", () => {
    const movieGenre = genre;
    getGenre(movieGenre, movieGenreTxt);

    movieDate.textContent = movieYearValue;
    recMovieTitle.textContent = movieTitleValue;
    moviePopularity.textContent = moviePopValue;
    heroBackDrop.src = `${imageBaseUrl}${imgValue}`;
  });
}
fetchData();
