

async function getListOfCompany(){
    fetch(`https://api.themoviedb.org/3/company/{122}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data));
   
}
//getListOfCompany();