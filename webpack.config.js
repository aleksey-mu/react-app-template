const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
	if (isDev) {
		return 'cheap-module-eval-source-map';
	} else {
		return 'none';
	}
}

function setDMode() {
	if (isProd) {
		return 'production';
	} else {
		return 'development';
	}
}

const config = {
	entry: { index: './src/index.tsx' },
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	mode: setDMode(),
	devtool: setDevTool(),
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
						},
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './img',
							name: '[name].[ext]',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							disable: isDev,
							mozjpeg: {
								progressive: true,
								quality: 75,
							},
							pngquant: {
								quality: [0.75, 0.9],
								speed: 4,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/assets/audio',
					to: './audio',
					noErrorOnMissing: true,
				},
			],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		overlay: true,
		stats: 'errors-only',
		clientLogLevel: 'none',
	},
};

if (isProd) {
	config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
