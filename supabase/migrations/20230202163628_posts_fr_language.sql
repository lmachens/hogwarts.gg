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
  ('fr', temprow.id, temprow.user_id);


END LOOP;


END $$