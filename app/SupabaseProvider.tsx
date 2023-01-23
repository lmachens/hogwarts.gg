'use client';

import type { Database } from '#/lib/database.types';
import type { Session } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

const Context = createContext<{
  session: Session | null;
  userRole: Database['public']['Enums']['app_role'] | null;
}>({
  session: null,
  userRole: null,
});

type SupabaseProviderProps = {
  children: ReactNode;
  session: Session | null;
  userRole: Database['public']['Enums']['app_role'] | null;
};
const SupabaseProvider = ({
  children,
  session,
  userRole,
}: SupabaseProviderProps) => {
  return (
    <Context.Provider value={{ session, userRole }}>
      {children}
    </Context.Provider>
  );
};

export default SupabaseProvider;

export const useSession = () => {
  return useContext(Context);
};
