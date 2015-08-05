var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({

    basePath: '',

    browsers: [
      'PhantomJS', 'Chrome', 'Firefox'
    ],

    // enable or disable colors in the output (reporters and logs)
    colors: true,

    exclude: ['karma.conf.js'],

    externals: ['sinon'],

    frameworks: ['mocha', 'chai', 'chai-sinon'],


    // list of files and patterns to load in the browser
//    files: [
//      'tests.webpack.js'
//    ],
    files: [
      {
        pattern: 'tests.webpack.js',
        watched: false
      },
//        'node_modules/react/react.js',
      'node_modules/babel-core/browser-polyfill.js'
    ],


    plugins: [
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-phantomjs-launcher"),
      require("karma-webpack"),
      require("karma-chai"),
      require("karma-chai-sinon"),
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-sourcemap-loader")
    ],

    preprocessors: {
      'tests.webpack.js': [
        'webpack',
        'sourcemap'  // 001
      ],
    },

    reporters: [
      'dots',
    ],

    singleRun: true,

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
