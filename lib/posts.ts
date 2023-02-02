import supabase from '#/lib/supabase-browser';
import { ok } from 'assert';
import type { Database } from './database.types';
import type { User } from './users';

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const { data: post, error } = await supabase
    .from('posts')
    .select(
      '*, user:users(username), posts(id, language, slug), parent:group_id(id, language, slug)',
    )
    .eq('slug', slug)
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
      post.parent as { id: number; language: string; slug: string },
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
      '*, user:users(username), posts(id, language, slug), parent:group_id(id, language, slug)',
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
      post.parent as { id: number; language: string; slug: string },
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
}: { language?: string } = {}): Promise<Post[]> => {
  const request = supabase
    .from('posts')
    .select('*, user:users(username), posts(id, language, slug)')
    .order('published_at', { ascending: false });
  if (language) {
    request.eq('language', language);
  }
  const { data: posts, error } = await request;

  if (error) {
    throw error;
  }

  if (!posts) {
    return [];
  }

  return posts.map((post) => {
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
  }[];
};
