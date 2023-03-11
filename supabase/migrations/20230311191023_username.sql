set
  check_function_bodies = off;


CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$declare is_admin boolean;


users_count int;
is_not_unique boolean;

begin -- search number of 
select
  count(*)
from
  public.users into users_count;


is_not_unique := true;


WHILE is_not_unique 
LOOP
  users_count := users_count + 1;

  select
    count(*) = 1
  from
    public.users
  where
    username = CONCAT('Wizard#', users_count) into is_not_unique;


END LOOP;


insert into
  public.users (id, username)
values
  (new.id, CONCAT('Wizard#', users_count));


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