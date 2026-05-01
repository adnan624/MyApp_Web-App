module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // NOTE: 'react-native-web' plugin is NOT here — it lives ONLY
    // in webpack.config.js babel-loader. If it were here, Metro would
    // rewrite react-native imports on iOS/Android and crash.
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js', '.android.js',
          '.web.js', '.native.js',
          '.js', '.jsx', '.ts', '.tsx', '.json',
        ],
        alias: {
          '@screens':    './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
