// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // recommended videos, home page //
        recVids = document.querySelector('ytd-browse[page-subtype="home"]');
        recVidsMobile = document.querySelector('div[tab-identifier="FEwhat_to_watch"]');
        
        // Short, home page //
        shortsLarge = document.querySelector('#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"]'); // on desktop, large
        shortsSmall = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]'); // on desktop, small
        shortsMobile = document.querySelector('ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2)'); // on mobile
        
        // related videos (when you watch a video) //
        // on desktop
        relVids = document.querySelector('#related');
        relVidsMobile = document.querySelector('ytm-item-section-renderer[section-identifier="related-items"]');
        
        // comments
        comments = document.querySelector('#comments');
        
        
        // create function to check if element is hidden
        function checkElement(element, css_to_change, is_multi_element){
            if (is_multi_element){
                element_to_check = element[0];
            } else {
                element_to_check = element;
            }
            
            if (css_to_change === "visibility"){
                if (element_to_check.style.visibility === "hidden") {
                    sendResponse({text: "hidden", method: request.method});
                } else if (element_to_check.style.visibility === "visible") {
                    sendResponse({text: "visible", method: request.method});
                } else {
                    sendResponse({text: "hidden", method: request.method});
                }
            } else if (css_to_change === "display"){
                if (element_to_check.style.display === "none") {
                    sendResponse({text: "hidden", method: request.method});
                } else if (element_to_check.style.display === "block") {
                    sendResponse({text: "visible", method: request.method});
                } else {
                    sendResponse({text: "hidden", method: request.method});
                }
            }
        };
        
        // check the hidden-ness --- we use this to set the checkboxes correctly when opening the pop-up
        if(request.method == "checkRecHome"){
            if (recVidsMobile == null){
                checkElement(recVids, "visibility", is_multi_element = false);
            } else {
                checkElement(recVidsMobile, "visibility", is_multi_element = false);
            }
        }
        
        if(request.method == "checkShorts"){
            // mobile case
            if (shortsSmall == null && shortsLarge == null){
                checkElement(shortsMobile, "visibility", is_multi_element = false);
            } else if (shortsSmall == null){ // large desktop case
                checkElement(shortsLarge, "display", is_multi_element = false);
            } else {  // small desktop case
                checkElement(shortsSmall, "display", is_multi_element = false);
            }
        }
        
        if(request.method == "checkRelVids"){
            if (relVidsMobile == null){
                checkElement(relVids, "visibility", is_multi_element = false);
            } else {
                checkElement(relVidsMobile, "visibility", is_multi_element = false);
            }
        }
        
        // check for visibility
        if(request.method == "checkComments"){
            checkElement(comments, "visibility", is_multi_element = false);
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
        
        // change visibility
        if(request.method == "changeShorts"){
            // mobile case
            if (shortsSmall == null && shortsLarge == null){
                if (shortsMobile.style.visibility === "hidden") {
                    shortsMobile.style.visibility = "visible";
                    sendResponse({text: "shorts visible", method: "changeShorts"});
                } else if (shortsMobile.style.visibility === "visible") {
                    shortsMobile.style.visibility = "hidden";
                    sendResponse({text: "shorts hidden", method: "changeShorts"});
                } else {
                    shortsMobile.style.visibility = "visible";
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
        
        // change visibility
        if(request.method == "changeRelVids"){
            if (relVidsMobile == null){
                if (relVids.style.visibility === "hidden") {
                    relVids.style.visibility = "visible";
                    relVids.style.display = "block";
                    sendResponse({text: "rel vids visible", method: "changeRelVids"});
                } else if (relVids.style.visibility === "visible") {
                    relVids.style.visibility = "hidden";
                    relVids.style.display = "none";
                    sendResponse({text: "rel vids hidden", method: "changeRelVids"});
                } else {
                    relVids.style.visibility = "visible";
                    relVids.style.display = "block";
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


