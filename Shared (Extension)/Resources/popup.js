// popup.js
// https://developer.chrome.com/docs/extensions/mv3/messaging/

document.addEventListener('DOMContentLoaded', function() {
    // set friction checkbox
    browser.storage.sync.get("addFriction", function(result) {
      var frictionToggle = document.getElementById("frictionToggle");
      var frictionCustomisation = document.querySelector(".friction-customisation");
      
      frictionToggle.checked = result["addFriction"];
      
        if (frictionToggle.checked) {
            for (var i = 0; i < frictionCustomisation.length; i++) {
                frictionCustomisation[i].style.display = "block";
                }
        } else {
          // Otherwise, hide it
            for (var i = 0; i < frictionCustomisation.length; i++) {
                frictionCustomisation[i].style.display = "none";
                }
        }
        
      var popupContainer = document.getElementById("popup-content");
      var messageContainer = document.getElementById("delay-content");
            
      var messageBox = document.getElementById("delay-message");
      messageBox.innerText = "What is your intention?";
            
      if(result["addFriction"]) {
        messageContainer.style.display = "block";
        popupContainer.style.display = "none";
          
        browser.storage.sync.get("waitText").then(function(result) {
            var waitText = result.waitText;
            
            if (waitText != null) {
                // set the placeholder text
                document.getElementById("waitText").placeholder = result.waitText;
            } else {
                document.getElementById("waitText").placeholder = "What's your intention?";
            }
        });
                
        browser.storage.sync.get("waitTime").then(function(result) {
          var waitTime = result.waitTime;
          var countdownBox = document.getElementById("delay-time");
          var countdown = 0;
                
          if (waitTime != null) {
              // set the placeholder text
              document.getElementById("waitTime").placeholder = waitTime;
              
              // Use the wait time value for the count down
              countdownBox.innerText = waitTime;
              countdown = waitTime;            
            
          } else {
            countdownBox.innerText = "10";
            countdown = 10;
          }
                
          // Update countdown timer every second
          var timerId = setInterval(function() {
            countdown--;
            if (countdown >= 0) {
              countdownBox.innerText = countdown;
            } else {
              // Hide the message box and stop the timer
              messageContainer.style.display = "none";
              
              popupContainer.style.display = "block";
              clearInterval(timerId);
            }
          }, 1000);
        });
      } else {
        messageContainer.style.display = "none";
        popupContainer.style.display = "block";
          
      }
    });
    
    var frictionToggle = document.getElementById("frictionToggle");
    var frictionCustomisation = document.querySelectorAll(".friction-customisation");
    
    // Add event listener to detect changes in the checkbox status
    frictionToggle.addEventListener('change', function() {
      // If the checkbox is checked, show the delay time input
      if (frictionToggle.checked) {
          for (var i = 0; i < frictionCustomisation.length; i++) {
              frictionCustomisation[i].style.display = "block";
              }
      } else {
        // Otherwise, hide it
          for (var i = 0; i < frictionCustomisation.length; i++) {
              frictionCustomisation[i].style.display = "none";
              }
      }
    });
    
    var elementsThatCanBeHidden = [ "youtubeRecVids",
                                    "youtubeThumbnails",
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
        
        browser.storage.sync.set({ "addFriction": document.getElementById("frictionToggle").checked });
        browser.storage.sync.set({ "waitTime": parseInt(document.getElementById("waitTime").value) });
        browser.storage.sync.set({ "waitText": parseInt(document.getElementById("waitText").value) });
    
        e.target.setAttribute("value", "......");
        delay(250).then(() => e.target.setAttribute("value", "Saved!"));
        delay(1500).then(() => e.target.setAttribute("value", "Save settings"));
    })
    
}, false);
