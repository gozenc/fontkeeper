const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const args = process.argv.slice(2);
const progressEnabled = args.includes("--progress") || args.includes("-p");

const basePlugins = [
  new HtmlWebpackPlugin({
    title: "Fontkeeper",
    template: path.resolve("public", "index.html"),
    minify: true,
    meta: {
      viewport:
        "viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      "theme-color": "#fff",
    },
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "./public",
        to: "./",
        globOptions: {
          ignore: ["**/*.html"],
        },
      },
      {
        from: "src/wasm",
      },
    ],
  }),
  new NodePolyfillPlugin(),
];

const plugins = progressEnabled
  ? [new webpack.ProgressPlugin(), ...basePlugins]
  : basePlugins;

module.exports = plugins;
