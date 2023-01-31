import useSWR from 'swr';
import { getPost } from '../posts';

export function usePost(id: string) {
  return useSWR(`posts/${id}`, () => getPost(id));
}
