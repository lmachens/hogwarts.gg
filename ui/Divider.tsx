import { cn } from '#/lib/utils';
import type { ReactNode } from 'react';

export default function Divider({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 text-sm bg-gray-1100 text-gray-1200">
          {children}
        </span>
      </div>
    </div>
  );
}
