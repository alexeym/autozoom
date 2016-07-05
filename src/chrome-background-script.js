let zoomCalculator = require('./zoom-calculate');
let analytics = require('./analytics');

let isDisabled = false;

let updateIcon = function(tabId) {
  let iconFileName = isDisabled ? "icon-inactive-38.png" : "icon-active-38.png";
  chrome.browserAction.setIcon({ path: iconFileName, tabId: tabId });
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  zoomCalculator.reset();
  updateIcon(tab.id);
});

chrome.tabs.onCreated.addListener(function(tab) {
  zoomCalculator.reset();
  updateIcon(tab.id);
});

chrome.runtime.onMessage.addListener(function(predominantTextProperties, sender) {

  chrome.tabs.getZoom(sender.tab.id, function (currentZoomFactor) {
    let newZoomFactor = zoomCalculator.getNewZoom(currentZoomFactor, predominantTextProperties);
    if ( newZoomFactor && !isDisabled) {
      chrome.tabs.setZoom(sender.tab.id, newZoomFactor);
    }
    analytics.trackZoomFactor(newZoomFactor);
  });

});

chrome.browserAction.onClicked.addListener(function(tab) {
  isDisabled = !isDisabled;

  isDisabled ? analytics.trackDisabled() : analytics.trackEnabled();

  zoomCalculator.reset();

  chrome.tabs.query({}, function (tabs) {
    tabs.forEach( tab => updateIcon(tab.id) )
  });

  if (!isDisabled) {
    chrome.tabs.sendMessage(tab.id, {action: 'getPredominantText'});
  }
});