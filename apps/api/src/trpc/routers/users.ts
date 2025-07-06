import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";
import { getUserStatus, updateUser } from "~api/db/queries/users";
import { protectedProcedure } from "../init";

export const userRouter = {
  status: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return getUserStatus(db, { userId: session.user.id });
  }),

  update: protectedProcedure
    .input(
      z.object({
        dob: z.iso.date(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      await updateUser(db, { userId: session.user.id, dob: input.dob });
    }),
} satisfies TRPCRouterRecord;
