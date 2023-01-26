import { cn } from '#/lib/utils';
import { forwardRef } from 'react';

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: 'default' | 'outline' | 'brand' | 'danger';
  }
>(({ kind = 'default', className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex gap-1 items-center justify-center rounded-lg border border-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors',
      {
        'bg-gray-900': kind === 'default',
        'bg-brand-600': kind === 'brand',
        'bg-red-600': kind === 'danger',
      },
      className,
    )}
    {...props}
  />
));
Button.displayName = 'Button';

export default Button;
