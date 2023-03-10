'use client';
import Script from 'next/script';
import { createPortal } from 'react-dom';

type NitroAds = {
  // eslint-disable-next-line no-unused-vars
  createAd: (id: string, options: any) => void;
  addUserToken: () => void;
  queue: ([string, any, (value: unknown) => void] | [string, any])[];
};

interface MyWindow extends Window {
  nitroAds: NitroAds;
}
declare let window: MyWindow;

window.nitroAds = window.nitroAds || {
  createAd: function () {
    return new Promise(function (e) {
      // eslint-disable-next-line prefer-rest-params
      window.nitroAds.queue.push(['createAd', arguments, e]);
    });
  },
  addUserToken: function () {
    // eslint-disable-next-line prefer-rest-params
    window.nitroAds.queue.push(['addUserToken', arguments]);
  },
  queue: [],
};

export default function NitroAds() {
  function createAd() {
    window['nitroAds'].createAd('nitro-video', {
      format: 'video-nc',
      video: {},
    });
  }

  const isMd = window.matchMedia('(min-width: 768px)');

  if (isMd.matches) {
    return (
      <>
        <div id="nitro-video" />
        <Script
          onReady={createAd}
          data-cfasync="false"
          async
          src="https://s.nitropay.com/ads-1406.js"
        />
      </>
    );
  }
  return createPortal(
    <>
      <div id="nitro-video" className="mt-2" />
      <Script
        onReady={createAd}
        data-cfasync="false"
        async
        src="https://s.nitropay.com/ads-1406.js"
      />
    </>,
    document.querySelector('#nitro-floating')!,
  );
}
