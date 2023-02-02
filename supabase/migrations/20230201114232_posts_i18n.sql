alter table
  "public"."posts"
add
  column "group_id" bigint;


alter table
  "public"."posts"
add
  column "language" text default '':: text;


alter table
  "public"."posts"
add
  column "slug" text;


CREATE UNIQUE INDEX posts_slug_key ON public.posts USING btree (slug);


alter table
  "public"."posts"
add
  constraint "posts_slug_key" UNIQUE using index "posts_slug_key";


alter table
  "public"."posts"
add
  constraint "posts_group_id_fkey" FOREIGN KEY (group_id) REFERENCES posts(id) not valid;


alter table
  "public"."posts" validate constraint "posts_group_id_fkey";


UPDATE
  public.posts
SET
  language = 'en';