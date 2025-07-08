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

const getAppConfig = () => {
  if (IS_DEV) {
    return {
      apiUrl: "https://mamacare-api-preview.fly.dev",
      withingsClientId:
        "db309d72266db335627275e3dc08cb6d26f9f9cf9e18ff83e439f25a139df80b",
    };
  }
  if (IS_PREVIEW) {
    return {
      apiUrl: "https://mamacare-api-preview.fly.dev",
      withingsClientId:
        "db309d72266db335627275e3dc08cb6d26f9f9cf9e18ff83e439f25a139df80b",
    };
  }
  return {
    apiUrl: "https://mamacare-api.fly.dev",
    withingsClientId:
      "58d74854da60cd18d555404228ac119dffae58443acfeb7d1a4aeb56ac25d087",
  };
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "mamacare",
  scheme: getScheme(),
  version: "1.0.0",
  platforms: ["ios"],
  orientation: "portrait",
  icon: "./assets/logo.png",
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
      UIViewControllerBasedStatusBarAppearance: true,
    },
    usesAppleSignIn: true,
  },
  extra: {
    eas: {
      projectId: "24520563-a553-4869-81e3-ad66023fbf7e",
    },
    app: getAppConfig(),
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
    "@bacons/apple-colors",
    [
      "expo-splash-screen",
      {
        image: "./assets/logo.png",
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
    [
      "react-native-health",
      {
        isClinicalDataEnabled: true,
        healthSharePermission: "Allow Mamacare to check health info",
        healthUpdatePermission: "Allow Mamacare to update health info",
        healthClinicalDescription: "Allow Mamacare to check health info",
      },
    ],
  ],
  jsEngine: "jsc",
});
