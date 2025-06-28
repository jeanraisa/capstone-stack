import { Stack } from "~/components/Stack";
import { MenuSheet } from "~/components/sheets/menu/screen";
import { Outfit } from "~/constants/font";

export default function ProtectedLayout() {
  return (
    <>
      <MenuSheet />
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
      </Stack>
    </>
  );
}
