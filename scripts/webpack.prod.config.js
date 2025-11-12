const path = require("path");
const baseConfig = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath: "./",
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 20, // 优先级高
        },
        common: {
          name: "common",
          minChunks: 2, // 被两个及以上chunk引用才提取
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true, // 避免模块重复打包[citation:6]
        },
      },
    },
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 80,
              },
              pngquant: {
                quality: [0.8, 0.9],
              },
              webp: {
                quality: 80,
              },
            },
          },
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
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
    new TerserPlugin({
      parallel: true, // 多进程压缩
    }),
  ],
});
