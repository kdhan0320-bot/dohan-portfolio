begin;

create or replace function public.hook_block_feedback_hub_public_signup(event jsonb)
returns jsonb
language plpgsql
stable
set search_path = ''
as $function$
begin
  if event -> 'user' -> 'user_metadata' ->> 'app_id' = 'portfolio-feedback-hub' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'Feedback Hub 신규 가입은 제공하지 않습니다.'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$function$;

grant usage on schema public to supabase_auth_admin;

revoke all
  on function public.hook_block_feedback_hub_public_signup(jsonb)
  from public, anon, authenticated, service_role;

grant execute
  on function public.hook_block_feedback_hub_public_signup(jsonb)
  to supabase_auth_admin;

drop trigger if exists on_feedback_hub_user_created on auth.users;
drop function if exists public.handle_feedback_hub_user_created();

commit;
