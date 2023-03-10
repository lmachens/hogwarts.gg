import { getAlternates, loadDictionary } from '#/lib/i18n/settings';
import { getURL } from '#/lib/utils';
import FixedBox from '#/ui/FixedBox';
import HogwartsLevelSelect from '#/ui/map/HogwartsLevelSelect';
import Nodes from '#/ui/map/Nodes';
import Player from '#/ui/map/Player';
import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
const HogwartsMap = nextDynamic(() => import('#/ui/map/HogwartsMap'), {
  ssr: false,
});

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { global: globalTranslations } = await loadDictionary(lang);

  return {
    title: globalTranslations.map,
    alternates: {
      canonical: getURL(`/${lang}/map/hogwarts`),
      languages: getAlternates('/map/hogwarts'),
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="h-full-height w-full relative">
      <HogwartsMap>
        <FixedBox className="left-4 bottom-0 flex justify-center space-x-2">
          <HogwartsLevelSelect />
          <Player />
        </FixedBox>
        <Nodes lang={lang} />
      </HogwartsMap>
    </div>
  );
}
