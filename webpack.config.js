const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./web/frontend/components/SlickImages.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "extensions/image-carousel-theme-extension/js"),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|eot|ttf|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "extensions/image-carousel-theme-extension/slick-carousel/fonts",
          },
        },
      },
      {
        test: /\.(gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "extensions/image-carousel-theme-extension/slick-carousel",
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "web/frontend/slick-carousel/fonts/slick.*",
          to: "extensions/image-carousel-theme-extension/slick-carousel/fonts/[name].[ext]",
        },
        {
          from: "web/frontend/slick-carousel/ajax-loader.gif",
          to: "extensions/image-carousel-theme-extension/slick-carousel/[name].[ext]",
        },
      ],
    }),
  ],
};
