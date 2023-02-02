import { loadDictionary } from '#/lib/i18n/settings';
import { getPosts } from '#/lib/posts';
import Clouds from '#/public/assets/clouds.png';
import LogoTemplate from '#/public/assets/logo_template.png';
import Posts from '#/ui/Posts';
import SWRFallback from '#/ui/SWRFallback';
import Image from 'next/image';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const posts = await getPosts({ language: lang });
  const { blog: blogTranslations, posts: postTranslations } =
    await loadDictionary(lang);

  return (
    <>
      <div className="relative px-6border-b border-gray-800 bg-[url('/assets/bg.png')] bg-cover bg-top">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="relative font-serif text-3xl font-bold lg:text-4xl">
            <Image src={LogoTemplate} alt="" />
            <span className="absolute left-0 right-0" style={{ bottom: 68 }}>
              {blogTranslations.title}
            </span>
          </h1>
        </div>
        <Image
          src={Clouds}
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full"
        />
      </div>
      <h2 className="my-6 p-1 text-gray-300 text-center">
        {blogTranslations.subtitle}
      </h2>
      <SWRFallback fallback={{ [`posts/${lang}`]: posts }}>
        <Posts translations={postTranslations} />
      </SWRFallback>
    </>
  );
}
