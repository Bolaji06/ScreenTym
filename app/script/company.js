/**This file handles list of company showing in marqueeu
 *
 * Author: Bolaji Bolajoko
 */
import { imageBaseUrl } from "./utils/utils.js";
import { config } from "../../config/config.js";

const API_KEY = config.API_KEY;

const marqueeTrack = document.querySelector(".track");
const cp = document.querySelector(".cp");

// List of all CompanyID curated @author
const companyId = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 29,
  31, 33, 34, 35, 37, 38, 39,
];

// This function get all the list of movie company
async function getListOfCompany() {
  try {
    companyId.forEach((element) => {
      fetch(
        `https://api.themoviedb.org/3/company/${element}/images?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const { logos } = data;
          const imgToPNG = logos[0].file_path;
          const imgUrlData = `${imageBaseUrl}${imgToPNG}`;

          createCompanyImg(imgUrlData);
        });
    });
  } catch (e) {
    console.error(e.error);
  }
}
getListOfCompany();

//Create the image element on the UI
function createCompanyImg(imgUrl) {
  const companyImgEl = document.createElement("img");
  companyImgEl.setAttribute("class", "cp");
  companyImgEl.src = imgUrl;

  marqueeTrack.appendChild(companyImgEl);
}
