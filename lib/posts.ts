import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const getPost = async (
  supabase: SupabaseClient<Database>,
  postId: string,
): Promise<(Post & { username: string }) | null> => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user_id(username)')
    .eq('id', postId)
    .maybeSingle();

  const { username } = post?.user_id as { username: string };

  if (error) {
    throw error;
  }

  if (!post) {
    return null;
  }

  return {
    ...post,
    username,
  } as Post & { username: string };
};

export const getPosts = async (
  supabase: SupabaseClient<Database>,
): Promise<(Post & { username: string })[]> => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user_id(username)');

  if (error) {
    throw error;
  }

  if (!posts) {
    return [];
  }

  return posts.map((post) => {
    const { username } = post.user_id as { username: string };
    return {
      ...post,
      username,
    } as Post & { username: string };
  });
};

export type Post = {
  id: number;
  user_id: string;
  title: string;
  short: string;
  body: string;
  image: string;
  published: boolean;
  published_at: string;
};
