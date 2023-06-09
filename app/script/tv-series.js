
import { config } from "../../config/config.js";
import { imageBaseUrl, redirectToShowsDetails, getGenre, truncateText } from "./utils/utils.js";


const KEY = config.API_KEY;
const url = `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=en-US&page=1`;
const tvSeriesRow = document.querySelector('.tv-series-row');

async function getDataForShows(){
   fetch(url).then(response => response.json())
             .then(data => {
                
                const results = data.results;
                
                results.forEach(item => {
                    const itemValues = Object.values(item) 

                    console.log(itemValues);
                    
                     const showImg = itemValues[10];
                     const showTitle = itemValues[4];
                     const showYear = itemValues[1].split('-')[0];
                     const showCountry = itemValues[6];

                     const showGenre = itemValues[2][0];
                     let overview = itemValues[8];
                     if (overview === ""){
                        overview = `There's no overview for ${showTitle}`;
                     }
                     const totalVotes = itemValues[12];
                     const avgVotes = itemValues[11];
                     const id = itemValues[3];

                    // const objData = {
                    //     showImg: itemValues[10],
                    //     showTitle: itemValues[4],
                    //     showYear: itemValues[1].split('-')[0],
                    //     showCountry: itemValues[6],    
                    // }
                   
                    tvShowsUI(showImg, showTitle, showYear, showCountry, showGenre, overview, id, avgVotes, totalVotes);
                   
             });
               
             })
}


function tvShowsUI(showImg, showTitle, showYear, showCountry, genreId, overview, id, votesAvg, totalVotes){
    
    const tvCardLink = document.createElement('a');
    tvCardLink.setAttribute('class', 'tv-card');
    tvCardLink.addEventListener('click', (e) =>{
        e.preventDefault();
        redirectToShowsDetails(showImg, showTitle, showYear, genreId, showCountry, overview, id, votesAvg, totalVotes)
    })

    const showImgEl = document.createElement('img');
    showImgEl.setAttribute('class', 'img-tv');
    showImgEl.src = `${imageBaseUrl}${showImg}`;

    tvCardLink.appendChild(showImgEl);

    const tvDetails = document.createElement('div');
    tvDetails.setAttribute('class', 'tv-details');

    const tvRow = document.createElement('div');
    tvRow.setAttribute('class', 'tv-row');


    const tvGenre = document.createElement('p');
    tvGenre.setAttribute('class', 'tv-genre');
    getGenre(genreId, tvGenre)

    const tvYear = document.createElement('p');
    tvYear.setAttribute('class', 'tv-year');
    tvYear.textContent = showYear;

    const tvCountry = document.createElement('p')
    tvCountry.setAttribute('class', 'tv-lang');
    tvCountry.textContent = showCountry

    tvRow.appendChild(tvYear);
    tvRow.appendChild(tvGenre);
    tvRow.appendChild(tvCountry)
    

    tvDetails.appendChild(tvRow);

    const showTitleWrapper = document.createElement('div');
    showTitleWrapper.setAttribute('class', 'tv-title-wrapper');

    const showTitleEl = document.createElement('p');
    showTitleEl.setAttribute('class', 'tv-title');
    showTitleEl.textContent = showTitle;
    truncateText(showTitleEl, 12, 700);
    truncateText(showTitleEl, 20, 1200);

    showTitleWrapper.appendChild(showTitleEl);

    tvDetails.appendChild(showTitleWrapper);

    tvCardLink.appendChild(tvDetails);

   tvSeriesRow.appendChild(tvCardLink);
}

getDataForShows();
