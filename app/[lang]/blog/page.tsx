import { getPosts } from '#/lib/posts';
import Posts from '#/ui/Posts';
import SWRFallback from '#/ui/SWRFallback';

export default async function Page() {
  const posts = await getPosts();

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
      <SWRFallback fallback={{ posts }}>
        <Posts />
      </SWRFallback>
    </>
  );
}
