const path = require("path");
const getRules = require("./webpack.rules");
const getPlugins = require("./webpack.plugins");

const abs = (...args) => {
  return path.resolve(__dirname, ...args);
};

const BUILD_DIR = abs("build");

const config = (env = {}, argv = {}) => {
  const plugins = getPlugins(BUILD_DIR, argv);
  const rules = getRules(argv);

  const bundle = [
    abs("lib", "components", "index.js"),
    abs("src", "styles.less"),
  ];

  return {
    entry: { bundle },
    // stats: {
    //   // Шумодав для ExtractTextPlugin
    //   children: false,
    // },
    output: {
      filename: "[name].js",
      path: BUILD_DIR,
      publicPath: BUILD_DIR,
    },
    module: { rules },
    resolve: {
      extensions: [".js", ".jsx", ".css", ".less", ".json"],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },
    watchOptions: {
      aggregateTimeout: 600,
    },
    devtool: false,
    devServer: {
      static: { directory: BUILD_DIR },
      devMiddleware: { writeToDisk: true },
      compress: true,
      port: 9000,
      hot: true,
      open: true,
    },
    plugins,
  };
};

module.exports = config;
