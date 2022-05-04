const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); 

const devConfig = {
  mode: 'development', // 开发模式
  entry: ["@babel/polyfill",path.join(__dirname, "../src/index.js")], 
  output: {
    path: path.join(__dirname, "../src/"),
    filename: "bundle.js", 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.min\.css$/,
        use: ['style-loader','css-loader?modules'],
      },
      {
        test: /\.min\.css$/,
        use: ['style-loader','css-loader'],
      },
    ]
  },
  devServer: {
    static:{
      directory: path.join(__dirname, '../src/')
    },
    compress: true,
    host: '127.0.0.1', 
    port: 3001, 
    open: true 
  },
};
module.exports = merge(devConfig, baseConfig); 
