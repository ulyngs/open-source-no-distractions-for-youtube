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
        
        
        // related videos (when you watch a video) //
        // on desktop
        relVids = document.querySelector('#related');
        
        // check for visibility
        if(request.method == "checkRelVids"){
            if (relVids.style.visibility === "hidden") {
                sendResponse({text: "hidden", method: "checkRelVids"});
            } else if (relVids.style.visibility === "visible") {
                sendResponse({text: "visible", method: "checkRelVids"});
            } else {
                sendResponse({text: "hidden", method: "checkRelVids"});
            }
        }
        
        // change visibility
        if(request.method == "changeRelVids"){
            if (relVids.style.visibility === "hidden") {
                relVids.style.visibility = "visible";
                sendResponse({text: "related vids visible", method: "changeRelVids"});
            } else if (relVids.style.visibility === "visible") {
                relVids.style.visibility = "hidden";
                sendResponse({text: "related vids hidden", method: "changeRelVids"});
            } else {
                relVids.style.visibility = "visible";
                sendResponse({text: "related vids visible", method: "changeRelVids"});
            }
        }
        
        // on mobile
        relVidsMobile = document.querySelector('ytm-item-section-renderer[section-identifier="related-items"]');
        
        // check for visibility
        if(request.method == "checkRelVidsMobile"){
            if (relVidsMobile.style.visibility === "hidden") {
                sendResponse({text: "hidden", method: "checkRelVidsMobile"});
            } else if (relVidsMobile.style.visibility === "visible") {
                sendResponse({text: "visible", method: "checkRelVidsMobile"});
            } else {
                sendResponse({text: "hidden", method: "checkRelVidsMobile"});
            }
        }
        
        // change visibility
        if(request.method == "changeRelVidsMobile"){
            if (relVidsMobile.style.visibility === "hidden") {
                relVidsMobile.style.visibility = "visible";
                sendResponse({text: "related vids visible", method: "changeRelVidsMobile"});
            } else if (relVidsMobile.style.visibility === "visible") {
                relVidsMobile.style.visibility = "hidden";
                sendResponse({text: "related vids hidden", method: "changeRelVidsMobile"});
            } else {
                relVidsMobile.style.visibility = "visible";
                sendResponse({text: "related vids visible", method: "changeRelVidsMobile"});
            }
        }
        
        // comments
        comments = document.querySelector('ytd-comments');
        
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


