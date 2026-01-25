-- 1. Drop the policy depending on the column
-- The error "cannot alter type of a column used in a policy definition" means we must drop the policy first.
DROP POLICY IF EXISTS "Users can view their own websites" ON websites;
DROP POLICY IF EXISTS "Users can insert their own websites" ON websites;
DROP POLICY IF EXISTS "Users can update their own websites" ON websites;
DROP POLICY IF EXISTS "Users can delete their own websites" ON websites;
-- (Dropping potential other default policies just in case)

-- 2. Drop the foreign key constraint that requires user_id to exist in the local users table
ALTER TABLE websites DROP CONSTRAINT IF EXISTS websites_user_id_fkey;

-- 3. Change user_id from UUID to TEXT to support Clerk's ID format (e.g. "user_2...")
ALTER TABLE websites ALTER COLUMN user_id TYPE text;
