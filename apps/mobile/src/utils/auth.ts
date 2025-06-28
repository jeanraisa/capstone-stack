import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { getBaseUrl } from "./lib";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: "mamacare",
      storage: SecureStore,
    }),
  ],
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => SecureStore.getItem("bearer_token") || "",
    },
    onSuccess: (ctx) => {
      const headers = ctx.response.headers;
      const authToken = headers.get("set-auth-token");
      if (authToken) {
        SecureStore.setItem("bearer_token", authToken);
      }
    },
  },
});
