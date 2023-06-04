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
     
     const youtubeSearchCssOn = 'ytd-searchbox { display: flex; } button[aria-label="Search YouTube"] {display: block;}';
     const youtubeSearchCssOff = 'ytd-searchbox { display: none; } button[aria-label="Search YouTube"] {display: none;}';
     
     const youtubeSearchPredictCssOn = '';
     const youtubeSearchPredictCssOff = 'div.gstl_50 { display: none !important; }';
    
     const youtubeRecVidsCssOn = 'ytd-browse[page-subtype="home"] { visibility: visible !important; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible !important; }';
     const youtubeRecVidsCssOff = 'ytd-browse[page-subtype="home"] { display: none; } div[tab-identifier="FEwhat_to_watch"] { visibility: hidden; }';
     
     const youtubeThumbnailsCssOn = 'ytd-thumbnail {display: block; } ytd-compact-video-renderer { padding: 0px 10px 10px 10px; /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: block; }';
     const youtubeThumbnailsCssOff = 'ytd-thumbnail { display: none; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: none !important; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: 100px !important; }';
     
     const youtubeProfileImgCssOn = '#avatar-link {display: inline-block; visibility: visible;} .channel-thumbnail-icon {display: inline-block;}';
     const youtubeProfileImgCssOff = '#avatar-link {display: none; visibility: hidden;} .channel-thumbnail-icon {display: none;}';
    
     const youtubeShortsCssOn = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"], ytd-mini-guide-entry-renderer[aria-label="Shorts"] { display: block; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2), ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts] { display: flex; }'
     const youtubeShortsCssOff = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"], ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts] { display: none; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2), ytm-reel-shelf-renderer { display: none !important; } ';
     
     const youtubeSubscriptionsCssOn = 'a[href="/feed/subscriptions/] { display: flex; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: flex; } #sections ytd-guide-section-renderer:nth-child(2):not(:has(#guide-section-title[is-empty]))';
     const youtubeSubscriptionsCssOff = 'a[href="/feed/subscriptions"] { display: none !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: none; } #sections ytd-guide-section-renderer:nth-child(2):not(:has(#guide-section-title[is-empty])) { display: none; }';
     
     const youtubeLibraryCssOn = '#endpoint[href="/feed/library"] { display: flex; } /* mobile */ ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(4) { display: flex; }';
     const youtubeLibraryCssOff = '#endpoint[href="/feed/library"] { display: none !important; } /* mobile */ ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(4) { display: none; } ';
     
     const youtubeHistoryCssOn = '#endpoint[href="/feed/history"] { display: flex; }';
     const youtubeHistoryCssOff = '#endpoint[href="/feed/history"] { display: none !important; }';
     
     const youtubeExploreCssOn = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: block; }';
     const youtubeExploreCssOff = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: none; }';
     
     const youtubeMoreCssOn = '#sections ytd-guide-section-renderer:has(a[href="/premium"]) { display: block; }';
     const youtubeMoreCssOff = '#sections ytd-guide-section-renderer:has(a[href="/premium"]) { display: none; }';
    
     const youtubeRelatedCssOn = '#related { visibility: visible; display: block; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: block; }';
     const youtubeRelatedCssOff = '#related { visibility: hidden; display: none; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: none; } ytm-single-column-watch-next-results-renderer .related-chips-slot-wrapper { transform: none !important; }';
     
     const youtubeSidebarCssOn = '';
     const youtubeSidebarCssOff = '#secondary { display: none; } video.html5-main-video { width: 100% !important; object-fit: contain; }';
    
     const youtubeCommentsCssOn = '#comments { visibility: visible; } #app ytm-comments-entry-point-header-renderer { display: block; }';
     const youtubeCommentsCssOff = '#comments { visibility: hidden; } #app ytm-comments-entry-point-header-renderer { display: none; }';
     
     const youtubeAdsCssOn = '';
     const youtubeAdsCssOff = 'ytm-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-carousel-ad-renderer, ytd-ad-slot-renderer, #masthead-ad, ytd-ad-slot-renderer { display: none !important; }  /* video page */ ytm-promoted-sparkles-web-renderer, ytm-companion-ad-renderer, #player-ads {display: none !important; }';
    
    //----- generate the style elements ----//
     var elementsThatCanBeHidden = [ "youtubeSearch",
                                     "youtubeSearchPredict",
                                     "youtubeRecVids",
                                     "youtubeThumbnails",
                                     "youtubeProfileImg",
                                     "youtubeShorts",
                                     "youtubeSubscriptions",
                                     "youtubeLibrary",
                                     "youtubeHistory",
                                     "youtubeExplore",
                                     "youtubeMore",
                                     "youtubeRelated",
                                     "youtubeSidebar",
                                     "youtubeComments",
                                     "youtubeAds" ];
     
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
     
     // loop over the elements and create HTML style element for each
     // If an element's key in storage is set to 'false', show the
     // element, otherwise hide it
     elementsThatCanBeHidden.forEach(function (item) {
         var styleName = item + "Style";
         var key = item + "Status";
         
         browser.storage.sync.get(key, function(result) {
             if (result[key] == true){
                 createStyleElement(styleName, eval(item + "CssOff"));
             } else {
                 createStyleElement(styleName, eval(item + "CssOn"));
             };
         });
     });
     
     // let the popup ask for the current view status of the elements (so it can set the checkboxes accordingly)
     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
         if(message.method === "check"){
             var currentStyle = document.getElementById(message.element + "Style");
     
             if (currentStyle == undefined){
                 sendResponse({text: "style element is undefined"});
             } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                 sendResponse({text: "visible"});
             } else {
                 sendResponse({text: "hidden"});
             };
         };
     });
     
     // let the content script toggle elements when the popup asks for it
     browser.runtime.onMessage.addListener((message) => {
         var currentStyle = document.getElementById(message.element + "Style");
         
         if(message.method === "change"){
             if (currentStyle == undefined){
                 console.log("not on active tab");
             } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                 currentStyle.innerHTML = eval(message.element + 'CssOff')
             } else {
                 currentStyle.innerHTML = eval(message.element + 'CssOn')
             };
         };
     });
 })();
