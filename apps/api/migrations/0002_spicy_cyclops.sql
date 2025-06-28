CREATE TYPE "public"."data_provider_enum" AS ENUM('withings', 'apple');--> statement-breakpoint
CREATE TYPE "public"."metric_enum" AS ENUM('heart rate', 'systolic bp', 'diastolic bp', 'blood glucose', 'weight', 'body temperature');--> statement-breakpoint
CREATE TYPE "public"."unit_enum" AS ENUM('bpm', 'mmHg', 'mg/dL', 'kg', 'celsius');--> statement-breakpoint
CREATE TABLE "data_provider_account" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" "data_provider_enum" NOT NULL,
	"provider_user_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"expires_at" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "data_provider_account_provider_providerUserId_unique" UNIQUE("provider","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "metric" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "metric_enum" NOT NULL,
	"value" real NOT NULL,
	"unit" "unit_enum",
	"date" date NOT NULL,
	"estimated" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "data_provider_account" ADD CONSTRAINT "data_provider_account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metric" ADD CONSTRAINT "metric_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "data_provider_account_user_id_index" ON "data_provider_account" USING btree ("user_id" text_ops);