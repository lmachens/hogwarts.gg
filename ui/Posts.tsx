'use client';

import { usePosts } from '#/lib/hooks/use-posts';
import { IconArrowNarrowRight } from '@tabler/icons';
import { format } from 'date-fns';
import Link from 'next/link';
import PostHTML from './PostHTML';

export default function Posts() {
  const { data: posts = [] } = usePosts();

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="hover:bg-gray-900 transition-colors border-b border-gray-800"
        >
          <div className="container mx-auto md:px-0 px-2 max-w-3xl py-8 grid gap-2">
            <Link href={`/blog/${post.id}`}>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </Link>
            {!post.published && <p className="text-sm text-slate-600">Draft</p>}
            <div className="flex">
              <p className="text-gray-400 text-sm">
                Writed by{' '}
                <span className="font-semibold">{post.user.username}</span>{' '}
                {' - '}
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                  </time>
                )}
              </p>
            </div>
            <PostHTML html={post.short!} />
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
