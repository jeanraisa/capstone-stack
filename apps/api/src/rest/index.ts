import { OpenAPIHono } from "@hono/zod-openapi";
import { withDatabase } from "~api/middleware";
import { withingsRouter } from "./routers/withings";

const routers = new OpenAPIHono();

routers.use(withDatabase);

routers.route("/withings", withingsRouter);

export { routers };
