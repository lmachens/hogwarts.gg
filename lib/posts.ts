import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const getPost = async (
  supabase: SupabaseClient<Database>,
  postId: string,
): Promise<(Post & { username: string }) | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, user_id(username)')
    .eq('id', postId)
    .single();

  console.log(data);

  const { username } = data?.user_id as { username: string };

  if (error) {
    throw error;
  } else if (!data) {
    return null;
  }

  return {
    ...data,
    username,
  } as Post & { username: string };
};

export const getPosts = async (
  supabase: SupabaseClient<Database>,
): Promise<(Post & { username: string })[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, user_id(username)')
    .order('published_at', { ascending: false });

  if (error) {
    throw error;
  } else if (!data) {
    return [];
  }

  return data.map((post) => {
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
