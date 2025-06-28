import type { Database } from "..";

export async function getManyUsers(db: Database) {
  return db.query.user.findMany({
    columns: {
      name: true,
    },
  });
}
