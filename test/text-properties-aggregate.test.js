var assert = require('chai').assert;

describe('text-properties-aggregate', function () {
  
  let textPropertiesAggregate = require('../src/text-properties-aggregate');

  it('should return undefined when input is an empty array', function () {
    let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties([]);
    assert.isUndefined(predominantTextProperties);
  });

  it('should return undefined when there is no text', function () {
    let textPropertiesArray = [
      {fontSize: 10, textLength: 0},
      {fontSize: 20, textLength: 0}
    ];
    let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);
    assert.isUndefined(predominantTextProperties);
  });

  it('should return predominant text properties for a single-value array of the text properties', function () {
    let textPropertiesArray = [
      {fontSize: 10.1, textLength: 1}
    ];
    let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);
    assert.deepEqual(predominantTextProperties, {fontSize: 10.1, textLength: 1});
  });

  it('should return predominant text properties for an array of the text properties', function () {
    let textPropertiesArray = [
      {fontSize: 10, textLength: 1},
      {fontSize: 20, textLength: 2},
      {fontSize: 30, textLength: 3},
      {fontSize: 10, textLength: 1},
      {fontSize: 10, textLength: 1}
    ];
    let predominantTextProperties = textPropertiesAggregate.getPredominantTextProperties(textPropertiesArray);
    assert.deepEqual(predominantTextProperties, {fontSize: 30, textLength: 3});
  });

  
});