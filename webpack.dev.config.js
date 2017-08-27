var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entry = require('./entry.js');
var ipAddress = getIPAdress();
//服务器端口
var serverPort = 8086;
module.exports = {
	context: __dirname + "/src",
	entry: entry,
	output: {
		path: __dirname + '/build',
		filename: '[name].bundle.js',
		publicPath: "/",
		sourceMapFilename: '[name].map'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(css|less|scss)$/,
				loaders: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader:'css-loader',
						options: {
							sourceMap: true
						}
					},{
						loader:'less-loader',
						options: {
							sourceMap: true
						}
					},{
						loader:'sass-loader',
						options: {
							sourceMap: true
						}
					}]
				}),
			},
			{
				test: /\.js$/,
				loaders: "babel-loader",
				query: { presets: ["es2015"] }
			},
			{
				test: /\.(png|jpeg|gif|jpg)$/,
				loader: 'url-loader?limit=8&name=[path][name].[ext]'
			}
		]
	},
	devServer: {
		hot: true,
		port: serverPort,
		contentBase: __dirname + "/src/site",
		publicPath: '/',
		disableHostCheck: true,
		compress: true,
		proxy: {
		  '/api': 'http://'+ipAddress+':8087',
		  '/lib': 'http://'+ipAddress+':8087'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://'+ipAddress+':'+serverPort }),
		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			disable: false,
		 	allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	]
};




/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}



