import Image from 'next/image';
import Link from 'next/link';
import discordLogo from '../public/assets/discord-logo-white.svg';

const DiscordLink = () => {
  return (
    <Link
      href="https://discord.gg/NTZu8Px"
      target="_blank"
      className="border border-transparent hover:border-current rounded-lg px-4 py-2 transition"
    >
      <Image src={discordLogo} alt="Join Discord" height={30} />
    </Link>
  );
};

export default DiscordLink;
