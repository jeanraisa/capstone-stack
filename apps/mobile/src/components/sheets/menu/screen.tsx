import { TrueSheet } from "@lodev09/react-native-true-sheet";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationIndependentTree,
  ThemeProvider,
} from "@react-navigation/native";
import {
  type NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { View, useColorScheme, useWindowDimensions } from "react-native";
import { type SharedValue, useSharedValue } from "react-native-reanimated";
import { AnimatedHeaderTitle } from "~/components/AnimatedHeaderTitle";
import BlurHeader from "~/components/BlurHeader";
import { MainMenu } from "./main";

const Stack = createNativeStackNavigator();
export const MENU_SHEET_NAME = "menu-navigation-container";

const ScrollPostion = React.createContext<{
  scrollY: SharedValue<number> | null;
}>({ scrollY: null });

const MainWithScrollPosition = () => {
  const scrollY = React.use(ScrollPostion).scrollY;
  if (!scrollY) return null;
  return <MainMenu scrollY={scrollY} />;
};

const Navigator = () => {
  const scrollY = useSharedValue(0);
  const colorScheme = useColorScheme();

  const screenOptions = React.useMemo<NativeStackNavigationOptions>(
    () => ({
      stackAnimation: "ios_from_right",
      headerMode: "flaot",
      headerShown: true,
      safeAreaInsets: { top: 0 },
      headerShadowVisible: false,
      cardStyle: {},
    }),
    [],
  );

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ScrollPostion.Provider value={{ scrollY }}>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen
                name="Main"
                options={{
                  header: () => {
                    return (
                      <>
                        <BlurHeader
                          onClose={async () => {
                            TrueSheet.dismiss(MENU_SHEET_NAME);
                          }}
                        />
                        <AnimatedHeaderTitle
                          scrollY={scrollY}
                          title="Add Data"
                        />
                      </>
                    );
                  },
                }}
                component={MainWithScrollPosition}
              />
            </Stack.Navigator>
          </ScrollPostion.Provider>
        </ThemeProvider>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export function MenuSheet() {
  const sheetRef = React.useRef<TrueSheet | null>(null);
  const height = useWindowDimensions().height;
  return (
    <TrueSheet
      ref={sheetRef}
      name={MENU_SHEET_NAME}
      grabber={false}
      sizes={["large"]}
    >
      <View style={{ minHeight: height }}>
        <Navigator />
      </View>
    </TrueSheet>
  );
}
