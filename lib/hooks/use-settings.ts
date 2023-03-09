import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export type Settings = {
  hideDiscoveredNodes: boolean;
};

export let cachedSettings: Settings = {
  hideDiscoveredNodes: false,
};

try {
  const item = localStorage.getItem('settings');
  if (item) {
    cachedSettings = JSON.parse(item);
  }
} catch (error) {
  //
}

export function useSetSettings() {
  const { mutate } = useSWRConfig();

  return useCallback(
    (settings: Partial<Settings>) => {
      cachedSettings = {
        ...cachedSettings,
        ...settings,
      };
      mutate('settings');
      localStorage.setItem('settings', JSON.stringify(cachedSettings));
    },
    [mutate],
  );
}

export function useSettings() {
  return useSWR('settings', () => cachedSettings);
}
