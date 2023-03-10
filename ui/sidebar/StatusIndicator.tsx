import { cn } from '#/lib/utils';

export default function StatusIndicator({ issue }: { issue: boolean }) {
  return (
    <span
      className={cn('inline-block w-3 h-3 mr-2 rounded-xl bg-green-500', {
        'bg-orange-500': issue,
      })}
    />
  );
}
