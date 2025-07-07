import { Stack } from "~/components/Stack";
import { Outfit } from "~/constants/font";

export default function ProtectedLayout() {
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
      <Stack.Screen name="dob" options={{ title: "Date Of Birth" }} />
    </Stack>
  );
}
