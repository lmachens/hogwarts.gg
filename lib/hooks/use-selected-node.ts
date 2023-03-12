import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import type { Node } from '../nodes';

export let cachedNode: Node | null = null;

export function useSetSelectedNode() {
  const { mutate } = useSWRConfig();

  return useCallback(
    (node: Node | null) => {
      cachedNode = node;
      mutate('selected-node');
    },
    [mutate],
  );
}

export function useSelectedNode() {
  return useSWR('selected-node', () => cachedNode);
}
