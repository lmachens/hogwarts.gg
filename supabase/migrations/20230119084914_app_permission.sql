-- CUSTOM TYPES
alter type public.app_permission
add
  value if not exists 'posts.read';


alter type public.app_permission
add
  value if not exists 'posts.create';


alter type public.app_permission
add
  value if not exists 'posts.delete';


alter type public.app_permission
add
  value if not exists 'posts.edit';