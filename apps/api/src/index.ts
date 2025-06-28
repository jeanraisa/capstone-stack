import { trpcServer } from "@hono/trpc-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { auth } from "./auth/";
import { withDatabase, withSession } from "./middleware";
import { routers } from "./rest";
import { createTRPCContext } from "./trpc/init";
import { appRouter } from "./trpc/routers/_app";
import type { Context } from "./types";

const app = new OpenAPIHono<Context>();

app.use(secureHeaders());

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  cors({
    origin: process.env.ALLOWED_API_ORIGINS?.split(",") ?? [],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "accept-language",
      "x-trpc-source",
      "x-user-locale",
      "x-user-timezone",
      "x-user-country",
    ],
    exposeHeaders: ["Content-Length"],
    maxAge: 86400,
  }),
);

app.use("/trpc/*", withDatabase, withSession);
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

app.get("/health", async (c) => {
  return c.json({ status: "ok" }, 200);
});

app.route("/", routers);

export default {
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
  fetch: app.fetch,
};
