'use client';

import { usePosts } from '#/lib/hooks/use-posts';
import type { Translations } from '#/lib/i18n/types';
import { IconArrowNarrowRight } from '@tabler/icons';
import { format } from 'date-fns';
import AppLink from './AppLink';
import PostHTML from './PostHTML';

export default function Posts({
  translations,
}: {
  translations: Translations;
}) {
  const { data: posts = [] } = usePosts();

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="hover:bg-gray-900 transition-colors border-b border-gray-800"
        >
          <div className="container mx-auto md:px-0 px-2 max-w-3xl py-8 grid gap-2">
            <AppLink href={`/blog/${post.id}`}>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </AppLink>
            {!post.published && <p className="text-sm text-slate-600">Draft</p>}
            <div className="flex">
              <p className="text-gray-400 text-sm">
                {translations.writtenBy}{' '}
                <span className="font-semibold">{post.user.username}</span>{' '}
                {' - '}
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                  </time>
                )}
              </p>
            </div>
            <PostHTML html={post.short!} />
            <AppLink
              href={`/blog/${post.id}`}
              className="flex text-sky-400 hover:underline"
            >
              {translations.readMore} <IconArrowNarrowRight />
            </AppLink>
          </div>
        </div>
      ))}
    </>
  );
}
