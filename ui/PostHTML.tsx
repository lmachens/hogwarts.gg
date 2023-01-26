export default function PostHTML({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`post ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
