import { loadDictionary } from '#/lib/i18n/settings';
import Countdown from '#/ui/Countdown';
import DiscordLink from '#/ui/DiscordLink';
import 'server-only';

const RELEASE_DATE = new Date('2023-02-10T00:00:00.000Z');

export default async function Page({ params }: { params: { lang: string } }) {
  const { home } = await loadDictionary(params.lang);

  return (
    <div className="h-full-height grid place-content-center place-items-center gap-6 bg-cover bg-center bg-gray-1100 bg-[url('/assets/Hogwarts_Legacy_Image_1.jpg')]">
      <h1 className="font-serif tracking-wide text-4xl sm:text-5xl drop-shadow-lg">
        Hogwart$.gg
      </h1>
      <p className="font-medium text-xl drop-shadow-md">{home.subtitle}</p>
      <Countdown
        releaseTime={RELEASE_DATE.getTime()}
        initialTimeLeft={RELEASE_DATE.getTime() - Date.now()}
      />
      <DiscordLink />
    </div>
  );
}
