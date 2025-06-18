import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3003",
  plugins: [
    expoClient({
      scheme: "mamacare",
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
