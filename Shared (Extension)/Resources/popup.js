// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0].url;
        // if we're on YouTube, then set the status of the checkboxes correctly
        if (activeTab.indexOf("://m.youtube.com/") > -1 || activeTab.indexOf("://www.youtube.com/") > -1){
            
            // create function to check if element is hidden
            function setPopupToggle(method_to_send, id_of_toggle){
                
                chrome.tabs.sendMessage(tabs[0].id, {method: method_to_send}, function(response) {
                    
                    var currentToggle = document.getElementById(id_of_toggle);
                    
                    if(response.method === method_to_send){
                        if(response.text === "visible"){
                            currentToggle.checked = true;
                        } else {
                            currentToggle.checked = false;
                        }
                    }
                });
            };
            
            setPopupToggle("checkRecHome", "recVidsToggle");
            setPopupToggle("checkShorts", "shortsToggle");
            setPopupToggle("checkRelVids", "relVidsToggle");
            setPopupToggle("checkComments", "commentsToggle");
            
        }
    });
    
    // assign functions to the checkboxes
    function assignCheckBoxFunction(method_to_send, id_of_toggle){
        
        var currentToggle = document.getElementById(id_of_toggle);
        
        // make it hide/show on mac
        currentToggle.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {method: method_to_send});
              });
            }, false);
    };
    
    assignCheckBoxFunction("changeRecVids", "recVidsToggle");
    assignCheckBoxFunction("changeRecVidsMobile", "recVidsToggle");
    assignCheckBoxFunction("changeShorts", "shortsToggle");
    assignCheckBoxFunction("changeRelVids", "relVidsToggle");
    assignCheckBoxFunction("changeRelVidsMobile", "relVidsToggle");
    assignCheckBoxFunction("changeComments", "commentsToggle");
    
    
}, false);
