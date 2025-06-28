import type { MiddlewareHandler } from "hono";
import { db } from "~api/db";
import { auth } from "./auth";

export const withDatabase: MiddlewareHandler = async (c, next) => {
  c.set("db", db);
  await next();
};

export const withSession: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set("session", session);
  await next();
};
