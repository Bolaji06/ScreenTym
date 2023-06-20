import { getGenre, imageBaseUrl, redirectToDetailsPage } from "./utils/utils.js";
import { config } from "../../config/config.js";

const API_KEY = config.API_KEY;

const heroBackDrop = document.querySelector(".hero-bg");
const bgOverlay = document.querySelector('.bg-overlay');
const movieTitle = document.querySelector(".movie-title");
const movieDate = document.querySelector(".rec-details-year");
const movieGenreTxt = document.querySelector(".rec-details-genre");
const moviePopularity = document.querySelector(".popularity");
const btnWatch = document.querySelector(".btn-rec");
const skeleton = document.querySelector('.bg-skeleton')

const movieGridContainer = document.querySelector(".rec-movie-grid");
const recMovieTitle = document.querySelector(".movie-title");
const fetchURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
let lastClickedItem = null

async function fetchData() {
  try {
    const response = await fetch(fetchURL);

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
      console.log(objList)

      const movieDetails = {
        movieImg: objList[1],
        title: objList[5],
        totalVotes: objList[7].toFixed(),
        genre: objList[2][0],
        year: objList[9].split("-")[0],
        id: objList[3],
        overview: objList[6],
        avgVotes: objList[12],
        posterImg: objList[8],
      }
      //console.log(movieDetails.heroImg)

      updateUIOnClick(movieDetails);
      
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
function updateUIOnClick(movieDetails) {

    const {movieImg, title, year, genre, totalVotes,
       id, overview, avgVotes, posterImg} = movieDetails

  const imgEl = document.createElement("img");
  imgEl.setAttribute("class", "item");
  imgEl.src = `https://image.tmdb.org/t/p/w200${movieImg}`;
  movieGridContainer.appendChild(imgEl);
  
  // imgEl.forEach(item=>{
  //   //item[1].classList.add("active");
  // })

  imgEl.addEventListener("click", (event) => {
  

   getGenre(genre, movieGenreTxt);

    movieDate.textContent = year;
    recMovieTitle.textContent = title;
    moviePopularity.textContent = totalVotes;
    heroBackDrop.src = `${imageBaseUrl}${movieImg}`;

    handleBorderClick(event);

    lastClickedItem = {
      year,
      totalVotes,
      posterImg,
      genre,
      title,
      id,
      overview,
      avgVotes,
    }

  });
  
}
btnWatch.addEventListener("click", ()=> {
  if (lastClickedItem){
    const {year, totalVotes, posterImg, genre, title,
    id, overview, avgVotes} = lastClickedItem;

  redirectToDetailsPage(posterImg, title, year,
     genre, overview, id, avgVotes, totalVotes);
  }
});



function handleBorderClick(event) {
    const imgItems = document.querySelectorAll(".item");
      imgItems.forEach(item =>{
        item.classList.remove("active");
    });
    event.target.classList.add("active")
}

fetchData();




