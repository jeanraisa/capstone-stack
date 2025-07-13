import * as AC from "@bacons/apple-colors";
import { toIsoUtcDate } from "@capstone/utils/date";
import { metrics, units } from "@capstone/utils/enum";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import * as Card from "~/components/Card";
import { IconSymbol } from "~/components/IconSymbol";
import { Caption, Footnote, Subheadline } from "~/components/Title";
import { Outfit } from "~/constants/font";
import { useAddMetricMutation } from "~/hooks/metric";

export default function BloodGlucose() {
  const [value, setValue] = React.useState<string>("");
  const [predict, setPredict] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<TextInput | null>(null);

  const addMutation = useAddMetricMutation({
    onSuccess: () => {
      inputRef.current?.clear();
      setValue("");
      setTimeout(() => {
        addMutation.reset();
      }, 3000);
    },
  });

  const loading = addMutation.isPending;
  return (
    <KeyboardAwareScrollView
      ScrollViewComponent={Animated.ScrollView}
      style={{ backgroundColor: AC.systemBackground }}
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 16,
        gap: 100,
      }}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
    >
      <View style={{ gap: 5, marginHorizontal: "auto", alignItems: "center" }}>
        <IconSymbol
          name="waveform.path.ecg.rectangle"
          size={32}
          color={AC.systemPink}
        />
        <Footnote style={[styles.subtitle, { color: AC.label }]}>
          {"Concentration of glucose in the blood,\nmeasured in mg/dL."}
        </Footnote>
      </View>

      <View style={{ gap: 10, paddingHorizontal: 10 }}>
        <Card.Section>
          <Card.Content>
            <TextInput
              ref={inputRef}
              readOnly={loading}
              style={styles.input}
              value={value}
              onChangeText={(value) => {
                setValue(value.replace(",", "."));
              }}
              placeholder="Blood Glucose (mg/dL)"
              inputMode="decimal"
            />
          </Card.Content>
          <Card.Separator marginStart={18} />
          <Card.Content style={{ paddingLeft: 18, paddingVertical: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Subheadline>Run risk test</Subheadline>
              <Switch
                style={{ transform: [{ scale: 0.7 }] }}
                disabled={loading}
                value={predict}
                onValueChange={setPredict}
              />
            </View>

            <Caption style={{ color: AC.secondaryLabel }}>
              Run a test based on your existing health data and your new blood
              glucose level.
            </Caption>
          </Card.Content>
        </Card.Section>
        <Animated.View layout={LinearTransition.springify().damping(16)}>
          {error && (
            <Animated.View
              entering={FadeIn.springify().damping(16)}
              exiting={FadeOut.springify().damping(16)}
              style={{ marginBottom: 4, paddingLeft: 18 }}
            >
              <Footnote style={{ color: AC.systemRed }}>{error}</Footnote>
            </Animated.View>
          )}

          {addMutation.isSuccess && (
            <Animated.View
              entering={FadeIn.springify().damping(16)}
              exiting={FadeOut.springify().damping(16)}
              style={{
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                marginBottom: 4,
                paddingLeft: 18,
              }}
            >
              <IconSymbol
                name="checkmark.circle.fill"
                color={AC.systemGreen}
                animationSpec={{
                  effect: {
                    type: "bounce",
                  },
                  repeating: true,
                  speed: 0.05,
                }}
                size={16}
              />
              <Footnote style={{ color: AC.systemGreen }}>
                Blood Glucose added successfully
              </Footnote>
            </Animated.View>
          )}

          <Animated.View layout={LinearTransition.springify().damping(16)}>
            <TouchableOpacity
              disabled={loading}
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {
                setError("");
                const formattedValue = Number(
                  Number.parseFloat(value).toFixed(1),
                );
                if (
                  Number.isNaN(formattedValue) ||
                  formattedValue < 0 ||
                  formattedValue > 900
                ) {
                  setError("Blood Glucose must be between 0 and 900");
                  return;
                }

                addMutation.mutate({
                  date: toIsoUtcDate(new Date()),
                  predict,
                  data: [
                    {
                      type: metrics.BLOOD_GLUCOSE,
                      value: formattedValue,
                      unit: units.MGDL,
                    },
                  ],
                });
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Footnote style={{ fontSize: 15, color: "white" }}>
                  Save
                </Footnote>
              )}
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 18,
    fontFamily: Outfit.regular,
    color: AC.label,
    fontSize: 16,
  },
  subtitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 13,
  },
  button: {
    backgroundColor: AC.systemBlue,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
