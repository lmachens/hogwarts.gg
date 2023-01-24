-- CUSTOM TYPES
alter type public.app_permission
add
  value if not exists 'nodes.edit';


alter type public.app_permission
add
  value if not exists 'nodes.delete';