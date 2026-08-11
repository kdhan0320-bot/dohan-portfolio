begin;

-- Remove the demo-era global email confirmation bypass.
drop trigger if exists auto_confirm_email_trigger on auth.users;
drop function if exists public.auto_confirm_email();

commit;
