import createClient from '#/lib/supabase-server';
import { IconArrowNarrowRight } from '@tabler/icons';
import { format, formatDistance } from 'date-fns';
import Link from 'next/link';

export default async function Page() {
  const supabase = createClient();

  const result = await supabase.from('posts').select();
  const posts = result.data ?? [];

  return (
    <>
      <div className="px-6 py-16 border-b border-gray-800">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold lg:text-4xl">Blog</h1>
          <h2 className="mt-6 text-gray-300">
            The latest news about Hogwarts Legacy and Hogwarts.gg
          </h2>
        </div>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="hover:bg-gray-800 transition-colors border-b border-gray-800"
        >
          <div className="container mx-auto max-w-3xl py-8 grid gap-2">
            <Link href={`/blog/${post.id}`}>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </Link>
            {!post.published && <p className="text-sm text-slate-600">Draft</p>}
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
            <p dangerouslySetInnerHTML={{ __html: post.short! }} />
            <Link
              href={`/blog/${post.id}`}
              className="flex text-sky-400 hover:underline"
            >
              Read More <IconArrowNarrowRight />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
