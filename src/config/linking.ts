/**
 * Deep link / universal link bases for React Navigation.
 * Web: use WEB_BASE_URL as the origin (no trailing slash).
 * Native: custom scheme `${APP_LINK_SCHEME}://`.
 */

export const WEB_BASE_URL = 'http://localhost:3000';

export const APP_LINK_SCHEME = 'myapp';

/** Passed to NavigationContainer `linking.prefixes`. */
export const LINKING_PREFIXES: string[] = [
  `${APP_LINK_SCHEME}://`,
  WEB_BASE_URL,
];
