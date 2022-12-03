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
    
    const recVidsCssOn = 'ytd-browse[page-subtype="home"] { visibility: visible; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible; }';
    const recVidsCssOff = 'ytd-browse[page-subtype="home"] { visibility: hidden; } div[tab-identifier="FEwhat_to_watch"] { visibility: hidden; }';
    
    const shortsCssOn = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: block; } ytm-pivot-bar-renderer[role="tablist"]ytm-pivot-bar-item-renderer:nth-child(2){ visibility: visible; }'
    const shortsCssOff = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: none; } ytm-pivot-bar-renderer[role="tablist"]ytm-pivot-bar-item-renderer:nth-child(2){ visibility: hidden; }';
    
    const relatedCssOn = '#related { visibility: visible; display: block; } ytm-item-section-renderer[section-identifier="related-items"] {visibility: visible; }';
    const relatedCssOff = '#related { visibility: hidden; display: none; } ytm-item-section-renderer[section-identifier="related-items"] {visibility: hidden; }';
    
    const commentsCssOn = '#comments { visibility: visible; }';
    const commentsCssOff = '#comments { visibility: hidden; }';
    
    
    // generate the style elements
    var elementsThatCanBeHidden = [ "recVids", "shorts", "related", "comments" ];
     
    // function to create style element with the specified CSS content
    function createStyleElement(some_style_id, some_css){
        if(!document.getElementById(some_style_id)){
            var styleElement = document.createElement("style");
            styleElement.id = some_style_id;
            document.head.appendChild(styleElement).innerHTML = some_css;
        } else {
            document.getElementById(some_style_id).innerHTML = some_css;
        };
    };
    
    // loop over the elements and create the elements
    elementsThatCanBeHidden.forEach(function (item) {
        var styleName = item + "Style";
        if (localStorage.getItem(item) === "true"){
            createStyleElement(styleName, eval(item + "CssOn"));
        } else {
            createStyleElement(styleName, eval(item + "CssOff"));
        };
    });
     
    // save state if the popup asks for it
    browser.runtime.onMessage.addListener((message) => {
        if (message.method === "saveState"){
            elementsThatCanBeHidden.forEach(function (item) {
                localStorage.setItem(item, eval('message.' + item + 'State'));
            });
        };
    });
    
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
            sendResponse({recVids: localStorage.getItem("recVids"),
                          shorts: localStorage.getItem("shorts"),
                          related: localStorage.getItem("related"),
                          comments: localStorage.getItem("comments")});
        };
        
        if(request.method == "checkRecShown"){
            checkStyleStatus("recVidsStyle", recVidsCssOn);
        } else if (request.method == "checkShortsShown"){
            checkStyleStatus("shortsStyle", shortsCssOn);
        } else if (request.method == "checkRelatedShown"){
            checkStyleStatus("relatedStyle", relatedCssOn);
        } else if (request.method == "checkCommentsShown"){
            checkStyleStatus("commentsStyle", commentsCssOn);
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
            toggleHiding("recVidsStyle", recVidsCssOn, recVidsCssOff, message.status);
        } else if (message.method === "shortsChange"){
            toggleHiding("shortsStyle", shortsCssOn, shortsCssOff, message.status);
        } else if (message.method === "relatedChange"){
            toggleHiding("relatedStyle", relatedCssOn, relatedCssOff, message.status);
        } else if (message.method === "commentsChange"){
            toggleHiding("commentsStyle", commentsCssOn, commentsCssOff, message.status);
        };
    });
    
 })();
