import * as AC from "@bacons/apple-colors";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol, type IconSymbolName } from "~/components/IconSymbol";
import { Footnote, LargeTitle, Subheadline } from "~/components/Title";

export const WELCOME_SHEET_NAME = "welcome-screen-sheet";

export function WelcomeSheet() {
  const sheetRef = React.useRef<TrueSheet>(null);
  const { top } = useSafeAreaInsets();

  return (
    <TrueSheet
      name={WELCOME_SHEET_NAME}
      sizes={["large"]}
      grabber={false}
      ref={sheetRef}
      dismissible={false}
      initialIndexAnimated={false}
      style={{ backgroundColor: AC.systemGray6, flex: 1 }}
    >
      <View style={[styles.container, { paddingTop: top }]}>
        <LargeTitle style={{ fontSize: 24, textAlign: "center" }}>
          Welcome to Mamacare
        </LargeTitle>

        <View style={styles.highlight}>
          <HighlightCard
            icon="stethoscope"
            title="Accept Invitations"
            description="Accept invitations to beta programmers and install the latest beta software."
          />

          <HighlightCard
            icon="waveform.path.ecg"
            title="Accept Invitations"
            description="Accept invitations to beta programmers and install the latest beta software."
          />

          <HighlightCard
            icon="bell"
            title="Accept Invitations"
            description="Accept invitations to beta programmers and install the latest beta software."
          />
        </View>
        <View style={styles.footer}>
          <BlurView
            intensity={50}
            tint="systemThinMaterial"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          <View style={{ marginHorizontal: "auto" }}>
            <IconSymbol
              name="person.badge.shield.checkmark.fill"
              size={16}
              color={AC.systemBlue}
            />
          </View>

          <Footnote style={[styles.highlightCardDesc, { textAlign: "center" }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </Footnote>

          <Link href="https://example.com">
            <Footnote style={{ color: AC.systemBlue, textAlign: "center" }}>
              See how your data is managed...
            </Footnote>
          </Link>

          <View style={{ paddingHorizontal: 50, marginTop: 20 }}>
            <Link href="/login" asChild>
              <TouchableOpacity
                onPress={async () => {
                  await sheetRef.current?.dismiss();
                }}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Footnote style={{ fontSize: 15, color: "white" }}>
                  Continue
                </Footnote>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </TrueSheet>
  );
}

function HighlightCard(props: {
  icon: IconSymbolName;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.highlightCard}>
      <IconSymbol
        name={props.icon}
        weight="light"
        size={32}
        color={AC.systemBlue}
      />

      <View style={{ maxWidth: 200 }}>
        <Subheadline>{props.title}</Subheadline>
        <Footnote style={styles.highlightCardDesc}>
          {props.description}
        </Footnote>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 42,
  },
  highlight: {
    marginHorizontal: "auto",
    gap: 16,
  },
  highlightCard: {
    flexDirection: "row",
    gap: 10,
  },
  highlightCardDesc: {
    color: AC.secondaryLabel,
    marginTop: 3,
  },
  footer: {
    height: 700,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: AC.secondarySystemGroupedBackground,
  },
  button: {
    backgroundColor: AC.systemBlue,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
