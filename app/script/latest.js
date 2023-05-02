// https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
import { config } from "../../config/config.js";
import { imageBaseUrl } from "../script/utils/utils.js";
import { getGenre } from "../script/utils/utils.js";
import { trucGenre } from "../script/utils/utils.js";

const latestGrid = document.querySelector(".latest-movie-grid");
const latestItem = document.querySelector(".latest-item");

const API_KEY = config.API_KEY;
const LAT_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=15`;

// The recommended sliderComponent movie list
function sliderComponent() {
  latestItem.addEventListener("mousedown", (e) => {
    isDown = true;
    recommendSlider.classList.add("active");
    startX = e.pageX - latestItem.offsetLeft;
    scrollLeft = latestItem.scrollLeft;
  });

  latestItem.addEventListener("mouseleave", () => {
    isDown = false;
    latestItem.classList.remove("active");
  });

  latestItem.addEventListener("mouseup", () => {
    isDown = false;
    latestItem.classList.remove("active");
  });

  latestItem.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - latestItem.offsetLeft;
    const walk = (x - startX) * 4; // You can change the multiplied value to change slider speed
    latestItem.scrollLeft = scrollLeft - walk;
  });

  window.addEventListener("mousemove", (e) => {
    //console.log(e.pageX, e.pageY)
  });

  latestGrid.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
  latestGrid.addEventListener("drop", (e) => {
    e.preventDefault();
  });
}
sliderComponent();

async function getLatestMovies() {
  try {
    fetch(LAT_URL)
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        results.forEach((element) => {
          const values = Object.values(element);
          console.log(values);

          const year = values[9].split('-')[0];

          function latestUI() {
            const latestCol1 = document.createElement("a");
            latestCol1.setAttribute("class", "latest-col-1");

            const latestPosterImg = document.createElement("img");
            latestPosterImg.setAttribute("class", "latest-poster");
            latestPosterImg.src = `${imageBaseUrl}${values[8]}`;

            const latCol1Text = document.createElement("div");
            latCol1Text.setAttribute("class", "lat-col1-text");

            const latCol1TextRow = document.createElement("div");
            latCol1TextRow.setAttribute("class", "l-col1-text-row");

            const latestYear = document.createElement("p");
            latestYear.setAttribute("class", "latest-year");
            latestYear.textContent = year;

            const latestGenre = document.createElement("p");
            latestGenre.setAttribute("class", "latest-genre");
            getGenre(values[2][0], latestGenre);
            //truncateText(latestGenre);

            const latestMovieName = document.createElement("h3");
            latestMovieName.setAttribute("class", "latest-movie-name");
            latestMovieName.textContent = values[10];
            truncateText(latestMovieName);

            latestCol1.appendChild(latestPosterImg);
            latestCol1.appendChild(latCol1Text);

            latestGrid.appendChild(latestCol1);

            latCol1TextRow.appendChild(latestYear);
            latCol1TextRow.appendChild(latestGenre);
            latCol1Text.appendChild(latCol1TextRow);
            latCol1Text.appendChild(latestMovieName);
          }
          latestUI();
        });
      });
  } catch (error) {
    console.error(error);
  }
}
function truncateText(text) {
  const maxLength = 12;

  if (window.matchMedia("(max-width: 700px)").matches) {
    if (text.innerText.length > maxLength) {
      text.innerText = text.innerText.slice(0, maxLength - 3) + "...";
    }
  }
}

getLatestMovies();
