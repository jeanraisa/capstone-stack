import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../init";

export const userRouter = {
  getMany: protectedProcedure.query(async ({ ctx: { db } }) => {
    return db.query.user.findMany({
      columns: {
        name: true,
        id: true,
      },
    });
  }),
} satisfies TRPCRouterRecord;
