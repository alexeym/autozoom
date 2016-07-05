let notify = function(predominantTextProperties) {
  chrome.runtime.sendMessage(predominantTextProperties);
};

let textPropertiesCollect = require('./text-properties-collect');
let textPropertiesAggregate = require('./text-properties-aggregate');

let textPropertiesArray = textPropertiesCollect.get('body');
let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);

if ( predominantTextProperties ) {
  notify(predominantTextProperties);
}

chrome.runtime.onMessage.addListener(function() {
  if ( predominantTextProperties ) {
    notify(predominantTextProperties);
  }
});