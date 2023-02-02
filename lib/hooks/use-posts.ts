import useSWR from 'swr';
import { getPosts } from '../posts';

export function usePosts({
  draft,
  ...props
}: { draft?: boolean; language?: string } = {}) {
  const result = useSWR(`posts/${props.language || 'all'}`, () =>
    getPosts(props),
  );
  return {
    ...result,
    data: draft ? result.data : result.data?.filter((post) => post.published),
  };
}
