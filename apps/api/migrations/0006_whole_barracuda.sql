CREATE TYPE "public"."prediction_label_enum" AS ENUM('Moderate Risk', 'High Risk', 'Low Risk');--> statement-breakpoint
CREATE TABLE "prediction" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"class" smallint NOT NULL,
	"label" "prediction_label_enum" NOT NULL,
	"heart_rate" real NOT NULL,
	"blood_glucose" real NOT NULL,
	"body_temperature" real NOT NULL,
	"systolic_blood_pressure" real NOT NULL,
	"diastolic_blood_pressure" real NOT NULL,
	"date" date NOT NULL,
	"valid" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarded" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "prediction" ADD CONSTRAINT "prediction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;