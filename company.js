
const marqueeTrack = document.querySelector('.track');
const cp = document.querySelector('.cp');

const companyId = [1,2,3,4,5,6,7,8,9,11,12,14,15,16,17,18,19,20,21,23,25,29,31,33,34,35,37,38,39]

async function getListOfCompany(){
    companyId.forEach(element => {
       // console.log(element)
    
    fetch(`https://api.themoviedb.org/3/company/${element}/images?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const {id, logos} = data;
        //console.log(`${element} => ${logos[0].file_path}`)
        const imgToSVG = logos[0].file_path.split('.')[0].concat('.svg');
       //cp.src = 
       const companyImgEl = document.createElement('img');
       companyImgEl.setAttribute('class', 'cp');
       companyImgEl.src = `https://image.tmdb.org/t/p/w500${imgToSVG}`;

       marqueeTrack.appendChild(companyImgEl);
    });
});
    
   
}
getListOfCompany();