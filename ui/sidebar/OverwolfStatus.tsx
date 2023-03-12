'use client';

import { useSetPlayerPosition } from '#/lib/hooks/use-player-position';
import { useSetSettings, useSettings } from '#/lib/hooks/use-settings';
import type { Translations } from '#/lib/i18n/types';
import { postMessage } from '#/lib/messages';
import { bodyToFile } from '#/lib/savefiles';
import { cn } from '#/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import SaveGame from './Savegame';
import SelectedNode from './SelectedNode';
import ShowOnMapButton from './ShowOnMapButton';
import SidebarSection from './SidebarSection';
import UploadSavegame from './UploadSavegame';

export type MESSAGE_STATUS = {
  type: string;
  toggleAppHotkeyBinding: string;
  savegame: {
    name: string;
    path: string;
    body: string;
    lastUpdate: string;
  } | null;
  overlay: boolean;
};

export type MESSAGE_REALTIME = {
  type: 'realtime';
  hlIsRunning: boolean;
  position: {
    x: number;
    y: number;
    z: number;
    pitch: number;
    roll: number;
    yaw: number;
  } | null;
};

export default function OverwolfStatus({
  translations,
}: {
  translations: Translations;
}) {
  const [status, setStatus] = useState<MESSAGE_STATUS | null>(null);
  const [realtime, setRealtime] = useState<MESSAGE_REALTIME | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const setPlayerPosition = useSetPlayerPosition();
  const { mutate } = useSWRConfig();

  const { data: settings } = useSettings();
  const setSettings = useSetSettings();
  const [savegame, setSavegame] = useState<File | null>(null);

  useEffect(() => {
    if (!status?.savegame) {
      return;
    }
    setSavegame(bodyToFile(status.savegame.body, status.savegame.name));
  }, [status?.savegame]);

  useEffect(() => {
    postMessage({
      type: 'href',
      href: `${pathname}?${searchParams.toString()}`,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      const data = message.data as unknown;
      if (
        !data ||
        typeof data !== 'object' ||
        !('type' in data) ||
        typeof data.type !== 'string'
      ) {
        return;
      }
      switch (data.type) {
        case 'status':
          {
            const status = data as MESSAGE_STATUS;
            setStatus(status);
          }
          break;
        case 'realtime':
          {
            const realtime = data as MESSAGE_REALTIME;
            if (realtime.position?.x) {
              setPlayerPosition(realtime.position);
            }
            setRealtime(realtime);
          }
          break;
        case 'authorized':
          {
            mutate('me');
          }
          break;
      }
    };
    window.addEventListener('message', handleMessage);

    postMessage({ type: 'status' });
  }, []);

  return (
    <>
      <SelectedNode />
      <SidebarSection
        title="Settings"
        tooltip="Customize your user experience!"
      >
        <label className="text-sm flex items-center gap-1">
          <input
            type="checkbox"
            checked={status?.overlay ?? true}
            onChange={() => postMessage({ type: 'overlay' })}
          />
          <span>{translations.activateOverlay}</span>
        </label>
        <p className="text-xs text-gray-500">
          {translations.activateOverlayDescription}
        </p>
        <p className="text-sm">
          {translations.showHideApp}
          <button
            className="ml-2 font-mono bg-gray-900 hover:bg-gray-800 border rounded py-0.5 px-1  w-fit"
            onClick={() => postMessage({ type: 'hotkey_binding' })}
          >
            {status?.toggleAppHotkeyBinding ?? translations.unknown}
          </button>
        </p>
        <label className="text-sm flex items-center gap-1 ">
          <input
            type="checkbox"
            checked={settings?.hideDiscoveredNodes ?? false}
            onChange={(event) =>
              setSettings({ hideDiscoveredNodes: event.target.checked })
            }
          />
          <span>Hide discovered nodes</span>
        </label>
      </SidebarSection>
      <SidebarSection
        title={translations.realtimeStatus}
        tooltip={translations.realtimeStatusToopltip}
      >
        <p className={'text-sm flex items-center'}>
          <StatusIndicator
            issue={!realtime?.hlIsRunning || !realtime.position}
          />
          {realtime?.hlIsRunning
            ? translations.hogwartsLegacyIsRunning
            : translations.hogwartsLegacyIsNotRunning}
        </p>

        <p className="text-sm text-gray-400">
          {realtime?.position
            ? `X: ${realtime?.position.x} Y: ${realtime?.position.y} Z: ${realtime?.position.z}`
            : translations.positionIsNotDetected}
        </p>
        <ShowOnMapButton
          disabled={!realtime?.position}
          translations={translations}
        />
      </SidebarSection>
      <SidebarSection
        title={translations.latestSavegame}
        tooltip={translations.latestSavegameDescription}
      >
        <SaveGame
          savegame={savegame}
          translations={translations}
          panToPlayer={false}
        />
        <UploadSavegame onUpload={setSavegame} />
      </SidebarSection>
    </>
  );
}

function StatusIndicator({ issue }: { issue: boolean }) {
  return (
    <span
      className={cn('inline-block w-3 h-3 mr-2 rounded-xl bg-green-500', {
        'bg-orange-500': issue,
      })}
    />
  );
}
