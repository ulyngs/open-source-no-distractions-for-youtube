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
        
        // create function to toggle hidden-ness
        function toggleElement(element, css_to_change, is_multi_element){
            
            if (is_multi_element){
                element_to_check = element[0];
            } else {
                element_to_check = element;
            }
            
            if (css_to_change === "visibility"){
                if (element_to_check.style.visibility === "hidden") {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.visibility = "visible";
                        }
                    } else {
                        element.style.visibility = "visible";
                    }
                    
                } else if (element_to_check.style.visibility === "visible") {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.visibility = "hidden";
                        }
                    } else {
                        element.style.visibility = "hidden";
                    }
                } else {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.visibility = "visible";
                        }
                    } else {
                        element.style.visibility = "visible";
                    }
                }
            } else if (css_to_change === "display"){
                if (element_to_check.style.display === "none") {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.display = "block";
                        }
                    } else {
                        element.style.display = "block";
                    }
                    
                } else if (element_to_check.style.display === "block") {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.display = "none";
                        }
                    } else {
                        element.style.display = "none";
                    }
                } else {
                    if (is_multi_element){
                        for (var i = 0, max = element.length; i < max; i++) {
                            element[i].style.display = "block";
                        }
                    } else {
                        element.style.display = "block";
                    }
                }
            }
        };
        
        
        if(request.method == "changeRecVids"){
            if (recVidsMobile == null){
                toggleElement(recVids, "visibility", is_multi_element = false);
            } else {
                toggleElement(recVidsMobile, "visibility", is_multi_element = false);
            }
        }
        
        // change visibility
        if(request.method == "changeShorts"){
            // mobile case
            if (shortsSmall == null && shortsLarge == null){
                toggleElement(shortsMobile, "visibility", is_multi_element = false);
            } else {  // desktop case
                toggleElement(shortsSmall, "display", is_multi_element = false);
                toggleElement(shortsLarge, "display", is_multi_element = false);
            }
        }
        
        // change visibility
        if(request.method == "changeRelVids"){
            if (relVidsMobile == null){
                toggleElement(relVids, "visibility", is_multi_element = false);
            } else {
                toggleElement(relVidsMobile, "visibility", is_multi_element = false);
            }
        }
        
        // change visibility
        if(request.method == "changeComments"){
            toggleElement(comments, "visibility", is_multi_element = false);
        }
    }
);


