const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	module: {
	  rules: [
		{
		  // 使用 babel-loader 来编译处理 js 和 jsx 文件
		  test: /\.(js|jsx)$/,
		  use: "babel-loader",
		  exclude: /node_modules/
		},
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: "file-loader",
			
		}
	  ]
	},
	plugins: [new HtmlWebpackPlugin({
		title:"Merkle News",
		favicon: path.join(__dirname, "../assets/icon.jpg")
	})],
};
  