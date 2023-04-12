
// API KEY --> b6d2f70b74eb483aeb5bb0ee43a82e53
// URL --> https://api.themoviedb.org/3/movie/550?api_key=b6d2f70b74eb483aeb5bb0ee43a82e53

const heroBackDrop = document.querySelector('.hero-bg');
const movieTitle = document.querySelector('.movie-title');
const movieDate = document.querySelector('.rec-details-year');
const movieGenre = document.querySelector('.rec-details-genre');
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
       
        const updateInitial = firstNine[0];
        const getValue = Object.values(updateInitial)
        console.log(getValue)

          heroBackDrop.src = `https://image.tmdb.org/t/p/w500/${getValue[1]}`;
          movieTitle.textContent = getValue[5];
          movieDate.textContent = getValue[9];
          movieGenre.textContent = getValue[2][1];

            firstNine.forEach((movie) => {
                
                const objList = Object.values(movie);
                //console.log(objList);
               
                    const imgEl = document.createElement('img');
                    imgEl.setAttribute('class', 'item')
                    imgEl.src = `https://image.tmdb.org/t/p/w200/${objList[1]}`
                    movieGridContainer.appendChild(imgEl)

                    imgEl.addEventListener('click', ()=>{
                        recMovieTitle.textContent = objList[5];
                        heroBackDrop.src = `https://image.tmdb.org/t/p/w500${objList[1]}`
                    
                    })
            });
    }
    catch(e){
        console.log(e)
    }
}
fetchData()

// fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
//     .then(response => response.json())
//     .then(data => data)