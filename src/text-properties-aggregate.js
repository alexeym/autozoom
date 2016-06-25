let _ = require('lodash');

module.exports = {

  getPredominantTextProperties: function(textPropertiesArray) {
    let sumTextLengths = x => _.sum(_.map(x, y => y.textLength));

    let groupedMap = _.groupBy(textPropertiesArray, 'fontSize');
    let summedMap = _.invert(_.mapValues(groupedMap, sumTextLengths));
    let maxLength = _.max(_.map(_.keys(summedMap), Number));

    if ( maxLength ) {
      return {
        fontSize: Number(summedMap[maxLength]),
        textLength: maxLength
      };
    }
  }

};