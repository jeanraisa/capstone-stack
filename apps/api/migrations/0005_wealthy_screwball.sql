ALTER TABLE "metric" ADD COLUMN "provider_id" text;--> statement-breakpoint
ALTER TABLE "metric" ADD CONSTRAINT "metric_userId_providerId_unique" UNIQUE("user_id","provider_id");