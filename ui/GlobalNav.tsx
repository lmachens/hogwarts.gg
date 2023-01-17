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

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed top-0 z-10 flex w-full border-b border-gray-800 bg-black">
      <div className="flex h-14 items-center py-4 px-4">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={cn(
              'h-7 w-7 rounded-full border  group-hover:border-white/70',
              {
                'border-white/30 group-hover:border-white/50': segment !== null,
                'border-white': segment === null,
              },
            )}
          >
            <Image src={IconRound} alt="Hogwarts.gg" />
          </div>

          <h3
            className={cn(
              'font-serif tracking-wide group-hover:text-gray-300 pt-1',
              {
                'text-gray-400 group-hover:text-gray-50': segment !== null,
                'text-white': segment === null,
              },
            )}
          >
            Hogwart$.gg
          </h3>
        </Link>
      </div>
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
        className={cn('md:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="flex flex-col px-2 py-5 space-y-1 md:space-y-0 md:px-0 md:py-0 md:flex-row h-14 md:items-center">
          {navItems.map((navItem) => (
            <GlobalNavItem
              key={navItem.name}
              item={navItem}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
      </div>
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
