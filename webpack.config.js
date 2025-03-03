const path = require('path');

module.exports = {
  entry: './src/index.js', // No change needed here
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // No change needed here
    publicPath: '/', // Add this line to ensure the correct path for assets
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000
  }
};
