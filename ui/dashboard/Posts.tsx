'use client';

import { usePosts } from '#/lib/hooks/use-posts';
import { labels } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import { format } from 'date-fns';
import AppLink from '../AppLink';
import PostHTML from '../PostHTML';
import PostCreateButton from './PostCreateButton';

export default function Posts({
  translations,
}: {
  translations: Translations;
}) {
  const { data: posts = [], isLoading } = usePosts({ draft: true });

  return (
    <div className="space-y-2">
      <h1 className="text-xl">{translations.posts}</h1>
      <PostCreateButton translations={translations} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <AppLink
            key={post.id}
            href={`/dashboard/posts/${post.id}`}
            className="block py-4"
          >
            <div className="flex flex-col h-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors">
              <h2 className="text-lg">{post.title}</h2>
              <PostHTML className="h-32" html={post.short!} />
              <div className="flex gap-2">
                <p>{post.id}</p>|<p>{labels[post.language]}</p>|
                <p>
                  {translations.writtenBy}{' '}
                  <span className="text-brand-500">{post.user.username}</span>
                </p>
              </div>
              <div className="flex gap-2 text-gray-400 text-sm">
                <p>
                  {post.published ? translations.published : translations.draft}
                </p>
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    | {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                  </time>
                )}
              </div>
            </div>
          </AppLink>
        ))}
        {!isLoading && posts.length === 0 && <p>{translations.noPosts}</p>}
      </div>
    </div>
  );
}
