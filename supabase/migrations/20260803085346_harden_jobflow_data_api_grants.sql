begin;

revoke all
  on table
    public.applications,
    public.application_notes,
    public.portfolio_checklists,
    public.interview_notes,
    public.prompt_templates
  from public, anon, authenticated;

grant select, insert, update, delete
  on table
    public.applications,
    public.portfolio_checklists,
    public.interview_notes
  to authenticated;

alter policy applications_self
  on public.applications
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

alter policy notes_self
  on public.application_notes
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

alter policy checklists_self
  on public.portfolio_checklists
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

alter policy interview_self
  on public.interview_notes
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

alter policy prompts_self
  on public.prompt_templates
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

commit;
