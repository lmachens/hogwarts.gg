'use client';

import supabase from '#/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SupabaseListener = ({ accessToken }: { accessToken?: string }) => {
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => data.subscription.unsubscribe();
  }, [accessToken]);

  return null;
};
export default SupabaseListener;
