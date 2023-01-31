'use client';

import { usePosts } from '#/lib/hooks/use-posts';
import PostCreateButton from '#/ui/dashboard/PostCreateButton';
import PostHTML from '#/ui/PostHTML';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Page() {
  const { data: posts = [], isLoading } = usePosts();
  return (
    <div className="space-y-2">
      <h1 className="text-xl">Posts</h1>
      <PostCreateButton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/dashboard/posts/${post.id}`}
            className="block py-4"
          >
            <div className="flex flex-col h-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors">
              <h2 className="text-lg">{post.title}</h2>
              <PostHTML className="h-32" html={post.short!} />
              <p>
                Writed by{' '}
                <span className="text-brand-500">{post.user.username}</span>
              </p>
              {post.published_at && (
                <time
                  dateTime={post.published_at}
                  className="text-gray-400 text-sm"
                >
                  {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                </time>
              )}
            </div>
          </Link>
        ))}
        {!isLoading && posts.length === 0 && <p>No posts created</p>}
      </div>
    </div>
  );
}
