'use strict'

function init(){
    setTab('home');
}

function fetchBlogData(){
    // To fetch blog posts either via json api or rss
}

function setTab(tab, position) {
    let activeTabElements = document.getElementsByClassName("active");
    let activeTitleElements = document.getElementsByClassName("title-active");
    let activeContentElements = document.getElementsByClassName("section-active");
    let tabSlider = document.getElementById("tabs-slider");
    let contentElement = document.getElementById(`${tab}`);

    // Remove the active class from the current active element
    if(activeTabElements[0] && activeTitleElements[0] && activeContentElements[0]){
        activeTabElements[0].classList.toggle('active');
        activeTitleElements[0].classList.toggle('title-active');
        activeContentElements[0].classList.toggle('section-active');
    }
    // Add the active class to the selected element 
    document.getElementById(`${tab}-tab`).classList.toggle('active');
    document.getElementById(`${tab}-titles`).classList.toggle('title-active');
    document.getElementById(`${tab}`).classList.toggle('section-active');

    // Move slider to the correct position
    tabSlider.style.left = `${position}%`;

}

window.addEventListener('load', init);
