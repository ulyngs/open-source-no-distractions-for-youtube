// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // recommended videos, home page //
        // on desktop
        recVids = document.querySelector('ytd-browse[page-subtype="home"]');
        recVidsMobile = document.querySelector('div[tab-identifier="FEwhat_to_watch"]');
        
        // check for visibility
        if(request.method == "checkRecHome"){
            if (recVidsMobile == null){
                if (recVids.style.visibility === "hidden") {
                    sendResponse({text: "hidden", method: "checkRecHome"});
                } else if (recVids.style.visibility === "visible") {
                    sendResponse({text: "visible", method: "checkRecHome"});
                } else {
                    sendResponse({text: "hidden", method: "checkRecHome"});
                }
            } else {
                if (recVidsMobile.style.visibility === "hidden") {
                    sendResponse({text: "hidden", method: "checkRecHome"});
                } else if (recVidsMobile.style.visibility === "visible") {
                    sendResponse({text: "visible", method: "checkRecHome"});
                } else {
                    sendResponse({text: "hidden", method: "checkRecHome"});
                }
            }
        }
        
        // change visibility
        if(request.method == "changeRecVids"){
            if (recVidsMobile == null){
                if (recVids.style.visibility === "hidden") {
                    recVids.style.visibility = "visible";
                    sendResponse({text: "rec vids visible", method: "changeRecVids"});
                } else if (recVids.style.visibility === "visible") {
                    recVids.style.visibility = "hidden";
                    sendResponse({text: "rec vids hidden", method: "changeRecVids"});
                } else {
                    recVids.style.visibility = "visible";
                    sendResponse({text: "rec vids visible", method: "changeRecVids"});
                }
            } else {
                if (recVidsMobile.style.visibility === "hidden") {
                    recVidsMobile.style.visibility = "visible";
                    sendResponse({text: "rec vids visible", method: "changeRecVidsMobile"});
                } else if (recVidsMobile.style.visibility === "visible") {
                    recVidsMobile.style.visibility = "hidden";
                    sendResponse({text: "rec vids hidden", method: "changeRecVidsMobile"});
                } else {
                    recVidsMobile.style.visibility = "visible";
                    sendResponse({text: "rec vids visible", method: "changeRecVidsMobile"});
                }
            }
        }
        
        // Short, home page //
        shortsLarge = document.querySelector('#items ytd-guide-entry-renderer:nth-child(3)'); // on desktop, large
        shortsSmall = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]'); // on desktop, small
        shortsMobile = document.querySelector('ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2)'); // on mobile
        
        // check for visibility
        if(request.method == "checkShorts"){
            // mobile case
            if (shortsSmall == null && shortsLarge == null){
                if (shortsMobile.style.display === "none") {
                    sendResponse({text: "hidden", method: "checkShorts"});
                } else if (shortsMobile.style.display === "flex") {
                    sendResponse({text: "visible", method: "checkShorts"});
                } else {
                    sendResponse({text: "hidden", method: "checkShorts"});
                }
            } else if (shortsSmall == null){ // large desktop case
                if (shortsLarge.style.display === "none") {
                    sendResponse({text: "hidden", method: "checkShorts"});
                } else if (shortsLarge.style.display === "block") {
                    sendResponse({text: "visible", method: "checkShorts"});
                } else {
                    sendResponse({text: "hidden", method: "checkShorts"});
                }
            } else {  // small desktop case
                if (shortsSmall.style.display === "none") {
                    sendResponse({text: "hidden", method: "checkShorts"});
                } else if (shortsSmall.style.display === "block") {
                    sendResponse({text: "visible", method: "checkShorts"});
                } else {
                    sendResponse({text: "hidden", method: "checkShorts"});
                }
            }
        }
        
        // change visibility
        if(request.method == "changeShorts"){
            // mobile case
            if (shortsSmall == null && shortsLarge == null){
                if (shortsMobile.style.display === "none") {
                    shortsMobile.style.display = "flex";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                } else if (shortsMobile.style.display === "flex") {
                    shortsMobile.style.display = "none";
                    sendResponse({text: "shorts hidden", method: "changeShorts"});
                } else {
                    shortsMobile.style.display = "block";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                }
            } else if (shortsSmall == null){  // large desktop case
                if (shortsLarge.style.display === "none") {
                    shortsLarge.style.display = "block";
                    shortsSmall.style.display = "block";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                } else if (shortsLarge.style.display === "block") {
                    shortsLarge.style.display = "none";
                    shortsSmall.style.display = "none";
                    sendResponse({text: "shorts hidden", method: "changeShorts"});
                } else {
                    shortsLarge.style.display = "block";
                    shortsSmall.style.display = "block";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                }
            } else {  // small desktop case
                if (shortsSmall.style.display === "none") {
                    shortsSmall.style.display = "block";
                    shortsLarge.style.display = "block";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                } else if (shortsSmall.style.display === "block") {
                    shortsSmall.style.display = "none";
                    shortsLarge.style.display = "none";
                    sendResponse({text: "shorts hidden", method: "changeShorts"});
                } else {
                    shortsSmall.style.display = "block";
                    shortsLarge.style.display = "block";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                }
            }
        }
        
        
        // related videos (when you watch a video) //
        // on desktop
        relVids = document.querySelector('#related');
        relVidsMobile = document.querySelector('ytm-item-section-renderer[section-identifier="related-items"]');
        
        // check for visibility
        if(request.method == "checkRelVids"){
            if (relVidsMobile == null){
                if (relVids.style.visibility === "hidden") {
                    sendResponse({text: "hidden", method: "checkRelVids"});
                } else if (relVids.style.visibility === "visible") {
                    sendResponse({text: "visible", method: "checkRelVids"});
                } else {
                    sendResponse({text: "hidden", method: "checkRelVids"});
                }
            } else {
                if (relVidsMobile.style.visibility === "hidden") {
                    sendResponse({text: "hidden", method: "checkRelVids"});
                } else if (relVidsMobile.style.visibility === "visible") {
                    sendResponse({text: "visible", method: "checkRelVids"});
                } else {
                    sendResponse({text: "hidden", method: "checkRelVids"});
                }
            }
        }
        
        // change visibility
        if(request.method == "changeRelVids"){
            if (relVidsMobile == null){
                if (relVids.style.visibility === "hidden") {
                    relVids.style.visibility = "visible";
                    sendResponse({text: "rel vids visible", method: "changeRelVids"});
                } else if (relVids.style.visibility === "visible") {
                    relVids.style.visibility = "hidden";
                    sendResponse({text: "rel vids hidden", method: "changeRelVids"});
                } else {
                    relVids.style.visibility = "visible";
                    sendResponse({text: "rel vids visible", method: "changeRelVids"});
                }
            } else {
                if (relVidsMobile.style.visibility === "hidden") {
                    relVidsMobile.style.visibility = "visible";
                    sendResponse({text: "rel vids visible", method: "changeRelVidsMobile"});
                } else if (relVidsMobile.style.visibility === "visible") {
                    relVidsMobile.style.visibility = "hidden";
                    sendResponse({text: "rel vids hidden", method: "changeRelVidsMobile"});
                } else {
                    relVidsMobile.style.visibility = "visible";
                    sendResponse({text: "rel vids visible", method: "changeRelVidsMobile"});
                }
            }
        }
        
        // comments
        comments = document.querySelector('#comments');
        
        // check for visibility
        if(request.method == "checkComments"){
            if (comments.style.visibility === "hidden") {
                sendResponse({text: "hidden", method: "checkComments"});
            } else if (comments.style.visibility === "visible") {
                sendResponse({text: "visible", method: "checkComments"});
            } else {
                sendResponse({text: "hidden", method: "checkComments"});
            }
        }
        
        // change visibility
        if(request.method == "changeComments"){
            if (comments.style.visibility === "hidden") {
                comments.style.visibility = "visible";
                sendResponse({text: "comments visible", method: "changeComments"});
            } else if (comments.style.visibility === "visible") {
                comments.style.visibility = "hidden";
                sendResponse({text: "comments hidden", method: "changeComments"});
            } else {
                comments.style.visibility = "visible";
                sendResponse({text: "comments visible", method: "changeComments"});
            }
        }
        
    }
);


