'use client';

import { useMe } from '#/lib/hooks/use-me';
import type { Translations } from '#/lib/i18n/types';
import supabase from '#/lib/supabase-browser';
import { cn } from '#/lib/utils';
import { IconHeartHandshake, IconLogout, IconUser } from '@tabler/icons';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import AppLink from './AppLink';
import Avatar from './Avatar';
import Divider from './Divider';
import LanguageSelect from './LanguageSelect';
import Popover from './Popover';

export default function GlobalUser({
  onClick,
  translations,
}: {
  onClick: () => void;
  translations: Translations;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === 'login';
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const { data: me } = useMe();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(() => {
      mutate('me');
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    close();
    await supabase.auth.signOut();
  };

  return (
    <>
      {me ? (
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <button className="flex items-center gap-2 mx-auto">
              <Avatar name={me.username} /> {me.username}
            </button>
          }
        >
          <nav className="flex flex-col w-52">
            <UserMenuHeadline icon={<IconUser />}>
              {translations.aboutMe}
            </UserMenuHeadline>
            <UserMenuLink onClick={close} href={`/users/${me.id}`}>
              {translations.profile}
            </UserMenuLink>
            {['admin', 'moderator'].includes(me?.role) && (
              <>
                <UserMenuHeadline icon={<IconHeartHandshake />}>
                  {translations.moderators}
                </UserMenuHeadline>
                <UserMenuLink onClick={close} href="/dashboard/posts">
                  {translations.posts}
                </UserMenuLink>
              </>
            )}
            <Divider className="my-2" />
            <UserMenuButton onClick={handleLogout} icon={<IconLogout />}>
              {translations.logOut}
            </UserMenuButton>
            <Divider className="my-2" />
            <LanguageSelect className="m-auto p-2 mb-1" />
          </nav>
        </Popover>
      ) : (
        <div className="flex gap-3 items-center">
          <LanguageSelect />
          <AppLink
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
            {translations.signIn}
          </AppLink>
        </div>
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
    <AppLink
      onClick={onClick}
      href={href}
      className="flex items-center px-3 py-2 font-medium hover:bg-gray-800"
    >
      <span className="w-8">{icon}</span>
      {children}
    </AppLink>
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
