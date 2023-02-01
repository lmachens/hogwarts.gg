alter table
  "public"."posts"
alter column
  "language"
set
  not null;


DO $$DECLARE temprow RECORD;


BEGIN FOR temprow IN
select
  id,
  user_id
from
  "public"."posts" LOOP
insert into
  "public"."posts" (language, group_id, user_id)
values
  ('de', temprow.id, temprow.user_id);


END LOOP;


END $$