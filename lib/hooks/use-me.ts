import useSWR from 'swr';
import supabase from '../supabase-browser';
import { getUser } from '../users';

export function useMe() {
  return useSWR('me', () =>
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      return session ? await getUser(session.user.id) : null;
    }),
  );
}
