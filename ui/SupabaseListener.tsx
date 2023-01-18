'use client';

import supabase from '#/lib/supabase-browser';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SupabaseListener = ({ accessToken }: { accessToken?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== accessToken) {
        console.log(pathname);
        if (pathname === '/sign-in' || pathname === '/sign-up') {
          router.push('/');
        } else {
          router.refresh();
        }
      }
    });

    return () => data.subscription.unsubscribe();
  }, [accessToken, pathname]);

  return null;
};
export default SupabaseListener;
