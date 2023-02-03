import Image from 'next/image';
import gitHubLogo from '../public/assets/GitHub_Logo_White.png';
import AppLink from './AppLink';

const GitHubLink = () => {
  return (
    <AppLink
      href="https://github.com/lmachens/hogwarts.gg"
      target="_blank"
      className="border border-transparent hover:border-current rounded-lg px-4 py-2 transition"
    >
      <Image src={gitHubLogo} alt="Contribute on GitHub" height={30} />
    </AppLink>
  );
};

export default GitHubLink;
