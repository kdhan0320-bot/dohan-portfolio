begin;

revoke all privileges
  on table
    public.posts,
    public.comments,
    public.post_likes,
    public.comment_likes
  from public, anon, authenticated, service_role;

grant select
  on table
    public.posts,
    public.comments,
    public.post_likes,
    public.comment_likes
  to anon;

grant select, insert, update, delete
  on table
    public.posts,
    public.comments
  to authenticated, service_role;

grant select, insert, delete
  on table
    public.post_likes,
    public.comment_likes
  to authenticated, service_role;

revoke all privileges
  on sequence
    public.posts_id_seq,
    public.comments_id_seq
  from public, anon, authenticated, service_role;

grant usage
  on sequence
    public.posts_id_seq,
    public.comments_id_seq
  to authenticated, service_role;

commit;
