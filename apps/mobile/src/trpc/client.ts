import type { AppRouter } from "@capstone/api/trpc/routers/_app";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
    },
  },
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
        colorMode: "ansi",
      }),
      httpBatchLink({
        transformer: superjson,
        url: "http://localhost:3003/trpc",
        headers() {
          const headers = new Map<string, string>();
          headers.set("x-trpc-source", "expo-react-native");
          return Object.fromEntries(headers);
        },
      }),
    ],
  }),
  queryClient,
});

export type {
  RouterOutputs,
  RouterInputs,
} from "@capstone/api/trpc/routers/_app";
