const path = require("path");
const globalCssModulePath = path.resolve(
  "src",
  "styles",
  "globals",
  "globals.module.scss"
);
const globalUtilitiesPath = path.resolve("config", "webpack.globals.js");

module.exports = {
  cssLoaderModule: {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: true,
      modules: {
        localIdentName: "[sha1:hash:hex:5]",
      },
    },
  },
  cssLoaderModuleDev: {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: true,
      modules: {
        localIdentName: "[name]__[local]",
      },
    },
  },
  cssLoaderDefault: {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: true,
    },
  },
  cssGlobalProviders: {
    css: [globalCssModulePath, "default"],
    classes: [globalUtilitiesPath, "classes"],
  },
};
