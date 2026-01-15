(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    const platformsWeTarget = ["youtube"];
    const elementsThatCanBeHidden = ["youtubeSearch", "youtubeSearchPredict", "youtubeRecVids", "youtubeThumbnails", "youtubeNotifications", "youtubeProfileImg",
        "youtubeShorts", "youtubeSubscriptions", "youtubeYou", "youtubeHistory", "youtubeExplore", "youtubeMore",
        "youtubeRelated", "youtubeComments", "youtubeAds", "youtubeViews", "youtubeLikes", "youtubeSubscribers"];

    // This object holds all CSS selector strings, making them easy to manage and access.
    const cssSelectors = {
        // YouTube
        youtubeSearchCssOn: '',
        youtubeSearchCssOff: '#center > yt-searchbox.ytSearchboxComponentHost.ytSearchboxComponentDesktop.ytd-masthead, ytd-searchbox { display: none; } button[aria-label="Search YouTube"] {display: none;}',
        youtubeSearchPredictCssOn: '',
        youtubeSearchPredictCssOff: 'div[role="listbox"].ytSearchboxComponentSuggestionsContainer, div.gstl_50 { display: none !important; }',
        youtubeRecVidsCssOn: 'ytd-browse[page-subtype="home"] { visibility: visible !important; } div[tab-identifier="FEwhat_to_watch"] { visibility: visible !important; }',
        youtubeRecVidsCssOff: 'ytd-browse[page-subtype="home"] { display: none; } div[tab-identifier="FEwhat_to_watch"] { display: none !important; }',
        youtubeThumbnailsCssOn: 'yt-thumbnail-view-model, ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: block !important; } ytd-thumbnail img, ytd-playlist-thumbnail img { filter: none; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: block !important; filter: none; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: auto !important; }',
        youtubeThumbnailsCssOff: '.yt-lockup-view-model__content-image, yt-thumbnail-view-model, ytd-thumbnail, ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, a.yt-lockup-view-model-wiz__content-image { display: none !important; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { display: none !important; } .reel-shelf-items ytm-reel-item-renderer, .reel-shelf-items .reel-item-endpoint, .video-thumbnail-container-vertical { height: 100px !important; }',
        youtubeThumbnailsCssBlur: 'yt-thumbnail-view-model img, ytd-thumbnail img, ytd-playlist-thumbnail img, .yt-thumbnail-view-model__image img { filter: blur(7px) !important; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { filter: blur(7px); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; } /* Ensure container is visible for blur */',
        youtubeThumbnailsCssBlack: 'yt-thumbnail-view-model img, ytd-thumbnail img, ytd-playlist-thumbnail img, .yt-thumbnail-view-model__image img { filter: brightness(0) !important; } /* mobile */ .media-item-thumbnail-container, .video-thumbnail-img { filter: brightness(0); } ytd-thumbnail, ytd-playlist-thumbnail { display: block !important; } /* Ensure container is visible for black */',
        youtubeNotificationsCssOn: 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: inline-flex; }',
        youtubeNotificationsCssOff: 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }',
        youtubeNotificationsCssBlur: 'ytd-notification-topbar-button-renderer.ytd-masthead { display: inline-flex !important; } ytd-notification-topbar-button-renderer.ytd-masthead .yt-spec-icon-badge-shape__badge { display: none; }',
        youtubeNotificationsCssBlack: 'ytd-notification-topbar-button-renderer.ytd-masthead { display: none !important; }', // Black state is same as Off
        youtubeProfileImgCssOn: '',
        youtubeProfileImgCssOff: '.yt-lockup-metadata-view-model__avatar, #avatar-link, #avatar-container, #avatar, .yt-lockup-metadata-view-model-wiz--standard .yt-lockup-metadata-view-model-wiz__avatar {display: none !important; visibility: hidden;} .channel-thumbnail-icon, #channel-thumbnail, #avatar-section, #author-thumbnail, ytm-comments-entry-point-teaser-renderer img.ytm-comments-entry-point-teaser-avatar, ytm-profile-icon.slim-owner-profile-icon, ytm-profile-icon.comment-icon {display: none;}  #creator-thumbnail, #expander.ytd-comment-replies-renderer .dot.ytd-comment-replies-renderer, ytm-channel-thumbnail-with-link-renderer {display: none !important;}',
        youtubeShortsCssOn: '',
        youtubeShortsCssOff: 'ytd-mini-guide-entry-renderer:has(a[href="/shorts/"]), #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer[title="Shorts"],ytd-mini-guide-entry-renderer[aria-label="Shorts"], ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], ytm-rich-section-renderer:has(ytm-shorts-lockup-view-model) { display: none; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2), ytm-reel-shelf-renderer, ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]), ytm-video-with-context-renderer:has(ytm-thumbnail-overlay-time-status-renderer[data-style="SHORTS"]), grid-shelf-view-model:has(ytm-shorts-lockup-view-model) { display: none !important; }',
        youtubeSubscriptionsCssOn: 'ytd-guide-section-renderer:has(a[href="/feed/channels"]), ytd-guide-section-renderer:has(a[href="/feed/subscriptions"]) { display: block !important; } ytd-mini-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: flex !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: flex !important; }',
        youtubeSubscriptionsCssOff: 'ytd-guide-section-renderer:has(a[href="/feed/channels"]), ytd-guide-section-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; } ytd-mini-guide-entry-renderer:has(a[href="/feed/subscriptions"]) { display: none !important; } ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(3) { display: none !important; }',
        youtubeYouCssOn: 'ytd-guide-section-renderer:has(a[href="/feed/you"]) { display: block !important; } ytd-mini-guide-entry-renderer:has(a[href="/feed/you"]) { display: flex !important; } ytm-pivot-bar-item-renderer:has(.pivot-you) { display: flex !important; }',
        youtubeYouCssOff: 'ytd-guide-section-renderer:has(a[href="/feed/you"]) { display: none !important; } ytd-mini-guide-entry-renderer:has(a[href="/feed/you"]) { display: none !important; } ytm-pivot-bar-item-renderer:has(.pivot-you) { display: none !important; }',
        youtubeHistoryCssOn: '#endpoint[href="/feed/history"] { display: flex !important; }',
        youtubeHistoryCssOff: '#endpoint[href="/feed/history"] { display: none !important; }',
        youtubeExploreCssOn: '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: block !important; }',
        youtubeExploreCssOff: '#sections ytd-guide-section-renderer:has(a[href="/gaming"]) { display: none !important; }',
        youtubeMoreCssOn: '#sections ytd-guide-section-renderer:has(a[href="https://studio.youtube.com/"]) { display: block !important; }',
        youtubeMoreCssOff: '#sections ytd-guide-section-renderer:has(a[href="https://studio.youtube.com/"]) { display: none !important; }',
        youtubeRelatedCssOn: '#related { visibility: visible !important; display: block !important; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: block !important; } ytm-single-column-watch-next-results-renderer .related-chips-slot-wrapper { transform: translateY(0) !important; }',
        youtubeRelatedCssOff: '#related { visibility: hidden !important; display: none !important; } #app ytm-item-section-renderer[section-identifier="related-items"] { display: none !important; } ytm-single-column-watch-next-results-renderer .related-chips-slot-wrapper { transform: none !important; }',
        youtubeCommentsCssOn: '',
        youtubeCommentsCssOff: '#comments { visibility: hidden !important; } #app ytm-comments-entry-point-header-renderer, ytm-item-section-renderer:has([aria-label="Comments"]) { display: none !important; }',
        youtubeAdsCssOn: '',
        youtubeAdsCssOff: 'ytm-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-carousel-ad-renderer, ytd-ad-slot-renderer, #masthead-ad, ytd-ad-slot-renderer { display: none !important; }  /* video page */ ytm-promoted-sparkles-web-renderer, ytm-companion-ad-renderer, #player-ads {display: none !important; }',
        youtubeViewsCssOn: '',
        youtubeViewsCssOff: '/* watch page */ yt-content-metadata-view-model .yt-content-metadata-view-model__metadata-row:nth-child(2) span.yt-content-metadata-view-model__metadata-text:nth-child(1), yt-content-metadata-view-model .yt-content-metadata-view-model__metadata-row:nth-child(2) .yt-content-metadata-view-model__delimiter, #metadata-line.ytd-video-meta-block > .ytd-video-meta-block:first-of-type {display: none !important; } #metadata-line.ytd-video-meta-block>.ytd-video-meta-block:not(:first-of-type):before, #metadata-line.ytd-grid-video-renderer>.ytd-grid-video-renderer:not(:first-of-type):before { content: ""; margin: 0px; } /* video page */ #info > span:nth-child(1), #info > span:nth-child(2), #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(1), #info-container > .ytd-watch-metadata > .yt-formatted-string:nth-of-type(2) { display: none; } /* channel page */ ytd-two-column-browse-results-renderer #metadata-line span.ytd-grid-video-renderer:first-of-type { display: none !important; } /* m.youtube.com */ ytm-badge-and-byline-renderer .ytm-badge-and-byline-item-byline:not(:first-of-type):not(:last-of-type), ytm-badge-and-byline-renderer .ytm-badge-and-byline-separator:not(:first-of-type) { display: none; } .slim-video-metadata-header .secondary-text .yt-core-attributed-string {display: none;}',
        youtubeLikesCssOn: '',
        youtubeLikesCssOff: 'ytd-watch-metadata #top-level-buttons-computed like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; } /* m.youtube.com */ ytm-slim-video-metadata-section-renderer like-button-view-model .yt-spec-button-shape-next__button-text-content { display: none !important; }',
        youtubeSubscribersCssOn: '',
        youtubeSubscribersCssOff: '#owner-sub-count, #subscriber-count { display: none !important; } /* m.youtube.com */ .slim-owner-icon-and-title .subhead .yt-core-attributed-string { display: none !important; }',

        // Facebook
        facebookFeedCssOn: '#ssrb_feed_start + div, div.x1hc1fzr.x1unhpq9.x6o7n8i { visibility: visible !important; } #screen-root div > div[data-mcomponent="MContainer"] > div.m.displayed:nth-child(n+6) { display: block !important; }',
        facebookFeedCssOff: '#ssrb_feed_start + div, div.x1hc1fzr.x1unhpq9.x6o7n8i { visibility: hidden !important; } #screen-root div:not([data-adjust-on-keyboard-shown="true"]) > div[data-mcomponent="MContainer"] > div.m.displayed:nth-child(n+7), #screen-root div[data-mcomponent="MContainer"] div[data-mcomponent="MContainer"]:has(div[data-testid^="post-profile"]) { display: none !important; }',
        facebookWatchCssOn: '',
        facebookWatchCssOff: 'a[href$="/watch/"], a[aria-label="Video"], div[aria-label*="video" i] { display: none !important; } /* mobile */ div[role="button"]:has(div[data-hidden-ref-key="videos.jewel.hidden"]) {display: none !important;} div.m.displayed:has(div[data-hidden-ref-key="videos.jewel.hidden"]) {background-color: white !important;} ',
        facebookNotificationsCssOn: '',
        facebookNotificationsCssOff: 'div[aria-label*="Notifications"], div[data-hidden-ref-key="notifications.pill.jewel.hidden"], #screen-root div[data-mcomponent="MScreen"] div[data-mcomponent="MContainer"] div[data-mcomponent="MContainer"]:nth-child(2) div[role="button"]:nth-child(5) div[data-mcomponent="MContainer"]:nth-child(3) {visibility: hidden !important;}',
        facebookChatCssOn: 'div[role="complementary"] div[data-visualcompletion="ignore-dynamic"] > div.x1n2onr6:not([role="cell"]) { visibility: visible !important; }',
        facebookChatCssOff: 'div[role="complementary"] div[data-visualcompletion="ignore-dynamic"] > div.x1n2onr6:not([role="cell"]) { visibility: hidden !important; }',
        facebookStoriesCssOn: 'div[aria-label="Stories"], #screen-root div[data-mcomponent="MContainer"] > div[data-mcomponent="MContainer"]:has(div[aria-label*="story"]) { display: block !important;}',
        facebookStoriesCssOff: 'li.html-li.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl:has(a[href*="/reel/"]), div[aria-label="Stories"] { display: none !important; } #screen-root div[data-mcomponent="MContainer"] > div[data-mcomponent="MContainer"]:has(div[aria-label*="story"]) { display: none !important;}',
        facebookSponsoredCssOn: '',
        facebookSponsoredCssOff: 'a[aria-label="Advertiser"] { display: none !important; }',

        // X (Twitter)
        xExploreCssOn: 'nav[role="navigation"] a[href="/explore"] { display: flex !important; }',
        xExploreCssOff: 'nav[role="navigation"] a[href="/explore"] { display: none !important; }',
        xNotificationsCssOn: 'nav[role="navigation"] a[href="/notifications"] { display: flex !important; }',
        xNotificationsCssOff: 'nav[role="navigation"] a[href="/notifications"] { display: none !important; }',
        xTrendsCssOn: 'div[data-testid="sidebarColumn"] section[role="region"] {display: flex !important;}',
        xTrendsCssOff: 'div[data-testid="sidebarColumn"] section[role="region"] {display: none !important; }',
        xFollowCssOn: 'div[data-testid="sidebarColumn"] div.css-175oi2r.r-1bro5k0:has(aside[role="complementary"]) { display: flex !important;}',
        xFollowCssOff: 'div[data-testid="sidebarColumn"] div.css-175oi2r.r-1bro5k0:has(aside[role="complementary"]) { display: none !important;}',
        xTimelineCssOn: 'div[data-testid="primaryColumn"] section[role="region"] {visibility: visible !important; }',
        xTimelineCssOff: 'div[data-testid="primaryColumn"] section[role="region"] {visibility: hidden !important; }',

        // Instagram
        instagramFeedCssOn: 'main[role="main"] div.xw7yly9 > div.x168nmei, section._aalv._aal_ div._aam1 > div.x9f619, main[role="main"] div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1:has(article) {display: block !important;}',
        instagramFeedCssOff: 'main[role="main"] div.xw7yly9 > div.x168nmei, /* mobile 25 June */ main[role="main"] .x1qjc9v5 .x9f619:has(article), /* mobile */ section._aalv._aal_ div._aam1 > div._aac4, /* mobile 8 Apr 2024 */ main[role="main"] div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1:has(article) {display: none !important;}',
        instagramSearchFeedCssOn: '',
        instagramSearchFeedCssOff: 'main.xvbhtw8 div.x78zum5.xdt5ytf.x11lt19s.x1n2onr6.xph46j.x7x3xai.xsybdxg.x194l6zq, main[role="main"] ._aalg div[data-visualcompletion="loading-state"] {display: none !important;}',
        instagramStoriesCssOn: 'main div.xmnaoh6, section._aalv._aal_ div._aam1 > div._aac4, div[data-pagelet="story_tray"], main[role="main"] div.x1ixjvfu.x1q0q8m5.xso031l, div[aria-label="Your story"], div[aria-label^="Story by"] {display: block !important;}',
        instagramStoriesCssOff: 'main div.xmnaoh6, section._aalv._aal_ div._aam1 > div._aac4, div[data-pagelet="story_tray"], main[role="main"] div.x1ixjvfu.x1q0q8m5.xso031l, div[aria-label="Your story"], div[aria-label^="Story by"] {display: none !important;}',
        instagramMutedStoriesCssOn: 'main[role="main"] div[role="menu"] button[role="menuitem"].xbyyjgo { display: flex !important; }',
        instagramMutedStoriesCssOff: 'main[role="main"] div[role="menu"] button[role="menuitem"].xbyyjgo { display: none !important; }',
        instagramExploreCssOn: 'a[href="/explore/"] { display: flex !important; }',
        instagramExploreCssOff: 'a[href="/explore/"] { display: none !important; }',
        instagramReelsCssOn: 'a[href="/reels/"] { display: flex !important; }',
        instagramReelsCssOff: 'a[href="/reels/"] { display: none !important; }',
        instagramSuggestionsCssOn: 'div.html-div.x14z9mp.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.xqui205.x1e56ztr.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1:has(a[href="/explore/people/"]) { display: block !important; }',
        instagramSuggestionsCssOff: 'div.html-div.x14z9mp.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.xqui205.x1e56ztr.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1:has(a[href="/explore/people/"]) { display: none !important; }',
        instagramCommentsCssOn: 'div.html-div.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1xmf6yo.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1:has(a[href*="/comments/"]) {display: block !important;}',
        instagramCommentsCssOff: 'div.html-div.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1xmf6yo.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1:has(a[href*="/comments/"]) {display: none !important;}',

        // LinkedIn
        linkedinFeedCssOn: '/* needs to be explicitly shown, otherwise not loaded */ div.scaffold-finite-scroll.scaffold-finite-scroll--infinite, div.scaffold-finite-scroll.scaffold-finite-scroll--finite, #feed-container, .feed-container {display: block !important;}',
        linkedinFeedCssOff: 'div.scaffold-finite-scroll.scaffold-finite-scroll--infinite, div.scaffold-finite-scroll.scaffold-finite-scroll--finite, #feed-container, .feed-container {display: none !important;}',
        linkedinNotificationsCssOn: '',
        linkedinNotificationsCssOff: 'span.notification-badge--show, #nav-notifications-small-badge, #nav-people-small-badge, span[data-badge-source="notificationsCount"] { display: none !important; }',
        linkedinNewsCssOn: '#feed-news-module, .feed-follows-module { display: block !important; }',
        linkedinNewsCssOff: '#feed-news-module, .feed-follows-module { display: none !important; }',
        linkedinAdsCssOn: 'section.ad-banner-container { display: block !important;}',
        linkedinAdsCssOff: 'section.ad-banner-container { display: none !important;}',

        // WhatsApp
        whatsappPreviewCssOn: 'div[data-testid="cell-frame-secondary"] { display: block !important; }',
        whatsappPreviewCssOff: 'div[data-testid="cell-frame-secondary"] { display: none !important; }',
        whatsappNotificationPromptCssOn: 'span[data-testid="chat-butterbar"] { display: block !important; }',
        whatsappNotificationPromptCssOff: 'span[data-testid="chat-butterbar"] { display: none !important; }',

        // Google
        googleBackgroundCssOn: '#tads, #atvcap .ptJHdc.yY236b.c3mZkd, #tads .CnP9N.U3A9Ac.irmCpc,.commercial-unit-mobile-top,.commercial-unit-mobile-top .v7hl4d,.commercial-unit-mobile-bottom .v7hl4d {background-color: transparent !important;}',
        googleBackgroundCssOff: '#tads, #atvcap .ptJHdc.yY236b.c3mZkd, #tads .CnP9N.U3A9Ac.irmCpc,.commercial-unit-mobile-top,.commercial-unit-mobile-top .v7hl4d,.commercial-unit-mobile-bottom .v7hl4d {background-color: #F2E6C3 !important; padding: 8px !important; border-radius: 6px !important;}',
        googleAIOverviewCssOn: '',
        googleAIOverviewCssOff: '#eKIzJc { display: none !important; }',

        // Reddit
        redditFeedCssOn: 'shreddit-feed { display: block !important; }',
        redditFeedCssOff: 'shreddit-feed { display: none !important; }',
        redditPopularCssOn: 'a[href="/r/popular/"] { display: flex !important; }',
        redditPopularCssOff: 'a[href="/r/popular/"] { display: none !important; }',
        redditAllCssOn: 'a[href="/r/all/"] { display: flex !important; }',
        redditAllCssOff: 'a[href="/r/all/"] { display: none !important; }',
        redditRecentCssOn: 'reddit-recent-pages { display: block !important; }',
        redditRecentCssOff: 'reddit-recent-pages { display: none !important; }',
        redditCommunitiesCssOn: '[aria-controls="communities_section"] + faceplate-auto-height-animator { display: block !important; } [aria-controls="communities_section"] { display: flex !important; }',
        redditCommunitiesCssOff: '[aria-controls="communities_section"] + faceplate-auto-height-animator { display: none !important; } [aria-controls="communities_section"] { display: none !important; }',
        redditNotificationCssOn: '#mini-inbox-tooltip { display: block !important; }',
        redditNotificationCssOff: '#mini-inbox-tooltip { display: none !important; }',
        redditChatCssOn: 'reddit-chat-header-button { display: block !important; }',
        redditChatCssOff: 'reddit-chat-header-button { display: none !important; }',
        redditTrendingCssOn: '[search-telemetry-source="popular_carousel"] { display: block !important; }',
        redditTrendingCssOff: '[search-telemetry-source="popular_carousel"] { display: none !important; }',
        redditPopularCommunitiesCssOn: '#popular-communities-list { display: block !important; } [aria-label="Popular Communities"] { display: block !important; }',
        redditPopularCommunitiesCssOff: '#popular-communities-list { display: none !important; } [aria-label="Popular Communities"] { display: none !important; }'
    };

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
            } catch (e) { }
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
        browser.storage.sync.get(customStorageKey, function (result) {
            let customSelectors = result[customStorageKey] || [];
            if (!Array.isArray(customSelectors)) customSelectors = [];
            const selectorToRemove = sessionHiddenSelectors.pop();
            customSelectors = customSelectors.filter(s => s !== selectorToRemove);
            browser.storage.sync.set({ [customStorageKey]: customSelectors }, function () {
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
        browser.storage.sync.get(storageKey, function (result) {
            let customSelectors = result[storageKey] || [];
            if (!Array.isArray(customSelectors)) customSelectors = [];
            if (!customSelectors.includes(selector)) {
                customSelectors.push(selector);
                sessionHiddenSelectors.push(selector);
                browser.storage.sync.set({ [storageKey]: customSelectors }, function () {
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

    platformsWeTarget.forEach(function (platform) {
        if (window.location.hostname.includes(platform)) {
            var filteredElements = elementsThatCanBeHidden.filter(element => element.includes(platform));
            var key = platform + "Status";
            browser.storage.sync.get(key, function (result) {
                let platformIsOn = result[key];
                filteredElements.forEach(function (item) {
                    var styleName = item + "Style";
                    var key = item + "Status";
                    if (item === "youtubeThumbnails" || item === "youtubeNotifications") {
                        browser.storage.sync.get(key, function (result) {
                            if (result[key] == undefined || result[key] === false) {
                                createStyleElement(styleName, cssSelectors[item + "CssOn"]);
                            } else {
                                createStyleElement(styleName, cssSelectors[item + "Css" + result[key]]);
                            }
                        });
                    } else {
                        browser.storage.sync.get(key, function (result) {
                            if (result[key] == true) {
                                createStyleElement(styleName, cssSelectors[item + "CssOff"]);
                            } else {
                                createStyleElement(styleName, cssSelectors[item + "CssOn"]);
                            }
                        });
                    }
                });
            });
            const customStorageKey = `${platform}CustomHiddenElements`;
            browser.storage.sync.get(customStorageKey, function (result) {
                let customSelectors = result[customStorageKey] || [];
                if (!Array.isArray(customSelectors)) customSelectors = [];
                applyCustomElementStyles(customSelectors);
            });
        }
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.method === "check") {
            var currentStyle = document.getElementById(message.element + "Style");
            if (message.element == "youtubeThumbnails" || message.element == "youtubeNotifications") {
                if (currentStyle && currentStyle.innerHTML === cssSelectors[message.element + 'CssBlur']) {
                    sendResponse({ text: "blur" });
                } else if (currentStyle && currentStyle.innerHTML === cssSelectors[message.element + 'CssBlack']) {
                    sendResponse({ text: "black" });
                } else if (currentStyle && currentStyle.innerHTML === cssSelectors[message.element + 'CssOn']) {
                    sendResponse({ text: "visible" });
                } else if (currentStyle && currentStyle.innerHTML === cssSelectors[message.element + 'CssOff']) {
                    sendResponse({ text: "hidden" });
                } else {
                    sendResponse({ text: "style element is undefined" });
                }
            } else {
                if (currentStyle == undefined) {
                    sendResponse({ text: "style element is undefined" });
                } else if (currentStyle.innerHTML === cssSelectors[message.element + 'CssOn']) {
                    sendResponse({ text: "visible" });
                } else if (currentStyle.innerHTML === cssSelectors[message.element + 'CssOff']) {
                    sendResponse({ text: "hidden" });
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
            browser.storage.sync.get(customStorageKey, function (result) {
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
            } else if (currentStyle.innerHTML === cssSelectors[message.element + 'CssOn']) {
                currentStyle.innerHTML = cssSelectors[message.element + 'CssOff'];
            } else {
                currentStyle.innerHTML = cssSelectors[message.element + 'CssOn'];
            }
        } else if (message.method === "hideAll") {
            const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
            var currentStyle = dom.querySelector("#" + message.element + "Style");
            if (currentStyle) {
                currentStyle.innerHTML = cssSelectors[message.element + 'CssOff'];
            }
        } else if (message.method === "showAll") {
            const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
            var currentStyle = dom.querySelector("#" + message.element + "Style");
            if (currentStyle) {
                currentStyle.innerHTML = cssSelectors[message.element + 'CssOn'];
            }
        } else if (message.method === "changeMultiToggle") {
            const dom = (message.element in shadowSelectors) ? document.querySelector(shadowSelectors[message.element]).shadowRoot : document.head;
            var currentStyle = dom.querySelector("#" + message.element + "Style");
            if (currentStyle == undefined) {
                console.log("not on active tab");
            } else {
                currentStyle.innerHTML = cssSelectors[message.element + 'Css' + message.action];
            }
        } else if (message.method === "startSelecting") {
            startSelecting();
        } else if (message.method === "stopSelecting") {
            stopSelecting(message.cancelled);
        } else if (message.method === "removeCustomElement" && message.selector) {
            const customStorageKey = `${currentSiteIdentifier}CustomHiddenElements`;
            browser.storage.sync.get(customStorageKey, function (result) {
                let customSelectors = result[customStorageKey] || [];
                if (!Array.isArray(customSelectors)) customSelectors = [];
                customSelectors = customSelectors.filter(s => s !== message.selector);
                browser.storage.sync.set({ [customStorageKey]: customSelectors }, function () {
                    applyCustomElementStyles(customSelectors);
                });
            });
        }
    });
})();
