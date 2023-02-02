'use client';

import useLanguage from '#/lib/hooks/use-language';
import { usePostBySlug } from '#/lib/hooks/use-post';
import { labels } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { format, formatDistance } from 'date-fns';
import { notFound, redirect } from 'next/navigation';
import AppLink from './AppLink';
import PostHTML from './PostHTML';

export default function Post({
  slug,
  translations,
}: {
  slug: string;
  translations: Translations;
}) {
  const language = useLanguage();
  const { data: post, isLoading } = usePostBySlug(slug);
  if (!post && isLoading) {
    return <></>;
  }
  if (!post) {
    notFound();
  }
  if (post.language !== language) {
    const correctPost = post.posts.find(
      (post) => post.language === language && post.published,
    );
    if (correctPost?.slug) {
      redirect(`/${language}/blog/${correctPost.slug}`);
    }
  }

  return (
    <>
      <div className="container mx-auto px-6 pt-16 pb-8 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
          <PostHTML html={post.short!} />
          <div className="flex gap-2 justify-center text-gray-400 text-sm pt-2">
            <p>{labels[post.language]}</p>|
            <p>
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
      </div>

      <div className="container mx-auto max-w-4xl px-2 md:px-0 py-8 grid gap-2">
        <PostHTML html={post.body!} />
        <AppLink
          href="/blog"
          className="flex py-4 text-sky-400 hover:underline"
        >
          <IconArrowNarrowLeft /> {translations.backToBlog}
        </AppLink>
      </div>
    </>
  );
}
