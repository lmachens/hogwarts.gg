'use client';

import useLanguage from '#/lib/hooks/use-language';
import { useSetPlayerPosition } from '#/lib/hooks/use-player-position';
import {
  useSavegamePlayer,
  useSetSavegamePlayer,
} from '#/lib/hooks/use-savegame-player';
import { getDateLocale } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import { readSavegame } from '#/lib/savefiles';
import { formatDistance } from 'date-fns';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import MapLocationsProgress from './MapLocationsProgress';
import StatusIndicator from './StatusIndicator';

export default function SaveGame({
  savegame,
  translations,
  panToPlayer,
}: {
  savegame: File | null;
  translations: Translations;
  panToPlayer: boolean;
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [timeDistance, setTimeDistance] = useState('');
  const language = useLanguage();
  const setSavegamePlayer = useSetSavegamePlayer();
  const { data: player } = useSavegamePlayer();
  const setPlayerPosition = useSetPlayerPosition();

  useEffect(() => {
    if (!savegame) {
      return;
    }
    (async () => {
      try {
        setErrorMessage('');

        const player = await readSavegame(savegame);
        setSavegamePlayer(player);
        if (panToPlayer) {
          setPlayerPosition(player.position);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Something went wrong');
        }
      }
    })();
  }, [savegame, setSavegamePlayer]);

  useEffect(() => {
    if (!savegame) {
      return;
    }

    const intervalId = setInterval(async () => {
      const locale = await getDateLocale(language);
      setTimeDistance(
        formatDistance(new Date(savegame.lastModified), new Date(), {
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
        <StatusIndicator issue={!savegame} />{' '}
        {savegame?.name || errorMessage || 'No savegame loaded'}{' '}
      </p>

      {savegame && player && (
        <div className="text-sm">
          <p>
            <b>
              {player.firstName} {player.lastName}
            </b>{' '}
            | <b>{player.houseId}</b> | {translations.year} <b>{player.year}</b>
          </p>
          <p className="text-sm text-gray-400">
            <time dateTime={new Date(savegame.lastModified).toISOString()}>
              {timeDistance}
            </time>
          </p>
          <MapLocationsProgress
            translations={translations}
            mapLocations={player.locations}
          />
        </div>
      )}
    </div>
  );
}
