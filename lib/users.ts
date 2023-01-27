import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const getUser = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<User | null> => {
  const { data: user, error } = await supabase
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
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  if (!user) {
    return null;
  }
  let role = 'User';
  if (Array.isArray(user.user_roles)) {
    role = user.user_roles[0].role;
  } else if (user.user_roles) {
    role = user.user_roles.role;
  }
  return {
    id: user.id,
    username: user.username,
    role,
  };
};
export type User = {
  id: string;
  username: string;
  role: string;
};
