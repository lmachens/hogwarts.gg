import { cn } from '#/lib/utils';
import { forwardRef } from 'react';

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode }
>(({ className, label, ...props }, ref) => (
  <label className={cn('flex flex-col text-left', className)}>
    {label}
    <input
      ref={ref}
      className="bg-gray-900 w-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors"
      {...props}
    />
  </label>
));
Input.displayName = 'Input';

export default Input;
