import * as AC from "@bacons/apple-colors";
import { toIsoUtcDate } from "@capstone/utils/date";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, subYears } from "date-fns";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInUp,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { BodyScrollView } from "~/components/BodyScrollView";
import { Caption, Footnote, Subheadline } from "~/components/Title";
import { trpc } from "~/utils/trpc";

export default function SettingsProfile() {
  const today = new Date();
  const yearsAgo = subYears(today, 18);
  const [showDate, setShowDate] = React.useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    trpc.user.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }),
  );

  const userStatus = useQuery(trpc.user.status.queryOptions());
  const [date, setDate] = React.useState<Date>(
    userStatus.data?.dob ? new Date(userStatus.data.dob) : yearsAgo,
  );

  if (userStatus.isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (userStatus.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Footnote>Sorry an error as occured</Footnote>
      </View>
    );
  }

  const pending = updateMutation.isPending;

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 16,
        gap: 18,
      }}
    >
      <Animated.View
        layout={LinearTransition.springify().damping(16)}
        style={{ gap: 16 }}
      >
        <Animated.View
          style={{
            borderCurve: "continuous",
            borderRadius: 16,
            backgroundColor: AC.secondarySystemBackground,
            overflow: "hidden",
            paddingHorizontal: 18,
            paddingVertical: 8,
            gap: 10,
          }}
          layout={LinearTransition.springify().damping(16)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Subheadline>Date</Subheadline>
            <Pressable
              onPress={() => {
                setShowDate((prev) => !prev);
              }}
              style={{
                backgroundColor: AC.tertiarySystemBackground,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Footnote
                style={{
                  color: showDate ? AC.systemBlue : AC.label,
                }}
              >
                {format(date, "d LLL yyyy")}
              </Footnote>
            </Pressable>
          </View>

          {showDate && (
            <Animated.View
              entering={FadeInUp.springify().damping(16)}
              exiting={FadeOut.springify().damping(16)}
              layout={LinearTransition.springify().damping(16)}
            >
              <DateTimePicker
                locale={"en-US"}
                mode="date"
                display="inline"
                maximumDate={yearsAgo}
                value={date}
                onChange={(_, value) => {
                  if (value) {
                    setDate(value);
                  }
                }}
              />
            </Animated.View>
          )}

          <Animated.View layout={LinearTransition.springify().damping(16)}>
            <Caption>
              Run a test based on your existing health data and your new body
              temperature.
            </Caption>
          </Animated.View>
        </Animated.View>

        <Animated.View layout={LinearTransition.springify().damping(16)}>
          <TouchableOpacity
            disabled={pending}
            style={{
              backgroundColor: AC.systemBlue,
              padding: 12,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
            onPress={() => {
              setShowDate(false);
              updateMutation.mutate({
                dob: toIsoUtcDate(date),
              });
            }}
          >
            {pending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Footnote style={{ fontSize: 15, color: "white" }}>Save</Footnote>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </BodyScrollView>
  );
}
