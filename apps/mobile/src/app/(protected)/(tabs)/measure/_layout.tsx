import { Stack } from "~/components/Stack";

export default function MenuLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
