const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { NODE_ENV } = process.env;
const filename = `index${NODE_ENV === 'production' ? '.min' : ''}.js`;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
  externals: {
    child_process: "require('child_process')",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};
