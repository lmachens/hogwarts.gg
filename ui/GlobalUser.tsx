import { useSession } from '#/app/SupabaseProvider';
import supabase from '#/lib/supabase-browser';
import { cn } from '#/lib/utils';
import { IconHeartHandshake, IconLogout, IconUser } from '@tabler/icons';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import Avatar from './Avatar';
import Divider from './Divider';
import Popover from './Popover';

export default function GlobalUser({ onClick }: { onClick: () => void }) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === 'login';
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const { user } = useSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {user ? (
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <button className="flex items-center gap-2 mx-auto">
              <Avatar name={user.username} /> {user.username}
            </button>
          }
        >
          <nav className="flex flex-col w-52">
            <UserMenuHeadline icon={<IconUser />}>About Me</UserMenuHeadline>
            <UserMenuLink onClick={close} href={`/users/${user.id}`}>
              Profile
            </UserMenuLink>
            {(user?.role === 'admin' || user?.role === 'moderator') && (
              <>
                <UserMenuHeadline icon={<IconHeartHandshake />}>
                  Moderators
                </UserMenuHeadline>
                <UserMenuLink onClick={close} href="/dashboard/posts">
                  Posts
                </UserMenuLink>
              </>
            )}
            <Divider className="my-2" />
            <UserMenuButton onClick={handleLogout} icon={<IconLogout />}>
              Log Out
            </UserMenuButton>
          </nav>
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

function UserMenuHeadline({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <p className="flex items-center p-3 font-medium text-gray-400 ">
      <span className="w-8">{icon}</span>
      {children}
    </p>
  );
}

function UserMenuLink({
  children,
  href,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className="flex items-center px-3 py-2 font-medium hover:bg-gray-800"
    >
      <span className="w-8">{icon}</span>
      {children}
    </Link>
  );
}

function UserMenuButton({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-2 font-medium hover:bg-gray-800"
    >
      <span className="w-8">{icon}</span>
      {children}
    </button>
  );
}
