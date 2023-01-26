'use client';
import CanvasMarker from '#/lib/canvas-marker';
import useDidUpdate from '#/lib/hooks/use-did-update';
import type leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from './Map';

export type MarkerProps = {
  latLng: leaflet.LatLngExpression;
  src: string;
  title?: string;
  highlight?: boolean;
  draggable?: boolean;
  onLatLngChange?: (latLng: leaflet.LatLngExpression) => void;
};

function Marker({
  latLng,
  src,
  title,
  highlight,
  draggable,
  onLatLngChange,
}: MarkerProps) {
  const map = useMap();
  const [marker, setMarker] = useState<CanvasMarker | null>(null);

  useEffect(() => {
    if (!map.getPanes().mapPane) {
      return;
    }
    const marker = new CanvasMarker(latLng, {
      radius: 15,
      src,
      highlight,
    });
    marker.addTo(map);
    setMarker(marker);

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
  }, [latLng, src]);

  useDidUpdate(() => {
    if (!marker) {
      return;
    }
    if (title) {
      marker.bindTooltip(title, {
        direction: 'top',
        offset: [0, -8],
        permanent: draggable,
      });
    } else {
      marker.unbindTooltip();
    }
  }, [title, marker]);

  useDidUpdate(() => {
    if (!draggable || !marker) {
      return;
    }
    const handleMapMouseMove = (event: leaflet.LeafletMouseEvent) => {
      onLatLngChange?.([event.latlng.lat, event.latlng.lng]);
    };
    const handleMouseDown = () => {
      map.dragging.disable();
      map.on('mousemove', handleMapMouseMove);
      map.once('mouseup', () => {
        map.off('mousemove', handleMapMouseMove);
        map.dragging.enable();
      });
    };
    marker.on('mousedown', handleMouseDown);
    return () => {
      marker.off('mousedown', handleMouseDown);
      map.off('mousemove', handleMapMouseMove);
    };
  }, [draggable, marker]);

  return <></>;
}

export default Marker;
