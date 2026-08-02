begin;

-- Apply after Migration A and the trigger-aware Feedback Hub source are deployed.
-- Keep public signup paused until Migration B and final private A/B checks complete.
alter table public.profiles enable row level security;

drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_self on public.profiles;
drop policy if exists profiles_update on public.profiles;

revoke all privileges
  on table public.profiles
  from anon, authenticated;

grant select (id, username)
  on table public.profiles
  to anon, authenticated;

create policy profiles_select
  on public.profiles
  for select
  to anon, authenticated
  using (true);

commit;
