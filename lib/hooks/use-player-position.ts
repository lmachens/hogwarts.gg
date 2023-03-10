import type { MESSAGE_REALTIME } from '#/ui/sidebar/OverwolfStatus';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export let cachedPlayerPosition: MESSAGE_REALTIME['position'] | null = null;

export function useSetPlayerPosition() {
  const { mutate } = useSWRConfig();

  return useCallback(
    (playerPosition: MESSAGE_REALTIME['position']) => {
      cachedPlayerPosition = playerPosition;
      mutate('player-position');
    },
    [mutate],
  );
}

export function usePlayerPosition() {
  return useSWR('player-position', () => cachedPlayerPosition);
}
