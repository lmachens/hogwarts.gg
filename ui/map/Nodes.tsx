'use client';

import { useNodes } from '#/lib/hooks/use-nodes';
import { useSavegamePlayer } from '#/lib/hooks/use-savegame-player';
import { getZRange } from '#/lib/map';
import type { Node } from '#/lib/nodes';
import { useMapStore } from '#/lib/store/map';
import Marker from './Marker';
import Text from './Text';

export default function Nodes({ lang }: { lang: string }) {
  const { data: nodes = [] } = useNodes({ language: lang });
  const { data: player } = useSavegamePlayer();
  const mapStore = useMapStore();

  const zRange = mapStore.hogwartsLevel && getZRange(mapStore.hogwartsLevel);

  function isDiscovered(node: Node) {
    if (!player) {
      return false;
    }
    if (
      node.type === 'fastTravelFireplaces' ||
      node.type === 'fastTravelSanctuaryHogwarts'
    ) {
      return (
        player.locations.overland.fastTravels.values.includes(node.id) ||
        player.locations.hogwarts.fastTravels.values.includes(node.id) ||
        player.locations.hogsmeade.fastTravels.values.includes(node.id)
      );
    }
    if (
      node.type === 'guardianLeviosa' ||
      node.type === 'accioPage' ||
      node.type === 'mothFrame'
    ) {
      return (
        player.locations.overland.collections.values.includes(node.id) ||
        player.locations.hogwarts.collections.values.includes(node.id) ||
        player.locations.hogsmeade.collections.values.includes(node.id)
      );
    }
    if (node.type === 'kio') {
      return (
        player.locations.overland.fieldGuidePages.values.includes(node.id) ||
        player.locations.hogwarts.fieldGuidePages.values.includes(node.id) ||
        player.locations.hogsmeade.fieldGuidePages.values.includes(node.id)
      );
    }
    if (node.type.includes('Chest')) {
      return (
        player.locations.overland.chests.values.includes(node.id) ||
        player.locations.hogwarts.chests.values.includes(node.id) ||
        player.locations.hogsmeade.chests.values.includes(node.id)
      );
    }
    if (node.type === 'sphinxPuzzle') {
      return player.locations.overland.sphinxPuzzles.values.includes(node.id);
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
        return <Marker key={node.id} node={node} discovered={discovered} />;
      })}
    </>
  );
}
