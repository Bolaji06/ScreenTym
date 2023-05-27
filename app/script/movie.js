import { config } from "../../config/config.js";
import { imageBaseUrl } from "../script/utils/utils.js";

const KEY = config.API_KEY

const menuEl = document.querySelector('.menu-bar');
const serachWrapper = document.querySelector('.search-wrapper');
const searchInput = document.querySelector('.movie-search-input');
const closeEl = document.querySelector('.close-btn');

const nextPageBtn = document.querySelector('.next-page');
const prevPageBtn = document.querySelector('.previous-page');

const sideNav = document.querySelector('.sidenav');
const main = document.querySelector('main');
const pageCounterEl = document.querySelector('.page-counter');
const movieList = document.querySelector('.sec');


const pageNoEl = document.querySelector('.page-no');
const noData = document.querySelector('.unavailable');
const alikeMovieContainer = document.querySelector('.alike-movie-row');
const movieDescImg = document.querySelector('.movie-desc-img');
const movieDesc = document.querySelector('.movie-desc');




function openNav(){
    sideNav.style.width = '300px';
    document.body.classList.add('overflow');
    sideNav.classList.add('overflow');
}

function closeNav(){
    sideNav.style.width = '0';
    main.style.marginLeft = '0';
    document.body.classList.remove('overflow');
}
// Close the sideNav when body is clicked
document.body.addEventListener('click', ()=>{
    if (sideNav.offsetWidth == 300){
        sideNav.style.width = '0';
        document.body.classList.remove('overflow');
    }
})

menuEl.addEventListener('click', openNav);
closeEl.addEventListener('click', closeNav);

//1094319

async function getData(){
    try{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${2}`)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const result = data.results;
                const tenItems = result.splice(1, 10);
                tenItems.forEach(item => {
                    const values = Object.values(item)
                    //console.log(values[10]);
                    const imageData = values[8];
                    const titleData = values[10];
                    movieAlikeUI(imageData, titleData);
                });
                console.log(result[7].overview)
                movieDesc.textContent = result[7].overview
                movieDescImg.src = `${imageBaseUrl}${result[1].poster_path}`

                });
    }
    catch(e){
        console.error(e)
    }
}
function movieAlikeUI(imageData, title){
    const alikeMovieCard = document.createElement('a');
    alikeMovieCard.setAttribute('class', 'alike-movie-card');
    alikeMovieCard.setAttribute('href', '#');

    const alikeMovieImageWrapper = document.createElement('div');
    alikeMovieImageWrapper.setAttribute('class', 'alike-movie-image');

    const alikeImage = document.createElement('img');
    alikeImage.setAttribute('class', 'alike-image');
    alikeImage.src = `${imageBaseUrl}${imageData}`

    const alikeMovieDetails = document.createElement('div');
    alikeMovieDetails.setAttribute('class', 'alike-movie-details');

    const alikeDetailsRow = document.createElement('div');
    alikeDetailsRow.setAttribute('class', 'alike-d-row');
    
    const alikeYear = document.createElement('p');
    alikeYear.setAttribute('class', 'alike-year');

    const alikeGenre = document.createElement('p');
    alikeGenre.setAttribute('class', 'alike-genre');

    const alikeMovieTitle = document.createElement('h3');
    alikeMovieTitle.setAttribute('class', 'alike-movie-title');
    alikeMovieTitle.textContent = title;


    alikeMovieContainer.appendChild(alikeMovieCard);

    alikeMovieCard.appendChild(alikeMovieImageWrapper);
    alikeMovieImageWrapper.appendChild(alikeImage);

    alikeMovieDetails.appendChild(alikeDetailsRow)
    alikeDetailsRow.appendChild(alikeYear)
    alikeDetailsRow.appendChild(alikeGenre);

    alikeMovieDetails.appendChild(alikeMovieTitle);
    alikeMovieCard.appendChild(alikeMovieDetails);



}
getData()
