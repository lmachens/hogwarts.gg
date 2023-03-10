'use client';
import type { Translations } from '#/lib/i18n/types';
import dynamic from 'next/dynamic';

const OverwolfStatus = dynamic(() => import('./OverwolfStatus'), {
  ssr: false,
});

const WebsiteStatus = dynamic(() => import('./WebsiteStatus'), {
  ssr: false,
});
export default function ContextSwitch({
  translations,
}: {
  translations: Translations;
}) {
  const isOverwolfIframe =
    window.top && navigator.userAgent.includes('OverwolfClient');

  if (isOverwolfIframe) {
    return <OverwolfStatus translations={translations} />;
  } else {
    return <WebsiteStatus translations={translations} />;
  }
}
