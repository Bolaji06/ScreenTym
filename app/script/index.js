
const menuEl = document.querySelector('.menu-bar');
const logo = document.querySelector('.logo');
const closeEl = document.querySelector('.close-btn');
const recommendSlider = document.querySelector('.item-list');
const searchWrapper = document.querySelector('.search-wrapper');
const btnSearch = document.querySelector('.btn-search');
const inputSearchEl = document.querySelector('.input-search');

const sideNav = document.querySelector('.sidenav');
const main = document.querySelector('.main');

const recGrid = document.querySelector('.rec-movie-grid');

let isDown = false;
let startX, scrollLeft;

btnSearch.addEventListener('click', ()=>{
    searchWrapper.classList.toggle('active');
    
});

// inputSearchEl.addEventListener('change', (e)=>{
    
//    // encodeSearchValue(inputSearchEl.value);

// });
document.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
        inputSearchEl.addEventListener("change", ()=>{
            encodeSearchValue(inputSearchEl.value);
        });
    }
    
})

function encodeSearchValue(value){
    window.location.href = `search.html?value=${encodeURIComponent(value)}`
}
function openNav(){
    sideNav.style.width = '300px';
    document.body.classList.add('overflow');
    sideNav.classList.add('overflow');
}

function closeNav(){
    sideNav.style.width = '0';
    main.style.marginLeft = '0';
    document.body.classList.remove('overflow');
}
// Close the sideNav when body is clicked
document.body.addEventListener('click', ()=>{
    if (sideNav.offsetWidth == 300){
        sideNav.style.width = '0';
        document.body.classList.remove('overflow');
    }
})

menuEl.addEventListener('click', openNav);
closeEl.addEventListener('click', closeNav);



// The recommended sliderComponent movie list
function sliderComponent(){
    recommendSlider.addEventListener('mousedown', (e)=>{
        isDown = true;
        recommendSlider.classList.add('active');
        startX = e.pageX - recommendSlider.offsetLeft;
        scrollLeft = recommendSlider.scrollLeft;
    });

    recommendSlider.addEventListener('mouseleave', ()=>{
        isDown = false;
        recommendSlider.classList.remove('active');
    });

    recommendSlider.addEventListener('mouseup', ()=>{
        isDown = false;
        recommendSlider.classList.remove('active')
    });

    recommendSlider.addEventListener('mousemove', (e)=>{
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - recommendSlider.offsetLeft;
        const walk = (x - startX) * 4;  // You can change the multiplied value to change slider speed
        recommendSlider.scrollLeft = scrollLeft - walk;  
        
    });

    window.addEventListener('mousemove', (e)=>{
        //console.log(e.pageX, e.pageY)
    })

    recGrid.addEventListener('dragstart', (e)=>{
        e.preventDefault();
    })
    recGrid.addEventListener('drop', (e)=>{
        e.preventDefault();
    })
}
sliderComponent();