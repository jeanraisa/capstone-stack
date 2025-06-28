import {
  type BottomTabBarButtonProps,
  type BottomTabNavigationOptions,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Tabs as NativeTabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import { IconSymbol, type IconSymbolName } from "./IconSymbol";

export function BlurTabBarBackground() {
  return (
    <BlurView
      tint="systemThinMaterial"
      intensity={50}
      style={StyleSheet.absoluteFill}
    />
  );
}

const TabsContext = React.createContext<{
  scrollY: SharedValue<number> | null;
}>({ scrollY: null });

const DEFAULT_TABS: BottomTabNavigationOptions = {
  tabBarButton: HapticTab,
  tabBarBackground: BlurTabBarBackground,
  tabBarStyle: {
    position: "absolute",
  },
};

export function Tabs({
  screenOptions,
  children,
  ...props
}: React.ComponentProps<typeof NativeTabs>) {
  const scrollY = useSharedValue(0);
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      //@ts-ignore
      const { systemImage, title, ...rest } = child.props;
      if (systemImage || title != null) {
        return React.cloneElement(child, {
          ...rest,
          options: {
            tabBarIcon: !systemImage
              ? undefined
              : (props: any) => <IconSymbol {...props} name={systemImage} />,
            title,
            ...rest.options,
          },
        });
      }
    }
    return child;
  });

  return (
    <TabsContext value={{ scrollY }}>
      <NativeTabs
        screenOptions={{
          ...DEFAULT_TABS,
          ...screenOptions,
        }}
        {...props}
      >
        {processedChildren}
      </NativeTabs>
    </TabsContext>
  );
}

Tabs.Screen = NativeTabs.Screen as React.FC<
  React.ComponentProps<typeof NativeTabs.Screen> & {
    /** Add a system image for the tab icon. */
    systemImage?: IconSymbolName;
    /** Set the title of the icon. */
    title?: string;
  }
>;

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        props.onPressIn?.(ev);
      }}
    />
  );
}

export function useBottomTabOverflow() {
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight();
  } catch (e) {}
  return tabHeight;
}

export function useTabsScrollPosition() {
  const context = React.use(TabsContext);
  if (context.scrollY === null) {
    throw new Error("Must be called inside tabs");
  }
  return context.scrollY;
}
