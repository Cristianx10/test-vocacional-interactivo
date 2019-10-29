var webpack = require("webpack");
var path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app/index.js",
  output: {
    path: __dirname + "/src/public/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      // bind version of jquery-ui
      "jquery-ui": "jquery-ui/jquery-ui.js",
      // bind to modules;
      modules: path.join(__dirname, "node_modules")
    }
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ["ts-loader"],
        test: /\.ts/,
        exclude: /node_modules/
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
