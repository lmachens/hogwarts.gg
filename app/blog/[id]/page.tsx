import { getPost } from '#/lib/posts';
import createClient from '#/lib/supabase-server';
import PostHTML from '#/ui/PostHTML';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { format, formatDistance } from 'date-fns';
import Link from 'next/link';
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

  return (
    <>
      <div className="container mx-auto px-6 pt-16 pb-8 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
          <PostHTML html={post.short!} />
          <p className="text-gray-400 text-sm pt-2">
            Writed by <span className="font-semibold">{post.username}</span>
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
          <IconArrowNarrowLeft /> Back to Blog
        </Link>
      </div>
    </>
  );
}
