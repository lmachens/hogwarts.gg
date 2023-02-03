import { loadDictionary } from '#/lib/i18n/settings';
import Countdown from '#/ui/Countdown';
import DiscordLink from '#/ui/DiscordLink';
import GitHubLink from '#/ui/GitHubLink';
import Hero from '#/ui/Hero';

const RELEASE_DATE = new Date('2023-02-10T00:00:00.000Z');

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { home: translations } = await loadDictionary(lang);

  return (
    <>
      <Hero title="Hogwart$.gg" subtitle={translations.subtitle} />
      <div className="flex flex-col items-center gap-4 text-center">
        <Countdown
          releaseTime={RELEASE_DATE.getTime()}
          initialTimeLeft={RELEASE_DATE.getTime() - Date.now()}
        />
        <p className="italic">{translations.underContstruction}</p>
        <p>
          {translations.lookingForContributors}
          <br />
          {translations.pleaseJoinOur}
        </p>
        <DiscordLink />
        <p>{translations.openSourceNote}</p>
        <GitHubLink />
      </div>
    </>
  );
}
