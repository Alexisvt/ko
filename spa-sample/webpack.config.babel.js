import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';

/** @type{DevServerConfig} */
const devServerConfigObj = {
  contentBase: path.join(__dirname),
  hot: true,
  watchContentBase: true,
};

/** @type{webpack.Configuration} */
const configObj = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: devServerConfigObj,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        exclude: /(node_modules)/,
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      title: 'KO - SPA Sample',
      options: {
        attrs: false,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
  externals: {
    jquery: 'jQuery',
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
};

export default configObj;
