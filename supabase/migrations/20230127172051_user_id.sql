alter table
  "public"."user_roles" drop constraint "user_roles_user_id_fkey";


CREATE UNIQUE INDEX user_roles_user_id_key ON public.user_roles USING btree (user_id);


CREATE UNIQUE INDEX users_id_key ON public.users USING btree (id);


alter table
  "public"."user_roles"
add
  constraint "user_roles_user_id_key" UNIQUE using index "user_roles_user_id_key";


alter table
  "public"."users"
add
  constraint "users_id_key" UNIQUE using index "users_id_key";


alter table
  "public"."user_roles"
add
  constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;


alter table
  "public"."user_roles" validate constraint "user_roles_user_id_fkey";


alter table
  "public"."posts"
alter column
  "user_id"
set
  not null;