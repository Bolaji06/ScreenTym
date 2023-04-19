
const popularMovieImg = document.querySelector('.pop-movieImg');
const popularMovieYear = document.querySelector('.pop-year');
const popularMovieGenre = document.querySelector('.pop-genre');
const popularMovieTitle = document.querySelector('.pop-movie-title');

const popularMovieWrapper = document.querySelector('.popular-movie-item');


async function popularMovieList(){
    try{
        const response = await fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=4`);
        const data = await response.json();
        //console.log(data.results.splice(1, 12));
        const firstElevenItems = data.results.splice(1, 16);
        firstElevenItems.forEach(element => {
            //console.log(element)
            const getPopItem = Object.values(element);
            //console.log(getPopItem);

            const movieThumbnailWrapper = document.createElement('div');
            movieThumbnailWrapper.setAttribute('class', 'movie-thumbnail-wrapper');

            const movieLink = document.createElement('a');
            movieLink.setAttribute('class', 'movie-link');
            movieLink.setAttribute('href', '#');

            const popImg = document.createElement('img');
            popImg.setAttribute('class', 'movie-thumbnail');
            popImg.src = `https://image.tmdb.org/t/p/w500${getPopItem[8]}`

            movieLink.appendChild(popImg);
            movieThumbnailWrapper.appendChild(movieLink);

            popularMovieWrapper.appendChild(movieThumbnailWrapper);

        });

        
    }
    catch(e){}
}
popularMovieList()