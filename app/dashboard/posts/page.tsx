import createClient from '#/lib/supabase-server';
import PostCreateButton from '#/ui/dashboard/PostCreateButton';
import PostHTML from '#/ui/PostHTML';
import { format, formatDistance } from 'date-fns';
import Link from 'next/link';

export default async function Page() {
  const supabase = createClient();

  const result = await supabase.from('posts').select('*, user_id(username)');
  const posts = result.data ?? [];

  return (
    <div className="space-y-2">
      <h1 className="text-xl">Posts</h1>
      <PostCreateButton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts
          .sort((a, b) => (a.published_at! > b.published_at! ? -1 : 1))
          .map((post) => (
            <Link
              key={post.id}
              href={`/dashboard/posts/${post.id}`}
              className="block py-4"
            >
              <div className="flex flex-col h-full rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 transition-colors">
                <h2 className="text-lg">{post.title}</h2>
                <PostHTML className="h-32" html={post.short!} />
                <p>
                  Writed by <span className="text-brand-500">{post.user_id!.username ? post.user_id!.username : 'Harry Potter' }</span>
                </p>
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
            </Link>
          ))}
        {posts.length === 0 && <p>No posts created</p>}
      </div>
    </div>
  );
}
