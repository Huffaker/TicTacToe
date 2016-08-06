var webpack = require('webpack');
var config = require('config');
var path = require('path'),
//var serverConfig = require('./webpack.server.config')

 configuration = {
  entry: [
    './modules/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },

};

//if (config.env === 'development') {
  configuration.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join(__dirname, 'modules', 'index.jsx')
  ];

  configuration.plugins =[
    new webpack.HotModuleReplacementPlugin()
  ]

//}

module.exports = configuration;