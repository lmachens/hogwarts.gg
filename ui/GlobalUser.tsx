import supabase from '#/lib/supabase-browser';
import { cn } from '#/lib/utils';
import { useSession } from '@supabase/auth-helpers-react';
import { IconUserCheck } from '@tabler/icons';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import Popover from './Popover';

export default function GlobalUser({ onClick }: { onClick: () => void }) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === 'login';

  const session = useSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  console.log(session?.user.user_metadata);

  return (
    <>
      {session ? (
        <Popover
          trigger={
            <button className="" aria-label="Signed In User">
              <IconUserCheck />
            </button>
          }
        >
          <button onClick={handleLogout}>Logout</button>
        </Popover>
      ) : (
        <Link
          href="/sign-in"
          onClick={onClick}
          className={cn(
            'block px-3 py-1 border rounded-md text-center hover:border-gray-300 hover:text-gray-300',
            {
              'text-gray-400 border-gray-400': !isActive,
              'text-white border-white': isActive,
            },
          )}
        >
          Sign In
        </Link>
      )}
    </>
  );
}
