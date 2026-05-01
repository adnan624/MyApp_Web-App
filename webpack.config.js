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
    // .web.tsx/.web.ts must come first so platform files resolve correctly
    extensions: [
      '.web.tsx', '.web.ts', '.web.js', '.web.jsx',
      '.tsx', '.ts', '.js', '.jsx', '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
    },
  },

  module: {
    rules: [
      // Disable strict ESM fully-specified requirement for node_modules
      // Fixes: "Can't resolve './useBackButton'" in @react-navigation
      {
        test: /\.js$/,
        resolve: { fullySpecified: false },
      },
      // Transpile our source + react-native-web through babel+typescript
      // Do NOT include @react-navigation/* — they ship pre-compiled ESM
      // that webpack handles natively. Running babel over them causes
      // the `exports is not defined` crash.
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, 'App.tsx'),
          path.resolve(appDirectory, 'App.js'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/react-native-web'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              ['@babel/preset-env', { modules: false, targets: 'defaults, not ie 11' }],
              ['@babel/preset-react', { runtime: 'classic' }],
              '@babel/preset-typescript',
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
