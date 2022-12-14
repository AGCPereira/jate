const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ new HtmlWebpackPlugin({
      favicon: "./src/images/logo.png",
      template: './index.html',
      title: 'Webpack Plugin',
  }),
  new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'service-worker.js',
  }),
  new WebpackPwaManifest({
      name: "Just Another Text Editor",
      short_name: "J.A.T.E.",
      description: "Takes notes with JavaScript syntax highlighting!",
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: './',
      publicPath: './',
      icons: [
          {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
          },
          {
              src: path.resolve('src/images/logo.png'),
              size: '1024x1024',
              destination: path.join('assets', 'icons'),
              purpose: 'maskable',
          }
      ],
    }), 
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        } 
      ],
    },
  };
};
