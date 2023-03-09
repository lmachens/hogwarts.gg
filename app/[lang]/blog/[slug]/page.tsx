import { loadDictionary } from '#/lib/i18n/settings';
import { getPostBySlug, getPosts } from '#/lib/posts';
import { getURL, replaceHTML } from '#/lib/utils';
import Post from '#/ui/Post';
import SWRFallback from '#/ui/SWRFallback';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(slug, { published: true });

  if (!post) {
    notFound();
  }

  const alternativeLangs = post.posts.reduce((acc, post) => {
    acc[post.language] = getURL(`/${post.language}/blog/${post.slug}`);
    return acc;
  }, {} as Record<string, string>);

  return {
    title: post.title,
    description: replaceHTML(post.short!),
    openGraph: {
      title: post.title!,
      description: replaceHTML(post.short!),
      type: 'article',
      authors: [post.user.username],
      url: getURL(`/${post.language}/blog/${post.slug}`),
      images: getURL(post.image || 'assets/social.jpg'),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title!,
      description: replaceHTML(post.short!),
      images: getURL(post.image || 'assets/social.jpg'),
    },
    alternates: {
      canonical: getURL(`/${lang}/blog/${slug}`),
      languages: alternativeLangs,
    },
  };
}

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
