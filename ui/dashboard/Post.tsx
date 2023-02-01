'use client';

import { usePost } from '#/lib/hooks/use-post';
import type { Translations } from '#/lib/i18n/types';
import { notFound } from 'next/navigation';
import PostForm from './PostForm';

export default function Post({
  id,
  translations,
}: {
  id: string;
  translations: Translations;
}) {
  const { data: post, isLoading } = usePost(id);
  if (isLoading) {
    return <></>;
  }

  if (!post) {
    notFound();
  }

  return <PostForm translations={translations} post={post} />;
}
