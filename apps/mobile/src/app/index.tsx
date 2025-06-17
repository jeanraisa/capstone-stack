import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "~mobile/trpc/client";

export default function Index() {
  const query = useQuery(trpc.user.getMany.queryOptions());

  if (query.isPending) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={{ top: "off", bottom: "additive" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (query.isError) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={{ top: "off", bottom: "additive" }}
      >
        <Text style={styles.text}>Error</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={{ top: "off", bottom: "additive" }}
    >
      {query.data.map((user) => (
        <Text key={user.id}>{user.fullName}</Text>
      ))}
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
