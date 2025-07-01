import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { dataProviderRouter } from "./data-provider";
import { userRouter } from "./users";

export const appRouter = createTRPCRouter({
  user: userRouter,
  dataProvider: dataProviderRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
