/*
  # Authentication and User Profiles Migration

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Changes
    - Update `user_progress` table to reference auth.users
    - Update `daily_activity` table to reference auth.users
    - Remove old user_id text columns and add uuid foreign keys
  
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access only their own data
    - Add trigger to auto-create profile on signup

  4. Important Notes
    - Users must be authenticated to access their data
    - Each user can only see and modify their own records
    - Profile is automatically created when user signs up
*/

-- Create profiles table for additional user info
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update user_progress table to use auth.users
DO $$
BEGIN
  -- Add new user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_progress' AND column_name = 'user_uuid'
  ) THEN
    ALTER TABLE user_progress ADD COLUMN user_uuid uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Update daily_activity table to use auth.users
DO $$
BEGIN
  -- Add new user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'daily_activity' AND column_name = 'user_uuid'
  ) THEN
    ALTER TABLE daily_activity ADD COLUMN user_uuid uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Update RLS policies for user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_uuid);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_uuid);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_uuid)
  WITH CHECK (auth.uid() = user_uuid);

-- Update RLS policies for daily_activity
DROP POLICY IF EXISTS "Users can view own activity" ON daily_activity;
DROP POLICY IF EXISTS "Users can insert own activity" ON daily_activity;
DROP POLICY IF EXISTS "Users can update own activity" ON daily_activity;

CREATE POLICY "Users can view own activity"
  ON daily_activity FOR SELECT
  TO authenticated
  USING (auth.uid() = user_uuid);

CREATE POLICY "Users can insert own activity"
  ON daily_activity FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_uuid);

CREATE POLICY "Users can update own activity"
  ON daily_activity FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_uuid)
  WITH CHECK (auth.uid() = user_uuid);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
