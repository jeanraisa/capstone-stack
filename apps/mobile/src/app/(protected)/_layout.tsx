import { Stack } from "~/components/Stack";
import { Outfit } from "~/constants/font";
import { useSyncHealthData } from "~/hooks/apple";

export default function ProtectedLayout() {
  useSyncHealthData();
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
    </Stack>
  );
}
