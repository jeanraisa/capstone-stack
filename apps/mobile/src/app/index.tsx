import { Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={styles.container}
      edges={{ top: "off", bottom: "additive" }}
    >
      <Stack.Screen options={{ title: "Home Page" }} />
      <Text style={styles.text}>Wellcome</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 300,
  },
});
