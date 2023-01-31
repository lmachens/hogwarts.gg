import useSWR from 'swr';
import { getPosts } from '../posts';

export function usePosts() {
  return useSWR('posts', getPosts);
}
