import { cn } from '#/lib/utils';

export default function PostHTML({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn('post', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
