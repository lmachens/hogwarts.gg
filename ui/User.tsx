'use client';

import { useUser } from '#/lib/hooks/use-user';
import { notFound } from 'next/navigation';
import Avatar from './Avatar';

export default function User({ id }: { id: string }) {
  const { data: user } = useUser(id);
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
