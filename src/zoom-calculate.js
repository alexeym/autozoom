
const desiredPredominantFontSize = 15; // px
let maxKnownLength = 0;

module.exports = {

  reset: function() {
    maxKnownLength = 0;
  },

  getNewZoom: function(currentZoom, predominantTextProperties) {
    let newZoom = desiredPredominantFontSize/predominantTextProperties.fontSize;

    let isZoomIn = 1 < newZoom;
    let isForLongerText = maxKnownLength < predominantTextProperties.textLength;
    let isLargerThanCurrentZoom = currentZoom < newZoom;

    if ( isZoomIn && isForLongerText && isLargerThanCurrentZoom) {
      maxKnownLength = predominantTextProperties.textLength;
      return newZoom;
    }
  }

};