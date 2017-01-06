module.exports = {
  // Configure main client bundle:
  entry: './src/index',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  // Configure CSS module loader:
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
