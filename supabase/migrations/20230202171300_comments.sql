create table 
  public.comments (
    id bigint generated by default as identity primary key,
    user_id uuid not null references public.users default auth.uid(),
    post_id bigint references public.posts, 
    node_id bigint references public.nodes,
    body text not null,
    created_at timestamp with time zone default now()
);

comment on table public.comments is 'Comments of posts & nodes.';

alter table "public"."comments" enable row level security;

create policy "Allow individual delete access"
on "public"."comments"
for delete
using (auth.uid() = user_id);


create policy "Allow authenticated insert access"
on "public"."comments"
as permissive
for insert
to authenticated
with check (true);

create policy "Allow individual update access" 
on "public"."comments" 
for update
using (auth.uid() = user_id);

create policy "Allow public read access"
on "public"."comments"
as permissive
for select
to public
using (true);


insert into
  public.role_permissions (role, permission)
values
  ('admin', 'comments.delete'),
  ('admin', 'comments.edit'),
  ('moderator', 'comments.delete'),
  ('moderator', 'comments.edit');