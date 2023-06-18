const path = require("path");
const webpack = require("webpack");
const plugins = require("./common.plugins");

module.exports = {
  entry: {
    theme: path.resolve("src", "theme.js"),
    app: path.resolve("src", "index.tsx"),
    preload: path.resolve("src", "preload.js"),
  },
  target: "browserslist",
  output: {
    path: path.resolve("build"),
    publicPath: "/",
  },
  experiments: {
    asyncWebAssembly: true,
  },
  resolve: {
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      __dirname: false,
    },
    modules: ["node_modules"],
    extensions: [
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".web.js",
      ".js",
      ".web.jsx",
      ".jsx",
      ".json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: {
          loader: "babel-loader",
          options: {
            exclude: [
              /node_modules[\\\/]core-js/,
              /node_modules[\\\/]webpack[\\\/]buildin/,
            ],
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: `static/fonts/[name].${process.env["BUILD_HASH"]}[ext]`,
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        use: 'svgo-loader'
      },
    ],
  },
  plugins,
};
