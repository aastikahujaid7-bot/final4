# Quick Start - Authentication Setup

## 3 Simple Steps to Get Started

### Step 1: Get Supabase Credentials

1. Go to https://supabase.com and create an account
2. Create a new project
3. Go to Settings > API
4. Copy these two values:
   - **Project URL**
   - **anon public key**

### Step 2: Add to .env File

Create or edit `.env` file in your project root:

```
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

### Step 3: Run the App

```bash
npm install
npm run dev
```

That's it! Open your browser and you'll see the login page.

## First Time Use

1. Click "Sign up"
2. Enter your name, email, and password
3. Click "Create Account"
4. Login with your credentials
5. Start learning!

## What You Get

- **Signup/Login pages**: Secure authentication
- **User-specific data**: Each user has their own progress
- **Protected app**: Must login to access
- **Progress tracking**: Labs completed, points, streaks
- **Logout button**: In the top navigation

## Database Already Configured

The database migrations have been applied automatically. Your Supabase database includes:
- User authentication (built-in)
- User profiles
- Progress tracking
- Activity tracking
- All with Row Level Security

## Need Help?

See `SETUP_INSTRUCTIONS.md` for detailed instructions and troubleshooting.

---

**That's all you need!** Add your credentials to `.env` and start the app.
