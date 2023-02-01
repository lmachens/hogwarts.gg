import { loadDictionary } from '#/lib/i18n/settings';
import DashboardPosts from '#/ui/dashboard/Posts';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { dashboard: translations } = await loadDictionary(lang);

  return <DashboardPosts translations={translations} />;
}
