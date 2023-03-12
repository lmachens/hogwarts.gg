'use client';
import CanvasMarker from '#/lib/canvas-marker';
import useDidUpdate from '#/lib/hooks/use-did-update';
import { getNodeType } from '#/lib/node-types';
import type { Node } from '#/lib/nodes';
import { createNodeTooltip } from '#/lib/tooltips';
import { useEffect, useState } from 'react';
import { useMap } from './Map';

export type MarkerProps = {
  node: Node;
  discovered?: boolean;
  selected?: boolean;
  onClick: () => void;
};

function Marker({ node, discovered, selected, onClick }: MarkerProps) {
  const map = useMap();
  const [marker, setMarker] = useState<CanvasMarker | null>(null);

  const nodeType = getNodeType(node.type);
  const src = (discovered && nodeType.discoveredIcon) || nodeType.icon;
  const latLng = [node.y, node.x] as [number, number];

  const tooltip = createNodeTooltip(node, discovered);

  useEffect(() => {
    if (!map.getPanes().mapPane) {
      return;
    }
    const marker = new CanvasMarker(latLng, {
      radius: 15,
      src,
    });
    marker.addTo(map);
    setMarker(marker);
    marker.bringToBack();
    marker.on('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.originalEvent.propagatedFromMarker = true;
      onClick();
    });
    return () => {
      setMarker(null);
      marker.removeFrom(map);
    };
  }, [map]);

  useDidUpdate(() => {
    if (!marker) {
      return;
    }
    marker.setLatLng(latLng);
  }, [latLng, marker]);

  useDidUpdate(() => {
    if (!marker) {
      return;
    }
    marker.setSrc(src);
  }, [marker, src]);

  useEffect(() => {
    if (!marker || !selected) {
      return;
    }
    marker.setHighlighted(selected);
    map.panTo(marker.getLatLng());
    marker.bringToFront();
    return () => {
      marker.setHighlighted(false);
    };
  }, [marker, selected]);

  useDidUpdate(() => {
    if (!marker || !tooltip) {
      return;
    }

    marker.bindTooltip(tooltip, {
      direction: 'top',
      offset: [0, -8],
      opacity: 1,
    });

    return () => {
      marker.unbindTooltip();
    };
  }, [tooltip, marker]);

  return <></>;
}

export default Marker;
