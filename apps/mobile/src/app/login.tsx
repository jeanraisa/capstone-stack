import * as AC from "@bacons/apple-colors";
import * as AppleAuthentication from "expo-apple-authentication";
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { Footnote } from "~/components/Title";
import { Outfit } from "~/constants/font";
import { useSignInMutation, useSignInWithAppleMutation } from "~/hooks/user";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const colorScheme = useColorScheme();

  const signInMutation = useSignInMutation({ onError: setError });
  const signInWithApple = useSignInWithAppleMutation();

  const disabled = signInMutation.isPending || signInWithApple.isPending;

  return (
    <SafeAreaView edges={{ top: "off" }} style={[styles.containter]}>
      <BodyScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 16,
        }}
        layout={LinearTransition.springify().damping(16)}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
      >
        <Animated.View layout={LinearTransition.springify().damping(16)}>
          <Card.Section>
            <Card.Content>
              <TextInput
                readOnly={disabled}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                inputMode="email"
              />
              <Card.Separator marginStart={16} />
              <TextInput
                readOnly={disabled}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                inputMode="text"
                secureTextEntry
              />
            </Card.Content>
          </Card.Section>
        </Animated.View>

        {error && (
          <Animated.View
            style={{ paddingHorizontal: 18, marginTop: 4 }}
            entering={FadeIn.springify().damping(16)}
            exiting={FadeOut.springify().damping(16)}
          >
            <Footnote style={{ color: AC.systemRed }}>{error}</Footnote>
          </Animated.View>
        )}

        <Animated.View
          layout={LinearTransition.springify().damping(16)}
          style={{ marginTop: 24 }}
        >
          <TouchableOpacity
            disabled={disabled}
            style={styles.button}
            activeOpacity={0.8}
            onPress={async () => {
              setError("");
              signInMutation.mutate({ email, password });
            }}
          >
            {disabled ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Footnote style={{ fontSize: 15, color: "white" }}>
                Continue
              </Footnote>
            )}
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          layout={LinearTransition.springify().damping(16)}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <View style={styles.separator} />
          <Footnote style={{ color: AC.tertiaryLabel }}>OR</Footnote>
          <View style={styles.separator} />
        </Animated.View>

        {Platform.OS === "ios" && (
          <Animated.View
            style={{ marginTop: 24 }}
            layout={LinearTransition.springify().damping(16)}
          >
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
              }
              buttonStyle={
                colorScheme === "dark"
                  ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                  : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={10}
              style={{ height: 42 }}
              onPress={async () => {
                if (disabled) return;
                setError("");
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });

                  if (!credential.identityToken) return;
                  signInWithApple.mutate({
                    idToken: credential.identityToken,
                    firstName: credential.fullName?.givenName,
                    lastName: credential.fullName?.familyName,
                    callbackURL: "/login",
                  });
                } catch (e) {
                  if (e instanceof Object && "code" in e) {
                    const code = e.code as string;
                    switch (code) {
                      case "ERR_INVALID_OPERATION":
                        setError(
                          "An invalid authorization operation has been performed.",
                        );
                        break;
                      case "ERR_INVALID_RESPONSE":
                        setError(
                          "The authorization request received an invalid response.",
                        );
                        break;
                      case "ERR_REQUEST_CANCELED":
                        setError("The authorization request is canceled.");
                        break;
                      default:
                        setError("The authorization request failed.");
                    }
                  } else {
                    setError("The authorization request failed.");
                  }
                }
              }}
            />
          </Animated.View>
        )}

        <Animated.View
          layout={LinearTransition.springify().damping(16)}
          style={{ marginHorizontal: "auto", marginTop: 24 }}
        >
          <Link href="/register" replace asChild>
            <Pressable disabled={disabled}>
              <Footnote style={{ color: AC.systemBlue, fontSize: 15 }}>
                Sign up
              </Footnote>
            </Pressable>
          </Link>
        </Animated.View>
      </BodyScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  input: {
    padding: 18,
    fontFamily: Outfit.regular,
    color: AC.label,
    fontSize: 16,
  },
  button: {
    backgroundColor: AC.systemBlue,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  separator: {
    height: 0.4,
    flex: 1,
    backgroundColor: AC.separator,
  },
});
