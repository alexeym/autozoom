let path = require('path');

let pluginClean = require('clean-webpack-plugin');
let pluginCopy = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "chrome-content-script": "./src/chrome-content-script.js",
    "chrome-background-script": "./src/chrome-background-script.js"
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: "[name].bundle.js"
  },
  plugins: [
    new pluginClean(['dist', 'build'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new pluginCopy([
      { from: path.join(__dirname, 'resources'), to: path.join(__dirname, 'build') }
    ])
  ]
};