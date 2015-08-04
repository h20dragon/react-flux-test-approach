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
    frameworks: [
      'jasmine'
    ],
    // 001
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader")
    ],
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
