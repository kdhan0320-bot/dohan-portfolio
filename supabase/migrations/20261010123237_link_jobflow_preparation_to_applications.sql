-- Company links are optional. Ownership is enforced by the composite foreign key.
-- Removing a company preserves preparation records and detaches only the company link.
begin;

alter table public.applications add constraint applications_id_user_id_key unique (id, user_id);
alter table public.portfolio_checklists add column application_id uuid;
alter table public.interview_notes add column application_id uuid;
alter table public.portfolio_checklists add constraint checklists_application_owner_fkey foreign key (application_id, user_id) references public.applications (id, user_id) on delete set null (application_id);
alter table public.interview_notes add constraint interviews_application_owner_fkey foreign key (application_id, user_id) references public.applications (id, user_id) on delete set null (application_id);
create index checklists_application_owner_idx on public.portfolio_checklists (application_id, user_id) where application_id is not null;
create index interviews_application_owner_idx on public.interview_notes (application_id, user_id) where application_id is not null;

commit;

