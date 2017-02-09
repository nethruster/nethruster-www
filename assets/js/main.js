'use strict'

function init(){
    if(window.location.hash) {
        let getTab = /[^#]+/g.exec(window.location.hash);
        setTab(getTab[0]);
    } else {
        setTab('home');
    }
    
}

function fetchBlogData(){
    // To fetch blog posts either via json api or rss
}

function setTab(tab) {
    window.location = `#${tab}`;
    var request = new XMLHttpRequest();
    request.open("GET", `./partials/${tab}.html`, true);
    request.onreadystatechange = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                 let activeElements = document.getElementsByClassName("active");
                 if(activeElements[0]){
                    activeElements[0].classList.toggle('active');
                 }

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
                setTab('not-found');
            }
        }
    };
    request.send();
}

window.addEventListener('load', init);
