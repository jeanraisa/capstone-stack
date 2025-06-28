import { StickyHeader } from "~/components/StickyHeader";
import { Tabs } from "~/components/Tabs";
import { Outfit } from "~/constants/font";
import { useSession } from "~/hooks/user";

export default function TabsLayout() {
  const session = useSession();
  return (
    <Tabs
      screenOptions={{
        header: (props) => {
          return <StickyHeader title={props.options.title ?? ""} />;
        },
        tabBarLabelStyle: {
          fontFamily: Outfit.regular,
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        systemImage="house"
        options={{ title: session.data?.user.name, tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="result"
        systemImage="stethoscope"
        options={{ title: "Result", tabBarLabel: "Result" }}
      />
      <Tabs.Screen
        name="measure"
        systemImage="waveform.path.ecg.rectangle.fill"
        options={{ title: "Measure", tabBarLabel: "Measure" }}
      />
    </Tabs>
  );
}
