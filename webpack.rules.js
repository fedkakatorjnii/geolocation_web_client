const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getCssLoaders = (argv = {}) => {
  const cssLoaders = [
    MiniCssExtractPlugin.loader,
    // "style-loader",
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
      },
    },
  ];

  if (argv.mode === "production") {
    cssLoaders.push({
      loader: "postcss-loader",
      options: {
        plugins: [autoprefixer()],
      },
    });
  }

  return cssLoaders;
};

module.exports = (argv = {}) => {
  const cssLoaders = getCssLoaders(argv);

  return [
    {
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre",
    },
    {
      test: /\.css$/,
      use: cssLoaders,
    },
    {
      test: /\.less$/,
      use: [
        ...cssLoaders,
        // "less-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
              strictMath: true,
              sourceMap: true,
            },
          },
        },
      ],
    },
  ];
};
