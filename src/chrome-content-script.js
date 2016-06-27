let textPropertiesCollect = require('./text-properties-collect');
let textPropertiesAggregate = require('./text-properties-aggregate');

let textPropertiesArray = textPropertiesCollect.get('body');
let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);

if ( predominantTextProperties ) {
  chrome.runtime.sendMessage(predominantTextProperties);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.runtime.sendMessage(predominantTextProperties);
});