import type { ConfigContext, ExpoConfig } from "expo/config";

// TODO: SET UP EAS

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "mobile",
  slug: "mamacare",
  scheme: "mamacare",
  version: "0.1.0",
  platforms: ["ios"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.mamacare.mobile",
    supportsTablet: false,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#E4E4E7",
        image: "./assets/splash-icon.png",
      },
    ],
  ],
});
