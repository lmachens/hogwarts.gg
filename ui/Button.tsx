import { cn } from '#/lib/utils';

export default function Button({
  kind = 'default',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'default' | 'outline' | 'brand';
}) {
  return (
    <button
      className={cn(
        'inline-flex w-full items-center justify-center rounded-lg border border-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors',
        {
          'bg-gray-900': kind === 'default',
          'bg-brand-600': kind === 'brand',
        },
        className,
      )}
      {...props}
    />
  );
}
