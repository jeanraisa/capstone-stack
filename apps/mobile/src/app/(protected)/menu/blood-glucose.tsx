import * as AC from "@bacons/apple-colors";
import { toIsoUtcDate } from "@capstone/utils/date";
import { metrics, units } from "@capstone/utils/enum";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import * as Card from "~/components/Card";
import { IconSymbol } from "~/components/IconSymbol";
import { Footnote } from "~/components/Title";
import { Outfit } from "~/constants/font";
import { useAddMetricMutation } from "~/hooks/metric";

export default function BloodGlucose() {
  const [value, setValue] = React.useState<string>("");
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
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 16,
        gap: 100,
      }}
    >
      <View style={{ gap: 5, marginHorizontal: "auto", alignItems: "center" }}>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: AC.systemYellow,
            borderRadius: 8,
          }}
        >
          <IconSymbol name="flame.fill" color="#fff" />
        </View>
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
        </Card.Section>

        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            const formattedValue = Number(Number.parseFloat(value).toFixed(1));
            if (formattedValue < 21) return;

            addMutation.mutate({
              type: metrics.BLOOD_GLUCOSE,
              value: formattedValue,
              unit: units.MGDL,
              date: toIsoUtcDate(new Date()),
            });
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : addMutation.isSuccess ? (
            <IconSymbol
              name="checkmark.circle.fill"
              color="white"
              animationSpec={{
                effect: {
                  type: "bounce",
                },
                repeating: true,
                speed: 0.05,
              }}
            />
          ) : (
            <Footnote style={{ fontSize: 15, color: "white" }}>Save</Footnote>
          )}
        </TouchableOpacity>
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
