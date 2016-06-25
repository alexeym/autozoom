var assert = require('chai').assert;

describe('text-properties-collect', function() {

  let textPropertiesCollect = require('../src/text-properties-collect');

  describe('get', function () {

    before(function() {
      let addFixtureHtml = html => document.body.insertAdjacentHTML('afterbegin', html);

      let strLength1 = 'a';
      let strLength2 = 'bb';
      let strLength3 = '    c  c  ';
      let strLength5 = `d d 
                        d `;

      addFixtureHtml(`<div id="fixture-no-text-no-tags" style="font-size: 10px"></div>`);
      addFixtureHtml(`<div id="fixture" style="font-size: 10px">
                        ${strLength1}
                        <div>
                          ${strLength2}
                          <p style="font-size: 20px">${strLength3}</p>
                        </div>
                        <p>${strLength5}</p>
                      </div>`);
    });

    after(function() {
      let removeDomElementById = id => document.body.removeChild(document.getElementById(id));

      removeDomElementById('fixture-no-text-no-tags');
      removeDomElementById('fixture');
    });


    it('should return an empty array when DOM element does not exist', function () {
      let textProperties = textPropertiesCollect.get('non-existent-css-selector');
      assert.deepEqual(textProperties, []);
    });

    it('should return an array of text properties when processing a single DOM element', function () {
      let textProperties = textPropertiesCollect.get('#fixture-no-text-no-tags');
      assert.deepEqual(textProperties, [ {fontSize: 10, textLength: 0} ]);
    });

    it('should return an array of text properties when DOM element exists and has children', function () {
      let textProperties = textPropertiesCollect.get('#fixture');
      assert.deepEqual(textProperties, [
        {fontSize: 10, textLength: 1},
        {fontSize: 10, textLength: 2},
        {fontSize: 20, textLength: 3},
        {fontSize: 10, textLength: 5}
      ]);
    });

  });

});