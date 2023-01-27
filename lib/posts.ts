import type { SupabaseClient } from '@supabase/supabase-js';
import { ok } from 'assert';
import type { Database } from './database.types';
import type { User } from './users';

export const getPost = async (
  supabase: SupabaseClient<Database>,
  postId: string,
): Promise<Post | null> => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user:users(username)')
    .eq('id', postId)
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

export const getPosts = async (
  supabase: SupabaseClient<Database>,
): Promise<Post[]> => {
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

export type Post = {
  id: number;
  user_id: string;
  title: string | null;
  short: string | null;
  body: string | null;
  image: string | null;
  published: boolean | null;
  published_at: string | null;
  user: Pick<User, 'username'>;
};
