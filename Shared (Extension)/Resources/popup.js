document.addEventListener('DOMContentLoaded', function() {
    const platformsWeTarget = ["youtube"];
    const elementsThatCanBeHidden = ["youtubeSearch", "youtubeSearchPredict", "youtubeRecVids", "youtubeThumbnails", "youtubeNotifications", "youtubeProfileImg",
                                     "youtubeShorts", "youtubeSubscriptions", "youtubeLibrary", "youtubeHistory", "youtubeExplore", "youtubeMore",
                                     "youtubeRelated", "youtubeSidebar", "youtubeComments", "youtubeAds", "youtubeViews", "youtubeLikes", "youtubeSubscribers"];
    
    let isSelectionModeActive = false;
    const currentSiteIdentifier = "youtube";

    let opensCount = localStorage.getItem('opensCount');
    opensCount = opensCount ? parseInt(opensCount, 10) + 1 : 1;
    localStorage.setItem('opensCount', opensCount);
    let noThanksClicked = localStorage.getItem('noThanksClicked') === 'true';
    if (opensCount % 10 === 0 && !noThanksClicked) {
        var reviewPrompt = document.getElementById('reviewPrompt');
        if (reviewPrompt) {
            reviewPrompt.style.display = 'block';
        }
    }
    document.getElementById('noThanksButton').addEventListener('click', function() {
        localStorage.setItem('noThanksClicked', 'true');
        var reviewPrompt = document.getElementById('reviewPrompt');
        if (reviewPrompt) {
            reviewPrompt.style.display = 'none';
        }
    });

    browser.storage.sync.get("addFriction", function(result) {
        var frictionToggle = document.getElementById("frictionToggle");
        var frictionCustomisationArrow = document.getElementById("frictionCustomisationArrow");
        frictionToggle.checked = result.addFriction;
        if (result.addFriction == undefined || !frictionToggle.checked) {
            frictionCustomisationArrow.style.display = "none";
        } else {
            frictionCustomisationArrow.style.display = "block";
        }
        var popupContainer = document.getElementById("popup-content");
        var messageContainer = document.getElementById("delay-content");
        browser.storage.sync.get("waitText").then(function(result) {
            var waitText = result.waitText;
            var messageBox = document.getElementById("delay-message");
            if (waitText != null) {
                document.getElementById("waitText").value = result.waitText;
                messageBox.innerText = result.waitText;
            } else {
                document.getElementById("waitText").value = "What's your intention?";
                messageBox.innerText = "What is your intention?";
            }
        });
        if (result["addFriction"]) {
            popupContainer.style.display = "none";
            messageContainer.style.display = "block";
            setTimeout(function() {
                messageContainer.classList.add("show");
            }, 100);
            browser.storage.sync.get("waitTime").then(function(result) {
                var waitTime = result.waitTime;
                var countdownBox = document.getElementById("delay-time");
                var countdown = 0;
                if (waitTime != null) {
                    document.getElementById("waitTime").value = waitTime;
                    countdownBox.innerText = waitTime;
                    countdown = waitTime;
                } else {
                    countdownBox.innerText = "10";
                    document.getElementById("waitTime").value = "10";
                    countdown = 10;
                }
                var timerId = setInterval(function() {
                    countdown--;
                    if (countdown >= 0) {
                        countdownBox.innerText = countdown;
                    } else {
                        messageContainer.style.display = "none";
                        popupContainer.style.display = "block";
                        clearInterval(timerId);
                    }
                }, 1000);
            });
        } else {
            messageContainer.style.display = "none";
            messageContainer.classList.remove("show");
            popupContainer.style.display = "block";
        }
    });

    var frictionToggle = document.getElementById("frictionToggle");
    var frictionCustomisationArrow = document.getElementById("frictionCustomisationArrow");
    frictionToggle.addEventListener('change', function() {
        browser.storage.sync.set({ "addFriction": document.getElementById("frictionToggle").checked });
        if (frictionToggle.checked) {
            frictionCustomisationArrow.style.display = "block";
        } else {
            frictionCustomisationArrow.style.display = "none";
        }
    });

    var frictionCustomisationArrowRight = document.getElementById("frictionCustomisationArrowRight");
    var frictionCustomisationArrowDown = document.getElementById("frictionCustomisationArrowDown");
    var frictionCustomisationOptions = document.querySelector(".toggle-group.friction-customisation");
    frictionCustomisationArrow.addEventListener('click', function() {
        if (frictionCustomisationArrowRight.style.display == "inline") {
            frictionCustomisationArrowRight.style.display = "none";
            frictionCustomisationArrowDown.style.display = "inline";
            frictionCustomisationOptions.style.display = "block";
        } else {
            frictionCustomisationArrowRight.style.display = "inline";
            frictionCustomisationArrowDown.style.display = "none";
            frictionCustomisationOptions.style.display = "none";
        }
    });

    var savedTextTime = document.getElementById("savedTextTime");
    let hideTimeOut;
    document.getElementById("waitTime").addEventListener('input', function() {
        clearTimeout(hideTimeOut);
        let waitValue = parseInt(document.getElementById("waitTime").value);
        const maxLimit = 600;
        const minLimit = 1;
        if (waitValue < minLimit) {
            document.getElementById("waitTime").value = minLimit;
        } else if (waitValue > maxLimit) {
            savedTextTime.innerText = "Maximum is " + maxLimit;
            document.getElementById("waitTime").value = maxLimit;
            savedTextTime.style.display = 'block';
            hideTimeOut = setTimeout(function() {
                savedTextTime.style.display = 'none';
            }, 2500);
        }
    });

    function setCheckboxState(element_to_check, id_of_toggle) {
        var currentToggle = document.getElementById(id_of_toggle);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "check", element: element_to_check }, function(response) {
                if (response.text === "hidden") {
                    currentToggle.checked = true;
                } else if (response.text === "visible") {
                    currentToggle.checked = false;
                } else {
                    var key = element_to_check + "Status";
                    browser.storage.sync.get(key, function(result) {
                        currentToggle.checked = result[key];
                    });
                }
            });
        });
    }

    function toggleViewStatusCheckbox(element_to_change, id_of_toggle) {
        var currentCheckbox = document.getElementById(id_of_toggle);
        currentCheckbox.addEventListener('click', function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "change", element: element_to_change });
            });
        }, false);
    }

    function setButtonStateFour(element_to_check, id_of_toggle) {
        var currentButton = document.getElementById(id_of_toggle);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "check", element: element_to_check }, function(response) {
                if (response.text === "hidden") {
                    currentButton.setAttribute("data-state", "Off");
                } else if (response.text === "visible") {
                    currentButton.setAttribute("data-state", "On");
                } else if (response.text === "blur") {
                    currentButton.setAttribute("data-state", "Blur");
                } else if (response.text === "black") {
                    currentButton.setAttribute("data-state", "Black");
                } else {
                    var key = element_to_check + "Status";
                    browser.storage.sync.get(key, function(result) {
                        currentButton.setAttribute("data-state", result[key] || "On");
                    });
                }
            });
        });
    }

    function toggleViewStatusMultiToggle(element_to_change, id_of_toggle) {
        var currentButton = document.getElementById(id_of_toggle);
        let state;
        currentButton.addEventListener('click', function() {
            if (currentButton.getAttribute("data-state") == "On") {
                currentButton.setAttribute("data-state", "Off");
                state = "Off";
            } else if (currentButton.getAttribute("data-state") == "Off") {
                currentButton.setAttribute("data-state", "Blur");
                state = "Blur";
            } else if (currentButton.getAttribute("data-state") == "Blur") {
                currentButton.setAttribute("data-state", "Black");
                state = "Black";
            } else {
                currentButton.setAttribute("data-state", "On");
                state = "On";
            }
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "changeMultiToggle", element: element_to_change, action: state });
            });
        }, false);
    }

    elementsThatCanBeHidden.forEach(function(item) {
        if (item === "youtubeThumbnails" || item === "youtubeNotifications") {
            setButtonStateFour(item, item + "Toggle");
            toggleViewStatusMultiToggle(item, item + "Toggle");
        } else {
            setCheckboxState(item, item + "Toggle");
            toggleViewStatusCheckbox(item, item + "Toggle");
        }
    });

    function setSwitch(platform_to_check, id_of_switch) {
        var currentSwitch = document.getElementById(id_of_switch);
        var key = platform_to_check + "Status";
        browser.storage.sync.get(key, function(result) {
            if (result[key] == false) {
                currentSwitch.checked = false;
                var filteredElements = elementsThatCanBeHidden.filter(element => element.includes(platform_to_check));
                filteredElements.forEach(function(item) {
                    document.getElementById(item + "Toggle").disabled = true;
                });
                document.getElementById("youtubeAddElementButton").disabled = true;
            } else {
                currentSwitch.checked = true;
            }
        });
    }

    function updateCustomElementsList(selectors) {
        const container = document.getElementById("youtubeCustomElements");
        if (!container) return;
        container.innerHTML = '';
        if (!Array.isArray(selectors)) selectors = [];
        selectors.forEach(selector => {
            const div = document.createElement('div');
            div.className = 'custom-element';
            const peekButton = document.createElement('button');
            peekButton.className = 'icon-btn peek-symbol';
            peekButton.innerHTML = `
                <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>`;
            peekButton.title = 'Toggle visibility';
            peekButton.setAttribute('data-visible', 'false');
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { method: "checkCustom", selector: selector }, function(response) {
                    if (response && response.visible) {
                        peekButton.setAttribute('data-visible', 'true');
                        peekButton.innerHTML = `
                            <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>`;
                    } else {
                        peekButton.setAttribute('data-visible', 'false');
                        peekButton.innerHTML = `
                            <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>`;
                    }
                });
            });
            peekButton.addEventListener('click', function() {
                const isVisible = peekButton.getAttribute('data-visible') === 'true';
                peekButton.setAttribute('data-visible', isVisible ? 'false' : 'true');
                peekButton.innerHTML = isVisible ? `
                    <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>` : `
                    <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>`;
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { method: "toggleCustomVisibility", selector: selector, visible: !isVisible });
                });
            });
            const span = document.createElement('span');
            span.textContent = selector;
            span.title = selector;
            const button = document.createElement('button');
            button.className = 'icon-btn remove-symbol';
            button.innerHTML = `
                <svg width="14px" height="14px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>`;
            button.title = 'Remove';
            button.addEventListener('click', function() {
                const storageKey = `${currentSiteIdentifier}CustomHiddenElements`;
                browser.storage.sync.get(storageKey, function(result) {
                    let currentSelectors = result[storageKey] || [];
                    currentSelectors = currentSelectors.filter(s => s !== selector);
                    browser.storage.sync.set({ [storageKey]: currentSelectors }, function() {
                        updateCustomElementsList(currentSelectors);
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, { method: "removeCustomElement", selector: selector });
                        });
                    });
                });
            });
            div.appendChild(peekButton);
            div.appendChild(button);
            div.appendChild(span);
            container.appendChild(div);
        });
    }

    function setupCustomElementControls() {
        const addButton = document.getElementById("youtubeAddElementButton");
        if (addButton) {
            addButton.addEventListener('click', function() {
                if (isSelectionModeActive) {
                    isSelectionModeActive = false;
                    addButton.classList.remove('active');
                    addButton.textContent = 'Hide custom element';
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { method: "stopSelecting", cancelled: false });
                    });
                } else {
                    isSelectionModeActive = true;
                    addButton.classList.add('active');
                    addButton.textContent = 'Click/Tap element to hide';
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { method: "startSelecting" });
                    });
                }
            });
        }
    }

    platformsWeTarget.forEach(function(platform) {
        var currentSwitch = document.querySelector('#website-toggles #toggle-' + platform + ' input');
        var allCheckboxes = document.querySelectorAll('.dropdown.' + platform + ' .a-toggle input');
        var addButton = document.getElementById(platform + "AddElementButton");
        currentSwitch.addEventListener("change", function() {
            if (!currentSwitch.checked) {
                elementsThatCanBeHidden.filter(elem => elem.indexOf(platform) !== -1).forEach(function(some_element) {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { method: "showAll", element: some_element });
                    });
                    document.getElementById(some_element + "Toggle").checked = false;
                });
                allCheckboxes.forEach(aCheckbox => {
                    aCheckbox.disabled = true;
                });
                if (addButton) addButton.disabled = true;
                var key = platform + "Status";
                browser.storage.sync.set({ [key]: false });
            } else {
                elementsThatCanBeHidden.filter(elem => elem.indexOf(platform) !== -1).forEach(function(some_element) {
                    var currentToggle = document.getElementById(some_element + "Toggle");
                    var key = some_element + "Status";
                    browser.storage.sync.get(key, function(result) {
                        currentToggle.checked = result[key];
                        if (currentToggle.checked) {
                            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, { method: "change", element: some_element });
                            });
                        }
                    });
                });
                allCheckboxes.forEach(aCheckbox => {
                    aCheckbox.disabled = false;
                });
                if (addButton) addButton.disabled = false;
                var key = platform + "Status";
                browser.storage.sync.set({ [key]: true });
            }
        });
    });

    platformsWeTarget.forEach(function(platform) {
        setSwitch(platform, platform + "Switch");
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        platformsWeTarget.forEach(function(platform) {
            var currentHost = new URL(tab[0].url);
            if (currentHost.origin.includes(platform)) {
                document.querySelector('.dropdown.' + platform).classList.add('shown');
                document.querySelector('#website-toggles #toggle-' + platform).classList.add('shown-inline');
                setupCustomElementControls();
                const storageKey = `${platform}CustomHiddenElements`;
                browser.storage.sync.get(storageKey, function(result) {
                    updateCustomElementsList(result[storageKey] || []);
                });
            }
        });
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.method === "stopSelectingFromEscape") {
            const addButton = document.getElementById("youtubeAddElementButton");
            if (addButton) {
                isSelectionModeActive = false;
                addButton.classList.remove('active');
                addButton.textContent = 'Hide custom element';
            }
        } else if (message.method === "elementSelected" || message.method === "selectionCanceled" || message.method === "selectionFailed") {
            const addButton = document.getElementById("youtubeAddElementButton");
            if (addButton) {
                addButton.classList.remove('active');
                addButton.textContent = 'Hide custom element';
            }
            isSelectionModeActive = false;
            if (message.method === "elementSelected" && message.selector) {
                const storageKey = `${currentSiteIdentifier}CustomHiddenElements`;
                browser.storage.sync.get(storageKey, function(result) {
                    let customSelectors = result[storageKey] || [];
                    if (!Array.isArray(customSelectors)) customSelectors = [];
                    if (!customSelectors.includes(message.selector)) {
                        customSelectors.push(message.selector);
                        browser.storage.sync.set({ [storageKey]: customSelectors }, function() {
                            updateCustomElementsList(customSelectors);
                        });
                    }
                });
            } else if (message.method === "selectionFailed") {
                if (addButton) {
                    const originalText = addButton.textContent;
                    addButton.textContent = 'Selection Failed!';
                    setTimeout(() => { addButton.textContent = originalText; }, 2000);
                }
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isSelectionModeActive) {
            e.preventDefault();
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { method: "stopSelecting", cancelled: true });
            });
            const addButton = document.getElementById("youtubeAddElementButton");
            if (addButton) {
                isSelectionModeActive = false;
                addButton.classList.remove('active');
                addButton.textContent = 'Hide custom element';
            }
        }
    });

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    var saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', (e) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
            platformsWeTarget.forEach(function(platform) {
                var currentHost = new URL(tab[0].url);
                if (currentHost.origin.includes(platform)) {
                    var filteredElements = elementsThatCanBeHidden.filter(element => element.includes(platform));
                    filteredElements.forEach(function(element) {
                        var key = element + "Status";
                        var element = document.getElementById(element + "Toggle");
                        var value = (element.getAttribute("data-state") != null) ? element.getAttribute("data-state") : element.checked;
                        browser.storage.sync.set({ [key]: value });
                    });
                }
            });
        });
        let waitValue = parseInt(document.getElementById("waitTime").value);
        browser.storage.sync.set({ "waitTime": waitValue });
        browser.storage.sync.set({ "waitText": document.getElementById("waitText").value });
        e.target.setAttribute("value", "......");
        delay(250).then(() => e.target.setAttribute("value", "Saved!"));
        delay(1500).then(() => e.target.setAttribute("value", "Save settings"));
    });

    const howTo = document.querySelector('#hide-previews');
    const howToText = document.querySelector('#how-to-description');
    const howToArrowRight = document.querySelector('#how-to-arrow-right');
    const howToArrowDown = document.querySelector('#how-to-arrow-down');
    howTo.addEventListener("click", function() {
        if (howToText.style.display === "none") {
            howToText.style.display = "block";
            howToArrowRight.style.display = "none";
            howToArrowDown.style.display = "inline-block";
        } else {
            howToText.style.display = "none";
            howToArrowRight.style.display = "inline-block";
            howToArrowDown.style.display = "none";
        }
    });

    const howToNotMobile = document.querySelector('#hide-previews-not-mobile');
    const howToTextNotMobile = document.querySelector('#how-to-description-not-mobile');
    const howToArrowRightNotMobile = document.querySelector('#how-to-arrow-right-not-mobile');
    const howToArrowDownNotMobile = document.querySelector('#how-to-arrow-down-not-mobile');
    howToNotMobile.addEventListener("click", function() {
        if (howToTextNotMobile.style.display === "none") {
            howToTextNotMobile.style.display = "block";
            howToArrowRightNotMobile.style.display = "none";
            howToArrowDownNotMobile.style.display = "inline-block";
        } else {
            howToTextNotMobile.style.display = "none";
            howToArrowRightNotMobile.style.display = "inline-block";
            howToArrowDownNotMobile.style.display = "none";
        }
    });
}, false);
