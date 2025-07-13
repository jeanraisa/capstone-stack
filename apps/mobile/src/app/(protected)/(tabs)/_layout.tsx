import { HeaderRightButton } from "~/components/StickyHeader";
import { Tabs } from "~/components/Tabs";
import { Outfit } from "~/constants/font";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: Outfit.regular,
          fontSize: 11,
        },
        headerTitleStyle: {
          fontFamily: Outfit.regular,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerRight: () => <HeaderRightButton />,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        systemImage="house"
        options={{ title: "Home", tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="result"
        systemImage="stethoscope"
        options={{ title: "Results", tabBarLabel: "Results" }}
      />
      <Tabs.Screen
        name="measure"
        systemImage="waveform.path.ecg.rectangle.fill"
        options={{ headerShown: false, tabBarLabel: "Measure" }}
      />
    </Tabs>
  );
}
