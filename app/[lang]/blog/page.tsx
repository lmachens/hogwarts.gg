import { loadDictionary } from '#/lib/i18n/settings';
import { getPosts } from '#/lib/posts';
import Hero from '#/ui/Hero';
import Posts from '#/ui/Posts';
import SWRFallback from '#/ui/SWRFallback';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const posts = await getPosts({ language: lang, published: true });
  const { blog: blogTranslations, posts: postTranslations } =
    await loadDictionary(lang);

  return (
    <>
      <Hero
        title={blogTranslations.title}
        subtitle={blogTranslations.subtitle}
      />
      <SWRFallback fallback={{ [`posts/${lang}`]: posts }}>
        <Posts translations={postTranslations} />
      </SWRFallback>
    </>
  );
}
