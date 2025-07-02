CREATE TABLE "apple_health_permissions" (
	"user_id" text NOT NULL,
	"heart_rate" boolean DEFAULT false,
	"blood_glucose" boolean DEFAULT false,
	"body_temperature" boolean DEFAULT false,
	"diastolic_bp" boolean DEFAULT false,
	"systolic_bp" boolean DEFAULT false,
	"weight" boolean DEFAULT false,
	"steps" boolean DEFAULT false,
	CONSTRAINT "apple_health_permissions_user_id_pk" PRIMARY KEY("user_id")
);
--> statement-breakpoint
ALTER TABLE "apple_health_permissions" ADD CONSTRAINT "apple_health_permissions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;