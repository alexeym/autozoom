let zoomCalculator = require('./zoom-calculate');

let isDisabled = false;

let updateIcon = function(tabId) {
  if ( isDisabled ) {
    chrome.browserAction.setIcon({ path: "icon-inactive-38.png", tabId: tabId });
  } else {
    chrome.browserAction.setIcon({ path: "icon-active-38.png", tabId: tabId });
  }
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  zoomCalculator.reset();
  updateIcon(tab.id);
});

chrome.tabs.onCreated.addListener(function(tab) {
  zoomCalculator.reset();
  updateIcon(tab.id);
});

chrome.runtime.onMessage.addListener(function(predominantTextProperties, sender, sendResponse) {

  chrome.tabs.query({ active: true }, function (tabs) {
    tabId = tabs[0].id;
    chrome.tabs.getZoom(tabId, function (zoom) {
      let newZoom = zoomCalculator.getNewZoom(zoom, predominantTextProperties);
      if ( newZoom && !isDisabled) {
        chrome.tabs.setZoom(tabId, newZoom);
      }
    });
  });

});

chrome.browserAction.onClicked.addListener(function(tab) {
  isDisabled = !isDisabled;

  zoomCalculator.reset();
  updateIcon(tab.id);
  if (!isDisabled) {
    chrome.tabs.sendMessage(tab.id, {action: 'getPredominantText'});
  }
});