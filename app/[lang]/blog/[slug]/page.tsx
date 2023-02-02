import { loadDictionary } from '#/lib/i18n/settings';
import { getPostBySlug, getPosts } from '#/lib/posts';
import Post from '#/ui/Post';
import SWRFallback from '#/ui/SWRFallback';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) {
  const { post: translations } = await loadDictionary(lang);

  const post = await getPostBySlug(slug, { published: true });
  if (!post) {
    notFound();
  }
  if (post.language !== lang) {
    const correctPost = post.posts.find(
      (post) => post.language === lang && post.published,
    );
    if (correctPost?.slug) {
      redirect(`/${lang}/blog/${correctPost.slug}`);
    }
  }

  return (
    <SWRFallback fallback={{ [`posts/slugs/${slug}`]: post }}>
      <Post slug={slug} translations={translations} />
    </SWRFallback>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const publishedPosts = posts.filter((post) => post.published && post.slug);
  return publishedPosts.map((post) => ({
    lang: post.language,
    slug: post.slug!,
  }));
}
