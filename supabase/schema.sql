-- Supabase setup for the Santy Gomez personal website.
-- Run this in Supabase SQL Editor after creating your project.

create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  date date not null default current_date,
  preview text not null,
  content text not null,
  sources text,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles
add column if not exists sources text;

create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  date date not null default current_date,
  summary text not null,
  content text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  date date not null default current_date,
  description text not null,
  project_status text not null,
  link_url text,
  image_url text,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.academic_interests (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  display_order integer not null default 100,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_profile (
  id text primary key default 'main' check (id = 'main'),
  about_intro text not null,
  about_body text not null,
  interests_intro text not null,
  future_goals text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

drop trigger if exists set_updates_updated_at on public.updates;
create trigger set_updates_updated_at
before update on public.updates
for each row
execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_academic_interests_updated_at on public.academic_interests;
create trigger set_academic_interests_updated_at
before update on public.academic_interests
for each row
execute function public.set_updated_at();

drop trigger if exists set_site_profile_updated_at on public.site_profile;
create trigger set_site_profile_updated_at
before update on public.site_profile
for each row
execute function public.set_updated_at();

create or replace function public.is_admin(check_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = check_user_id
  );
$$;

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;
alter table public.updates enable row level security;
alter table public.projects enable row level security;
alter table public.academic_interests enable row level security;
alter table public.site_profile enable row level security;

drop policy if exists "Admins can read own admin status" on public.admin_users;
create policy "Admins can read own admin status"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
on public.admin_users
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Published articles are publicly readable" on public.articles;
create policy "Published articles are publicly readable"
on public.articles
for select
to anon, authenticated
using (status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admins can insert articles" on public.articles;
create policy "Admins can insert articles"
on public.articles
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update articles" on public.articles;
create policy "Admins can update articles"
on public.articles
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete articles" on public.articles;
create policy "Admins can delete articles"
on public.articles
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Published updates are publicly readable" on public.updates;
create policy "Published updates are publicly readable"
on public.updates
for select
to anon, authenticated
using (status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admins can insert updates" on public.updates;
create policy "Admins can insert updates"
on public.updates
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update updates" on public.updates;
create policy "Admins can update updates"
on public.updates
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete updates" on public.updates;
create policy "Admins can delete updates"
on public.updates
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Published projects are publicly readable" on public.projects;
create policy "Published projects are publicly readable"
on public.projects
for select
to anon, authenticated
using (publication_status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
on public.projects
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
on public.projects
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
on public.projects
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Published interests are publicly readable" on public.academic_interests;
create policy "Published interests are publicly readable"
on public.academic_interests
for select
to anon, authenticated
using (status = 'published' or public.is_admin(auth.uid()));

drop policy if exists "Admins can insert interests" on public.academic_interests;
create policy "Admins can insert interests"
on public.academic_interests
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update interests" on public.academic_interests;
create policy "Admins can update interests"
on public.academic_interests
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete interests" on public.academic_interests;
create policy "Admins can delete interests"
on public.academic_interests
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Site profile is publicly readable" on public.site_profile;
create policy "Site profile is publicly readable"
on public.site_profile
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert site profile" on public.site_profile;
create policy "Admins can insert site profile"
on public.site_profile
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update site profile" on public.site_profile;
create policy "Admins can update site profile"
on public.site_profile
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public article images are readable" on storage.objects;
create policy "Public article images are readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'article-images');

drop policy if exists "Admins can upload article images" on storage.objects;
create policy "Admins can upload article images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'article-images' and public.is_admin(auth.uid()));

drop policy if exists "Admins can update article images" on storage.objects;
create policy "Admins can update article images"
on storage.objects
for update
to authenticated
using (bucket_id = 'article-images' and public.is_admin(auth.uid()))
with check (bucket_id = 'article-images' and public.is_admin(auth.uid()));

drop policy if exists "Admins can delete article images" on storage.objects;
create policy "Admins can delete article images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'article-images' and public.is_admin(auth.uid()));

drop policy if exists "Public content images are readable" on storage.objects;
create policy "Public content images are readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'content-images');

drop policy if exists "Admins can upload content images" on storage.objects;
create policy "Admins can upload content images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'content-images' and public.is_admin(auth.uid()));

drop policy if exists "Admins can update content images" on storage.objects;
create policy "Admins can update content images"
on storage.objects
for update
to authenticated
using (bucket_id = 'content-images' and public.is_admin(auth.uid()))
with check (bucket_id = 'content-images' and public.is_admin(auth.uid()));

drop policy if exists "Admins can delete content images" on storage.objects;
create policy "Admins can delete content images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'content-images' and public.is_admin(auth.uid()));

insert into public.site_profile (id, about_intro, about_body, interests_intro, future_goals)
values (
  'main',
  'Santy Gomez, formally Nicolas Santiago Gomez Zambrano, is a serious student, writer, and emerging scholar interested in science, law, politics, music, and culture.',
  'His work is shaped by disciplined reading, careful observation, and a commitment to explaining complex ideas with clarity. This website serves as a formal archive for articles, academic updates, projects, and developing areas of study.',
  'Santy is especially interested in fields that connect scientific discovery with human well-being, public institutions, and cultural understanding.',
  'Santy hopes to study molecular biology, contribute to disease research, and explore questions related to Alzheimer’s disease and neurological health. He is also interested in understanding how science, law, and public policy shape medical progress and public life.'
)
on conflict (id) do nothing;

update public.site_profile
set
  about_intro = 'Santy Gomez, formally Nicolas Santiago Gomez Zambrano, is a serious student, writer, and emerging scholar interested in science, law, politics, music, and culture.',
  interests_intro = 'Santy is especially interested in fields that connect scientific discovery with human well-being, public institutions, and cultural understanding.',
  future_goals = 'Santy hopes to study molecular biology, contribute to disease research, and explore questions related to Alzheimer’s disease and neurological health. He is also interested in understanding how science, law, and public policy shape medical progress and public life.'
where id = 'main'
  and about_intro = 'Nicolas Gomez is a serious student, writer, and emerging scholar interested in science, law, politics, music, and culture.';

insert into public.academic_interests (title, description, display_order, status)
values
  ('Molecular Biology', 'An interest in the molecular systems that shape life, health, disease, and future biomedical research.', 10, 'published'),
  ('Neuroscience', 'A focus on the brain, cognition, behavior, and the biological foundations of neurological conditions.', 20, 'published'),
  ('Disease Research', 'A developing commitment to understanding how diseases emerge, progress, and can be studied through rigorous science.', 30, 'published'),
  ('Public Health', 'An interest in prevention, health systems, equity, and the policies that influence community well-being.', 40, 'published'),
  ('Law and Public Policy', 'A concern for how legal institutions, regulation, and policy decisions affect science, medicine, and civic life.', 50, 'published'),
  ('Politics and Civic Life', 'An interest in political systems, public argument, leadership, and the responsibilities of citizenship.', 60, 'published'),
  ('Environmental Science', 'A concern for ecological systems, climate, sustainability, and the long-term relationship between people and the environment.', 70, 'published'),
  ('Writing', 'A disciplined practice of essays, reflections, research notes, and formal communication across fields.', 80, 'published'),
  ('Music', 'An appreciation for music as a serious cultural form connected to creativity, interpretation, and personal discipline.', 90, 'published')
on conflict do nothing;

-- After creating the Santy Gomez user in Authentication > Users,
-- run this with the new user's UUID and email:
--
-- insert into public.admin_users (user_id, email)
-- values ('PASTE_AUTH_USER_UUID_HERE', 'nicolas@example.com')
-- on conflict (user_id) do update set email = excluded.email;
