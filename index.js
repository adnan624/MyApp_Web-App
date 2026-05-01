/**
 * index.js — Native entry point (iOS & Android)
 * Webpack uses index.web.js instead of this file.
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
