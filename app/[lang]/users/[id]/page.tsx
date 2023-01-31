import { languages } from '#/lib/i18n/settings';
import { getUser, getUsers } from '#/lib/users';
import SWRFallback from '#/ui/SWRFallback';
import User from '#/ui/User';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const user = await getUser(id);
  if (!user) {
    notFound();
  }

  return (
    <SWRFallback fallback={{ [`users/${id}`]: user }}>
      <User id={id} />
    </SWRFallback>
  );
}

export async function generateStaticParams() {
  const users = await getUsers();
  return users.flatMap((user) =>
    languages.map((lang) => ({ lang, id: user.id.toString() })),
  );
}
