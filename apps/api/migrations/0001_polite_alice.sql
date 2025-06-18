ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "session_token_idx" ON "session" USING btree ("token" text_ops);--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "user" USING btree ("email" text_ops);--> statement-breakpoint
CREATE POLICY "Users can select their own account." ON "user" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "Users can update own account." ON "user" AS PERMISSIVE FOR UPDATE TO public;