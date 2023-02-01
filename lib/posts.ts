import supabase from '#/lib/supabase-browser';
import { ok } from 'assert';
import type { Database } from './database.types';
import type { User } from './users';

export const getPost = async (postId: string): Promise<Post | null> => {
  const id = +postId;
  if (Number.isNaN(id)) {
    return null;
  }
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user:users(username)')
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

  return {
    ...post,
    user: post.user,
  };
};

export const getPosts = async (): Promise<Post[]> => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:users(username)')
    .order('published_at', { ascending: false });

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

    return {
      ...post,
      user: post.user,
    };
  });
};

export type Post = Database['public']['Tables']['posts']['Row'] & {
  user: Pick<User, 'username'>;
};
