# CyberSec Academy - Setup Instructions

Complete authentication system with user signup, login, and personalized progress tracking!

## What's Been Added

### 1. Authentication System
- User signup with email and password
- User login with secure authentication
- User logout functionality
- Protected routes (must be logged in to access app)
- User profile display in navigation

### 2. Database Changes
- **profiles** table: Stores user profile information
- **user_progress** table: Updated to track progress per user (user_uuid column)
- **daily_activity** table: Updated to track activity per user (user_uuid column)
- Row Level Security (RLS): Each user can only access their own data
- Automatic profile creation on signup

### 3. UI Components
- Login page with email/password
- Signup page with full name, email, and password
- Navigation bar shows user email and logout button
- All progress tracking now tied to individual users

## Setup Instructions

### Step 1: Connect to Supabase

1. **Create a Supabase Account** (if you don't have one)
   - Go to https://supabase.com
   - Click "Start your project"
   - Sign up with your email or GitHub

2. **Create a New Project**
   - Click "New Project"
   - Enter a project name (e.g., "cybersec-academy")
   - Create a strong database password (save this!)
   - Select a region close to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Get Your Project Credentials**
   - Go to Project Settings (gear icon in sidebar)
   - Click on "API" in the left menu
   - You'll see two important values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public key** (a long string starting with `eyJ...`)

### Step 2: Configure Environment Variables

1. **Create .env file** in your project root (if it doesn't exist)

2. **Add these lines** to your `.env` file:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Replace the values**:
   - Replace `your_project_url_here` with your Project URL
   - Replace `your_anon_key_here` with your anon public key

**Example:**
```
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk...
```

### Step 3: Run Migrations

The migrations have already been applied through the Supabase MCP tool! Your database is ready.

If you need to verify, go to Supabase Dashboard > SQL Editor and run:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

You should see these tables:
- profiles
- user_progress
- daily_activity
- vulnerability_types
- labs
- store_products

### Step 4: Enable Email Authentication

1. Go to Supabase Dashboard
2. Click "Authentication" in the sidebar
3. Click "Providers" tab
4. Make sure "Email" is enabled (it should be by default)
5. Scroll down to "Email Auth" settings:
   - **Confirm email**: DISABLED (for easier testing)
   - **Secure email change**: Enabled (recommended)

### Step 5: Run the Application

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser** to the URL shown (usually `http://localhost:5173`)

## Testing the Application

### Create Your First Account

1. You'll see the **Login page** first
2. Click "Sign up" at the bottom
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: At least 6 characters
   - Confirm Password: Same as above
4. Click "Create Account"
5. You'll be redirected to login
6. Login with your email and password

### Explore the Features

Once logged in, you can:
- Complete vulnerability labs
- Use security tools
- Follow the learning path
- Track your progress
- Each user has their own separate progress!

## How User Data Works

### Data Isolation
- Each user can ONLY see their own:
  - Progress on learning modules
  - Completed labs
  - Daily activity streak
  - Points and achievements

### Security (Row Level Security)
- Database automatically filters data by authenticated user
- Users cannot access other users' data
- All queries use `user_uuid` to ensure proper isolation

### User Progress Flow
1. User signs up → Profile created automatically
2. User completes a module → Saved to their `user_progress`
3. User views Progress page → Only shows their own data
4. Daily activity tracked → Streak calculated per user

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Check that `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart the dev server after changing `.env`

### Can't Sign Up
- Check Supabase Authentication is enabled
- Verify email confirmation is disabled (for testing)
- Check browser console for specific errors

### Login Shows Loading Forever
- Check your internet connection
- Verify Supabase project is running (dashboard shows green)
- Check `.env` credentials are correct

### Progress Not Saving
- Verify you're logged in (email shows in nav bar)
- Check browser console for RLS policy errors
- Ensure migrations were applied successfully

## Next Steps

### Recommended Enhancements
1. Add password reset functionality
2. Add user profile editing
3. Add email verification for production
4. Add OAuth providers (Google, GitHub)
5. Add user avatars

### Production Deployment
When deploying to production:
1. Enable "Confirm email" in Supabase Auth settings
2. Configure email templates in Supabase
3. Set up proper domain for email links
4. Use environment variables for your hosting platform
5. Enable additional security features

## Support

If you encounter issues:
1. Check Supabase Dashboard logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure migrations ran successfully

## Summary

You now have a complete authentication system where:
- Users can sign up and login
- Each user has their own isolated progress
- All data is secured with Row Level Security
- Progress, labs, and achievements are tracked per user
- Clean UI with login/signup pages

Everything is ready to use! Just add your Supabase credentials to `.env` and start the app!
