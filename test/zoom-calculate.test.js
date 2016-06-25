var assert = require('chai').assert;

describe('zoom', function() {

  let zoom = require('../src/zoom-calculate');

  describe('getNewZoom', function () {

    beforeEach(function() {
      zoom.reset();
    });

    it('does not suggest a new zoom when the predominant font size already 16 px', function() {
      let newZoom = zoom.getNewZoom(1, {fontSize: 16, textLength: 1});
      assert.isUndefined(newZoom);
    });

    it('does not suggest a new zoom when the predominant font size already 20 px', function() {
      let newZoom = zoom.getNewZoom(1, {fontSize: 20, textLength: 1});
      assert.isUndefined(newZoom);
    });

    it('suggess a new zoom when the predominant font size is less than 16 px', function() {
      let newZoom = zoom.getNewZoom(1, {fontSize: 15, textLength: 1});
      assert.strictEqual(newZoom, 16/15);
    });

    it('does not suggest a new zoom when previously suggested a zoom for longer text', function () {
      zoom.getNewZoom(1, {fontSize: 15, textLength: 2});
      let newZoom = zoom.getNewZoom(1, {fontSize: 14, textLength: 1});
      assert.isUndefined(newZoom);
    });

    it('suggests a new zoom when previously suggested a zoom for shorter text', function () {
      zoom.getNewZoom(1, {fontSize: 15, textLength: 1});
      let newZoom = zoom.getNewZoom(1, {fontSize: 14, textLength: 2});
      assert.strictEqual(newZoom, 16/14);
    });

    it('does not suggest a new zoom when the current zoom is the same', function () {
      let newZoom = zoom.getNewZoom(16/14, {fontSize: 14, textLength: 1});
      assert.isUndefined(newZoom);
    });

    it('does not suggest a new zoom when the current zoom is larger', function () {
      let newZoom = zoom.getNewZoom(16/14, {fontSize: 15, textLength: 1});
      assert.isUndefined(newZoom);
    });

  });

  describe('reset', function() {

    it('after the reset suggests a new zoom when previously suggested a different zoom for longer text', function () {
      zoom.getNewZoom(1, {fontSize: 15, textLength: 2});

      zoom.reset();
      let newZoom = zoom.getNewZoom(1, {fontSize: 14, textLength: 1});

      assert.strictEqual(newZoom, 16/14);
    });

  });

});