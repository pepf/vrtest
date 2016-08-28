const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['webvr-polyfill', path.join(__dirname, "src","app")],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
    devtool: "#inline-source-map",
    devServer: {
      host: 'Pepijns-MacBook-Pro.local',
      port: 8080,
      contentBase: ".",
      inline: true
    }
}
