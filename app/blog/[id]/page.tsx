import createClient from '#/lib/supabase-server';
import { cn } from '#/lib/utils';
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

  const result = await supabase.from('posts').select().eq('id', +params.id);
  const post = result.data?.[0];
  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-lg">
          <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-gray-400 text-sm"
            >
              {format(new Date(post.published_at), 'MM/dd/yyyy')} (
              {formatDistance(new Date(post.published_at), new Date(), {
                addSuffix: true,
              })}
              )
            </time>
          )}
        </div>
      </div>

      <div className="container mx-auto py-8 grid gap-2">
        <div
          className={cn('post')}
          dangerouslySetInnerHTML={{ __html: post.body! }}
        />
        <Link href="/blog" className="flex text-sky-400 hover:underline">
          <IconArrowNarrowLeft /> Back to Blog
        </Link>
      </div>
    </>
  );
}
