import { config } from "../../config/config.js";
import { imageBaseUrl, getGenre, redirectToDetailsPage } from "../script/utils/utils.js";

const KEY = config.API_KEY

const menuEl = document.querySelector('.menu-bar');
const serachWrapper = document.querySelector('.search-wrapper');
const searchInput = document.querySelector('.movie-search-input');
const closeEl = document.querySelector('.close-btn');

const sideNav = document.querySelector('.sidenav');
const main = document.querySelector('main');

const alikeMovieContainer = document.querySelector('.alike-movie-row');
const movieDesc = document.querySelector('.movie-desc');
const hCol2 = document.querySelector(".h-col2");
const movieTitleEl = document.querySelector('.movie-s-title');
const yearMovieEl = document.querySelector('.year');
const genreMovieEl = document.querySelector('.genre');
const movieCol1 = document.querySelector(".movie-col1");
const movieCol2 = document.querySelector(".movie-col2");


const moviePosterEl = document.querySelector('.movie-desc-img');
const adultEl = document.querySelector('.adult');

const avgVoteEl = document.querySelector('.vote-avg');
const totalVotesEl = document.querySelector('.vote-count');
const videoPlayerContainer = document.querySelector('.video-container');



const param = new URLSearchParams(window.location.search);
const idValue = param.get('id');
//const movieTitle = param.get('title');
let player;


const youtube_key = config.YOUTUBE_KEY;
const videoName = param.get('title');
const youtubeURL = `https://www.googleapis.com/youtube/v3/search?key=${youtube_key}&part=snippet&q=${encodeURIComponent(videoName + " Trailer")}`;


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
});

menuEl.addEventListener('click', openNav);
closeEl.addEventListener('click', closeNav);

async function getData(){
    try{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQyZjcwYjc0ZWI0ODNhZWI1YmIwZWU0M2E4MmU1MyIsInN1YiI6IjYzNjUzMDQyZDcxMDdlMDA4ZDc3NDg4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p4_thRCJdklu1Z1-JgUnnM1gdzZgqFGwRZvGA1vE2ek'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${idValue}/similar?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data =>{
                const results = data.results;
                //console.log(results);
                if (results === undefined || results.length === 0){
                    hCol2.textContent = "There's no similar movie";
                    //movieCol1.style.backgroundColor = "#1c212e";
                    //movieCol2.style.backgroundColor = "#1c212e";
                }
                results.forEach(result => {
                    const resultsValue = Object.values(result);
                    //console.log(resultsValue)
                    const alikeTitle = resultsValue[5];
                    const alikePosterImg = resultsValue[8];
                    
                    const isAdult = resultsValue[0];
                    if (!isAdult) {
                        adultEl.textContent = 'PG';
                        adultEl.style.textDecoration = 'line-through'
                    }

                    const alikeGenre = resultsValue[2][1];
                    const alikeYear = resultsValue[9].split('-')[0].concat(',') || '';

                    const overview = resultsValue[6];
                    const id = resultsValue[3];
                    const votesAvg = resultsValue[12];
                    const totalVotes = resultsValue[13];

                    movieAlikeUI(alikeTitle, alikePosterImg, alikeYear, alikeGenre, overview, id, votesAvg, totalVotes);

                });
            });
            
    }
    catch(e){
        console.error(e)
    }
}
function movieAlikeUI(movieTitle, posterImg, year, genre, overview, id, votesAvg, totalVotes){
    //const {movieTitle, posterImg, year} = objEl;
    const alikeMovieCard = document.createElement('a');
    alikeMovieCard.setAttribute('class', 'alike-movie-card');
    alikeMovieCard.setAttribute('href', '#');

    alikeMovieCard.addEventListener('click', (e)=>{
        e.preventDefault();
        redirectToDetailsPage(posterImg, movieTitle, year, genre, overview, id, votesAvg, totalVotes);

    })

    const alikeMovieImageWrapper = document.createElement('div');
    alikeMovieImageWrapper.setAttribute('class', 'alike-movie-image');

    const alikeImage = document.createElement('img');
    alikeImage.setAttribute('class', 'alike-image');
    if (posterImg === null){
        alikeImage.src = '/images/Thriller.jpg'
        
    }
    else {alikeImage.src = `${imageBaseUrl}${posterImg}`;}
    

    const alikeMovieDetails = document.createElement('div');
    alikeMovieDetails.setAttribute('class', 'alike-movie-details');

    const alikeDetailsRow = document.createElement('div');
    alikeDetailsRow.setAttribute('class', 'alike-d-row');
    
    const alikeYear = document.createElement('p');
    alikeYear.setAttribute('class', 'alike-year');
    alikeYear.textContent = year;

    const alikeGenre = document.createElement('p');
    alikeGenre.setAttribute('class', 'alike-genre');
    getGenre(genre, alikeGenre);

    const alikeMovieTitle = document.createElement('h3');
    alikeMovieTitle.setAttribute('class', 'alike-movie-title');
    alikeMovieTitle.textContent = movieTitle;


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

function getMovieDetails(){
    const urlParam = new URLSearchParams(window.location.search);

    const movieImage = urlParam.get('image');
    const movieTitle = urlParam.get('title');
    const movieYear = urlParam.get('year');
    const movieGenre = Number(urlParam.get('genre'));
    const movieOverview = urlParam.get('overview');
    const votesAverage = urlParam.get('vote_average');
    const totalVotes = urlParam.get('total_votes');

    
    movieTitleEl.textContent = movieTitle;
    yearMovieEl.textContent = movieYear;
    //genreMovieEl.textContent = movieGenre;
    moviePosterEl.src = `${imageBaseUrl}${movieImage}`;
    movieDesc.textContent = movieOverview;
    avgVoteEl.textContent = votesAverage;
    totalVotesEl.textContent = totalVotes +' Votes';
    getGenre(movieGenre, genreMovieEl);

}
getMovieDetails();

function setVideoPlayerFrame(videoId){
    let videoUrl = `https://www.youtube.com/embed/${videoId}`;
    const videoFrame = document.createElement('iframe');
    videoFrame.setAttribute('class', 'video-frame');
    videoFrame.setAttribute('id', 'frame-id'); //videoUrl += "?autoplay=1&mute=1";
    videoFrame.setAttribute('src', videoUrl);

    videoFrame.width = '100%';
    videoFrame.height = '390';

    videoPlayerContainer.appendChild(videoFrame);
}
function getSelectedVideoFromAPI(){
    try{
        fetch(youtubeURL)
            .then(response => response.json())
            .then(data =>{
                 const items = data.items[0].id;
                 const videoId = items.videoId;
                 setVideoPlayerFrame(videoId);
                 
            });

    }
    catch(e){
        console.error(e);
    }
}
getSelectedVideoFromAPI();
