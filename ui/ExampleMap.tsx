'use client';
import Map from '#/ui/Map';
import TileLayer, { BLANK_TILE } from '#/ui/TileLayer';
import type { Coords } from 'leaflet';
import leaflet from 'leaflet';
import type { ReactNode } from 'react';

const aeternumCRS = leaflet.extend({}, leaflet.CRS.Simple, {
  transformation: new leaflet.Transformation(1 / 16, 0, -1 / 16, 0),
});

function toThreeDigits(number: number): string {
  if (number < 10) {
    return `00${number}`;
  }
  if (number < 100) {
    return `0${number}`;
  }
  return `${number}`;
}

const getTileSize = () => {
  return { x: 1024, y: 1024 };
};
const getTileUrl = (coords: Coords) => {
  const zoom = 8 - coords.z - 1;
  const multiplicators = [1, 2, 4, 8, 16, 32, 64];
  const x = coords.x * multiplicators[zoom - 1];
  const y = (-coords.y - 1) * multiplicators[zoom - 1];
  if (x < 0 || y < 0 || y >= 64 || x >= 64) {
    return BLANK_TILE;
  }
  return `https://aeternum-map.gg/assets/newworld_vitaeeterna/map_l${zoom}_y${toThreeDigits(
    y,
  )}_x${toThreeDigits(x)}.webp`;
};

function AeternumLayer() {
  return <TileLayer getTileUrl={getTileUrl} getTileSize={getTileSize} />;
}

type ExampleMapProps = {
  children: ReactNode;
};
const ExampleMap = ({ children }: ExampleMapProps) => {
  return (
    <Map center={[7000, 7000]} crs={aeternumCRS}>
      <AeternumLayer />
      {children}
    </Map>
  );
};
export default ExampleMap;
