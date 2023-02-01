'use client';

import { useNodes } from '#/lib/hooks/use-nodes';
import { getNodeType } from '#/lib/node-types';
import Marker from './Marker';

export default function Nodes() {
  const { data: nodes = [] } = useNodes();
  return (
    <>
      {nodes!.map((node) => (
        <Marker
          key={node.id}
          src={getNodeType(node.type)!.icon}
          latLng={node.coordinates as [number, number]}
        />
      ))}
    </>
  );
}
