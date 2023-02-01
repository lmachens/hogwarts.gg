import useSWR from 'swr';
import { getPosts } from '../posts';

export function usePosts({ draft }: { draft?: boolean } = {}) {
  const result = useSWR('posts', () => getPosts());
  return {
    ...result,
    data: draft ? result.data : result.data?.filter((post) => post.published),
  };
}
