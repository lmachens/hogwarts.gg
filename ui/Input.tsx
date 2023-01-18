import { cn } from '#/lib/utils';

export default function Input({
  className,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode }) {
  return (
    <label className={cn('flex flex-col text-left', className)}>
      {label}
      <input
        className="bg-gray-900 w-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors"
        {...props}
      />
    </label>
  );
}
