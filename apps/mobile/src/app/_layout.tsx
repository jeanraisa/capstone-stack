import * as AC from "@bacons/apple-colors";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SP from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Stack } from "~/components/Stack";
import { Footnote, Subheadline } from "~/components/Title";
import { WelcomeSheet } from "~/components/sheets/Welcome";
import { useSession } from "~/hooks/user";
import { queryClient } from "~/utils/trpc";

SP.preventAutoHideAsync();

export const unstable_settings = {};

function App() {
  const session = useSession();

  useEffect(() => {
    if (session.isPending) return;
    SP.hideAsync();
  }, [session.isPending]);

  return (
    <Stack>
      <Stack.Protected guard={!!session.data?.session}>
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!session.data?.session}>
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Log in",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Footnote style={{ color: AC.link, fontSize: 16 }}>
                  Cancel
                </Footnote>
              </Pressable>
            ),
            headerTitle: (props) => (
              <Subheadline style={{ color: AC.label, fontSize: 17 }}>
                {props.children}
              </Subheadline>
            ),
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Sign Up",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <Footnote style={{ color: AC.link, fontSize: 16 }}>
                  Cancel
                </Footnote>
              </Pressable>
            ),
            headerTitle: (props) => (
              <Subheadline style={{ color: AC.label, fontSize: 17 }}>
                {props.children}
              </Subheadline>
            ),
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider statusBarTranslucent>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <StatusBar animated />
              <App />
              <WelcomeSheet />
            </ThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
