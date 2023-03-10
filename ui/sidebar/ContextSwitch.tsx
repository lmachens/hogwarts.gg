'use client';
import type { Translations } from '#/lib/i18n/types';
import dynamic from 'next/dynamic';

const OverwolfStatus = dynamic(() => import('./OverwolfStatus'), {
  ssr: false,
});

const WebsiteStatus = dynamic(() => import('./WebsiteStatus'), {
  ssr: false,
});

const NitroAds = dynamic(() => import('./NitroAds'), {
  ssr: false,
});

export default function ContextSwitch({
  translations,
}: {
  translations: Translations;
}) {
  const isOverwolfIframe =
    window.top && navigator.userAgent.includes('OverwolfClient');

  return (
    <>
      <div className="flex-1 border-b border-gray-800 overflow-auto flex flex-col gap-2 p-2">
        {isOverwolfIframe ? (
          <OverwolfStatus translations={translations} />
        ) : (
          <WebsiteStatus translations={translations} />
        )}
      </div>
      {isOverwolfIframe ? (
        <div
          className={`w-[400px] h-[300px] bg-gray-900 bg-[url('/assets/ads-bg.jpg')] bg-cover bg-center bg-no-repeat grayscale brightness-75 `}
        />
      ) : (
        <NitroAds />
      )}
    </>
  );
}
