import { dataProviders } from "@capstone/utils/enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import React from "react";
import Config from "~/config";
import { generateURI } from "./lib";
import { trpc } from "./trpc";

export function useWithingsAuth(path: string) {
  const [, , promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.app?.withingsClientId as string,
      scopes: ["user.activity,user.metrics,user.sleepevents,user.info"],
      redirectUri: generateURI(path),
      responseType: "code",
    },
    {
      authorizationEndpoint:
        "https://account.withings.com/oauth2_user/authorize2",
    },
  );

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation(
    trpc.dataProvider.registerWithings.mutationOptions({
      onSuccess: async () => {
        queryClient.invalidateQueries(
          trpc.dataProvider.get.queryFilter({
            provider: dataProviders.WITHINGS,
          }),
        );
      },
    }),
  );

  const handleWithingsAuth = React.useCallback(async () => {
    const response = await promptAsync();

    if (response.type === "success") {
      if (!response.params.code) return;
      mutate({
        code: response.params.code,
        redirectURI: generateURI(path),
      });
    }
  }, [promptAsync, mutate]);

  return { handleWithingsAuth, isPending };
}
