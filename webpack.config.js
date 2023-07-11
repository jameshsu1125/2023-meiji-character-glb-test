const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Meta = require('./template/template.meta');

const Folder = 'bundle'; // 自動產生檔案的folder
const { NODE_ENV } = process.env;

module.exports = () => {
	const setting = {
		mode: NODE_ENV || 'development',
		target: NODE_ENV !== 'production' ? 'web' : 'browserslist',
		entry: { index: './src/pages/index.js' },
		module: {
			rules: [
				{ test: /\.jsx?$/, exclude: /node_modules/, use: [{ loader: 'babel-loader' }] },
				{
					test: /\.(less|css)$/,
					use: [
						'style-loader',
						{ loader: 'css-loader', options: { esModule: false } },
						'postcss-loader',
						'less-loader',
					],
				},
				{
					test: /\.(png|jpg|gif|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: { name: `${Folder}/image/[path][name].[ext]`, context: 'src' },
						},
					],
				},
				{
					test: /\.(ogv|mp4)$/,
					use: [
						{
							loader: 'file-loader',
							options: { name: `${Folder}/video/[path][name].[ext]`, context: 'src' },
						},
					],
				},
				{
					test: /\.(wav|mp3)$/,
					use: [
						{
							loader: 'file-loader',
							options: { name: `${Folder}/audio/[path][name].[ext]`, context: 'src' },
						},
					],
				},
				{
					test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: `${Folder}/font/`,
							},
						},
					],
				},
			],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: `${Folder}/js/[name].min.js`,
			publicPath: NODE_ENV === 'production' ? './' : '/',
		},
		resolve: {
			extensions: ['*', '.js', '.jsx'],
			alias: { arc: path.resolve(__dirname, 'src/') },
		},
		plugins: [
			new Dotenv({
				path: path.resolve(__dirname, '.env'),
				allowEmptyValues: true,
				systemvars: true,
				defaults: true,
			}),
			new CopyPlugin({ patterns: [{ from: 'public' }] }),
			new CleanWebpackPlugin(),
		],
		devtool: NODE_ENV === 'production' ? false : 'cheap-module-source-map',
		devServer: {
			allowedHosts: 'all',
			port: 8080,
			host: '0.0.0.0',
			https: false,
		},
		performance: { hints: false },
	};
	Object.keys(setting.entry).forEach((entry) => {
		setting.plugins.push(
			new HtmlWebpackPlugin({
				...Meta,
				template: 'template/template.html',
				filename: `${entry}.html`,
				chunks: [entry],
			}),
		);
	});
	return setting;
};
