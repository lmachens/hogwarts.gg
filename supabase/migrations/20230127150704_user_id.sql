CREATE UNIQUE INDEX users_id_key ON public.users USING btree (id);


alter table
  "public"."users"
add
  constraint "users_id_key" UNIQUE using index "users_id_key";