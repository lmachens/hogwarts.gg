import 'server-only';

import createClient from '#/lib/supabase-server';
import type { User } from '#/lib/users';
import { getUser } from '#/lib/users';
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

  let user: User | null = null;
  if (session) {
    user = await getUser(supabase, session.user.id);
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
      <head>
        <PlausibleTracker />
      </head>
      <body className="relative min-h-screen">
        <SupabaseListener accessToken={session?.access_token} />
        <SupabaseProvider session={session} user={user}>
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
