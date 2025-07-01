import { Stack } from "~/components/Stack";
import { Outfit } from "~/constants/font";

export default function MenuLayout() {
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
      <Stack.Screen name="index" options={{ title: "Data Source" }} />
      <Stack.Screen name="withings" options={{ title: "Withings" }} />
    </Stack>
  );
}
