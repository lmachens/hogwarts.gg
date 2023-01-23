-- ASSIGN PERMISSIONS
insert into
  public.role_permissions (role, permission)
values
  ('admin', 'posts.upload'),
  ('moderator', 'posts.upload');


-- STORAGE POLICY
CREATE POLICY "Allow everyone read access" ON storage.objects FOR
select
  USING (true);


CREATE POLICY "Allow authorized uploading posts" ON storage.objects FOR insert
WITH
  CHECK (authorize('posts.upload', auth.uid()));


-- Add posts bucket
insert into
  storage.buckets (id, name, public)
values
  ('posts', 'posts', true);