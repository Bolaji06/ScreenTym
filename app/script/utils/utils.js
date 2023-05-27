import { config } from "../../../config/config.js";

export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

const API_KEY = config.API_KEY;

export function getGenre(genreId, textEl){
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
          .then(response => response.json())
          .then(data =>{
              const getValues = Object.values(data);

              getValues.forEach(value =>{
                  for (let item of value){
                      if (item.id === genreId){
                           textEl.textContent = item.name || '';
                         // return item.name || '';
                      }
                  }
              });
          });         
}
//export default getGenres;

export function trucGenre(genreId, textEl){
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
          .then(response => response.json())
          .then(data =>{
              const getValues = Object.values(data);

              getValues.forEach(value =>{
                  for (let item of value){
                      if (item.id === genreId){
                        const maxLength = 12;

                        if (window.matchMedia("(max-width: 700px)").matches) {
                          if (textEl.innerText.length > maxLength) {
                            textEl.innerText = textEl.innerText.slice(0, maxLength - 3) + "...";
                        
                          textEl.textContent = item.name;
                          return item.name; 
                        }
                        }
                      }
                  }
              });
          });         
}

export function truncateText(text, maxLength, mediaQuery) {
    //const maxLength = 12;
  
    if (window.matchMedia(`(max-width: ${mediaQuery}px)`).matches) {
      if (text.innerText.length > maxLength) {
        text.innerText = text.innerText.slice(0, maxLength - 3) + "...";
      }
    }
  }

  export function redirectToDetailsPage(image, title, year, genre, overview, id, votesAvg, totalVotes){
    window.location.href = `movie.html?image=${encodeURIComponent(image)}
    &title=${encodeURIComponent(title)} &year=${encodeURIComponent(year)}
    &genre=${encodeURIComponent(genre)} &overview=${encodeURIComponent(overview)} &id=${encodeURIComponent(id)}
    &vote_average=${encodeURIComponent(votesAvg)} &total_votes=${encodeURIComponent(totalVotes)}`;
  
  }
  