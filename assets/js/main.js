'use strict'

function init(){
    setTab('home');
}

function fetchBlogData(){
    // To fetch blog posts either via json api or rss
}

function setTab(tab) {
    var previousTab;
    var request = new XMLHttpRequest();
    request.open("GET", `${tab}.html`, true);
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                 
                 let activeElements = document.getElementsByClassName("active");
                 activeElements[0].classList.toggle('active');

                 document.getElementById("content-wrapper").innerHTML = request.responseText;
                 document.getElementById(`${tab}-tab`).classList.toggle('active');

                 // Embed twitter async
                 if(tab === 'home') {
                     twttr.widgets.createTimeline({
                        sourceType: "profile",
                        screenName: "nethruster"
                    },
                        document.getElementById("twitter-timeline"));
                 }
            } else {
                console.error(request.statusText);
            }
        }
    };
    request.send();
}