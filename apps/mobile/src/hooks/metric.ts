import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "~/utils/trpc";

export function useAddMetricMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.metric.add.mutationOptions({
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
        queryClient.invalidateQueries(trpc.metric.getDailyStats.queryFilter());
      },
    }),
  );
  return mutation;
}
