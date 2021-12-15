const webpack = require("webpack");
const { WatchIgnorePlugin, SourceMapDevToolPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package.json");

module.exports = (buildDir, argv = {}) => {
  const definePlugin = new webpack.DefinePlugin({
    "process.env.API_URL": JSON.stringify("http://127.0.0.1:8000/api/"),
  });
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: "todo",
    template: "./index.html",
  });
  const cleanWebpackPlugin = new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false,
  });
  const sourceMapDevToolPlugin = new SourceMapDevToolPlugin({
    filename: "[file].map",
    test: /\.js$/,
    include: "bundle.js",
    noSources: argv.mode === "production",
  });
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    // filename: "[hash][name].css",
    filename: "[name].css",
  });
  const webpackNotifierPlugin = new WebpackNotifierPlugin({
    title: pkg.name,
    alwaysNotify: true,
    // contentImage: abs("..", "shared", "img", "webpack.png"),
  });
  const watchIgnorePlugin = new WatchIgnorePlugin({
    paths: [/[\\/]node_modules[\\/]/, buildDir, /\.d\.ts$/],
  });

  return [
    definePlugin,
    htmlWebpackPlugin,
    cleanWebpackPlugin,
    sourceMapDevToolPlugin,
    miniCssExtractPlugin,
    webpackNotifierPlugin,
    watchIgnorePlugin,
  ];
};
