const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const styleConfig = require("./webpack.styles");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    clean: false,
    filename: "static/js/[name].bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
  },
  stats: process.argv.includes("--v") ? "verbose" : "minimal",
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.module(\.css|\.s[ac]ss)$/i,
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          styleConfig.cssLoaderModuleDev,
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /(\.css|\.s[ac]ss)$/i,
        exclude: /\.module(\.css|\.s[ac]ss)$/i,
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          styleConfig.cssLoaderDefault,
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      ...styleConfig.cssGlobalProviders,
      React: "react",
      ReactDOM: "react-dom",
    }),
  ],
});
