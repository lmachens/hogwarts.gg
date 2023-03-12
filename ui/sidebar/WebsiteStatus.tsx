'use client';

import { useSetSettings, useSettings } from '#/lib/hooks/use-settings';
import type { Translations } from '#/lib/i18n/types';
import { useState } from 'react';
import Input from '../Input';
import SaveGame from './Savegame';
import SelectedNode from './SelectedNode';
import ShowOnMapButton from './ShowOnMapButton';
import SidebarSection from './SidebarSection';
import UploadSavegame from './UploadSavegame';

export default function WebsiteStatus({
  translations,
}: {
  translations: Translations;
}) {
  const [savegame, setSavegame] = useState<File | null>(null);
  const { data: settings } = useSettings();
  const setSettings = useSetSettings();

  return (
    <>
      <SelectedNode />
      <SidebarSection
        title="Settings"
        tooltip="Customize your user experience!"
      >
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
        title={translations.latestSavegame}
        tooltip={translations.latestSavegameDescription}
      >
        <SaveGame savegame={savegame} translations={translations} panToPlayer />
        <ShowOnMapButton disabled={!savegame} translations={translations} />
        <p className="text-xs text-gray-500">
          Please upload your latest savefile to sync your profile and position
          on the map.
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
        <UploadSavegame onUpload={setSavegame} />
      </SidebarSection>
    </>
  );
}
