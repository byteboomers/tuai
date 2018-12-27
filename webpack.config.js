const path = require("path");

module.exports = {
  entry: path.resolve(__dirname + "/src/tuai.js"),
  output: {
    path: path.resolve(__dirname + "/dist/"),
    filename: "tuai.js",
    library: "Tuai",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
path;
