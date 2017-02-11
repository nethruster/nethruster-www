'use strict'

var homeTab = document.getElementById("home-tab");
var teamTab = document.getElementById("team-tab");
var statusTab = document.getElementById("status-tab");
var contactTab = document.getElementById("contact-tab");
var tabSlider = document.getElementById("tabs-slider");

function init(){
    handleRoute();
}

function setTab(tab, pos) {
    let activeTabElements = document.getElementsByClassName("active");
    let activeTitleElements = document.getElementsByClassName("title-active");
    let activeContentElements = document.getElementsByClassName("section-active");
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

    // Change current location
    history.pushState({}, "", tab);

    // Move slider to the correct position
    tabSlider.style.left = `${pos}%`;
}

function fetchBlogData() {
    // To fetch blog posts either via json api or rss
}

function handleRoute() {
    // To switch to a tab if there's a parameter in the url

    //  Isolate the parameter
    let param = /[^/]*$/.exec(location.pathname)[0];

    if (param === "home" || param == null) {
        setTab(homeTab.dataset.tab, homeTab.dataset.pos);
    } else if(param === "team") {
        setTab(teamTab.dataset.tab, teamTab.dataset.pos);
    } else if(param === "status") {
        setTab(statusTab.dataset.tab, statusTab.dataset.pos);
    } else if(param === "contact") {
        setTab(contactTab.dataset.tab, contactTab.dataset.pos);
    } else {
        // TODO Manage not found
    }
}

homeTab.addEventListener('click', function(){setTab(homeTab.dataset.tab, homeTab.dataset.pos);return false;});
teamTab.addEventListener('click', function(){setTab(teamTab.dataset.tab, teamTab.dataset.pos);return false;});
statusTab.addEventListener('click', function(){setTab(statusTab.dataset.tab, statusTab.dataset.pos);return false;});
contactTab.addEventListener('click', function(){setTab(contactTab.dataset.tab, contactTab.dataset.pos);return false;});
window.addEventListener('load', init);
