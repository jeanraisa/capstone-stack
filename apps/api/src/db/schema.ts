import { dataProvidersEnum, metricEnum, unitEnum } from "@capstone/utils/enum";
import { relations } from "drizzle-orm";
import { index, pgPolicy, pgTable, unique } from "drizzle-orm/pg-core";

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

export const userRelations = relations(user, ({ many }) => ({
  dataProviderAccounts: many(dataProviderAccount),
  metrics: many(metric),
}));

export const dataProviderAccount = pgTable(
  "data_provider_account",
  (t) => ({
    id: t.text().primaryKey(),
    provider: dataProvidersEnum().notNull(),
    providerUserId: t.text().notNull(),
    userId: t
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: t.text(),
    refreshToken: t.text(),
    expiresAt: t.timestamp({ withTimezone: true, mode: "date" }),
    isActive: t.boolean().notNull().default(true),
  }),
  (t) => [
    unique().on(t.provider, t.providerUserId),
    index().using("btree", t.userId.asc().op("text_ops")),
  ],
);

export const dataProviderAccountRelations = relations(
  dataProviderAccount,
  ({ one }) => ({
    user: one(user, {
      fields: [dataProviderAccount.userId],
      references: [user.id],
    }),
  }),
);

export const metric = pgTable("metric", (t) => ({
  id: t.text().primaryKey(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: metricEnum().notNull(),
  value: t.real().notNull(),
  unit: unitEnum(),
  date: t.date({ mode: "string" }).notNull(),
  addedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  estimated: t.boolean().notNull(),
}));

export const metricRelations = relations(metric, ({ one }) => ({
  user: one(user, {
    fields: [metric.userId],
    references: [user.id],
  }),
}));

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
