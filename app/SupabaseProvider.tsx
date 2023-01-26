'use client';

import type { User } from '#/lib/users';
import type { Session } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

const Context = createContext<{
  session: Session | null;
  user: User | null;
}>({
  session: null,
  user: null,
});

type SupabaseProviderProps = {
  children: ReactNode;
  session: Session | null;
  user: User | null;
};
const SupabaseProvider = ({
  children,
  session,
  user,
}: SupabaseProviderProps) => {
  return (
    <Context.Provider value={{ session, user }}>{children}</Context.Provider>
  );
};

export default SupabaseProvider;

export const useSession = () => {
  return useContext(Context);
};
