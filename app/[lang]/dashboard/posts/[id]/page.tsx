'use client';

import { usePost } from '#/lib/hooks/use-post';
import PostForm from '#/ui/dashboard/PostForm';
import { notFound } from 'next/navigation';

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { data: post, isLoading } = usePost(id);
  if (isLoading) {
    return <></>;
  }
  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
