import { cn } from '#/lib/utils';
import type Link from 'next/link';
import { forwardRef } from 'react';
import AppLink from './AppLink';

const ButtonLink = forwardRef<
  HTMLAnchorElement,
  Parameters<typeof Link>[0] & {
    kind?: 'default' | 'outline' | 'brand';
  }
>(({ kind = 'default', className, ...props }, ref) => (
  <AppLink
    ref={ref}
    className={cn(
      'inline-flex gap-1 items-center justify-center rounded-lg border border-gray-700 px-3 py-2 text-center text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors',
      {
        'bg-gray-900': kind === 'default',
        'bg-brand-600': kind === 'brand',
      },
      className,
    )}
    {...props}
  />
));
ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
