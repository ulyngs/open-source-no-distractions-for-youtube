// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0].url;
        // if we're on FB, then set the status of the checkboxes
        if (activeTab.indexOf("://m.youtube.com/") > -1 || activeTab.indexOf("://www.youtube.com/") > -1){
            
            chrome.tabs.sendMessage(tabs[0].id, {method: "checkRecHome"}, function(response) {
                
                var recCheckbox = document.getElementById('recVidsToggle');
                
                if(response.method == "checkRecHome"){
                    if(response.text === "visible"){
                        recCheckbox.checked = true;
                    } else {
                        recCheckbox.checked = false;
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
        }
    });
    
    
    var recCheckbox = document.getElementById('recVidsToggle');
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
    
}, false);
