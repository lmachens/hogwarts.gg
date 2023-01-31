import { languages } from '#/lib/i18n/settings';
import { getPost, getPosts } from '#/lib/posts';
import Post from '#/ui/Post';
import SWRFallback from '#/ui/SWRFallback';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <SWRFallback fallback={{ [`posts/${id}`]: post }}>
      <Post id={id} />
    </SWRFallback>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.flatMap((post) =>
    languages.map((lang) => ({ lang, id: post.id.toString() })),
  );
}
