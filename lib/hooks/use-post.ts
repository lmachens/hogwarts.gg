import useSWR from 'swr';
import { getPostById, getPostBySlug } from '../posts';

export function usePostBySlug(slug: string) {
  return useSWR(`posts/slugs/${slug}`, () =>
    getPostBySlug(slug, { published: true }),
  );
}

export function usePostById(id: string) {
  return useSWR(`posts/${id}`, () => getPostById(id));
}
