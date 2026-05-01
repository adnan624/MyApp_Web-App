const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro config — native only (iOS & Android).
 * Webpack handles the web build; Metro never runs for web.
 *
 * .web.js is placed LAST so Metro never resolves it on native devices.
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      'web.js', 'web.jsx', 'web.ts', 'web.tsx',
    ],
  },
};

module.exports = mergeConfig(defaultConfig, config);
