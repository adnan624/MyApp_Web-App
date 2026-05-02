# How web and native both run from this repo

This project is a **single React Native codebase** that ships **two different bundles**: one for **iOS/Android** (Metro) and one for the **browser** (Webpack + `react-native-web`). The same `App.tsx` and most of `src/` run in both environments.

---

## The big picture

| | **Native (iOS & Android)** | **Web (browser)** |
|---|---------------------------|-------------------|
| **Entry file** | `index.js` | `index.web.js` |
| **Bundler** | [Metro](https://metrobundler.dev/) (React Native’s default) | [Webpack](https://webpack.js.org/) (`webpack.config.js`) |
| **How the app mounts** | `AppRegistry.registerComponent` → native root view | `react-dom/client` `createRoot` → DOM `#root` |
| **“React Native” at runtime** | Real RN views (UIKit / Android views) | `react-native-web` maps components to DOM (alias in Webpack) |
| **Typical dev command** | `npm start` + `npm run ios` / `npm run android` | `npm run web` |

Native and web **do not share the same JS bundle file**, but they **do share source** (`App.tsx`, screens, navigation, most components).

---

## Native: iOS and Android

1. **`index.js`** is the native entry. It registers your root component with React Native:

   ```text
   AppRegistry.registerComponent(appName, () => App);
   ```

2. **Metro** bundles JavaScript for the native app. It uses **`babel.config.js`** (preset `@react-native/babel-preset`, module-resolver, etc.).  
   **Important:** The Babel plugin `react-native-web` is **not** in `babel.config.js` on purpose — it would rewrite `react-native` imports on native and break the app.

3. At runtime, **`Platform.OS`** is `'ios'` or `'android'`. Components render to **real native views**.

4. You run the native app with **`npm run ios`** or **`npm run android`** (after Metro is running with **`npm start`**).

---

## Web: browser

1. **`index.web.js`** is the web-only entry. It uses **`react-dom`** to mount `<App />` into the page (with an error boundary and dev-friendly error overlays).

2. **Webpack** is configured with:
   - **`entry: index.web.js`**
   - **`resolve.alias`**: `'react-native$': 'react-native-web'` so imports of `react-native` compile to **DOM-backed** implementations.
   - **Extension order** (e.g. `.web.tsx` before `.tsx`) so **platform-specific files** like `Something.web.tsx` are chosen when they exist.
   - **Babel** for your app code + `react-native-web`, including the **`react-native-web` Babel plugin** (this stays **only** in Webpack — see `webpack.config.js`).

3. At runtime, **`Platform.OS`** is **`'web'`**. The same JSX you write for RN is turned into **HTML elements** by `react-native-web`.

4. **Dev server**: `npm run web` runs Webpack dev server (this project uses **port 3000**; see `webpack.config.js`). **`historyApiFallback`** helps client-side routes work when you refresh on a path like `/form`.

5. Production web build: **`npm run build:web`** outputs to **`dist/`** (see `webpack.config.js`).

---

## One `App.tsx`, two behaviors

`App.tsx` wraps navigation in **`SafeAreaProvider`** only on **native** (not on web), because safe-area handling differs and web doesn’t need that provider the same way:

- **Web:** `Platform.OS === 'web'` → render `<AppNavigator />` only.
- **iOS/Android:** wrap `<AppNavigator />` with `<SafeAreaProvider>`.

Everything under `AppNavigator` (stack, screens, linking) is shared.

---

## Platform-specific code (optional)

When behavior or implementation must differ:

- **Runtime:** `Platform.OS === 'web'` / `'ios'` / `'android'` in one file.
- **File split:** Metro and the resolver support suffixes such as **`.web.tsx`** and **`.native.tsx`**. This repo includes examples like platform-specific header or alert implementations under `src/components/`.

Webpack resolves **`.web.*` first**; Metro uses its own resolution (e.g. `.ios.js` / `.android.js` and `.native.js`).

---

## URLs and deep linking

`src/config/linking.ts` defines **link prefixes** for React Navigation:

- **Web:** base like `http://localhost:3000` so paths such as `/form` match stack routes.
- **Native:** custom scheme **`myapp://`** for app-opened URLs (you still configure iOS/Android project files for the scheme to open the app).

`AppNavigator` wires these prefixes into **`NavigationContainer`** so **browser address bar** and **native intents** can align with the same route names.

---

## Quick commands

| Goal | Command |
|------|--------|
| Metro (native bundler) | `npm start` |
| iOS simulator / device | `npm run ios` |
| Android emulator / device | `npm run android` |
| Web dev server | `npm run web` |
| Web production build | `npm run build:web` |

---

## Summary

- **Same React components and navigation** in **`App.tsx`** and **`src/`**.
- **Native:** Metro + `index.js` + real React Native → native UI.
- **Web:** Webpack + `index.web.js` + `react-native-web` → DOM UI.
- **Differences** are handled with **`Platform`**, **`.web` / `.native` files**, and **separate bundler config** — not by maintaining two unrelated apps.
