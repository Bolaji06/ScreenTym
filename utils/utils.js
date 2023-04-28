
export const API_KEY = 'b6d2f70b74eb483aeb5bb0ee43a82e53';
export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

export function getGenre(genreId, textEl){
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
//export default getGenres;
