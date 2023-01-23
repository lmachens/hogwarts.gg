-- CUSTOM TYPES
alter type public.app_permission
add
  value if not exists 'posts.upload';