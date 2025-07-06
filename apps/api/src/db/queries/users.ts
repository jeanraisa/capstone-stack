import { eq } from "drizzle-orm";
import type { Database } from "..";
import { user } from "../schema";

export async function getUserStatus(db: Database, options: { userId: string }) {
  return db.query.user
    .findFirst({
      columns: {
        onboarded: true,
      },
      where: (row, { eq }) => eq(row.id, options.userId),
    })
    .then((row) => row ?? null);
}

export async function updateUser(
  db: Database,
  options: { userId: string; dob: string },
) {
  await db
    .update(user)
    .set({
      dob: options.dob,
    })
    .where(eq(user.id, options.userId));
}
