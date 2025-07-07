import { eq } from "drizzle-orm";
import type { Database } from "..";
import { user } from "../schema";

export async function getUserStatus(db: Database, options: { userId: string }) {
  return db.query.user
    .findFirst({
      columns: {
        onboarded: true,
        dob: true,
      },
      where: (row, { eq }) => eq(row.id, options.userId),
    })
    .then((row) => row ?? null);
}

export async function updateUser(
  db: Database,
  options: { userId: string; dob: string; onboarded?: boolean },
) {
  if (options.onboarded) {
    await db
      .update(user)
      .set({
        dob: options.dob,
        onboarded: options.onboarded,
      })
      .where(eq(user.id, options.userId));
    return;
  }
  await db
    .update(user)
    .set({
      dob: options.dob,
    })
    .where(eq(user.id, options.userId));
}
