'use client';

import { usePostById } from '#/lib/hooks/use-post';
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
  const { data: post, isLoading } = usePostById(id);
  if (!post && isLoading) {
    return <></>;
  }

  if (!post) {
    notFound();
  }

  return <PostForm translations={translations} post={post} />;
}
