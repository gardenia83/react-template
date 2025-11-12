const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    publicPath: './',
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20, // 优先级高
        },
        common: {
          name: 'common',
          minChunks: 2, // 被两个及以上chunk引用才提取
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true, // 避免模块重复打包[citation:6]
        },
      },
    },
    minimizer: [
      '...',
      new EsbuildPlugin({
        target: 'es2015',
        minify: true,
        css: false,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 75,
              },
              pngquant: {
                quality: [0.7, 0.8],
              },
              webp: {
                quality: 75,
              },
            },
          },
          filter: source => source.size > 20 * 1024,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
});
