import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.mamacare.mobile.dev";
  }

  if (IS_PREVIEW) {
    return "com.mamacare.mobile.preview";
  }

  return "com.mamacare.mobile";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Mamacare (Dev)";
  }

  if (IS_PREVIEW) {
    return "Mamacare (Preview)";
  }

  return "Mamacare";
};

const getScheme = () => {
  if (IS_DEV) {
    return "mamacare-dev";
  }

  if (IS_PREVIEW) {
    return "mamacare-preview";
  }

  return "mamacare";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "mamacare",
  scheme: getScheme(),
  version: "1.0.0",
  platforms: ["ios"],
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/24520563-a553-4869-81e3-ad66023fbf7e",
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: getUniqueIdentifier(),
    supportsTablet: false,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    usesAppleSignIn: true,
  },
  extra: {
    eas: {
      projectId: "24520563-a553-4869-81e3-ad66023fbf7e",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
    "expo-apple-authentication",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#E4E4E7",
        image: "./assets/splash-icon.png",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "../../node_modules/@expo-google-fonts/outfit/100Thin/Outfit_100Thin.ttf",
          "../../node_modules/@expo-google-fonts/outfit/200ExtraLight/Outfit_200ExtraLight.ttf",
          "../../node_modules/@expo-google-fonts/outfit/300Light/Outfit_300Light.ttf",
          "../../node_modules/@expo-google-fonts/outfit/400Regular/Outfit_400Regular.ttf",
          "../../node_modules/@expo-google-fonts/outfit/500Medium/Outfit_500Medium.ttf",
          "../../node_modules/@expo-google-fonts/outfit/600SemiBold/Outfit_600SemiBold.ttf",
          "../../node_modules/@expo-google-fonts/outfit/700Bold/Outfit_700Bold.ttf",
          "../../node_modules/@expo-google-fonts/outfit/800ExtraBold/Outfit_800ExtraBold.ttf",
          "../../node_modules/@expo-google-fonts/outfit/900Black/Outfit_900Black.ttf",
        ],
      },
    ],
  ],
});
