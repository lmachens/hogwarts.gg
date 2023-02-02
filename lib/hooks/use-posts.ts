import useSWR from 'swr';
import { getPosts } from '../posts';

export function usePosts(
  props: { language?: string; published?: boolean } = {},
) {
  return useSWR(`posts/${props.language || 'all'}`, () => getPosts(props));
}
