import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "hono";
import superjson from "superjson";
import { ZodError, z } from "zod/v4";
import type { Session } from "../auth/";
import type { Database } from "../db";

type TRPCContext = {
  db: Database;
  session: Session;
};

export const createTRPCContext = async (
  _: unknown,
  c: Context,
): Promise<TRPCContext> => {
  const session = c.get("session");
  const db = c.get("db");
  return {
    db,
    session,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof ZodError
          ? z.flattenError(error.cause as ZodError<Record<string, unknown>>)
          : null,
    },
  }),
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

const withTiming = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

export const publicProcedure = t.procedure.use(withTiming);

export const protectedProcedure = t.procedure
  .use(withTiming)
  .use(async (opts) => {
    const { session } = opts.ctx;

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
      ctx: {
        session,
      },
    });
  });
