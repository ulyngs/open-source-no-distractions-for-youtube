// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0].url;
        // if we're on YouTube, then set the status of the checkboxes correctly
        if (activeTab.indexOf("://m.youtube.com/") > -1 || activeTab.indexOf("://www.youtube.com/") > -1){
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkRecHome"}, function(response) {
                
                var recCheckbox = document.getElementById('recVidsToggle');
                
                if(response.method === "checkRecHome"){
                    if(response.text === "visible"){
                        recCheckbox.checked = true;
                    } else {
                        recCheckbox.checked = false;
                    }
                }
            });
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkShorts"}, function(response) {
                
                var shortsCheckbox = document.getElementById('shortsToggle');
                
                if(response.method === "checkShorts"){
                    if(response.text === "visible"){
                        shortsCheckbox.checked = true;
                    } else {
                        shortsCheckbox.checked = false;
                    }
                }
            });
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkRelVids"}, function(response) {
                
                var relCheckbox = document.getElementById('relVidsToggle');
                
                if(response.method == "checkRelVids"){
                    if(response.text === "visible"){
                        relCheckbox.checked = true;
                    } else {
                        relCheckbox.checked = false;
                    }
                }
            });
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkComments"}, function(response) {
                
                var commentsCheckbox = document.getElementById('commentsToggle');
                
                if(response.method == "checkComments"){
                    if(response.text === "visible"){
                        commentsCheckbox.checked = true;
                    } else {
                        commentsCheckbox.checked = false;
                    }
                }
            });
        }
    });
    
    // assign functions to the checkboxes
    var recCheckbox = document.getElementById('recVidsToggle');
    
    // make it hide/show on mac
    recCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeRecVids"}, function(response) {
                
                if(response.method == "changeRecVids"){
                    if(response.text === "rec vids visible"){
                        console.log("Recommended videos are visible")
                    } else {
                        console.log("Recommended videos are hidden")
                    }
                }
            });
          });
        }, false);
    
    // make it hide/show on mobile
    recCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeRecVidsMobile"}, function(response) {
                
                if(response.method == "changeRecVidsMobile"){
                    if(response.text === "rec vids visible"){
                        console.log("Recommended videos are visible")
                    } else {
                        console.log("Recommended videos are hidden")
                    }
                }
            });
          });
        }, false);
    
    // assign functions to the checkboxes
    var shortsCheckbox = document.getElementById('shortsToggle');
    shortsCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeShorts"}, function(response) {
                
                if(response.method == "changeShorts"){
                    if(response.text === "shorts visible"){
                        console.log("Shorts are visible")
                    } else {
                        console.log("Shorts are hidden")
                    }
                }
            });
          });
        }, false);
    
    
    var relCheckbox = document.getElementById('relVidsToggle');
    relCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeRelVids"}, function(response) {
                
                if(response.method == "changeRelVids"){
                    if(response.text === "related vids visible"){
                        console.log("Related videos are visible")
                    } else {
                        console.log("Related videos are hidden")
                    }
                }
            });
          });
        }, false);
    
    relCheckbox.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "changeRelVidsMobile"}, function(response) {
                
                if(response.method == "changeRelVidsMobile"){
                    if(response.text === "related vids visible"){
                        console.log("Related videos are visible")
                    } else {
                        console.log("Related videos are hidden")
                    }
                }
            });
          });
        }, false);
    
    var commentsCheckbox = document.getElementById('commentsToggle');
    commentsCheckbox.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "changeComments"}, function(response) {
            
            if(response.method == "changeComments"){
                if(response.text === "comments visible"){
                    console.log("Comments are visible")
                } else {
                    console.log("Comments are hidden")
                }
            }
        });
      });
    }, false);
    
}, false);
