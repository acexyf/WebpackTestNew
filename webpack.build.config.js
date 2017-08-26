var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entry = require('./entry.js');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  context: __dirname + "/src",
  entry: entry,
  output: {
    path: __dirname + '/build',
    filename: './js/[name].bundle.js',
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({fallback:'style-loader', use:'css-loader',publicPath:'../'}),
      },
      {
        test: /\.js$/,
        loaders: "babel-loader",
        query: { presets: ["es2015"] }
      },
      {
        test: /\.(png|jpeg|gif|jpg)$/,
        loaders: 'url-loader?limit=8&name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'/js/vendor.js'}),
    new ExtractTextPlugin({
      filename: './css/[name].bundle.css',
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false,
      },
    }),
  ]
};