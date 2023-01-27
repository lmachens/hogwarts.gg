import createClient from '#/lib/supabase-server';
import { getUser } from '#/lib/users';
import Avatar from '#/ui/Avatar';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = createClient();
  const user = await getUser(supabase, params.id);
  if (!user) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center px-6 py-16">
        <Avatar name={user.username} size={72} />
        <h1 className="text-3xl font-bold lg:text-4xl">{user.username}</h1>
        <h2>{user.role}</h2>
      </div>

      <div className="container mx-auto py-8 grid gap-2"></div>
    </>
  );
}
