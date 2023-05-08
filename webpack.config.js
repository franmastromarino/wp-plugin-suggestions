const path = require( 'path' );
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	optimization: {
		minimize: isProduction,
	},
	mode,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	externals: {
		react: 'react',
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
};
