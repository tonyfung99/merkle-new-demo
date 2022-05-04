const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

const prodConfig = {
  mode: 'production', 
  entry: ["@babel/polyfill", path.join(__dirname, "../src/index.js")],
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader?modules'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css" 
    })
  ],
  externals: { 
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
};

module.exports = merge(prodConfig, baseConfig);
