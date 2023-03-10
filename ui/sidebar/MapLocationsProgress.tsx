import type { Translations } from '#/lib/i18n/types';
import type { SavefilePlayer } from '#/lib/savefiles';

export default function MapLocationsProgress({
  translations,
  mapLocations,
}: {
  translations: Translations;
  mapLocations: SavefilePlayer['locations'];
}) {
  return (
    <>
      <h5 className="font-semibold">Progress</h5>
      <p>
        {translations.chests}:{' '}
        <span className="text-discovered">
          {mapLocations.chests.values.length}
        </span>
        /{mapLocations.chests.max}
      </p>
      <p>
        {translations.collections}:{' '}
        <span className="text-discovered">
          {mapLocations.collections.values.length}
        </span>
        /{mapLocations.collections.max}
      </p>
      <p>
        Demiguise Status:{' '}
        <span className="text-discovered">
          {mapLocations.demiguiseStatues.values.length}
        </span>
        /{mapLocations.demiguiseStatues.max}
      </p>
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
      <p>
        Merlin Trials:{' '}
        <span className="text-discovered">
          {mapLocations.sphinxPuzzles.values.length}
        </span>
        /{mapLocations.sphinxPuzzles.max}
      </p>
    </>
  );
}
