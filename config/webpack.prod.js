const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const styleConfig = require("./webpack.styles");
const crypto = require("crypto");

module.exports = merge(common, {
  mode: "production",
  // entry: {
  //     sw: path.resolve("src", "sw.js")
  // },
  output: {
    clean: true,
    filename: `static/js/[name].${process.env["BUILD_HASH"]}.js`,
    chunkFilename: `static/js/[name].${process.env["BUILD_HASH"]}.chunk.js`,
    assetModuleFilename: `static/assets/[name].${process.env["BUILD_HASH"]}[ext]`
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  module: {
    rules: [
      {
        test: /\.module(\.css|\.s[ac]ss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          styleConfig.cssLoaderModule,
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /(\.css|\.s[ac]ss)$/i,
        exclude: /\.module(\.css|\.s[ac]ss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          styleConfig.cssLoaderDefault,
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: false,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleName = module
              .identifier()
              .split("/node_modules/")
              .pop()
              .replace(/(@|index|\/index|.js)/g, "")
              .replace(/\//g, "_");
            // console.log(`deps/${moduleName}`);
            return `deps/${crypto.randomBytes(3).toString("hex")}`;
          },
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            // Will remove console.log in prod
            drop_console: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      linkType: "text/css",
      filename: `static/css/[name].${process.env["BUILD_HASH"]}.css`,
      chunkFilename: `static/css/[name].${process.env["BUILD_HASH"]}.chunk.css`,
    }),
    new webpack.ProvidePlugin({
      ...styleConfig.cssGlobalProviders,
      React: "preact/compat",
      ReactDOM: "preact/compat",
    }),
    new webpack.ids.DeterministicModuleIdsPlugin({
      maxLength: 5,
    }),
    // new WebpackObfuscator({
    //     rotateStringArray: true
    // })
  ],
});
