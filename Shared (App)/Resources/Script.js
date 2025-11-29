function show(platform, enabled) {
    document.body.classList.add(`platform-${platform}`);
    
    // Detect iPad vs iPhone on iOS
    if (platform === 'ios') {
        const isIPad = navigator.userAgent.includes('iPad') || 
                      (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
        
        if (isIPad) {
            document.body.classList.add('platform-ipad');
        } else {
            document.body.classList.add('platform-iphone');
        }
    }

    if (typeof enabled === "boolean") {
        document.body.classList.toggle(`state-on`, enabled);
        document.body.classList.toggle(`state-off`, !enabled);
    } else {
        document.body.classList.remove(`state-on`);
        document.body.classList.remove(`state-off`);
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

function openSafari() {
    webkit.messageHandlers.controller.postMessage("open-safari");
}

// Initialize event listeners when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Open Safari button
    const openSafariBtn = document.querySelector("button.open-safari-btn");
    if (openSafariBtn) {
        openSafariBtn.addEventListener("click", openSafari);
    }

    // Open Preferences button (for macOS)
    const openPreferencesBtn = document.querySelector("button.open-preferences");
    if (openPreferencesBtn) {
        openPreferencesBtn.addEventListener("click", openPreferences);
    }
});
