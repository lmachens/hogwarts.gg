import { getPost } from '#/lib/posts';
import createClient from '#/lib/supabase-server';
import PostForm from '#/ui/dashboard/PostForm';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = createClient();

  const post = await getPost(supabase, params.id);

  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
