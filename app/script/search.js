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
const noResultsEl = document.querySelector('.no-result-container');

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

function doSomething(){
    console.log("Click")
}

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
                
                if (results.length === 0){
                        noResultsEl.classList.add("active");
                        document.body.style.overflow = "hidden"
                    }
                results.forEach(result =>{
                    
                   
                    const objValues = Object.values(result);
                    const title = objValues[3];
                    const poster = objValues[7];
                    let type = objValues[8];
                    const year = objValues[11].split("-")[0] || "";
                    let votes = objValues[14];
                    const overview = objValues[6];
                    let id = objValues[2];
                    const genre = objValues[9][0];
                    const votesAvg = objValues[13];
                   

                    if (type === "tv"){
                        type = type.toUpperCase();
                        votes = objValues[13];
                        
                    }
                    
                   searchListUI(poster, title, type,  year, votes, id, overview, genre, votesAvg, votes);
                        
                });
                
            })
            .catch(err => console.error(err));
    }
    catch(e){
        console.error(e.error);
    }
}
generateSearchResult();



//document.addEventListener("DOMContentLoaded", searchListUI)
function searchListUI(poster, title, type, year, votes, id, overview, genre, votesAvg, totalVotes){
    //document.addEventListener("DOMContentLoaded", ()=>{
        const listCardWrapper = document.createElement("div");
        listCardWrapper.setAttribute("class", "list-card-wrapper");

        const listCard = document.createElement("div");
        listCard.setAttribute("class", "list-card");
        listCard.setAttribute("class", "row-card");


        let posterImg = document.createElement("img");
        posterImg.setAttribute("class", "item-poster");
        posterImg.src = `${imageBaseUrl}${poster}`

        if (poster === null){
             poster = "/images/Thriller.jpg";
            posterImg.src = poster;
        }
        
        listCard.addEventListener("click", ()=>{
            redirectToDetailsPage(poster, title, year, genre, overview, id,  votesAvg, totalVotes);
            //encodeTypeURL(type);
        })

        const itemDetails = document.createElement("div");
        itemDetails.setAttribute("class", "item-details");

        const itemName = document.createElement("p");
        itemName.setAttribute("class", "item-name");
        itemName.textContent = title;

        const itemSubDetails = document.createElement("div");
        itemSubDetails.setAttribute("class", "item-sub-details");
        itemSubDetails.setAttribute("class", "row-card");

        const typeEl = document.createElement("p");
        typeEl.setAttribute("class", "type");
        typeEl.textContent = type;

        if (typeEl.textContent === "movie"){
            typeEl.style.backgroundColor = "#79fc79ba";
        }
        

        const yearEl = document.createElement("p");
        yearEl.setAttribute("class", "year");
        yearEl.textContent = year;

        const ratingContainer = document.createElement("div");
        ratingContainer.setAttribute("class", "rating");
        ratingContainer.setAttribute("class", "row-card");

        const spanStar = document.createElement("span");
        spanStar.setAttribute("class", "star");
        const awesomeStar = document.createElement("i");
        awesomeStar.setAttribute("class", "fa-solid fa-star");
        //awesomeStar.setAttribute("class", "fa-star");

        const votesCount = document.createElement("p");
        votesCount.setAttribute("class", "votes-count");
        votesCount.textContent = votes + " Votes"

        if (votes <= 1){
            votesCount.textContent = votes + ' Vote';
        }

        spanStar.appendChild(awesomeStar);
        ratingContainer.appendChild(spanStar);
        ratingContainer.appendChild(votesCount);

        itemSubDetails.appendChild(typeEl);
        itemSubDetails.appendChild(yearEl);

        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemSubDetails);
        itemDetails.appendChild(ratingContainer);

        listCard.appendChild(posterImg);
        listCard.appendChild(itemDetails);

        listCardWrapper.appendChild(listCard);

        searchListCard.appendChild(listCardWrapper);
     
}
function encodeTypeURL(type){
    if (type = "tv"){
        window.location.href += `movie.html?type=${encodeURIComponent(type)}`
    }
   
}
 

