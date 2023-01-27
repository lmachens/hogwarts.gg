alter table
  "public"."users" drop column "email";


set
  check_function_bodies = off;


CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$declare is_admin boolean;


users_count int;


begin -- search number of 
select
  count(*)
from
  public.users into users_count;


insert into
  public.users (id, username)
values
  (new.id, CONCAT('Wizard#', (users_count + 1)));


-- first authorized user will be the admin
select
  count(*) = 1
from
  auth.users into is_admin;


if is_admin then
insert into
  public.user_roles (user_id, role)
values
  (new.id, 'admin');


end if;


return new;


end;


$$language plpgsql security definer;


-- Set username to all users like Wizard#123
create sequence id_seq;


UPDATE
  public.users
SET
  username = CONCAT('Wizard#', nextval('id_seq'));


drop sequence id_seq;


-- Make username required and unique
alter table
  "public"."users"
alter column
  "username"
set
  not null;


CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


alter table
  "public"."users"
add
  constraint "users_username_key" UNIQUE using index "users_username_key";