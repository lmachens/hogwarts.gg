import { getAlternates, languages, loadDictionary } from '#/lib/i18n/settings';
import { cn, getURL } from '#/lib/utils';
import '#/styles/globals.css';
import Footer from '#/ui/Footer';
import GlobalNav from '#/ui/GlobalNav';
import PlausibleTracker from '#/ui/PlausibleTracker';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Work_Sans as WorkSans } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

const ContextSwitch = dynamic(() => import('#/ui/sidebar/ContextSwitch'), {
  ssr: false,
});

const fontSerif = localFont({
  variable: '--font-serif',
  src: './fonts/animales-fantastic.woff2',
  display: 'block',
});

const fontSans = WorkSans({
  variable: '--font-sans',
  subsets: ['latin'],
});

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { metadata: metadataTranslations } = await loadDictionary(lang);
  return {
    title: {
      default: metadataTranslations.title,
      template: `%s - ${metadataTranslations.title}`,
    },
    description: metadataTranslations.description,
    manifest: getURL('/favicon/site.webmanifest'),
    openGraph: {
      title: {
        default: metadataTranslations.title,
        template: `%s - ${metadataTranslations.title}`,
      },
      description: metadataTranslations.description,
      url: getURL(),
      siteName: metadataTranslations.title,
      images: getURL('/assets/social.jpg'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: metadataTranslations.title,
        template: `%s - ${metadataTranslations.title}`,
      },
      description: metadataTranslations.description,
      creator: '@leonmachens',
      creatorId: '837613011917484033',
      images: getURL('/assets/social.jpg'),
    },
    alternates: {
      canonical: getURL(`/${lang}`),
      languages: getAlternates(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: [
        {
          url: getURL('/favicon/favicon-32x32.png'),
          sizes: '32x32',
        },
        {
          url: getURL('/favicon/favicon-16x16.png'),
          sizes: '16x16',
        },
      ],
      shortcut: getURL('/favicon.ico'),
      apple: getURL('/favicon/apple-touch-icon.png'),
    },
  };
}

const RootLayout = async ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  const { global: globalTranslations, overwolf: overwolfTranslations } =
    await loadDictionary(lang);
  return (
    <html
      lang={lang}
      dir="ltr"
      className={cn(
        '[color-scheme:dark] select-none drag-none bg-gradient-to-b from-gray-1000 via-gray-1000 to-gray-1100 text-white scroll-smooth',
        fontSerif.variable,
        fontSans.variable,
      )}
    >
      <head>
        <PlausibleTracker />
      </head>
      <body className="overflow-hidden">
        <div className="flex h-screen">
          <main className="relative min-h-screen flex-1 overflow-auto">
            <div className="pt-14">{children}</div>
            <Footer translations={globalTranslations} />
            <div id="nitro-floating" />
          </main>
          <div className="pt-14 w-[401px] h-full flex-col border-l border-gray-800 hidden md:flex">
            <ContextSwitch translations={overwolfTranslations} />
          </div>
          <GlobalNav translations={globalTranslations} />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
