import { imageBaseUrl, getGenre, redirectToDetailsPage } from "./utils/utils.js";

const menuEl = document.querySelector('.menu-bar');
const logo = document.querySelector('.logo');
const closeEl = document.querySelector('.close-btn');
const recommendSlider = document.querySelector('.item-list');
const searchWrapper = document.querySelector('.search-wrapper');
const btnSearch = document.querySelector('.btn-search');

const sideNav = document.querySelector('.sidenav');
const main = document.querySelector('.main');
const genreEl = document.querySelector('.genre');
const noResultsEl = document.querySelector('.no-search');

const searchListCard = document.querySelector('.flx-card');

const searchValueEl = document.querySelector('.search-value');

const urlParam = new URLSearchParams(window.location.search);

const searchValue = urlParam.get("value");
searchValueEl.textContent = searchValue

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

function generateSearchResult(){
    try{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmQyZjcwYjc0ZWI0ODNhZWI1YmIwZWU0M2E4MmU1MyIsInN1YiI6IjYzNjUzMDQyZDcxMDdlMDA4ZDc3NDg4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p4_thRCJdklu1Z1-JgUnnM1gdzZgqFGwRZvGA1vE2ek'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/search/multi?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                const results = response.results; 
                if (results === null){
                        noResultsEl.style.display = block;
                    }
                results.forEach(result =>{
                    //console.log(result)
                   
                    const objValues = Object.values(result);
                    const title = objValues[3];
                    const poster = objValues[7];
                    let type = objValues[8];
                    const year = objValues[11].split("-")[0] || "";
                    let votes = objValues[14];

                    load(poster, title, year)

                    
                        const postersEl = document.querySelectorAll('.item-poster');
                        postersEl.forEach(posterEl => {
                           //if (poster === null){posterEl.src = "/images/Thriller.jpg";} 
                           
                        })
                        
                    if (type === "tv"){
                        type = type.toUpperCase();
                        votes = objValues[13];
                    }
                    
                    searchListUI(poster, title, type, year, votes);
                })
                
            })
            .catch(err => console.error(err));


    }
    catch(e){
        console.error(e.error);
    }
}
generateSearchResult();

function searchListUI(poster, title, type, year, votes){
        searchListCard.innerHTML += `
        <div class="list-card-wrapper">
        <div class="list-card row-card">
            <img class="item-poster" src="${imageBaseUrl}${poster}" alt="Search Item Image" srcset="">
            <div class="item-details">
                <p class="item-name">${title}</p>
                <div class="item-sub-details row-card">
                    <p class="type">${type}</p>
                    <p class="year">${year}</p>
                </div>
                <div class="rating row-card">
                    <span class="star"><i class="fa-solid fa-star"></i></span>
                    <p class="votes-count">${votes} Votes</p>
                </div>
            </div>
        </div>
    </div>
        `
    function doSomething(){
        console.log("Click");
    }
}
function load(poster, title, year){
    document.addEventListener("DOMContentLoaded", ()=>{
        const itemDetails = document.querySelector('.list-card');
        itemDetails.addEventListener('click', ()=>{
            redirectToDetailsPage(poster, title, year);
        })
    })
}
document.addEventListener("DOMContentLoaded", ()=>{
    const list = document.querySelectorAll("type");
    console.log(list)
   
})
