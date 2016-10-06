// ==UserScript==
// @name         fix edx
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://courses.edx.org/*
// @match        https://inginious-lti.info.ucl.ac.be/*
// @grant        none
// ==/UserScript==

if (window.top === window.self) {

    window.onmessage = function(e){
        if (e.data.startsWith("height: ")) {
            var height = e.data.substring("height: ".length);

            console.log("READ height: " + height);

            if (height > 0) {
                var iframe = document.getElementsByTagName('iframe')[0];

                console.log("scroll height: " + iframe.scrollHeight);

                var currentHeight = iframe.offsetHeight;

                var heightDiff = Math.abs(height-currentHeight);

                if ((heightDiff > 30 ) || (currentHeight == 800)){
                    iframe.style.height = height + "px";
                }
            }
        }
    };


} else {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        var height = document.body.offsetHeight;

        console.log("WRITE height: " + height);
        window.parent.postMessage("height: " + height , "https://courses.edx.org/");
    });

    observer.observe(document, {
        subtree: true,
        childList: true
    });
}