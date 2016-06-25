let $ = require('jquery');
let _ = require('lodash');

function getNodesFontSizesAndTextLengths(nodes) {

  let trimWhitespace = (str) => str.replace(/[\n\r\s\t]+/g, ' ').trim();

  let nodeTextLength = (node) => trimWhitespace(node.nodeValue).length;

  let getNodeFontSizeAndTextLength = function (node) {
    var textsArray = _.filter($(node).contents(), node => node.nodeType == 3);
    var textsLengthsArray = _.map(textsArray, nodeTextLength);
    var textLength = _.sum(textsLengthsArray);

    return {
      fontSize: parseFloat($(node).css('font-size')),
      textLength: textLength
    }
  };

  return _.map(nodes, getNodeFontSizeAndTextLength);

}

module.exports = {

  get: function(cssSelector) {
    let rootDomElement = $(cssSelector);
    let children = rootDomElement.find("*:not(script, style, iframe):visible");
    return getNodesFontSizesAndTextLengths( rootDomElement.add(children) );
  }

};