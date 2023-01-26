'use client';

import type { NavItem } from '#/lib/nav-items';
import { navItems } from '#/lib/nav-items';
import { cn } from '#/lib/utils';
import IconRound from '#/public/assets/icon-round.png';
import { IconMenu2, IconX } from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import GlobalUser from './GlobalUser';

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed z-auto top-0 flex w-full border-b border-gray-800 bg-black">
      <LogoNavItem onClick={close} />
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <IconX className="block w-6 text-gray-400" />
        ) : (
          <IconMenu2 className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={cn(
          'text-center px-4 grow md:flex md:items-center md:justify-between py-4 md:py-0 space-y-3 md:space-y-0 md:h-14',
          {
            'fixed md:static inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
            hidden: !isOpen,
          },
        )}
      >
        <div className="md:order-last">
          <GlobalUser onClick={close} />
        </div>
        <nav className="flex flex-col space-y-1 md:space-y-0 md:px-0 md:py-0 md:flex-row md:h-14 md:items-center">
          {navItems.map((navItem) => (
            <GlobalNavItem key={navItem.name} item={navItem} onClick={close} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function LogoNavItem({ onClick }: { onClick: () => void }) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === null;

  return (
    <div className="flex h-14 items-center py-4 px-4">
      <Link
        href="/"
        className="group flex w-full items-center gap-x-2.5"
        onClick={onClick}
      >
        <div
          className={cn(
            'h-7 w-7 rounded-full border  group-hover:border-white/70',
            {
              'border-white/30 group-hover:border-white/50': !isActive,
              'border-white': isActive,
            },
          )}
        >
          <Image src={IconRound} alt="Hogwarts.gg" />
        </div>

        <h3
          className={cn(
            'font-serif tracking-wide group-hover:text-gray-300 pt-1',
            {
              'text-gray-400 group-hover:text-gray-50': !isActive,
              'text-white': isActive,
            },
          )}
        >
          Hogwart$.gg
        </h3>
      </Link>
    </div>
  );
}

function GlobalNavItem({
  item,
  onClick,
}: {
  item: NavItem;
  onClick: () => void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={onClick}
      href={item.disabled ? '/' : `/${item.slug}`}
      className={cn(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
          'text-gray-600 hover:text-gray-600': item.disabled,
        },
      )}
    >
      {item.name}
      {item.disabled && ' (Coming Soon)'}
    </Link>
  );
}
