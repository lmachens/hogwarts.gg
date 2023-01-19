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

  const result = await supabase.from('posts').select().eq('id', +params.id);
  const post = result.data?.[0];
  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
