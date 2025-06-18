import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SP from "expo-splash-screen";
import { useEffect } from "react";
import { authClient } from "~/auth/client";
import { queryClient } from "~/trpc/client";

SP.preventAutoHideAsync();

export default function RootLayout() {
  const session = authClient.useSession();

  useEffect(() => {
    if (!session.isPending) {
      SP.hideAsync();
    }
  }, [session.isPending]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "black" } }}>
        <Stack.Protected guard={!session.data}>
          <Stack.Screen options={{ title: "Login" }} name="index" />
        </Stack.Protected>
        <Stack.Protected guard={Boolean(session.data)}>
          <Stack.Screen options={{ title: "Protected" }} name="protected" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
