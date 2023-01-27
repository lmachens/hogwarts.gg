import type { SupabaseClient } from '@supabase/supabase-js';
import { ok } from 'assert';
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
      user_role:user_roles (
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

  // It will never be an array because the `user_roles.user_id` is unique
  ok(!Array.isArray(user.user_role));

  const role = user.user_role ? user.user_role.role : 'User';
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
