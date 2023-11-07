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
     
      var elementsThatCanBeHidden = [ "youtubeSearch",
                                      "youtubeSearchPredict",
                                      "youtubeRecVids",
                                      "youtubeThumbnails",
                                      "youtubeNotifications",
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
                                      "youtubeAds",
                                      "youtubeViews",
                                      "youtubeLikes",
                                      "youtubeSubscribers"];
     
     
     //----- generate the style elements ----//
     const youtubeSearchCssOn = '';
     const youtubeSearchCssOff = 'ytd-searchbox { display: none; } button[aria-label="Search YouTube"] {display: none;}';
     
     const youtubeSearchPredictCssOn = '';
     const youtubeSearchPredictCssOff = 'div.gstl_50 { display: none !important; }';
    
     const youtubeRecVidsCssOn = 'ytd-browse[page-subtype="home"] { visibility: visible !important; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible !important; }';
     const youtubeRecVidsCssOff = 'ytd-browse[page-subtype="home"] { display: none; } div[tab-identifier="FEwhat_to_watch"] { visibility: hidden; }';
     
     const youtubeThumbnailsCssOn = 'ytd-thumbnail, ytd-playlist-thumbnail {display: block; } ytd-compact-video-renderer { padding: 0px 10px 10px 10px; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: block; }';
     const youtubeThumbnailsCssOff = 'ytd-thumbnail, ytd-playlist-thumbnail { display: none; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: none !important; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: 100px !important; }';
     const youtubeThumbnailsCssBlur = 'ytd-thumbnail img, ytd-playlist-thumbnail img { filter: blur(7px); } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { filter: blur(7px); }';
     
     const youtubeNotificationsCssOn = '';
     const youtubeNotificationsCssOff = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }';
     const youtubeNotificationsCssBlur = 'ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: none; }';

     
     const youtubeProfileImgCssOn = '#avatar-link {display: inline-block; visibility: visible;} .channel-thumbnail-icon {display: inline-block;} #channel-thumbnail, #avatar-section { display: block;}';
     const youtubeProfileImgCssOff = '#avatar-link {display: none; visibility: hidden;} .channel-thumbnail-icon, #channel-thumbnail, #avatar-section {display: none;}';
    
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
     const youtubeSidebarCssOff = '#secondary { display: none; } video.html5-main-video { width: 100% !important; height: auto !important; }';
    
     const youtubeCommentsCssOn = '#comments { visibility: visible; } #app ytm-comments-entry-point-header-renderer { display: block; }';
     const youtubeCommentsCssOff = '#comments { visibility: hidden; } #app ytm-comments-entry-point-header-renderer { display: none; }';
     
     const youtubeAdsCssOn = '';
     const youtubeAdsCssOff = 'ytm-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-carousel-ad-renderer, ytd-ad-slot-renderer, #masthead-ad, ytd-ad-slot-renderer { display: none !important; }  /* video page */ ytm-promoted-sparkles-web-renderer, ytm-companion-ad-renderer, #player-ads {display: none !important; }';
     
     const youtubeViewsCssOn = '';
     const youtubeViewsCssOff = '/* watch page */ #metadata-line.ytd-video-meta-block > .ytd-video-meta-block:first-of-type {display: none !important; } #metadata-line.ytd-video-meta-block>.ytd-video-meta-block:not(:first-of-type):before, #metadata-line.ytd-grid-video-renderer>.ytd-grid-video-renderer:not(:first-of-type):before { content: ""; margin: 0px; } /* video page */ #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(1), #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(2) { display: none; } /* channel page */ ytd-two-column-browse-results-renderer #metadata-line span.ytd-grid-video-renderer:first-of-type { display: none !important; } /* m.youtube.com */ ytm-badge-and-byline-renderer .ytm-badge-and-byline-item-byline:not(:first-of-type):not(:last-of-type), ytm-badge-and-byline-renderer .ytm-badge-and-byline-separator:not(:first-of-type) { display: none; } .slim-video-metadata-header .secondary-text .yt-core-attributed-string {display: none;}';
     
     const youtubeLikesCssOn = '';
     const youtubeLikesCssOff = '#segmented-like-button .yt-core-attributed-string { display: none; } /* m.youtube.com */ ytm-segmented-like-dislike-button-renderer .animated-like-toggle-button .yt-spec-button-shape-next__button-text-content .yt-core-attributed-string { display: none; }';
     
     const youtubeSubscribersCssOn = '';
     const youtubeSubscribersCssOff = '#owner-sub-count, #subscriber-count { display: none !important; } /* m.youtube.com */ .slim-owner-icon-and-title .subhead .yt-core-attributed-string { display: none; }';
     
     
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
         
         
         
         if (item === "youtubeThumbnails" || item === "youtubeNotifications") {
             
             browser.storage.sync.get(key, function(result) {
                 
                 console.log(result[key]);
                 
                 if (result[key] == undefined || result[key] === false){
                     createStyleElement(styleName, eval(item + "CssOn"));
                 } else {
                     createStyleElement(styleName, eval(item + "Css" + result[key]));
                 };
             });
         } else {
             browser.storage.sync.get(key, function(result) {
                 if (result[key] == true){
                     createStyleElement(styleName, eval(item + "CssOff"));
                 } else {
                     createStyleElement(styleName, eval(item + "CssOn"));
                 };
             });
         }

     });
     
     // let the popup ask for the current view status of the elements (so it can set the checkboxes accordingly)
     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
         if(message.method === "check"){
             var currentStyle = document.getElementById(message.element + "Style");
             
             // only check the blur element for elements that have it
             if(message.element == "youtubeThumbnails" || message.element == "youtubeNotifications"){
                 if (currentStyle.innerHTML === eval(message.element + 'CssBlur')){
                     sendResponse({text: "blur"});
                 }
             }
             
            // do the other checks for all
            if (currentStyle == undefined){
                sendResponse({text: "style element is undefined"});
                
             } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                 sendResponse({text: "visible"});
                 
             } else if (currentStyle.innerHTML === eval(message.element + 'CssOff')){
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
         
         if(message.method === "changeHideBlur"){
             if (currentStyle == undefined){
                 console.log("not on active tab");
             } else {
                 
                 currentStyle.innerHTML = eval(message.element + 'Css' + message.action)
             };
         };
     });
 })();
