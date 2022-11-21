 (function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
     
     // save state if the popup asks for it
     browser.runtime.onMessage.addListener((message) => {
         if (message.method === "saveState"){
             localStorage.setItem("recVidsOn", message.recVidsState);
             localStorage.setItem("shortsOn", message.shortsState);
             localStorage.setItem("relatedOn", message.relatedState);
             localStorage.setItem("commentsOn", message.commentsState);
         };
     });
     
     // create the style elements based on the saved state
     function createStyleElement(some_style_id, some_css){
         if(!document.getElementById(some_style_id)){
             var styleElement = document.createElement("style");
             styleElement.id = some_style_id;
             document.head.appendChild(styleElement).innerHTML = some_css;
         } else {
             document.getElementById(some_style_id).innerHTML = some_css;
         };
     };
     
     const rec_vids_css_on = 'ytd-browse[page-subtype="home"] { visibility: visible; } div[tab-identifier="FEwhat_to_watch"] { visibility:  visible; }';
     const rec_vids_css_off = 'ytd-browse[page-subtype="home"] { visibility: hidden; } div[tab-identifier="FEwhat_to_watch"] { visibility:  hidden; }';
     
     const shorts_css_on = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"], ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: block; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2){ visibility: visible; }'
     const shorts_css_off = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"], ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: none; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2){ visibility: hidden; }';
     
     const related_css_on = '#related { visibility: visible; display: block; } ytm-item-section-renderer[section-identifier="related-items"] { visibility: visible; }';
     const related_css_off = '#related { visibility: hidden; display: none; } ytm-item-section-renderer[section-identifier="related-items"] { visibility: hidden; }';
     
     const comments_css_on = '#comments { visibility: visible; }';
     const comments_css_off = '#comments { visibility: hidden; }';
     
     if (localStorage.getItem("recVidsOn") === "true"){
         createStyleElement("recVidsStyle", rec_vids_css_on);
     } else {
         createStyleElement("recVidsStyle", rec_vids_css_off);
     };
     if (localStorage.getItem("shortsOn") === "true"){
         createStyleElement("shortsStyle", shorts_css_on);
     } else {
         createStyleElement("shortsStyle", shorts_css_off);
     };
     if (localStorage.getItem("relatedOn") === "true"){
         createStyleElement("relatedStyle", related_css_on);
     } else {
         createStyleElement("relatedStyle", related_css_off);
     };
     if (localStorage.getItem("commentsOn") === "true"){
         createStyleElement("commentsStyle", comments_css_on);
     } else {
         createStyleElement("commentsStyle", comments_css_off);
     };
     
     
     // let the popup ask for the current status of the elements and of the saved state
     chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            function checkStyleStatus(some_style_id, some_css_for_shown){
                var currentStyle = document.getElementById(some_style_id);
                
                if (currentStyle.innerHTML === some_css_for_shown) {
                    sendResponse({text: "visible"});
                } else {
                    sendResponse({text: "hidden"});
                };
            };
            
            if(request.method == "getSavedState"){
                sendResponse({recVidsOn: localStorage.getItem("recVidsOn"),
                                shortsOn: localStorage.getItem("shortsOn"),
                                relatedOn: localStorage.getItem("relatedOn"),
                                commentsOn: localStorage.getItem("commentsOn")});
            };
            
            if(request.method == "checkRecShown"){
                checkStyleStatus("recVidsStyle", rec_vids_css_on);
            } else if (request.method == "checkShortsShown"){
                checkStyleStatus("shortsStyle", shorts_css_on);
            } else if (request.method == "checkRelatedShown"){
                checkStyleStatus("relatedStyle", related_css_on);
            } else if (request.method == "checkCommentsShown"){
                checkStyleStatus("commentsStyle", comments_css_on);
            };
            
     });
     
     // let the content script toggle elements when the popup asks for it
     function toggleHiding(some_style_id, css_shown, css_hidden, status){
         var styleElement = document.getElementById(some_style_id);
         
         if(status == true){
             styleElement.innerHTML = css_shown;
         } else {
             styleElement.innerHTML = css_hidden;
         };
     };
     
     browser.runtime.onMessage.addListener((message) => {
         if (message.method === "recVidsChange"){
             toggleHiding("recVidsStyle", rec_vids_css_on, rec_vids_css_off, message.status);
         } else if (message.method === "shortsChange"){
             toggleHiding("shortsStyle", shorts_css_on, shorts_css_off, message.status);
         } else if (message.method === "relatedChange"){
             toggleHiding("relatedStyle", related_css_on, related_css_off, message.status);
         } else if (message.method === "commentsChange"){
             toggleHiding("commentsStyle", comments_css_on, comments_css_off, message.status);
         };
     });
     
 })();
