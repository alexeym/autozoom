let textPropertiesCollect = require('./text-properties-collect');
let textPropertiesAggregate = require('./text-properties-aggregate');

let textPropertiesArray = textPropertiesCollect.get('body');
let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);

if ( predominantTextProperties ) {
  chrome.runtime.sendMessage(predominantTextProperties);
}