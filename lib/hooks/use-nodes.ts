import useSWR from 'swr';
import { getNodes } from '../nodes';

export function useNodes() {
  return useSWR('nodes', getNodes);
}
