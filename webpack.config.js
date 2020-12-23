// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js",
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Game",
      templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <h1>Hello World</h1>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
  ],
  devServer: {
    port: 3010,
    contentBase: path.join(__dirname, "dist"),
  },
};
