
module.exports = {
  mode: 'development',
  entry: "./src/app/index.js",
  output: {
    path: __dirname + "/src/public/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js','.ts']
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
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
			}
    ]
  }
};
