import * as AC from "@bacons/apple-colors";
import * as AppleAuthentication from "expo-apple-authentication";
import { BlurView } from "expo-blur";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { BodyScrollView } from "~/components/BodyScrollView";
import * as Card from "~/components/Card";
import { Footnote } from "~/components/Title";
import { Outfit } from "~/constants/font";
import { useSignInMutation, useSignInWithAppleMutation } from "~/hooks/user";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const colorScheme = useColorScheme();

  const signInMutation = useSignInMutation();
  const signInWithApple = useSignInWithAppleMutation();

  const disabled = signInMutation.isPending || signInWithApple.isPending;

  return (
    <SafeAreaView edges={{ top: "off" }} style={[styles.containter]}>
      <BlurView
        intensity={30}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <BodyScrollView
        contentContainerStyle={{
          gap: 24,
          paddingTop: 50,
          paddingHorizontal: 16,
        }}
      >
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
        <TouchableOpacity
          disabled={disabled}
          style={styles.button}
          activeOpacity={0.8}
          onPress={async () => {
            if (email.trim().length < 4 || password.trim().length < 8) return;
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

        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <View style={styles.separator} />
          <Footnote style={{ color: AC.tertiaryLabel }}>OR</Footnote>
          <View style={styles.separator} />
        </View>

        {Platform.OS === "ios" && (
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
              } catch (e) {}
            }}
          />
        )}

        <View style={{ marginHorizontal: "auto" }}>
          <Link href="/register" replace asChild>
            <Pressable disabled={disabled}>
              <Footnote style={{ color: AC.systemBlue, fontSize: 15 }}>
                Sign up
              </Footnote>
            </Pressable>
          </Link>
        </View>
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
