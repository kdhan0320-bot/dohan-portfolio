begin;

-- Future Feedback Hub users receive their public profile in the same transaction.
-- Other applications sharing auth.users return before validation or profile insertion.
-- The existing auto_confirm_email_trigger remains unchanged.
drop trigger if exists on_feedback_hub_user_created on auth.users;
drop function if exists public.handle_feedback_hub_user_created();

create function public.handle_feedback_hub_user_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  profile_username text;
begin
  if new.raw_user_meta_data ->> 'app_id' is distinct from 'portfolio-feedback-hub' then
    return new;
  end if;

  profile_username := lower(btrim(new.raw_user_meta_data ->> 'username'));

  if profile_username is null or profile_username = '' then
    raise exception using
      errcode = '22023',
      message = 'Feedback Hub username metadata is required';
  end if;

  if profile_username !~ '^[a-z0-9_]{4,20}$' then
    raise exception using
      errcode = '22023',
      message = 'Feedback Hub username must match ^[a-z0-9_]{4,20}$';
  end if;

  insert into public.profiles (id, username)
  values (new.id, profile_username);

  return new;
end;
$function$;

revoke all
  on function public.handle_feedback_hub_user_created()
  from public, anon, authenticated;

create trigger on_feedback_hub_user_created
  after insert on auth.users
  for each row execute function public.handle_feedback_hub_user_created();

-- Existing profile rows were verified against the canonical username contract
-- before deployment. No profile row is rewritten by this migration.
do $constraint$
begin
  if not exists (
    select 1
    from pg_catalog.pg_constraint
    where conname = 'profiles_username_format_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_username_format_check
      check (
        username = lower(btrim(username))
        and username ~ '^[a-z0-9_]{4,20}$'
      );
  end if;
end;
$constraint$;

commit;
