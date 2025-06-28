import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "~api/types";

const app = new OpenAPIHono<Context>();

app.get("/health", async (c) => {
  return c.json({ health: "ok" });
});

export const withingsRouter = app;
