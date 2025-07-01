import { useMutation } from "@tanstack/react-query";
import { trpc } from "~/utils/trpc";

export function useAddMetricMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const mutation = useMutation(
    trpc.metric.add.mutationOptions({
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
    }),
  );
  return mutation;
}
