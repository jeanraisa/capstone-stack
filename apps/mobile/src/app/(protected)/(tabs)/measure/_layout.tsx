import { Stack } from "~/components/Stack";
import { HeaderRightButton } from "~/components/StickyHeader";
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
        headerRight: () => <HeaderRightButton />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Data Source" }} />
      <Stack.Screen name="withings" options={{ title: "Withings" }} />
      <Stack.Screen name="heart-rate" options={{ title: "Heart Rate" }} />
      <Stack.Screen name="blood-glucose" options={{ title: "Blood Glucose" }} />
      <Stack.Screen
        name="blood-pressure"
        options={{ title: "Blood Pressure" }}
      />
      <Stack.Screen
        name="body-temperature"
        options={{ title: "Body Temperature" }}
      />
      <Stack.Screen name="apple" options={{ title: "Apple Health" }} />
    </Stack>
  );
}
