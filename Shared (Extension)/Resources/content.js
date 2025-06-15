 (function() {
     if (window.hasRun) {
         return;
     }
     window.hasRun = true;

     const platformsWeTarget = ["youtube"];
     const elementsThatCanBeHidden = ["youtubeSearch", "youtubeSearchPredict", "youtubeRecVids", "youtubeThumbnails", "youtubeNotifications", "youtubeProfileImg",
                                      "youtubeShorts", "youtubeSubscriptions", "youtubeLibrary", "youtubeHistory", "youtubeExplore", "youtubeMore",
                                      "youtubeRelated", "youtubeSidebar", "youtubeComments", "youtubeAds", "youtubeViews", "youtubeLikes", "youtubeSubscribers"];
     
     const youtubeSearchCssOn = '';
     const youtubeSearchCssOff = '#center > yt-searchbox.ytSearchboxComponentHost.ytSearchboxComponentDesktop.ytd-masthead, ytd-searchbox { display: none; } button[aria-label="Search YouTube"] {display: none;}';
     const youtubeSearchPredictCssOn = '';
     const youtubeSearchPredictCssOff = 'div.gstl_50 { display: none !important; }';
     const youtubeRecVidsCssOn = 'ytd-browse[page-subtype="home"] { visibility: visible !important; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible !important; }';
     const youtubeRecVidsCssOff = 'ytd-browse[page-subtype="home"] { display: none; } div[tab-identifier="FEwhat_to_watch"] { visibility: hidden; }';
     const youtubeThumbnailsCssOn = 'ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: block !important; } ytd-thumbnail img, ytd-playlist-thumbnail img { filter: none; } .media-item-thumbnail-container, .video-thumbnail-img { display: block !important; filter: none; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: auto !important; }';
     const youtubeThumbnailsCssOff = 'ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: none !important; } .media-item-thumbnail-container, .video-thumbnail-img { display: none !important; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: 100px !important; }';
     const youtubeThumbnailsCssBlur = 'ytd-thumbnail img, ytd-playlist-thumbnail img { filter: blur(7px); } .media-item-thumbnail-container, .video-thumbnail-img { filter: blur(7px); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; }';
     const youtubeThumbnailsCssBlack = 'ytd-thumbnail img, ytd-playlist-thumbnail img { filter: brightness(0); } .media-item-thumbnail-container, .video-thumbnail-img { filter: brightness(0); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; }';
     const youtubeNotificationsCssOn = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: inline-flex; }';
     const youtubeNotificationsCssOff = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }';
     const youtubeNotificationsCssBlur = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: none; }';
     const youtubeNotificationsCssBlack = 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }';
     const youtubeProfileImgCssOn = '';
     const youtubeProfileImgCssOff = '#avatar-link, #avatar-container, #avatar {display: none; visibility: hidden;} .channel-thumbnail-icon, #channel-thumbnail, #avatar-section, #author-thumbnail, ytm-comments-entry-point-teaser-renderer img.ytm-comments-entry-point-teaser-avatar, ytm-profile-icon.slim-owner-profile-icon, ytm-profile-icon.comment-icon {display: none;} #creator-thumbnail, #expander.ytd-comment-replies-renderer .dot.ytd-comment-replies-renderer, ytm-channel-thumbnail-with-link-renderer {display: none !important;}';
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
     const youtubeAdsCssOff = 'ytm-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-carousel-ad-renderer, ytd-ad-slot-renderer, #masthead-ad, ytd-ad-slot-renderer { display: none !important; } ytm-promoted-sparkles-web-renderer, ytm-companion-ad-renderer, #player-ads {display: none !important; }';
     const youtubeViewsCssOn = '';
     const youtubeViewsCssOff = '#metadata-line.ytd-video-meta-block > .ytd-video-meta-block:first-of-type {display: none !important; } #metadata-line.ytd-video-meta-block>.ytd-video-meta-block:not(:first-of-type):before, #metadata-line.ytd-grid-video-renderer>.ytd-grid-video-renderer:not(:first-of-type):before { content: ""; margin: 0px; } #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(1), #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(2) { display: none; } ytd-two-column-browse-results-renderer #metadata-line span.ytd-grid-video-renderer:first-of-type { display: none !important; } ytm-badge-and-byline-renderer .ytm-badge-and-byline-item-byline:not(:first-of-type):not(:last-of-type), ytm-badge-and-byline-renderer .ytm-badge-and-byline-separator:not(:first-of-type) { display: none; } .slim-video-metadata-header .secondary-text .yt-core-attributed-string {display: none;}';
     const youtubeLikesCssOn = '';
     const youtubeLikesCssOff = 'ytd-watch-metadata #top-level-buttons-computed like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; } ytm-slim-video-metadata-section-renderer like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; }';
     const youtubeSubscribersCssOn = '';
     const youtubeSubscribersCssOff = '#owner-sub-count, #subscriber-count { display: none !important; } .slim-owner-icon-and-title .subhead .yt-core-attributed-string { display: none !important; }';

     const shadowSelectors = {};

     function createStyleElement(some_style_id, some_css) {
         const elementToHide = some_style_id.replace("Style", "");
         const dom = (elementToHide in shadowSelectors) ? document.querySelector(shadowSelectors[elementToHide]).shadowRoot : document.head;
         if (!dom.querySelector("#" + some_style_id)) {
             var styleElement = document.createElement("style");
             styleElement.id = some_style_id;
             dom.appendChild(styleElement).innerHTML = some_css;
         } else {
             dom.querySelector("#" + some_style_id).innerHTML = some_css;
         }
     }

     function generateCSSSelector(el) {
         if (!(el instanceof Element)) return null;
         if (el.id) {
             const idSelector = `#${CSS.escape(el.id)}`;
             try {
                 if (document.querySelectorAll(idSelector).length === 1) return idSelector;
             } catch (e) {}
         }
         let path = [];
         let currentEl = el;
         while (currentEl && currentEl !== document.documentElement && currentEl !== document.body) {
             let selector = currentEl.nodeName.toLowerCase();
             let parent = currentEl.parentElement;
             if (!parent) break;
             let index = 1;
             let sibling = currentEl.previousElementSibling;
             while (sibling) {
                 if (sibling.nodeName.toLowerCase() === selector) index++;
                 sibling = sibling.previousElementSibling;
             }
             if (index > 1) {
                 let ofTypeIndex = 1;
                 let ofTypeSibling = currentEl.previousElementSibling;
                 while (ofTypeSibling) {
                     if (ofTypeSibling.nodeName.toLowerCase() === selector) ofTypeIndex++;
                     ofTypeSibling = ofTypeSibling.previousElementSibling;
                 }
                 selector += (ofTypeIndex === index) ? `:nth-of-type(${index})` : `:nth-child(${index})`;
             } else {
                 let nextSibling = currentEl.nextElementSibling;
                 let hasSimilarNext = false;
                 while (nextSibling) {
                     if (nextSibling.nodeName.toLowerCase() === selector) {
                         hasSimilarNext = true;
                         break;
                     }
                     nextSibling = nextSibling.nextElementSibling;
                 }
                 if (hasSimilarNext) selector += ':nth-of-type(1)';
             }
             path.unshift(selector);
             currentEl = parent;
         }
         if (path.length === 0) return null;
         const fullPath = path.join(' > ');
         try {
             const elements = document.querySelectorAll(fullPath);
             if (elements.length !== 1) {
                 const bodyPath = `body > ${fullPath}`;
                 if (document.querySelectorAll(bodyPath).length === 1) return bodyPath;
             }
             return fullPath;
         } catch (e) {
             console.error("Error validating generated selector:", fullPath, e);
             return null;
         }
     }

     let isSelecting = false;
     let highlightOverlay = null;
     let selectorDisplay = null;
     let feedbackContainer = null;
     let currentHighlightedElement = null;
     let lastTapTime = 0;
     let sessionHiddenSelectors = [];
     const currentSiteIdentifier = "youtube";

     function createHighlightOverlay() {
         if (!highlightOverlay) {
             highlightOverlay = document.createElement('div');
             highlightOverlay.style.position = 'absolute';
             highlightOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
             highlightOverlay.style.border = '1px dashed red';
             highlightOverlay.style.zIndex = '2147483646';
             highlightOverlay.style.pointerEvents = 'none';
             document.body.appendChild(highlightOverlay);
         }
     }

     function createSelectorDisplay() {
         if (!selectorDisplay) {
             selectorDisplay = document.createElement('div');
             selectorDisplay.style.position = 'fixed';
             selectorDisplay.style.background = 'rgba(0, 0, 0, 0.8)';
             selectorDisplay.style.color = 'white';
             selectorDisplay.style.padding = '3px 6px';
             selectorDisplay.style.borderRadius = '3px';
             selectorDisplay.style.zIndex = '2147483647';
             selectorDisplay.style.fontSize = '11px';
             selectorDisplay.style.fontFamily = 'monospace';
             selectorDisplay.style.pointerEvents = 'none';
             selectorDisplay.style.maxWidth = '300px';
             selectorDisplay.style.whiteSpace = 'nowrap';
             selectorDisplay.style.overflow = 'hidden';
             selectorDisplay.style.textOverflow = 'ellipsis';
             document.body.appendChild(selectorDisplay);
         }
     }

     function createFeedbackContainer() {
         if (!feedbackContainer) {
             feedbackContainer = document.createElement('div');
             feedbackContainer.id = 'nodistractions-feedback-container';
             feedbackContainer.style.position = 'fixed';
             feedbackContainer.style.top = '100px';
             feedbackContainer.style.left = '10px';
             feedbackContainer.style.background = 'rgba(0, 0, 0, 0.8)';
             feedbackContainer.style.color = 'white';
             feedbackContainer.style.padding = '10px';
             feedbackContainer.style.borderRadius = '5px';
             feedbackContainer.style.zIndex = '2147483647';
             feedbackContainer.style.fontFamily = 'Arial, sans-serif';
             feedbackContainer.style.fontSize = '18px';
             feedbackContainer.style.display = 'flex';
             feedbackContainer.style.alignItems = 'center';
             feedbackContainer.style.gap = '10px';
             feedbackContainer.style.cursor = 'move';
             feedbackContainer.style.userSelect = 'none';
             document.body.appendChild(feedbackContainer);
             updateFeedbackMessage('Click element to hide it');
             setupDragEvents();
         }
     }

     function setupDragEvents() {
         let isDragging = false;
         let currentX;
         let currentY;
         let initialX;
         let initialY;

         function startDragging(e) {
             if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
             initialX = (e.clientX || e.touches[0].clientX) - currentX;
             initialY = (e.clientY || e.touches[0].clientY) - currentY;
             isDragging = true;
             feedbackContainer.style.transition = 'none';
         }

         function drag(e) {
             if (!isDragging) return;
             e.preventDefault();
             let clientX = e.clientX || (e.touches && e.touches[0].clientX);
             let clientY = e.clientY || (e.touches && e.touches[0].clientY);
             currentX = clientX - initialX;
             currentY = clientY - initialY;
             currentX = Math.max(0, Math.min(currentX, window.innerWidth - feedbackContainer.offsetWidth));
             currentY = Math.max(0, Math.min(currentY, window.innerHeight - feedbackContainer.offsetHeight));
             feedbackContainer.style.left = `${currentX}px`;
             feedbackContainer.style.top = `${currentY}px`;
         }

         function stopDragging() {
             isDragging = false;
             feedbackContainer.style.transition = 'all 0.2s ease';
         }

         currentX = parseInt(feedbackContainer.style.left) || 10;
         currentY = parseInt(feedbackContainer.style.top) || 100;
         feedbackContainer.addEventListener('mousedown', startDragging);
         document.addEventListener('mousemove', drag);
         document.addEventListener('mouseup', stopDragging);
         feedbackContainer.addEventListener('touchstart', startDragging, { passive: false });
         document.addEventListener('touchmove', drag, { passive: false });
         document.addEventListener('touchend', stopDragging);
     }

     function updateFeedbackMessage(message, showUndo = false) {
         if (!feedbackContainer) return;
         feedbackContainer.innerHTML = `<span>${message}</span>`;
         if (showUndo) {
             const undoButton = document.createElement('button');
             undoButton.textContent = 'Undo';
             undoButton.style.background = '#555';
             undoButton.style.color = 'white';
             undoButton.style.border = 'none';
             undoButton.style.padding = '5px 10px';
             undoButton.style.borderRadius = '3px';
             undoButton.style.cursor = 'pointer';
             undoButton.addEventListener('click', handleUndo);
             undoButton.addEventListener('touchend', (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 handleUndo();
             });
             feedbackContainer.appendChild(undoButton);
         }
         const doneButton = document.createElement('button');
         doneButton.textContent = 'Done';
         doneButton.style.background = '#007bff';
         doneButton.style.color = 'white';
         doneButton.style.border = 'none';
         doneButton.style.padding = '5px 10px';
         doneButton.style.borderRadius = '3px';
         doneButton.style.cursor = 'pointer';
         doneButton.addEventListener('click', () => stopSelecting(false));
         doneButton.addEventListener('touchend', (e) => {
             e.preventDefault();
             e.stopPropagation();
             stopSelecting(false);
         });
         feedbackContainer.appendChild(doneButton);
     }

     function handleUndo() {
         if (sessionHiddenSelectors.length === 0) return;
         const customStorageKey = `${currentSiteIdentifier}CustomHiddenElements`;
         browser.storage.sync.get(customStorageKey, function(result) {
             let customSelectors = result[customStorageKey] || [];
             if (!Array.isArray(customSelectors)) customSelectors = [];
             const selectorToRemove = sessionHiddenSelectors.pop();
             customSelectors = customSelectors.filter(s => s !== selectorToRemove);
             browser.storage.sync.set({ [customStorageKey]: customSelectors }, function() {
                 applyCustomElementStyles(customSelectors);
                 if (sessionHiddenSelectors.length > 0) {
                     updateFeedbackMessage('Element hidden', true);
                 } else {
                     updateFeedbackMessage('Click element to hide it');
                 }
             });
         });
     }

     function startSelecting() {
         if (isSelecting) return;
         isSelecting = true;
         createHighlightOverlay();
         createSelectorDisplay();
         createFeedbackContainer();
         document.addEventListener('mousemove', highlightElement, { capture: true });
         document.addEventListener('touchstart', highlightElement, { capture: true, passive: true });
         document.addEventListener('click', selectElementOnClick, { capture: true });
         document.addEventListener('touchend', selectElementOnTap, { capture: true });
         document.addEventListener('keydown', handleKeydown, { capture: true });
     }

     function stopSelecting(cancelled = false) {
         if (!isSelecting) return;
         isSelecting = false;
         document.removeEventListener('mousemove', highlightElement, { capture: true });
         document.removeEventListener('touchstart', highlightElement, { capture: true });
         document.removeEventListener('click', selectElementOnClick, { capture: true });
         document.removeEventListener('touchend', selectElementOnTap, { capture: true });
         document.removeEventListener('keydown', handleKeydown, { capture: true });
         if (feedbackContainer) feedbackContainer.remove();
         if (highlightOverlay) highlightOverlay.remove();
         if (selectorDisplay) selectorDisplay.remove();
         feedbackContainer = highlightOverlay = selectorDisplay = currentHighlightedElement = null;
         sessionHiddenSelectors = [];
         if (cancelled) {
             browser.runtime.sendMessage({ method: "selectionCanceled" });
         }
     }

     function handleKeydown(event) {
         if (event.key === 'Escape' && isSelecting) {
             event.preventDefault();
             event.stopImmediatePropagation();
             stopSelecting(true);
             browser.runtime.sendMessage({ method: "stopSelectingFromEscape" });
         }
     }

     function highlightElement(event) {
         if (!isSelecting) return;
         const el = event.target;
         if (!el || el === highlightOverlay || el === selectorDisplay || el.closest('#nodistractions-feedback-container')) {
             if (highlightOverlay) highlightOverlay.style.display = 'none';
             if (selectorDisplay) selectorDisplay.style.display = 'none';
             currentHighlightedElement = null;
             return;
         }
         currentHighlightedElement = el;
         const selector = generateCSSSelector(el);
         let posX, posY;
         if (event.touches && event.touches.length > 0) {
             posX = event.touches[0].clientX;
             posY = event.touches[0].clientY;
         } else {
             posX = event.clientX;
             posY = event.clientY;
         }
         if (selectorDisplay) {
             selectorDisplay.textContent = selector || "Cannot select this element";
             const displayPosX = posX + 15;
             const displayPosY = posY + 15;
             selectorDisplay.style.left = `${Math.min(displayPosX, window.innerWidth - selectorDisplay.offsetWidth - 10)}px`;
             selectorDisplay.style.top = `${Math.min(displayPosY, window.innerHeight - selectorDisplay.offsetHeight - 10)}px`;
             selectorDisplay.style.display = 'block';
         }
         if (highlightOverlay) {
             const rect = el.getBoundingClientRect();
             highlightOverlay.style.top = `${rect.top + window.scrollY}px`;
             highlightOverlay.style.left = `${rect.left + window.scrollX}px`;
             highlightOverlay.style.width = `${rect.width}px`;
             highlightOverlay.style.height = `${rect.height}px`;
             highlightOverlay.style.display = 'block';
         }
     }

     function selectElementOnClick(event) {
         if (Date.now() - lastTapTime < 500) {
             event.preventDefault();
             event.stopPropagation();
             return;
         }
         if (!isSelecting || event.target.closest('#nodistractions-feedback-container') || event.target.tagName === 'BUTTON' || event.target !== currentHighlightedElement) return;
         event.preventDefault();
         event.stopPropagation();
         processSelectedElement(currentHighlightedElement);
     }

     function selectElementOnTap(event) {
         lastTapTime = Date.now();
         if (!isSelecting || event.target.closest('#nodistractions-feedback-container') || event.target.tagName === 'BUTTON' || !currentHighlightedElement) return;
         event.preventDefault();
         event.stopPropagation();
         processSelectedElement(currentHighlightedElement);
     }

     function processSelectedElement(el) {
         if (!el || el === document.body || el === document.documentElement) return;
         const selector = generateCSSSelector(el);
         if (!selector) {
             browser.runtime.sendMessage({ method: "selectionFailed", reason: "Could not generate selector" });
             return;
         }
         const storageKey = `${currentSiteIdentifier}CustomHiddenElements`;
         browser.storage.sync.get(storageKey, function(result) {
             let customSelectors = result[storageKey] || [];
             if (!Array.isArray(customSelectors)) customSelectors = [];
             if (!customSelectors.includes(selector)) {
                 customSelectors.push(selector);
                 sessionHiddenSelectors.push(selector);
                 browser.storage.sync.set({ [storageKey]: customSelectors }, function() {
                     applyCustomElementStyles(customSelectors);
                     browser.runtime.sendMessage({ method: "elementSelected", selector: selector });
                     updateFeedbackMessage('Element hidden', true);
                 });
             } else {
                 updateFeedbackMessage('Element already hidden');
             }
         });
     }

     function applyCustomElementStyles(selectors) {
         const styleId = `customHidden_youtubeStyle`;
         const css = selectors.length > 0 ? selectors.map(s => `${s} { display: none !important; }`).join('\n') : '';
         createStyleElement(styleId, css);
     }

     platformsWeTarget.forEach(function(platform) {
         if (window.location.hostname.includes(platform)) {
             var filteredElements = elementsThatCanBeHidden.filter(element => element.includes(platform));
             var key = platform + "Status";
             browser.storage.sync.get(key, function(result) {
                 let platformIsOn = result[key];
                 filteredElements.forEach(function(item) {
                     var styleName = item + "Style";
                     var key = item + "Status";
                     if (item === "youtubeThumbnails" || item === "youtubeNotifications") {
                         browser.storage.sync.get(key, function(result) {
                             if (result[key] == undefined || result[key] === false) {
                                 createStyleElement(styleName, eval(item + "CssOn"));
                             } else {
                                 createStyleElement(styleName, eval(item + "Css" + result[key]));
                             }
                         });
                     } else {
                         browser.storage.sync.get(key, function(result) {
                             if (result[key] == true) {
                                 createStyleElement(styleName, eval(item + "CssOff"));
                             } else {
                                 createStyleElement(styleName, eval(item + "CssOn"));
                             }
                         });
                     }
                 });
             });
             const customStorageKey = `${platform}CustomHiddenElements`;
             browser.storage.sync.get(customStorageKey, function(result) {
                 let customSelectors = result[customStorageKey] || [];
                 if (!Array.isArray(customSelectors)) customSelectors = [];
                 applyCustomElementStyles(customSelectors);
             });
         }
     });

     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
         if (message.method === "check") {
             var currentStyle = document.getElementById(message.element + "Style");
             if (message.element == "youtubeThumbnails" || message.element == "youtubeNotifications") {
                 if (currentStyle && currentStyle.innerHTML === eval(message.element + 'CssBlur')) {
                     sendResponse({text: "blur"});
                 } else if (currentStyle && currentStyle.innerHTML === eval(message.element + 'CssBlack')) {
                     sendResponse({text: "black"});
                 } else if (currentStyle && currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                     sendResponse({text: "visible"});
                 } else if (currentStyle && currentStyle.innerHTML === eval(message.element + 'CssOff')) {
                     sendResponse({text: "hidden"});
                 } else {
                     sendResponse({text: "style element is undefined"});
                 }
             } else {
                 if (currentStyle == undefined) {
                     sendResponse({text: "style element is undefined"});
                 } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                     sendResponse({text: "visible"});
                 } else if (currentStyle.innerHTML === eval(message.element + 'CssOff')) {
                     sendResponse({text: "hidden"});
                 }
             }
         } else if (message.method === "checkCustom" && message.selector) {
             const styleId = `customHidden_youtubeStyle`;
             const styleElement = document.head.querySelector(`#${styleId}`);
             let isVisible = true;
             if (styleElement && styleElement.textContent.includes(`${message.selector} { display: none !important; }`)) {
                 isVisible = false;
             }
             sendResponse({ visible: isVisible });
         } else if (message.method === "toggleCustomVisibility" && message.selector) {
             const customStorageKey = `${currentSiteIdentifier}CustomHiddenElements`;
             browser.storage.sync.get(customStorageKey, function(result) {
                 let customSelectors = result[customStorageKey] || [];
                 if (!Array.isArray(customSelectors)) customSelectors = [];
                 const css = customSelectors
                     .map(s => s === message.selector && message.visible ? '' : `${s} { display: none !important; }`)
                     .filter(s => s)
                     .join('\n');
                 createStyleElement(`customHidden_youtubeStyle`, css);
             });
         } else if (message.method === "change") {
             const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
             var currentStyle = dom.querySelector("#" + message.element + "Style");
             if (currentStyle == undefined) {
                 console.log("not on active tab");
             } else if (currentStyle.innerHTML === eval(message.element + 'CssOn')) {
                 currentStyle.innerHTML = eval(message.element + 'CssOff');
             } else {
                 currentStyle.innerHTML = eval(message.element + 'CssOn');
             }
         } else if (message.method === "hideAll") {
             const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
             var currentStyle = dom.querySelector("#" + message.element + "Style");
             if (currentStyle) {
                 currentStyle.innerHTML = eval(message.element + 'CssOff');
             }
         } else if (message.method === "showAll") {
             const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
             var currentStyle = dom.querySelector("#" + message.element + "Style");
             if (currentStyle) {
                 currentStyle.innerHTML = eval(message.element + 'CssOn');
             }
         } else if (message.method === "changeMultiToggle") {
             const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
             var currentStyle = dom.querySelector("#" + message.element + "Style");
             if (currentStyle == undefined) {
                 console.log("not on active tab");
             } else {
                 currentStyle.innerHTML = eval(message.element + 'Css' + message.action);
             }
         } else if (message.method === "startSelecting") {
             startSelecting();
         } else if (message.method === "stopSelecting") {
             stopSelecting(message.cancelled);
         } else if (message.method === "removeCustomElement" && message.selector) {
             const customStorageKey = `${currentSiteIdentifier}CustomHiddenElements`;
             browser.storage.sync.get(customStorageKey, function(result) {
                 let customSelectors = result[customStorageKey] || [];
                 if (!Array.isArray(customSelectors)) customSelectors = [];
                 customSelectors = customSelectors.filter(s => s !== message.selector);
                 browser.storage.sync.set({ [customStorageKey]: customSelectors }, function() {
                     applyCustomElementStyles(customSelectors);
                 });
             });
         }
     });
 })();
