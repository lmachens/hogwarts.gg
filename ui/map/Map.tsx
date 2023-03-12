'use client';

import { useSetSelectedNode } from '#/lib/hooks/use-selected-node';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type MapProps = {
  center: leaflet.LatLngExpression;
  crs?: leaflet.CRS;
  children?: ReactNode;
  bounds: leaflet.LatLngBoundsExpression;
};
const Map = ({
  center,
  children,
  crs = leaflet.CRS.Simple,
  bounds,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const setSelectedNode = useSetSelectedNode();

  useEffect(() => {
    const map = leaflet.map(containerRef.current!, {
      zoomControl: false,
      attributionControl: false,
      minZoom: -100,
      maxZoom: 100,
      crs,
    });
    map.fitBounds(bounds);
    map.on('click', (event) => {
      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !event.originalEvent.propagatedFromMarker
      ) {
        setSelectedNode(null);
      }
    });
    map.on('contextmenu', () => {
      // Do nothing
    });
    setMap(map);

    return () => {
      map.remove();
    };
  }, [center, crs, bounds]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-full w-full z-0 outline-none"
        style={{ backgroundColor: 'transparent' }}
      />
      {map && <MapContext.Provider value={map}>{children}</MapContext.Provider>}
    </>
  );
};

export default Map;

const MapContext = createContext<leaflet.Map>({} as unknown as leaflet.Map);

export const useMap = () => {
  return useContext(MapContext);
};
