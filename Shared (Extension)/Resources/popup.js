// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    var elementsThatCanBeHidden = [ "recVids", "shorts", "subscriptions", "explore", "more", "related", "comments" ];
    
    // set checkboxes according to current status
    function setCheckboxState(element_to_check, id_of_toggle){
        var currentToggle = document.getElementById(id_of_toggle);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            chrome.tabs.sendMessage(tabs[0].id, { method: "check", element: element_to_check }, function(response){
                // if the checkbox is for a page that's different from the one we're on, set to its saved state
                if (response.text === "not on active tab") {
                    elementsThatCanBeHidden.forEach(function (element) {
                        var key = element_to_check + "Status";
                        
                        browser.storage.sync.get(key, function(result) {
                            currentToggle.checked = result[key];
                        });
                    });
                    // otherwise set it to what's currently visible on the page
                } else if (response.text === "visible"){
                    currentToggle.checked = true;
                } else {
                    currentToggle.checked = false;
                }
            });
        });
    };
    
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    
    var saveButton = document.querySelector('#saveButton');
    
    saveButton.addEventListener('click', (e) => {
        // save the state of the checkboxes to local storage
        elementsThatCanBeHidden.forEach(function (element) {
            var key = element + "Status";
            
            browser.storage.sync.set({ [key]: document.getElementById(element + "Toggle").checked });
        });
    
        e.target.setAttribute("value", "......");
        delay(250).then(() => e.target.setAttribute("value", "Saved!"));
        delay(1500).then(() => e.target.setAttribute("value", "Save settings"));
    })
    
    
    // assign functions to the checkboxes
    function assignCheckBoxFunction(element_to_change, id_of_toggle){
        var currentToggle = document.getElementById(id_of_toggle);
        
        // make it hide/show on mac
        currentToggle.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "change", element: element_to_change, status: currentToggle.checked });
              });
            }, false);
    };
    
    elementsThatCanBeHidden.forEach(function (item) {
        setCheckboxState(item, item + "Toggle");
        assignCheckBoxFunction(item, item + "Toggle");
    });
    
}, false);
