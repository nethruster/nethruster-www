'use strict'

const homeTitle = 'Welcome to Nethruster';
const teamTitle = 'This is us';
const statusTitle = 'Our workflow';
const contactTitle = 'Get in touch';

const teamDesc = 'Learn about Nethruster\'s core';
const statusDesc = 'Explore and keep track of our work';
const contactDesc = 'Have any questions? Wanna say hello? Send us something!';

function init(){
    setTab('home');
}

function fetchBlogData(){
    // To fetch blog posts either via json api or rss
}

function setTab(tab, position) {
    let activeElements = document.getElementsByClassName("active");
    let tabSlider = document.getElementById("tabs-slider");
    let scrt = document.getElementById("scrt");
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");

    // Remove the active class from the current active element
    if(activeElements[0]){
        activeElements[0].classList.toggle('active');
    }
    // Add the active class to the selected element 
    document.getElementById(`${tab}-tab`).classList.toggle('active');

    switch (tab) {
        case 'home':
            title.innerHTML = homeTitle;
            desc.innerHTML = '';
            desc.style.display = 'none';
            scrt.style.display = 'block';
            break;
        case 'team':
            title.innerHTML = teamTitle;
            desc.innerHTML = teamDesc;
            desc.style.display = 'block';
            scrt.style.display = 'none';
            break;
        case 'status':
            title.innerHTML = statusTitle;
            desc.innerHTML = statusDesc;
            desc.style.display = 'block';
            scrt.style.display = 'none';
            break;
        case 'contact':
            title.innerHTML = contactTitle;
            desc.innerHTML = contactDesc;
            desc.style.display = 'block';
            scrt.style.display = 'none';
            break;
        default: 
             title.innerHTML = homeTitle;
             break;
    }

    // Move slider to the correct position
    tabSlider.style.left = `${position}%`;

}

window.addEventListener('load', init);
