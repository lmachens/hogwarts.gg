import useSWR from 'swr';
import { getUser } from '../users';

export function useUser(id: string) {
  return useSWR(`users/${id}`, () => getUser(id));
}
