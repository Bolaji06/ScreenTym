//import { getGenre } from "./utils/genre"; 

// API KEY --> b6d2f70b74eb483aeb5bb0ee43a82e53
// URL --> https://api.themoviedb.org/3/movie/550?api_key=b6d2f70b74eb483aeb5bb0ee43a82e53

import { getGenre } from './utils/genre.js';

const heroBackDrop = document.querySelector('.hero-bg');
const movieTitle = document.querySelector('.movie-title');
const movieDate = document.querySelector('.rec-details-year');
const movieGenreTxt = document.querySelector('.rec-details-genre');
const moviePopularity = document.querySelector('.popularity');
const gridItems = document.querySelectorAll('.item');

const movieGridContainer = document.querySelector('.rec-movie-grid');
const recMovieTitle = document.querySelector('.movie-title')

const API_KEY = 'b6d2f70b74eb483aeb5bb0ee43a82e53'
async function fetchData(){
    try{
        const response = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        const firstNine = data.results.slice(1, 10); // Get the first nine movie items from list
        //console.log(firstNine)
       
        // Update the UI With the first movie item
        const updateInitial = firstNine[0];
        const getValue = Object.values(updateInitial)
        //console.log(getValue)

          heroBackDrop.src = `https://image.tmdb.org/t/p/w500/${getValue[1]}`;
          movieTitle.textContent = getValue[5];
          movieDate.textContent = getValue[9].split('-')[0];
          const initialGenre = getValue[2][0];
          
          getGenre(initialGenre, movieGenreTxt);
          moviePopularity.textContent = getValue[7].toFixed();
          

            firstNine.forEach((movie) => {
                
                const objList = Object.values(movie);
                //console.log(objList);

                const heroImg = objList[1];
                const recMovieName = objList[5];
                const moviePopText = objList[7].toFixed();
                const movieGenreText = objList[2][0];

                heroUI(recMovieName, moviePopText, heroImg, movieGenreText)
               
                  
            });
            
    }
    catch(e){
        console.log(e)
    }
}
fetchData()

function heroUI(movieTitleValue, moviePopValue, imgValue, genre){
    
    const imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'item')
    imgEl.src = `https://image.tmdb.org/t/p/w200/${imgValue}`
    movieGridContainer.appendChild(imgEl);

    imgEl.addEventListener('click', ()=>{
        const movieGenre = genre;
        //movieGenreTxt.textContent = getGenre(movieGenre)
        getGenre(movieGenre, movieGenreTxt)
        
        
        recMovieTitle.textContent = movieTitleValue;
        moviePopularity.textContent = moviePopValue;
        heroBackDrop.src = `https://image.tmdb.org/t/p/w500${imgValue}`
    
    })

    recMovieTitle.textContent = movieTitleValue;
    moviePopularity.textContent = moviePopValue;
    heroBackDrop.src = `https://image.tmdb.org/t/p/w500${imgValue}`

}



        

       

        
