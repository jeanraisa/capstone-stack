import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../init";

export const userRouter = {
  getMany: publicProcedure.query(async ({ ctx: { db } }) => {
    return db.query.users.findMany({
      columns: {
        fullName: true,
        id: true,
      },
    });
  }),
} satisfies TRPCRouterRecord;
