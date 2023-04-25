

const popularMovieImg = document.querySelector('.pop-movieImg');
const popularMovieYear = document.querySelector('.pop-year');
const popularMovieGenre = document.querySelector('.pop-genre');
const popularMovieTitle = document.querySelector('.pop-movie-title');

const popularMovieWrapper = document.querySelector('.popular-movie-row');


async function popularMovieList(){
    try{
        const response = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=4`);
        const data = await response.json();
        //console.log(data.results.splice(1, 12));
        const firstSixteenItems = data.results.splice(1, 16);
        firstSixteenItems.forEach(element => {
            //console.log(element)
            const getPopItem = Object.values(element);
            //console.log(getPopItem);

            const movieYear = getPopItem[9].split('-')[0];

            const popGenre = getPopItem[2][0];

            const popMovieName = getPopItem[5]

            const isAdult = getPopItem[0];

          
            const movieThumbnailWrapper = document.createElement('div');
            movieThumbnailWrapper.setAttribute('class', 'movie-thumbnail-wrapper');

            const movieLink = document.createElement('a');
            movieLink.setAttribute('class', 'movie-link');
            movieLink.setAttribute('href', '#');

            const popImg = document.createElement('img');
            popImg.setAttribute('class', 'movie-thumbnail');
            popImg.setAttribute('loading', 'lazy');
            popImg.src = `https://image.tmdb.org/t/p/w500${getPopItem[8]}`

            movieLink.appendChild(popImg);
            movieThumbnailWrapper.appendChild(movieLink);

            popularMovieWrapper.appendChild(movieThumbnailWrapper);

            const popularMovieDetails = document.createElement('div');
            popularMovieDetails.setAttribute('class', 'popular-details');

            const yearGenreWrapper = document.createElement('div');
            yearGenreWrapper.setAttribute('class', 'year-genre');

            const popYearText = document.createElement('p');
            popYearText.setAttribute('class', 'pop-year');
            popYearText.textContent = `${movieYear},`;

            const popGenreText = document.createElement('P');
            popGenreText.setAttribute('class', 'pop-genre');
            popularGenre(popGenre, popGenreText);

            const pgWrapper = document.createElement('div');
            pgWrapper.setAttribute('class', 'pg-wrapper');

            const detailsCol1 = document.createElement('div');
            detailsCol1.setAttribute('class', 'd-col-1');

            detailsCol1.appendChild(popYearText);
            detailsCol1.appendChild(popGenreText);

            yearGenreWrapper.appendChild(detailsCol1);

            if (isAdult){
                pgWrapper.textContent = 'PG'
                yearGenreWrapper.appendChild(pgWrapper);
            }
          

            const popMovieTitle = document.createElement('h3');
            popMovieTitle.setAttribute('class', 'pop-movie-title');
            popMovieTitle.textContent = popMovieName;

            popularMovieDetails.appendChild(yearGenreWrapper);
            popularMovieDetails.appendChild(popMovieTitle);

            movieLink.appendChild(popularMovieDetails);

        });

        
    }
    catch(e){}
}
popularMovieList()

function popularGenre(genreId, textEl){
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => response.json())
    .then(data =>{
        const getValues = Object.values(data);

        getValues.forEach(value =>{
            for (let item of value){
                if (item.id === genreId){
                    textEl.textContent = item.name;
                    return item.name;
                }
            }
        })
    });   
}