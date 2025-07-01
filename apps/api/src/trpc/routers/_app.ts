import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { dataProviderRouter } from "./data-provider";
import { metricRouter } from "./metric";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  user: userRouter,
  dataProvider: dataProviderRouter,
  metric: metricRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
