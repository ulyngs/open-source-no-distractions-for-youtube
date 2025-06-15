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
    
    const platformsWeTarget = [ "youtube" ];
    const elementsThatCanBeHidden = [ "youtubeSearch", "youtubeSearchPredict", "youtubeRecVids", "youtubeThumbnails", "youtubeNotifications", "youtubeProfileImg",
                                      "youtubeShorts", "youtubeSubscriptions", "youtubeLibrary", "youtubeHistory", "youtubeExplore", "youtubeMore",
                                      "youtubeRelated", "youtubeSidebar", "youtubeComments", "youtubeAds", "youtubeViews", "youtubeLikes", "youtubeSubscribers" ];
    
    // YouTube CSS
    const youtubeSearchCssOn = '';
    const youtubeSearchCssOff = '#center > yt-searchbox.ytSearchboxComponentHost.ytSearchboxComponentDesktop.ytd-masthead, ytd-searchbox { display: none; } button[aria-label="Search YouTube"] {display: none;}';
    const youtubeSearchPredictCssOn = '';
    const youtubeSearchPredictCssOff = 'div.gstl_50 { display: none !important; }';
    const youtubeRecVidsCssOn = 'ytd-browse[page-subtype="home"] { visibility: visible !important; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible !important; }';
    const youtubeRecVidsCssOff = 'ytd-browse[page-subtype="home"] { display: none; } div[tab-identifier="FEwhat_to_watch"] { visibility: hidden; }';
    const youtubeThumbnailsCssOn = 'ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: block !important; } ytd-thumbnail img, ytd-playlist-thumbnail img { filter: none; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: block !important; filter: none; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: auto !important; }';
    const youtubeThumbnailsCssOff = 'ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: none !important; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: none !important; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: 100px !important; }';
    const youtubeThumbnailsCssBlur = 'ytd-thumbnail img, ytd-playlist-thumbnail img { filter: blur(7px); } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { filter: blur(7px); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; } /* Ensure container is visible for blur */';
    const youtubeThumbnailsCssBlack = 'ytd-thumbnail img, ytd-playlist-thumbnail img { filter: brightness(0); } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { filter: brightness(0); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; } /* Ensure container is visible for black */';
    const youtubeNotificationsCssOn = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: inline-flex; }';
    const youtubeNotificationsCssOff = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }';
    const youtubeNotificationsCssBlur = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: none; }';
    const youtubeNotificationsCssBlack = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }';
    const youtubeProfileImgCssOn = '';
    const youtubeProfileImgCssOff = '#avatar-link, #avatar-container, #avatar {display: none; visibility: hidden;} .channel-thumbnail-icon, #channel-thumbnail, #avatar-section, #author-thumbnail, ytm-comments-entry-point-teaser-renderer img.ytm-comments-entry-point-teaser-avatar, ytm-profile-icon.slim-owner-profile-icon, ytm-profile-icon.comment-icon {display: none;}  #creator-thumbnail, #expander.ytd-comment-replies-renderer .dot.ytd-comment-replies-renderer, ytm-channel-thumbnail-with-link-renderer {display: none !important;}';
    const youtubeShortsCssOn = '';
    const youtubeShortsCssOff = '#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"], ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], ytm-rich-section-renderer:has(ytm-shorts-lockup-view-model) { display: none; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2), ytm-reel-shelf-renderer, ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]), ytm-video-with-context-renderer:has(ytm-thumbnail-overlay-time-status-renderer[data-style="SHORTS"]) { display: none !important; }';
    const youtubeSubscriptionsCssOn = 'a[href="/feed/subscriptions"] { display: flex !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: flex !important; } #sections ytd-guide-section-renderer:nth-child(2):not(:has(#guide-section-title[is-empty])) { display: block !important; }';
    const youtubeSubscriptionsCssOff = 'a[href="/feed/subscriptions"] { display: none !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: none !important; } #sections ytd-guide-section-renderer:nth-child(2):not(:has(#guide-section-title[is-empty])) { display: none !important; }';
    const youtubeHistoryCssOn = '#endpoint[href="/feed/history"] { display: flex !important; }';
    const youtubeHistoryCssOff = '#endpoint[href="/feed/history"] { display: none !important; }';
    const youtubeExploreCssOn = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: block !important; }';
    const youtubeExploreCssOff = '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: none !important; }';
    const youtubeMoreCssOn = '#sections ytd-guide-section-renderer:has(a[href="https://studio.youtube.com/"]) { display: block !important; }';
    const youtubeMoreCssOff = '#sections ytd-guide-section-renderer:has(a[href="https://studio.youtube.com/"]) { display: none !important; }';
    const youtubeRelatedCssOn = '#related { visibility: visible !important; display: block !important; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: block !important; } ytm-single-column-watch-next-results-renderer .related-chips-slot-wrapper { transform: translateY(0) !important; }';
    const youtubeRelatedCssOff = '#related { visibility: hidden !important; display: none !important; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: none !important; } ytm-single-column-watch-next-results-renderer .related-chips-slot-wrapper { transform: none !important; }';
    const youtubeSidebarCssOn = '';
    const youtubeSidebarCssOff = '#secondary { display: none !important; } video.html5-main-video { width: 100% !important; height: auto !important; }';
    const youtubeCommentsCssOn = '';
    const youtubeCommentsCssOff = '#comments { visibility: hidden !important; } #app ytm-comments-entry-point-header-renderer, ytm-item-section-renderer:has([aria-label="Comments"]) { display: none !important; }';
    const youtubeAdsCssOn = '';
    const youtubeAdsCssOff = 'ytm-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-carousel-ad-renderer, ytd-ad-slot-renderer, #masthead-ad, ytd-ad-slot-renderer { display: none !important; }  /* video page */ ytm-promoted-sparkles-web-renderer, ytm-companion-ad-renderer, #player-ads {display: none !important; }';
    const youtubeViewsCssOn = '';
    const youtubeViewsCssOff = '/* watch page */ #metadata-line.ytd-video-meta-block > .ytd-video-meta-block:first-of-type {display: none !important; } #metadata-line.ytd-video-meta-block>.ytd-video-meta-block:not(:first-of-type):before, #metadata-line.ytd-grid-video-renderer>.ytd-grid-video-renderer:not(:first-of-type):before { content: ""; margin: 0px; } /* video page */ #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(1), #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(2) { display: none; } /* channel page */ ytd-two-column-browse-results-renderer #metadata-line span.ytd-grid-video-renderer:first-of-type { display: none !important; } /* m.youtube.com */ ytm-badge-and-byline-renderer .ytm-badge-and-byline-item-byline:not(:first-of-type):not(:last-of-type), ytm-badge-and-byline-renderer .ytm-badge-and-byline-separator:not(:first-of-type) { display: none; } .slim-video-metadata-header .secondary-text .yt-core-attributed-string {display: none;}';
    const youtubeLikesCssOn = '';
    const youtubeLikesCssOff = 'ytd-watch-metadata #top-level-buttons-computed like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; } /* m.youtube.com */ ytm-slim-video-metadata-section-renderer like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; }';
    const youtubeSubscribersCssOn = '';
    const youtubeSubscribersCssOff = '#owner-sub-count, #subscriber-count { display: none !important; } /* m.youtube.com */ .slim-owner-icon-and-title .subhead .yt-core-attributed-string { display: none !important; }';
    
    
    // Used for telling the application that the CSS modified is within a shadow-dom.
    // If a variable is declared in this dict, the style is appended in the given CSS selector
    const shadowSelectors = {
        
    }
    
    
    // function to create style element with the specified CSS content
    function createStyleElement(some_style_id, some_css){
        const elementToHide = some_style_id.replace("Style", "");
        const dom = (elementToHide in shadowSelectors) ? document.querySelector(shadowSelectors[elementToHide]).shadowRoot : document.head;
        //const dom = document;
        if(!dom.querySelector("#" + some_style_id)){
            var styleElement = document.createElement("style");
            styleElement.id = some_style_id;
            dom.appendChild(styleElement).innerHTML = some_css;
        } else {
            dom.querySelector("#" + some_style_id).innerHTML = some_css;
        };
    };
    
    // loop over the platforms. If the platform for the current URL is 'on' (or we haven't saved a status for it), create its style elements
    platformsWeTarget.forEach(function (platform) {
        if (window.location.hostname.includes(platform)){
            var filteredElements = elementsThatCanBeHidden.filter(element =>
              element.includes(platform)
            );
            
            var key = platform + "Status";
            
            browser.storage.sync.get(key, function(result) {
                
                let platformIsOn = result[key];
                  // loop over the elements and create HTML style element for each
                  // If an element's key in storage is set to 'false', show the
                  // element, otherwise hide it
                  filteredElements.forEach(function (item) {
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
              
            });
        };
    });
    
    // let the popup ask for the current view status of the elements (so it can set the checkboxes accordingly)
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if(message.method === "check"){
            var currentStyle = document.getElementById(message.element + "Style");
    
            // only check the blur element for elements that have it
            if(message.element == "youtubeThumbnails" || message.element == "youtubeNotifications"){
                if (currentStyle.innerHTML === eval(message.element + 'CssBlur')){
                    sendResponse({text: "blur"});
                } else if (currentStyle.innerHTML === eval(message.element + 'CssBlack')){
                    sendResponse({text: "black"});
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
        const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
        //const dom = document;
        var currentStyle = dom.querySelector("#" + message.element + "Style");
        
        if(message.method === "change"){
            if (currentStyle == undefined){
                console.log("not on active tab");
            } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                currentStyle.innerHTML = eval(message.element + 'CssOff')
            } else {
                currentStyle.innerHTML = eval(message.element + 'CssOn')
            };
        } else if(message.method === "hideAll"){
            currentStyle.innerHTML = eval(message.element + 'CssOff')
        } else if(message.method === "showAll"){
            if (window.location.hostname.includes("google")){
                currentStyle.innerHTML = googleAdsCssSwitchOff;
            } else {
                currentStyle.innerHTML = eval(message.element + 'CssOn')
            }
        };
        
        // handle blur events
        if(message.method === "changeMultiToggle"){
            if (currentStyle == undefined){
                console.log("not on active tab");
            } else {
                
                currentStyle.innerHTML = eval(message.element + 'Css' + message.action)
            };
        };
    });
})();
