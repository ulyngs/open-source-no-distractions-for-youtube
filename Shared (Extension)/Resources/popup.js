// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    var elementsThatCanBeHidden = [ "youtubeRecVids",
                                    "youtubeShorts",
                                    "youtubeSubscriptions",
                                    "youtubeLibrary",
                                    "youtubeHistory",
                                    "youtubeExplore",
                                    "youtubeMore",
                                    "youtubeRelated",
                                    "youtubeComments" ];
    
    // create function to set a checkbox according to current view status on the page
    function setCheckboxState(element_to_check, id_of_toggle){
        var currentToggle = document.getElementById(id_of_toggle);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            chrome.tabs.sendMessage(tabs[0].id, { method: "check", element: element_to_check }, function(response){
                if (response.text === "hidden"){
                    currentToggle.checked = true;
                } else if (response.text === "visible"){
                    currentToggle.checked = false;
                } else {
                    // if the style element is undefined, set to saved status
                    elementsThatCanBeHidden.forEach(function (element) {
                        var key = element_to_check + "Status";
                        
                        browser.storage.sync.get(key, function(result) {
                            currentToggle.checked = result[key];
                        });
                    });
                }
            });
        });
    };
    
    // create function to make a checkbox toggle view status on and off
    function toggleViewStatus(element_to_change, id_of_toggle){
        var currentCheckbox = document.getElementById(id_of_toggle);
        
        currentCheckbox.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "change", element: element_to_change });
              });
            }, false);
    };
    
    // assign the functions to the checkboxes
    elementsThatCanBeHidden.forEach(function (item) {
        setCheckboxState(item, item + "Toggle");
        toggleViewStatus(item, item + "Toggle");
    });
    
    //---- make the save button save the state of the checkboxes to local storage ----//
    // helper function to wait for a specified time before executing, so we can give visual feedback on the button
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    var saveButton = document.querySelector('#saveButton');
    
    saveButton.addEventListener('click', (e) => {
        // loop over the elements we can hide and set storage accordingly
        elementsThatCanBeHidden.forEach(function (element) {
            var key = element + "Status";
            
            browser.storage.sync.set({ [key]: document.getElementById(element + "Toggle").checked });
        });
    
        e.target.setAttribute("value", "......");
        delay(250).then(() => e.target.setAttribute("value", "Saved!"));
        delay(1500).then(() => e.target.setAttribute("value", "Save settings"));
    })
    
}, false);
