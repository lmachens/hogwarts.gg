create table "public"."locales" (
    "id" bigint generated by default as identity not null,
    "key" text not null,
    "value" text not null,
    "description" text,
    "language" text not null
);

alter table "public"."locales" enable row level security;

CREATE UNIQUE INDEX locales_pkey ON public.locales USING btree (id);

CREATE UNIQUE INDEX unique_key_language ON public.locales USING btree (key, language);

alter table "public"."locales" add constraint "locales_pkey" PRIMARY KEY using index "locales_pkey";

create policy "Enable read access for all users"
on "public"."locales"
as permissive
for select
to public
using (true);
