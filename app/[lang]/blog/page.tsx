import { loadDictionary } from '#/lib/i18n/settings';
import { getPosts } from '#/lib/posts';
import Posts from '#/ui/Posts';
import SWRFallback from '#/ui/SWRFallback';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const posts = await getPosts();
  const { blog: translations } = await loadDictionary(lang);

  return (
    <>
      <div className="px-6 py-16 border-b border-gray-800">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold lg:text-4xl">
            {translations.title}
          </h1>
          <h2 className="mt-6 text-gray-300">{translations.subtitle}</h2>
        </div>
      </div>
      <SWRFallback fallback={{ posts }}>
        <Posts />
      </SWRFallback>
    </>
  );
}
