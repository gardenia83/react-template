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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
