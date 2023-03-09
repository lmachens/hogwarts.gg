import { getAlternates, languages, loadDictionary } from '#/lib/i18n/settings';
import { getPlayers } from '#/lib/players';
import { getUser, getUsers } from '#/lib/users';
import { getURL } from '#/lib/utils';
import SWRFallback from '#/ui/SWRFallback';
import User from '#/ui/users/User';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params: { id, lang },
}: {
  params: { id: string; lang: string };
}): Promise<Metadata> {
  const user = await getUser(id);

  if (!user) {
    notFound();
  }
  return {
    title: user.username,
    description: user.description,
    alternates: {
      canonical: getURL(`/${lang}/users/${user.id}`),
      languages: getAlternates(`/users/${user.id}`),
    },
  };
}

export default async function Page({
  params: { id, lang },
}: {
  params: {
    id: string;
    lang: string;
  };
}) {
  const [user, players] = await Promise.all([getUser(id), getPlayers(id)]);
  if (!user) {
    notFound();
  }
  const { user: translations } = await loadDictionary(lang);

  return (
    <SWRFallback
      fallback={{ [`users/${id}`]: user, [`users/${id}/players`]: players }}
    >
      <User id={id} translations={translations} />
    </SWRFallback>
  );
}

export async function generateStaticParams() {
  const users = await getUsers();
  return users
    .filter((user) => ['admin', 'moderator'].includes(user.role))
    .flatMap((user) =>
      languages.map((lang) => ({ lang, id: user.id.toString() })),
    );
}
