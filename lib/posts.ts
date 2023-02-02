import supabase from '#/lib/supabase-browser';
import { ok } from 'assert';
import type { Database } from './database.types';
import { fallbackLang } from './i18n/settings';
import type { User } from './users';

export const getPostBySlug = async (
  slug: string,
  { published }: { published?: boolean } = {},
): Promise<Post | null> => {
  const match: Record<string, unknown> = {
    slug,
  };
  if (published) {
    match.published = published;
  }

  const request = supabase
    .from('posts')
    .select(
      '*, user:users(username), posts(id, language, slug, published), parent:group_id(id, language, slug)',
    )
    .match(match)
    .maybeSingle();
  const { data: post, error } = await request;
  if (error) {
    throw error;
  }

  if (!post) {
    return null;
  }

  // It will never be an array because the `users.id` is unique
  ok(!Array.isArray(post.user));
  // The author should exists
  ok(post.user !== null);
  ok(Array.isArray(post.posts));
  if (post.parent) {
    post.posts.push(
      post.parent as {
        id: number;
        language: string;
        slug: string;
        published: boolean;
      },
    );
  }
  return {
    ...post,
    user: post.user,
    posts: post.posts,
  };
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  const id = +postId;
  if (Number.isNaN(id)) {
    return null;
  }
  const { data: post, error } = await supabase
    .from('posts')
    .select(
      '*, user:users(username), posts(id, language, slug, published), parent:group_id(id, language, slug)',
    )
    .eq('id', id)
    .maybeSingle();
  if (error) {
    throw error;
  }

  if (!post) {
    return null;
  }

  // It will never be an array because the `users.id` is unique
  ok(!Array.isArray(post.user));
  // The author should exists
  ok(post.user !== null);
  ok(Array.isArray(post.posts));
  if (post.parent) {
    post.posts.push(
      post.parent as {
        id: number;
        language: string;
        slug: string;
        published: boolean;
      },
    );
  }

  return {
    ...post,
    user: post.user,
    posts: post.posts,
  };
};

export const getPosts = async ({
  language,
  published,
}: { language?: string; published?: boolean } = {}): Promise<Post[]> => {
  const filterByLanguage = language && language !== fallbackLang;
  const request = supabase
    .from('posts')
    .select(
      '*, user:users(username), posts(id, language, slug, published), parent:group_id(id, language, slug)',
    )
    .order('published_at', { ascending: false });
  if (filterByLanguage) {
    request.in('language', [language, fallbackLang]);
  }
  if (published) {
    request.eq('published', published);
  }
  const { data: posts, error } = await request;

  if (error) {
    throw error;
  }

  if (!posts) {
    return [];
  }

  let filteredPosts;
  if (filterByLanguage) {
    // Remove fallback posts if language post exists
    filteredPosts = posts.filter((post) => {
      return post.group_id || !posts.some((p) => p.group_id === post.id);
    });
  } else {
    filteredPosts = posts;
  }

  return filteredPosts.map((post) => {
    // It will never be an array because the `users.id` is unique
    ok(!Array.isArray(post.user));
    // The author should exists
    ok(post.user !== null);
    ok(Array.isArray(post.posts));

    return {
      ...post,
      user: post.user,
      posts: post.posts,
    };
  });
};

export type Post = Database['public']['Tables']['posts']['Row'] & {
  user: Pick<User, 'username'>;
  posts: {
    id: number;
    language: string;
    slug: string | null;
    published: boolean;
  }[];
};
