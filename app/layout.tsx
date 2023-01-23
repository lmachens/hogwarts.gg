import 'server-only';

import type { Database } from '#/lib/database.types';
import createClient from '#/lib/supabase-server';
import { cn } from '#/lib/utils';
import '#/styles/globals.css';
import Footer from '#/ui/Footer';
import GlobalNav from '#/ui/GlobalNav';
import PlausibleTracker from '#/ui/PlausibleTracker';
import SupabaseListener from '#/ui/SupabaseListener';
import { Work_Sans as WorkSans } from '@next/font/google';
import localFont from '@next/font/local';
import type { ReactNode } from 'react';
import SupabaseProvider from './SupabaseProvider';

const fontSerif = localFont({
  variable: '--font-serif',
  src: './fonts/animales-fantastic.woff2',
});

const fontSans = WorkSans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  let userRole: Database['public']['Enums']['app_role'] | null = null;
  if (session) {
    const result = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);
    userRole = result.data?.[0]?.role ?? null;
  }

  return (
    <html
      lang="en"
      className={cn(
        '[color-scheme:dark] select-none bg-gray-1100',
        fontSerif.variable,
        fontSans.variable,
      )}
    >
      <head />
      <body className="relative min-h-screen">
        <SupabaseListener accessToken={session?.access_token} />
        <PlausibleTracker />
        <SupabaseProvider session={session} userRole={userRole}>
          <GlobalNav />
          <div className="pt-14">{children}</div>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const revalidate = 0;
