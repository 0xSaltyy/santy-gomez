# Santy Gomez Personal Website

A formal personal website for Santy Gomez, formally Nicolas Santiago Gomez Zambrano, with public articles, academic interests, future goals, updates, projects, an About page, contact links, Supabase authentication, and a private admin dashboard for managing content.

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Supabase Auth
- Supabase Database
- Supabase Storage

## Install

```bash
npm install
```

## Supabase Setup

1. Create a project at Supabase.
2. In `Authentication > Users`, create the admin user for Santy Gomez with an email and password.
3. Open `supabase/schema.sql`, copy it into the Supabase SQL Editor, and run it.
4. Copy the new Auth user's UUID from `Authentication > Users`.
5. Run this SQL with Santy's real email:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE_AUTH_USER_UUID_HERE', 'nicolas@example.com')
on conflict (user_id) do update set email = excluded.email;
```

The included SQL creates:

- `admin_users`
- `articles`
- `updates`
- `projects`
- `academic_interests`
- `site_profile`
- article row level security policies
- public read/admin write policies for updates, projects, interests, and profile content
- an `article-images` public storage bucket
- a `content-images` public storage bucket for project images
- storage policies that allow only admins to upload, update, or delete images

The `articles` table includes an optional `sources` field for references, citations, source notes, and links that appear at the bottom of each public article.

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

You can find the Supabase URL and anon key in `Project Settings > API`.

## Admin Login Credentials

The website does not include a hard-coded email or password. The login uses the Supabase Auth user you create.

1. Go to `Supabase > Authentication > Users`.
2. Select `Add user`.
3. Enter the admin email you want Santy Gomez to use.
4. Enter a secure password and save it somewhere private.
5. Copy that user's UUID into the `admin_users` SQL insert shown above.

After that, log in at `/login` with the exact email and password you created in Supabase.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Admin login is available at:

```text
http://localhost:3000/login
```

## Admin Workflow

- Log in with the Supabase Auth user created for Santy Gomez.
- Go to `/admin`.
- Create a new article at `/admin/articles/new`.
- Manage updates at `/admin/updates`.
- Manage projects at `/admin/projects`.
- Edit About, Academic Interests intro, and Future Goals text at `/admin/content`.
- Manage individual academic interests at `/admin/interests`.
- Save as draft or publish.
- Published articles appear automatically on `/articles`.
- Published updates appear automatically on `/updates`.
- Published projects appear automatically on `/projects`.
- Draft articles remain visible only in the admin dashboard.

## Public Pages

- `/` Home
- `/about` About Santy Gomez, formal name, academic interests, and future goals
- `/articles` Published articles
- `/updates` Formal timeline-style updates
- `/projects` Academic and personal project archive
- `/contact` Contact and links
- `/disclaimer` Disclaimer
- `/editorial-policy` Editorial Policy
- `/privacy-policy` Privacy Policy
- `/login` Owner/admin login

## Deploy Later

The simplest path is Vercel:

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add the same environment variables in Vercel project settings.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Deploy.

Supabase RLS protects article writes, so public visitors can only read published articles even if they call the API directly.
