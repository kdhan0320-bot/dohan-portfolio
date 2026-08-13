begin;

lock table public.posts, public.comments, public.post_likes, public.comment_likes
  in share row exclusive mode;

create table public.post_like_counts (
  post_id bigint not null,
  like_count bigint not null default 0,
  constraint post_like_counts_pkey primary key (post_id),
  constraint post_like_counts_post_id_fkey
    foreign key (post_id) references public.posts(id) on delete cascade,
  constraint post_like_counts_nonnegative_check check (like_count >= 0)
);

create table public.comment_like_counts (
  comment_id bigint not null,
  like_count bigint not null default 0,
  constraint comment_like_counts_pkey primary key (comment_id),
  constraint comment_like_counts_comment_id_fkey
    foreign key (comment_id) references public.comments(id) on delete cascade,
  constraint comment_like_counts_nonnegative_check check (like_count >= 0)
);

alter table public.post_like_counts enable row level security;
alter table public.comment_like_counts enable row level security;

revoke all privileges
  on table public.post_like_counts, public.comment_like_counts
  from public, anon, authenticated, service_role;

grant select
  on table public.post_like_counts, public.comment_like_counts
  to anon, authenticated, service_role;

create policy post_like_counts_select
  on public.post_like_counts
  for select
  to anon, authenticated
  using (true);

create policy comment_like_counts_select
  on public.comment_like_counts
  for select
  to anon, authenticated
  using (true);

create function public.sync_post_like_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if tg_op = 'INSERT' then
    insert into public.post_like_counts as counts (post_id, like_count)
    values (new.post_id, 1)
    on conflict (post_id) do update
      set like_count = counts.like_count + 1;
    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.post_like_counts
    set like_count = greatest(like_count - 1, 0)
    where post_id = old.post_id;
    return old;
  end if;

  return null;
end;
$function$;

create function public.sync_comment_like_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if tg_op = 'INSERT' then
    insert into public.comment_like_counts as counts (comment_id, like_count)
    values (new.comment_id, 1)
    on conflict (comment_id) do update
      set like_count = counts.like_count + 1;
    return new;
  end if;

  if tg_op = 'DELETE' then
    update public.comment_like_counts
    set like_count = greatest(like_count - 1, 0)
    where comment_id = old.comment_id;
    return old;
  end if;

  return null;
end;
$function$;

revoke all privileges
  on function public.sync_post_like_count()
  from public, anon, authenticated, service_role;

revoke all privileges
  on function public.sync_comment_like_count()
  from public, anon, authenticated, service_role;

create trigger post_likes_sync_count
  after insert or delete on public.post_likes
  for each row execute function public.sync_post_like_count();

create trigger comment_likes_sync_count
  after insert or delete on public.comment_likes
  for each row execute function public.sync_comment_like_count();

insert into public.post_like_counts (post_id, like_count)
select posts.id, count(post_likes.user_id)::bigint
from public.posts
left join public.post_likes on post_likes.post_id = posts.id
group by posts.id
on conflict (post_id) do update
  set like_count = excluded.like_count;

insert into public.comment_like_counts (comment_id, like_count)
select comments.id, count(comment_likes.user_id)::bigint
from public.comments
left join public.comment_likes on comment_likes.comment_id = comments.id
group by comments.id
on conflict (comment_id) do update
  set like_count = excluded.like_count;

alter table public.comments
  add constraint comments_id_post_id_key unique (id, post_id),
  add constraint comments_parent_same_post_fkey
    foreign key (parent_id, post_id)
    references public.comments(id, post_id)
    on delete cascade;

do $block$
begin
  if exists (
    select 1
    from public.comments as child
    join public.comments as parent
      on parent.id = child.parent_id
     and parent.post_id = child.post_id
    where child.parent_id is not null
      and parent.parent_id is not null
  ) then
    raise exception using
      errcode = '23514',
      message = 'Existing comments exceed the supported one-level reply depth.';
  end if;
end;
$block$;

create function public.enforce_feedback_hub_reply_depth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  parent_parent_id bigint;
begin
  if tg_op = 'UPDATE' then
    if new.parent_id is not distinct from old.parent_id
       and new.post_id is not distinct from old.post_id then
      return new;
    end if;
  end if;

  if new.parent_id is null then
    return new;
  end if;

  if new.parent_id = new.id then
    raise exception using
      errcode = '23514',
      message = 'Replies can only be attached to top-level comments.';
  end if;

  if tg_op = 'UPDATE' and exists (
    select 1
    from public.comments as child
    where child.parent_id = new.id
  ) then
    raise exception using
      errcode = '23514',
      message = 'A comment with replies cannot become a reply.';
  end if;

  select parent.parent_id
    into parent_parent_id
  from public.comments as parent
  where parent.id = new.parent_id
    and parent.post_id = new.post_id
  for share;

  if found and parent_parent_id is not null then
    raise exception using
      errcode = '23514',
      message = 'Replies can only be attached to top-level comments.';
  end if;

  return new;
end;
$function$;

revoke all privileges
  on function public.enforce_feedback_hub_reply_depth()
  from public, anon, authenticated, service_role;

create trigger comments_enforce_reply_depth
  before insert or update of parent_id, post_id
  on public.comments
  for each row execute function public.enforce_feedback_hub_reply_depth();

