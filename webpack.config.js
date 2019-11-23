module.exports = {
  mode: "development",
  entry: "./src/app/index",
  output: {
    path: __dirname + "/src/public/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", "jsx", ".html", ".csv"]
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(html|csv)$/,
        exclude: /node_modules/,
        use: "raw-loader"
      }
    ]
  }
};
