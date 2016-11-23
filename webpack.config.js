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
      loader: process.env.NODE_ENV === 'development'? 'react-hot!babel' : 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: process.env.NODE_ENV === 'development'? 'http://localhost:8080/' : 'http://localhost:80/',
    filename: 'bundle.js'
  },

};

if (process.env.NODE_ENV === 'development') {
  configuration.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join(__dirname, 'modules', 'index.jsx')
  ];

  configuration.plugins =[
    new webpack.HotModuleReplacementPlugin()
  ]

}

module.exports = configuration;