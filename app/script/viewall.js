
import { imageBaseUrl, getGenre, truncateText } from "./utils/utils.js";
import { config } from "../../config/config.js";


const KEY = config.API_KEY;



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
const noData = document.querySelector('.unavailable')

let pageCount = 2;

pageCounterEl.textContent = pageCount;
pageNoEl.textContent = `Page (${pageCount})`; 
let arr = [];

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

async function getData(){
    try {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${pageCount}`)
             .then((response) =>{
                if (!response.ok){
                    noData.style.display = 'block';
                   throw new Error('Network failed')
                }
                 noData.style.display = 'none';
                    pageNoEl.textContent = `Page (${pageCount})`;
                    pageCounterEl.textContent = pageCount;
                    //console.log(response.status)
                    return response.json()

             })
             .then(data => data.results.forEach(item => {
                //console.log(item)
                const dataValues = Object.values(item);
                
                const year = dataValues[9].split('-')[0];
                const movieTitle = dataValues[5];
                const genreData = dataValues[2][1];
                const posterImg = dataValues[8];

                const dataToObj = {
                    posterImg,
                    year,
                    movieTitle,
                };
                viewAllMoviesUI(dataToObj, genreData);
               
             }));
    } catch (error) {
        console.error(error);
    }
}
getData()

function viewAllMoviesUI(objUI, genre){
    const {posterImg, year, movieTitle} = objUI;

    const cardPoster = document.createElement('a');
    cardPoster.setAttribute('class', 'card-poster');
    cardPoster.setAttribute('href', '#')

    const img = document.createElement('img');
    img.setAttribute('class', 'poster-img');
    img.src = `${imageBaseUrl}${posterImg}`;
    cardPoster.appendChild(img);

    const movieDetailsWrapper = document.createElement('div');
    movieDetailsWrapper.setAttribute('class', 'list-wrapper')

    const moviesRow = document.createElement('div');
    moviesRow.setAttribute('class', 'movies-row');

    const yearTxt = document.createElement('p');
    yearTxt.textContent = year.concat(',');

    const genreTxt = document.createElement('p');
    genreTxt.setAttribute('class', 'all-genre')
    getGenre(genre, genreTxt);

    moviesRow.appendChild(yearTxt);
    moviesRow.appendChild(genreTxt);

    movieDetailsWrapper.appendChild(moviesRow);

    const movieTxt = document.createElement('p');
    movieTxt.setAttribute('class', 'movie-list-title');
    movieTxt.textContent = movieTitle
    truncateText(movieTxt, 14, 2000);

    movieDetailsWrapper.appendChild(movieTxt);
    cardPoster.appendChild(movieDetailsWrapper);

    movieList.appendChild(cardPoster)
}

nextPageBtn.addEventListener('click', ()=>{
    movieList.innerHTML = '';
    pageCount++;
    prevPageBtn.classList.remove('disabled')
    getData();
});

prevPageBtn.addEventListener('click', ()=>{
    if (pageCount >= 1){
        movieList.innerHTML = '';
        pageCount--;
        getData();
        prevPageBtn.classList.add('active');

        if (pageCount <= 1){
            prevPageBtn.classList.add('disabled');
        }
        if (pageCount > 1){
            prevPageBtn.classList.remove('disabled');
        }
        
    }
});
