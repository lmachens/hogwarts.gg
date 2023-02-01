import { loadDictionary } from '#/lib/i18n/settings';
import Post from '#/ui/dashboard/Post';

export default async function Page({
  params: { id, lang },
}: {
  params: {
    id: string;
    lang: string;
  };
}) {
  const { dashboard: translations } = await loadDictionary(lang);

  return <Post id={id} translations={translations} />;
}
