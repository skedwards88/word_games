const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    publicPath: "",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // removes unused files from output dir
  },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Need to use template because need 'root' div for react injection. templateContent doesn't play nice with title, so just use a template file instead.
      template: "./src/index.html",
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/images/favicon.svg",
      mode: "webapp", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      devMode: "webapp", // optional can be 'webapp' or 'light' - 'light' by default
      favicons: {
        appName: "Word Games",
        short_name: "Word Games",
        start_url: "../.",
        appDescription: "A collection of word games",
        display: "standalone",
        developerName: "skedwards88",
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#FFFFFF",
        theme_color: "#262481",
        icons: {
          coast: false,
          yandex: false,
        },
      },
    })
  ],
};