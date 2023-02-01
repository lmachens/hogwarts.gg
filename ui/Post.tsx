'use client';

import { usePost } from '#/lib/hooks/use-post';
import type { Translations } from '#/lib/i18n/types';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { format, formatDistance } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostHTML from './PostHTML';

export default function Post({
  id,
  translations,
}: {
  id: string;
  translations: Translations;
}) {
  const { data: post, isLoading } = usePost(id);

  if (!post && isLoading) {
    return <></>;
  }
  if (!post) {
    notFound();
  }
  return (
    <>
      <div className="container mx-auto px-6 pt-16 pb-8 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
          <PostHTML html={post.short!} />
          <p className="text-gray-400 text-sm pt-2">
            {translations.writtenBy}{' '}
            <span className="font-semibold">{post.user.username}</span>
            {' - '}
            {post.published_at && (
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), 'MMMM dd, yyyy')} (
                {formatDistance(new Date(post.published_at), new Date(), {
                  addSuffix: true,
                })}
                )
              </time>
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-2 md:px-0 py-8 grid gap-2">
        <PostHTML html={post.body!} />
        <Link href="/blog" className="flex py-4 text-sky-400 hover:underline">
          <IconArrowNarrowLeft /> {translations.backToBlog}
        </Link>
      </div>
    </>
  );
}
