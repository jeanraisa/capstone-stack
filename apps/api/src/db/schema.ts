import { pgPolicy, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  (column) => ({
    id: column.uuid().primaryKey().notNull(),
    email: column.text().notNull().unique(),
    fullName: column.text(),
    createdAt: column
      .timestamp({
        withTimezone: true,
        mode: "string",
      })
      .defaultNow(),
    weekStartsOnMonday: column.boolean().default(false),
    timezone: column.text(),
  }),
  () => [
    pgPolicy("Users can select their own account.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    pgPolicy("Users can update own account.", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
  ],
);
