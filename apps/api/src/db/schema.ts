import { index, pgPolicy, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable(
  "user",
  (t) => ({
    id: t.text().primaryKey(),
    name: t.text().notNull(),
    email: t.text().notNull().unique(),
    emailVerified: t
      .boolean()
      .$defaultFn(() => false)
      .notNull(),
    image: t.text(),
    createdAt: t
      .timestamp()
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: t
      .timestamp()
      .$defaultFn(() => new Date())
      .notNull(),
  }),
  (table) => [
    index("user_email_idx").using("btree", table.email.asc().op("text_ops")),
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

export const session = pgTable(
  "session",
  (t) => ({
    id: t.text().primaryKey(),
    expiresAt: t.timestamp().notNull(),
    token: t.text().notNull().unique(),
    createdAt: t.timestamp().notNull(),
    updatedAt: t.timestamp().notNull(),
    ipAddress: t.text(),
    userAgent: t.text(),
    userId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  }),
  (table) => [
    index("session_user_id_idx").using(
      "btree",
      table.userId.asc().op("text_ops"),
    ),
    index("session_token_idx").using("btree", table.token.asc().op("text_ops")),
  ],
);

export const account = pgTable(
  "account",
  (t) => ({
    id: t.text().primaryKey(),
    accountId: t.text().notNull(),
    providerId: t.text().notNull(),
    userId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: t.text(),
    refreshToken: t.text(),
    idToken: t.text(),
    accessTokenExpiresAt: t.timestamp(),
    refreshTokenExpiresAt: t.timestamp(),
    scope: t.text(),
    password: t.text(),
    createdAt: t.timestamp().notNull(),
    updatedAt: t.timestamp().notNull(),
  }),
  (table) => [
    index("account_user_id_idx").using(
      "btree",
      table.userId.asc().op("text_ops"),
    ),
  ],
);

export const verification = pgTable("verification", (t) => ({
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  createdAt: t.timestamp().$defaultFn(() => new Date()),
  updatedAt: t.timestamp().$defaultFn(() => new Date()),
}));
