import { cn } from '#/lib/utils';

export default function Label({
  label,
  description,
  className,
  required,
  children,
}: {
  className?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={cn('flex flex-col text-left gap-1', className)}>
      <span className="text-sm">
        {label}
        {required && <span className="ml-1 text-orange-600">*</span>}
      </span>
      {description && (
        <span className="text-xs text-gray-500">{description}</span>
      )}
      {children}
    </label>
  );
}
