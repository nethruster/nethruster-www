'use strict'

function init(){
    setTab('home');
}

function fetchBlogData(){
    // To fetch blog posts either via json api or rss
}

function setTab(tab, position) {
    let activeElements = document.getElementsByClassName("active");
    let tabSlider = document.getElementById("tabs-slider");
    if(activeElements[0]){
        activeElements[0].classList.toggle('active');
    }

    document.getElementById(`${tab}-tab`).classList.toggle('active');
    tabSlider.style.left = `${position}%`;

}

window.addEventListener('load', init);
