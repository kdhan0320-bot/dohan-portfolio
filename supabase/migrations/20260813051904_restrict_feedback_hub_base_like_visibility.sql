begin;

revoke select
  on table public.post_likes, public.comment_likes
  from public, anon, authenticated, service_role;

grant select (user_id, post_id)
  on table public.post_likes
  to authenticated;

grant select (user_id, comment_id)
  on table public.comment_likes
  to authenticated;

grant select
  on table public.post_likes, public.comment_likes
  to service_role;

drop policy post_likes_select on public.post_likes;
drop policy comment_likes_select on public.comment_likes;

create policy post_likes_select
  on public.post_likes
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy comment_likes_select
  on public.comment_likes
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

commit;
