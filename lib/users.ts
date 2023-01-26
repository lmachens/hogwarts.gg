import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const getUser = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<User | null> => {
  const result = await supabase
    .from('users')
    .select(
      `
      id,
      username, 
      user_roles (
        role
      )
    `,
    )
    .eq('id', userId);
  if (!result.data?.[0]) {
    return null;
  }
  const user = result.data[0];
  const id = user.id;
  const username = user.username;
  let role = 'User';
  if (Array.isArray(user.user_roles)) {
    role = user.user_roles[0].role;
  } else if (user.user_roles) {
    role = user.user_roles.role;
  }
  return {
    id,
    username,
    role,
  };
};
export type User = {
  id: string;
  username: string;
  role: string;
};
