'use client';

import { useNodes } from '#/lib/hooks/use-nodes';
import { useSavegamePlayer } from '#/lib/hooks/use-savegame-player';
import { useSettings } from '#/lib/hooks/use-settings';
import { getZRange } from '#/lib/map';
import type { Node } from '#/lib/nodes';
import { useMapStore } from '#/lib/store/map';
import { Fragment } from 'react';
import Marker from './Marker';
import Text from './Text';

export default function Nodes({ lang }: { lang: string }) {
  const { data: nodes = [] } = useNodes({ language: lang });
  const { data: player } = useSavegamePlayer();
  const mapStore = useMapStore();
  const { data: settings } = useSettings();

  const zRange = mapStore.hogwartsLevel && getZRange(mapStore.hogwartsLevel);

  function isDiscovered(node: Node) {
    if (!player) {
      return false;
    }
    if (
      node.type === 'fastTravelFireplaces' ||
      node.type === 'fastTravelSanctuaryHogwarts'
    ) {
      return player.locations.fastTravels.values.includes(node.id);
    }
    if (
      node.type === 'guardianLeviosa' ||
      node.type === 'accioPage' ||
      node.type === 'mothFrame' ||
      node.type === 'incendioDragon'
    ) {
      return player.locations.collections.values.includes(node.id);
    }
    if (node.type === 'kio') {
      return player.locations.fieldGuidePages.values.includes(node.id);
    }
    if (node.type.includes('Chest')) {
      return player.locations.chests.values.includes(node.id);
    }
    if (node.type === 'sphinxPuzzle') {
      return player.locations.sphinxPuzzles.values.includes(node.id);
    }
    if (node.type === 'demiguise') {
      return player.locations.demiguiseStatues.values.includes(node.id);
    }
    return false;
  }
  const visibleNodes = nodes.filter((node) => {
    if (node.world !== 'hogwarts' || !zRange) {
      return true;
    }
    const [bottomZValue, topZValue] = zRange;
    return node.z >= bottomZValue && node.z < topZValue;
  });
  return (
    <>
      {visibleNodes.map((node) => {
        if (node.type === 'text') {
          return (
            <Text key={node.id} latLng={[node.y, node.x]}>
              {node.title!}
            </Text>
          );
        }
        const discovered = isDiscovered(node);
        if (discovered && settings?.hideDiscoveredNodes) {
          return <Fragment key={node.id} />;
        }
        return <Marker key={node.id} node={node} discovered={discovered} />;
      })}
    </>
  );
}
