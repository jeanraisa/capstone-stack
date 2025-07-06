import { useQuery } from "@tanstack/react-query";
import { Stack } from "~/components/Stack";
import { Outfit } from "~/constants/font";
import { useSyncHealthData } from "~/hooks/apple";
import { trpc } from "~/utils/trpc";

export default function ProtectedLayout() {
  useSyncHealthData();
  const userStatus = useQuery(trpc.user.status.queryOptions());

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: Outfit.regular,
        },
        headerBackTitleStyle: {
          fontFamily: Outfit.regular,
        },
      }}
    >
      <Stack.Protected guard={!!userStatus.data?.onboarded}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings/index"
          options={{
            title: "Settings",
            animation: "fade",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!userStatus.data?.onboarded}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
