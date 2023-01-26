export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-xs	text-orange-500">{children}</p>;
}
