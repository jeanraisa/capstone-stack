import type { Session } from "./auth";
import type { Database } from "./db";

export type Context = {
  Variables: {
    db: Database;
    session: Session | null;
  };
};
