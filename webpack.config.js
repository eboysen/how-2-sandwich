const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/print.js',
    sandwich: './src/sandwich.js',
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash:true,
        title: 'How 2 Sandwich',
        myHeader: 'Sandwiches',
        template: './src/pages/index.html',
        filename: 'index.html',
        chunks: ['index']
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'About',
        template: './src/pages/about.html',
        filename: 'about.html',
        chunks: ['print']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'How 2 Sandwich | Sandwich',
      template: './src/pages/sandwich.html',
      filename: 'sandwich.html',
      chunks: ['sandwich']
  }), 
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(glb|gltf)$/,
        use:
        [
            {
                loader: 'url-loader',
                options:
                {
                    outputPath: 'assets/models/'
                }
            }
        ]
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};