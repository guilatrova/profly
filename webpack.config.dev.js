import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

export default {
  devtool: 'cheap-module-eval-source-map',
  // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src')],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,

      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
    }),
  ],
  resolve: {
    // To support react-hot-loader
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      common: path.resolve(__dirname, 'src/common'),
      core: path.resolve(__dirname, 'src/core'),
      pages: path.resolve(__dirname, 'src/pages'),
      'react-dom': '@hot-loader/react-dom',
      routes: path.resolve(__dirname, 'src/routes'),
      savings: path.resolve(__dirname, 'src/savings'),
      stocks: path.resolve(__dirname, 'src/stocks'),
      utils: path.resolve(__dirname, 'src/utils'),
    },

    extensions: ['*', '.js', '.jsx', '.json'],
  },
  target: 'web',
}
