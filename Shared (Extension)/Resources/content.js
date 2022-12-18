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
    
    const shortsCssOn = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: block; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2){ display: flex; }'
    const shortsCssOff = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: none; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2){ display: none; }';
     
     const subscriptionsCssOn = 'a[href="/feed/subscriptions/] { display: flex; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: flex; } @media screen and (min-device-width: 1312px) {#sections ytd-guide-section-renderer:nth-child(2) { display: block; }}';
     const subscriptionsCssOff = 'a[href="/feed/subscriptions"] { display: none !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: none; } @media screen and (min-device-width: 1312px) {#sections ytd-guide-section-renderer:nth-child(2) { display: none; }}';
     
     const exploreCssOn = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: block; }';
     const exploreCssOff = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: none; }';
     
     const moreCssOn = '#sections ytd-guide-section-renderer:has(a[href="/premium"]) { display: block; }';
     const moreCssOff = '#sections ytd-guide-section-renderer:has(a[href="/premium"]) { display: none; }';
    
    const relatedCssOn = '#related { visibility: visible; display: block; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: block; }';
    const relatedCssOff = '#related { visibility: hidden; display: none; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: none; }';
    
    const commentsCssOn = '#comments { visibility: visible; } #app ytm-comments-entry-point-header-renderer { display: block; }';
    const commentsCssOff = '#comments { visibility: hidden; } #app ytm-comments-entry-point-header-renderer { display: none; }';
    
    // generate the style elements
    var elementsThatCanBeHidden = [ "recVids", "shorts", "subscriptions", "explore", "more", "related", "comments" ];
     
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
     
     elementsThatCanBeHidden.forEach(function (item) {
         console.log("create the styles " + item);
         var styleName = item + "Style";
         var key = item + "Status";
         
         browser.storage.sync.get(key, function(result) {
             if (result[key] == true){
                 createStyleElement(styleName, eval(item + "CssOn"));
             } else {
                 createStyleElement(styleName, eval(item + "CssOff"));
             };
         });
     });
     
     // let the popup ask for the current status of the elements and of the saved state
     chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
         function checkStyleStatus(currentStyle, some_css_for_shown){
             if (currentStyle == undefined){
                 sendResponse({text: "not on active tab"});
             } else if (currentStyle.innerHTML === some_css_for_shown) {
                 sendResponse({text: "visible"});
             } else {
                 sendResponse({text: "hidden"});
             };
         };
     
         if(request.method === "check"){
             var currentStyle = document.getElementById(request.element + "Style");
     
             checkStyleStatus(currentStyle, eval(request.element + 'CssOn'));
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
         // toggle hiding when popup asks
         if(message.method === "change"){
             toggleHiding(message.element + 'Style', eval(message.element + 'CssOn'), eval(message.element + 'CssOff'),  message.status);
         };
     });
 })();
