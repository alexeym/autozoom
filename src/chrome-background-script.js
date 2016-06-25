let zoomCalculator = require('./zoom-calculate');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  zoomCalculator.reset();
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
  zoomCalculator.reset();
});

chrome.runtime.onMessage.addListener(function(predominantTextProperties, sender, sendResponse) {

  chrome.tabs.query({ active: true }, function (tabs) {
    tabId = tabs[0].id;
    chrome.tabs.getZoom(tabId, function (zoom) {
      let newZoom = zoomCalculator.getNewZoom(zoom, predominantTextProperties);
      if ( newZoom ) {
        chrome.tabs.setZoom(tabId, newZoom);
      }
    });
  });

});