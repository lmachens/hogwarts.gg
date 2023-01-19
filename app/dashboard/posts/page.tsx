import createClient from '#/lib/supabase-server';
import PostCreateButton from '#/ui/dashboard/PostCreateButton';
import Link from 'next/link';

export default async function Page() {
  const supabase = createClient();

  const result = await supabase.from('posts').select();
  const posts = result.data ?? [];

  return (
    <div className="space-y-2">
      <h1 className="text-xl">Posts</h1>
      <PostCreateButton />
      <div className="">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/dashboard/posts/${post.id}`}
            className="block p-4"
          >
            {post.title ?? 'Draft'}
          </Link>
        ))}
        {posts.length === 0 && <p>No posts created</p>}
      </div>
    </div>
  );
}
