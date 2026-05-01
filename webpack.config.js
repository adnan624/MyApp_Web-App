const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    clean: true,
  },

  resolve: {
    extensions: [
      '.web.js', '.web.jsx', '.web.ts', '.web.tsx',
      '.js', '.jsx', '.ts', '.tsx', '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
    },
  },

  module: {
    rules: [
      // react-navigation ESM files import without .js extensions
      // (e.g. './useBackButton' instead of './useBackButton.js').
      // Webpack 5 strict ESM requires extensions — this disables that.
      {
        test: /\.js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // ONLY our source code and react-native-web go through babel.
        //
        // @react-navigation, react-native-screens, and
        // react-native-safe-area-context ship pre-compiled ESM.
        // Putting them through babel converts export→exports (CJS),
        // but webpack 5 already classified them as ESM where `exports`
        // is undefined → crash. Webpack handles their ESM natively.
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, 'App.js'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/react-native-web'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { runtime: 'classic' }],
            ],
            plugins: [
              'react-native-web',
            ],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg|webp)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
    client: {
      overlay: { errors: true, warnings: false },
    },
  },

  performance: { hints: false },
};
