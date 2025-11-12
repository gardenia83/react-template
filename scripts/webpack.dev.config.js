const baseConfig = require("./webpack.base.config.js");
const { merge } = require("webpack-merge");
const path = require("path");
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    publicPath: "/",
  },
  devServer: {
    port: 3000,
  },
  stats: "minimal",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"),
    version: "1.0.0",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
