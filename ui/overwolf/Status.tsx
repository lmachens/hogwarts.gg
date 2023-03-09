'use client';

import { dispatchEvent } from '#/lib/hooks/use-event-listener';
import useLanguage from '#/lib/hooks/use-language';
import { useSetPlayerPosition } from '#/lib/hooks/use-player-position';
import {
  useSavegamePlayer,
  useSetSavegamePlayer,
} from '#/lib/hooks/use-savegame-player';
import { useSetSettings, useSettings } from '#/lib/hooks/use-settings';
import { getDateLocale } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import { postMessage } from '#/lib/messages';
import type { SavefilePlayer } from '#/lib/savefiles';
import { bodyToFile, readSavegame } from '#/lib/savefiles';
import { cn } from '#/lib/utils';
import { IconHelp } from '@tabler/icons-react';
import { formatDistance } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import Button from '../Button';
import Stack from '../Stack';
import Tooltip from '../Tooltip';

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

export default function Status({
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
  const router = useRouter();
  const lang = useLanguage();
  const { data: settings } = useSettings();
  const setSettings = useSetSettings();

  const savegame = status?.savegame || null;

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
    <Stack className="p-2 h-full text-left">
      <p className="text-orange-500 text-sm">{translations.inDevelopment}</p>
      <Section title="Settings" tooltip="Customize your user experience!">
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
      </Section>
      <Section
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
        <Button
          size="xs"
          className="mt-1"
          disabled={!realtime?.position}
          onClick={() => {
            if (!pathname?.includes('/map')) {
              const href = `/${lang}/map/hogwarts`;
              router.prefetch(href);
              router.replace(href);
            } else {
              dispatchEvent('show-on-map');
            }
          }}
        >
          {translations.showOnMap}
        </Button>
      </Section>
      <Section
        title={translations.latestSavegame}
        tooltip={translations.latestSavegameDescription}
      >
        <SaveGame savegame={savegame} translations={translations} />
      </Section>
    </Stack>
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

function Section({
  title,
  tooltip,
  children,
}: {
  title: string;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-800 rounded p-1">
      <Tooltip label={<p className="text-sm">{tooltip}</p>}>
        <h4 className="text-md flex gap-1 items-center">
          {title} <IconHelp size={16} />
        </h4>
      </Tooltip>
      {children}
    </section>
  );
}

function SaveGame({
  savegame,
  translations,
}: {
  savegame: MESSAGE_STATUS['savegame'];
  translations: Translations;
}) {
  const [timeDistance, setTimeDistance] = useState('');
  const language = useLanguage();
  const setSavegamePlayer = useSetSavegamePlayer();
  const { data: player } = useSavegamePlayer();

  useEffect(() => {
    if (!savegame) {
      return;
    }
    (async () => {
      try {
        const file = bodyToFile(savegame.body);
        const player = await readSavegame(file);
        setSavegamePlayer(player);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [savegame]);

  useEffect(() => {
    if (!savegame) {
      return;
    }

    const intervalId = setInterval(async () => {
      const locale = await getDateLocale(language);
      setTimeDistance(
        formatDistance(new Date(savegame.lastUpdate), new Date(), {
          addSuffix: true,
          includeSeconds: true,
          locale: locale,
        }),
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [savegame, language]);

  return (
    <div className={'flex flex-col text-left w-full'}>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js" />
      <p className="flex items-center text-sm">
        <StatusIndicator issue={!savegame} /> {savegame?.name}{' '}
      </p>
      <div className="text-sm">
        {savegame && player ? (
          <>
            <p>
              <b>
                {player.firstName} {player.lastName}
              </b>{' '}
              | <b>{player.houseId}</b> | {translations.year}{' '}
              <b>{player.year}</b>
            </p>
            <p className="text-sm text-gray-400">
              <time dateTime={savegame.lastUpdate}>{timeDistance}</time>
            </p>
            <MapLocationsProgress
              title="Overland"
              translations={translations}
              mapLocations={player.locations.overland}
            />
            <MapLocationsProgress
              title={translations.hogwarts}
              translations={translations}
              mapLocations={player.locations.hogwarts}
            />
            <MapLocationsProgress
              title="Hogsmeade"
              translations={translations}
              mapLocations={player.locations.hogsmeade}
            />
          </>
        ) : (
          <>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </>
        )}
      </div>
    </div>
  );
}

function MapLocationsProgress({
  title,
  translations,
  mapLocations,
}: {
  title: string;
  translations: Translations;
  mapLocations:
    | SavefilePlayer['locations']['overland']
    | SavefilePlayer['locations']['hogwarts']
    | SavefilePlayer['locations']['hogsmeade'];
}) {
  return (
    <>
      <h5 className="font-semibold">{title}</h5>
      <p>
        {translations.chests}:{' '}
        <span className="text-discovered">
          {mapLocations.chests.values.length}
        </span>
        /{mapLocations.chests.max}
      </p>
      {mapLocations.collections.max > 0 && (
        <p>
          {translations.collections}:{' '}
          <span className="text-discovered">
            {mapLocations.collections.values.length}
          </span>
          /{mapLocations.collections.max}
        </p>
      )}
      <p>
        Field Guide Pages:{' '}
        <span className="text-discovered">
          {mapLocations.fieldGuidePages.values.length}
        </span>
        /{mapLocations.fieldGuidePages.max}
      </p>
      <p>
        {translations.fastTravel}:{' '}
        <span className="text-discovered">
          {mapLocations.fastTravels.values.length}
        </span>
        /{mapLocations.fastTravels.max}
      </p>
      {'sphinxPuzzles' in mapLocations && (
        <p>
          Merlin Trials:{' '}
          <span className="text-discovered">
            {mapLocations.sphinxPuzzles.values.length}
          </span>
          /{mapLocations.sphinxPuzzles.max}
        </p>
      )}
      {'demiguiseStatues' in mapLocations && (
        <p>
          Demiguise Status:{' '}
          <span className="text-discovered">
            {mapLocations.demiguiseStatues.values.length}
          </span>
          /{mapLocations.demiguiseStatues.max}
        </p>
      )}
    </>
  );
}
