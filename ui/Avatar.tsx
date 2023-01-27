import BoringAvatar from 'boring-avatars';

export default function Avatar({
  name,
  size = 28,
}: {
  name: string;
  size?: number;
}) {
  return <BoringAvatar name={name} variant="beam" size={size} />;
}
