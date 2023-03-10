import { loadDictionary } from '#/lib/i18n/settings';
import AppLink from '#/ui/AppLink';
import DiscordLink from '#/ui/DiscordLink';
import Footer from '#/ui/Footer';
import GitHubLink from '#/ui/GitHubLink';
import Hero from '#/ui/Hero';
import { IconArticle, IconMap } from '@tabler/icons-react';
import Image from 'next/image';
import discordLogo from '../../public/assets/discord.svg';
import githubLogo from '../../public/assets/github.png';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { home: translations, global: globalTranslations } =
    await loadDictionary(lang);

  return (
    <>
      <Hero title="Hogwart$.gg" subtitle={translations.subtitle} />
      <div className="flex flex-col items-center gap-4 text-center">
        <section className="flex gap-4 flex-wrap justify-center">
          <Card
            title={translations.articles}
            icon={<IconArticle size={72} stroke={1.5} />}
            href="/blog"
          >
            {translations.viewBlog}
          </Card>
          <Card
            title={translations.hogwarts}
            icon={<IconMap size={72} stroke={1.5} />}
            href="/map/hogwarts"
          >
            {translations.viewMap}
          </Card>
          <Card
            title={translations.community}
            icon={<Image src={discordLogo} alt="" height={48} />}
            href="https://discord.gg/NTZu8Px"
            target="_blank"
          >
            {translations.joinDiscord}
          </Card>
          <Card
            title={translations.openSource}
            icon={<Image src={githubLogo} alt="" height={48} />}
            href="https://github.com/lmachens/hogwarts.gg"
            target="_blank"
          >
            {translations.openGitHub}
          </Card>
        </section>
        <p>
          {translations.lookingForContributors}
          <br />
          {translations.pleaseJoinOur}
        </p>
        <DiscordLink />
        <p>{translations.openSourceNote}</p>
        <GitHubLink />
      </div>
      <Footer translations={globalTranslations} />
    </>
  );
}

function Card({
  title,
  icon,
  children,
  href,
  target,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  href: string;
  target?: string;
}) {
  return (
    <AppLink
      href={href}
      className="flex items-center rounded p-4 bg-gray-900 hover:scale-125 transition gap-4 text-left"
      target={target}
    >
      {icon}
      <div className="space-y-1">
        <h3 className="text-lg">{title}</h3>
        <p className="text-brand-400">{children}</p>
      </div>
    </AppLink>
  );
}
