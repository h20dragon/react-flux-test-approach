var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: [
      //'Chrome'
      'PhantomJS'
      //'PhantomJS', 'Chrome', 'Firefox'
    ],
    singleRun: true,
    files: [
      {
        pattern: 'tests.webpack.js',
        watched: false
      },
//        'node_modules/react/react.js',
      'node_modules/babel-core/browser-polyfill.js'
    ],
    frameworks: ['mocha', 'chai', 'chai-sinon'],

    plugins: [

      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-phantomjs-launcher"),
      require("karma-webpack"),
      require("karma-chai"),
      require("karma-chai-sinon"),
      require("karma-jasmine"),
      require("karma-sourcemap-loader")
    ],

    externals: ['sinon'],

    files: [
      'tests.webpack.js'
    ],
    // end 001
    preprocessors: {
      'tests.webpack.js': [
        'webpack',
        'sourcemap'  // 001
      ],
    },
    reporters: [
      'dots',
    ],
    webpack: {
      devtool: 'inline-source--map',
      plugins: [
          new webpack.NoErrorsPlugin()
      ],
      externals: ['sinon'],
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
