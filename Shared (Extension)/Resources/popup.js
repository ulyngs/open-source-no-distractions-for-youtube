// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    // set checkboxes
    function setPopupToggle(element_to_check, id_of_toggle){
        var currentToggle = document.getElementById(id_of_toggle);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            chrome.tabs.sendMessage(tabs[0].id, { method: "check", element: element_to_check }, function(response){
                
                if(response.text === "visible"){
                    currentToggle.checked = true;
                } else {
                    currentToggle.checked = false;
                }
            });
        });
    };
    
    setPopupToggle("recVids", "recVidsToggle");
    setPopupToggle("shorts", "shortsToggle");
    setPopupToggle("related", "relatedToggle");
    setPopupToggle("comments", "commentsToggle");
    
    // assign functions to the checkboxes
    function assignCheckBoxFunction(method_to_send, id_of_toggle){
        var currentToggle = document.getElementById(id_of_toggle);
        
        // make it hide/show on mac
        currentToggle.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "change", element: method_to_send, status: currentToggle.checked });
              });
            }, false);
    };
    
    assignCheckBoxFunction("recVids", "recVidsToggle");
    assignCheckBoxFunction("shorts", "shortsToggle");
    assignCheckBoxFunction("related", "relatedToggle");
    assignCheckBoxFunction("comments", "commentsToggle");
    
    // make the save button save setting in local storage
    var saveButton = document.getElementById("saveButton");
    
    saveButton.addEventListener('click', function() {
        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "getSavedState" }, function(response){
                // ask for confirmation if a new thing will be shown by default that isn't shown in current saved state
                // except when we're removing recommended videos from the front page -- this is the biggest distractor
                // so if people untoggle that and save, then we'll save right away with asking for confirmation
                
                if(!(document.getElementById('recVidsToggle').checked) && response.recVidsOn == "true"){
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { method: "saveState",
                            recVidsState: document.getElementById('recVidsToggle').checked,
                            shortsState: document.getElementById('shortsToggle').checked,
                            relatedState: document.getElementById('relatedToggle').checked,
                            commentsState: document.getElementById('commentsToggle').checked
                        } );
                    });
                    
                    saveButton.innerHTML = "......";
                    delay(250).then(() => saveButton.innerHTML = "Saved!");
                } else if((((document.getElementById('recVidsToggle').checked && response.recVids == "false") || (document.getElementById('shortsToggle').checked && response.shorts == "false" ) || (document.getElementById('relatedToggle').checked && response.related == "false") || (document.getElementById('commentsToggle').checked && response.comments == "false"))) && saveButton.innerHTML != "Are you sure? This makes YouTube more distracting!"){
                    saveButton.innerHTML = "Are you sure? This makes YouTube more distracting!";
                } else {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { method: "saveState",
                            recVidsState: document.getElementById('recVidsToggle').checked,
                            shortsState: document.getElementById('shortsToggle').checked,
                            relatedState: document.getElementById('relatedToggle').checked,
                            commentsState: document.getElementById('commentsToggle').checked
                        } );
                    });
                    
                    saveButton.innerHTML = "......";
                    delay(250).then(() => saveButton.innerHTML = "Saved!");
                    
                };
            });
        });
        
    }, false);
    
}, false);