create function public.feedback_hub_hashtags_are_valid(text[])
returns boolean
language sql
immutable
security invoker
set search_path = ''
as $function$
  select
    cardinality(coalesce($1, '{}'::text[])) <= 5
    and not exists (
      select 1
      from unnest(coalesce($1, '{}'::text[])) as hashtags(tag)
      where tag is null
        or tag = ''
        or tag ~ '^[[:space:]]'
        or tag ~ '[[:space:]]$'
    )
    and cardinality(coalesce($1, '{}'::text[])) = (
      select count(distinct tag)
      from unnest(coalesce($1, '{}'::text[])) as hashtags(tag)
    );
$function$;

revoke all privileges
  on function public.feedback_hub_hashtags_are_valid(text[])
  from public, anon, authenticated, service_role;

grant execute
  on function public.feedback_hub_hashtags_are_valid(text[])
  to authenticated, service_role;

create function public.feedback_hub_image_url_is_valid(text)
returns boolean
language sql
immutable
security invoker
set search_path = ''
as $function$
  with url_parts as (
    select pg_catalog.substring($1, '^https://([^/?#]+)') as authority
  ),
  host_parts as (
    select
      authority,
      pg_catalog.regexp_replace(authority, ':[0-9]{1,5}$', '') as hostname
    from url_parts
  )
  select
    $1 is null
    or (
      $1 = pg_catalog.btrim($1)
      and $1 !~ '[[:space:]]'
      and pg_catalog.strpos($1, pg_catalog.chr(92)) = 0
      and $1 ~ '^https://[^/?#]+([/?#].*)?$'
      and pg_catalog.strpos(authority, '@') = 0
      and pg_catalog.strpos(authority, '%') = 0
      and authority ~* '^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*(:[0-9]{1,5})?$'
      and pg_catalog.char_length(hostname) <= 253
      and case
        when authority ~ ':[0-9]{1,5}$'
          then (pg_catalog.substring(authority, ':([0-9]{1,5})$'))::integer between 0 and 65535
        else true
      end
      and pg_catalog.lower(hostname) <> 'picsum.photos'
      and pg_catalog.lower(hostname) !~ '[.]picsum[.]photos$'
    )
  from host_parts;
$function$;

revoke all privileges
  on function public.feedback_hub_image_url_is_valid(text)
  from public, anon, authenticated, service_role;

grant execute
  on function public.feedback_hub_image_url_is_valid(text)
  to authenticated, service_role;

alter table public.posts
  add constraint posts_title_contract_check check (
    title = btrim(title)
    and title <> ''
    and title !~ '^[[:space:]]'
    and title !~ '[[:space:]]$'
    and char_length(title) <= 100
  ),
  add constraint posts_content_contract_check check (
    content = btrim(content)
    and content <> ''
    and content !~ '^[[:space:]]'
    and content !~ '[[:space:]]$'
  ),
  add constraint posts_hashtags_contract_check check (
    public.feedback_hub_hashtags_are_valid(hashtags)
  ),
  add constraint posts_image_url_contract_check check (
    public.feedback_hub_image_url_is_valid(image_url)
  );

alter table public.comments
  add constraint comments_content_contract_check check (
    content = btrim(content)
    and content <> ''
    and content !~ '^[[:space:]]'
    and content !~ '[[:space:]]$'
  );

revoke insert, update on table public.posts from authenticated;
grant insert (user_id, title, content, image_url, hashtags)
  on table public.posts to authenticated;
grant update (title, content, image_url, hashtags)
  on table public.posts to authenticated;

revoke insert, update on table public.comments from authenticated;
grant insert (post_id, user_id, parent_id, content)
  on table public.comments to authenticated;
grant update (content)
  on table public.comments to authenticated;

revoke insert on table public.post_likes from authenticated;
grant insert (user_id, post_id)
  on table public.post_likes to authenticated;

revoke insert on table public.comment_likes from authenticated;
grant insert (user_id, comment_id)
  on table public.comment_likes to authenticated;

drop policy posts_insert on public.posts;
drop policy posts_update on public.posts;
drop policy posts_delete on public.posts;

create policy posts_insert
  on public.posts
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy posts_update
  on public.posts
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy posts_delete
  on public.posts
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy comments_insert on public.comments;
drop policy comments_update on public.comments;
drop policy comments_delete on public.comments;

create policy comments_insert
  on public.comments
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy comments_update
  on public.comments
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy comments_delete
  on public.comments
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy post_likes_insert on public.post_likes;
drop policy post_likes_delete on public.post_likes;

create policy post_likes_insert
  on public.post_likes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy post_likes_delete
  on public.post_likes
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy comment_likes_insert on public.comment_likes;
drop policy comment_likes_delete on public.comment_likes;

create policy comment_likes_insert
  on public.comment_likes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy comment_likes_delete
  on public.comment_likes
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create index posts_user_id_idx on public.posts (user_id);
create index comments_post_id_idx on public.comments (post_id);
create index comments_user_id_idx on public.comments (user_id);
create index comments_parent_id_post_id_idx on public.comments (parent_id, post_id);
create index post_likes_post_id_idx on public.post_likes (post_id);
create index comment_likes_comment_id_idx on public.comment_likes (comment_id);

commit;
