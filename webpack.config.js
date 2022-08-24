const path = require('path');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'main.js',
		publicPath: "dist/",
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
};