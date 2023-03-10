'use client';

import type { Translations } from '#/lib/i18n/types';
import { IconCloudUpload } from '@tabler/icons-react';
import Script from 'next/script';
import { useState } from 'react';
import Input from '../Input';
import SaveGame from './Savegame';
import ShowOnMapButton from './ShowOnMapButton';
import SidebarSection from './SidebarSection';

export default function WebsiteStatus({
  translations,
}: {
  translations: Translations;
}) {
  const [savegame, setSavegame] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-xs text-gray-500">
        Please upload your latest savefile to sync your profile and position on
        the map.
      </p>
      <Input
        label="Windows folder path (Steam)"
        disabled
        value="%localappdata%\Hogwarts Legacy\Saved\SaveGames"
      />
      <Input
        label="Windows folder path (Epic Games)"
        disabled
        value="%localappdata%\HogwartsLegacy\Saved\SaveGames"
      />
      <label
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-900 hover:bg-gray-700"
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setSavegame(event.dataTransfer.files[0]);
          }
        }}
      >
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js" />
        <div className="flex flex-col gap-2 items-center justify-center pt-5 pb-6">
          <IconCloudUpload size={40} />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            if (event.target.files?.[0]) {
              setSavegame(event.target.files[0]);
            }
          }}
        />
      </label>
      <SidebarSection
        title={translations.latestSavegame}
        tooltip={translations.latestSavegameDescription}
      >
        <SaveGame savegame={savegame} translations={translations} panToPlayer />
        <ShowOnMapButton disabled={!savegame} translations={translations} />
      </SidebarSection>
    </div>
  );
}
