export type NodeType = {
  value: string;
  title: string;
  icon: string;
  discoveredIcon?: string;
};

const unknown: NodeType = {
  value: 'unknown',
  title: 'Unknown',
  icon: '/assets/icons/unknown.webp',
};

export const creatableNodeTypes: NodeType[] = [
  {
    value: 'text',
    title: 'Text',
    icon: '/assets/icons/unknown.webp',
  },
];

export const nodeTypes: NodeType[] = [
  ...creatableNodeTypes,
  {
    value: 'disillusionmentChest',
    title: 'Disillusionment Chest',
    icon: '/assets/icons/treasure_chest.webp',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.webp',
  },
  {
    value: 'conjurationsRecipeChest',
    title: 'Conjurations Recipe Chest',
    icon: '/assets/icons/treasure_chest.webp',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.webp',
  },
  {
    value: 'largeGoldSuperChest',
    title: 'Large Gold Super Chest',
    icon: '/assets/icons/treasure_chest.webp',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.webp',
  },
  {
    value: 'mediumGearChest',
    title: 'Medium Gear Chest',
    icon: '/assets/icons/treasure_chest.webp',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.webp',
  },
  {
    value: 'wandskinChest',
    title: 'Wandskin Chest',
    icon: '/assets/icons/treasure_chest.webp',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.webp',
  },
  {
    value: 'houseChest',
    title: 'House Chest',
    icon: '/assets/icons/chest.webp',
  },
  {
    value: 'accioPage',
    title: 'Accio Page',
    icon: '/assets/icons/accio_page.webp',
    discoveredIcon: '/assets/icons/accio_page_discovered.webp',
  },
  {
    value: 'guardianLeviosa',
    title: 'Winguardian Leviosa',
    icon: '/assets/icons/wingardium.webp',
    discoveredIcon: '/assets/icons/wingardium_discovered.webp',
  },
  {
    value: 'mothFrame',
    title: 'Moth Frame',
    icon: '/assets/icons/moth_frame.webp',
    discoveredIcon: '/assets/icons/moth_frame_discovered.webp',
  },
  {
    value: 'fastTravelFireplaces',
    title: 'Fast Travel Fireplace',
    icon: '/assets/icons/fast_travel.webp',
    discoveredIcon: '/assets/icons/fast_travel_discovered.webp',
  },
  {
    value: 'fastTravelSanctuaryHogwarts',
    title: 'Fast Travel Sanctuary',
    icon: '/assets/icons/sanctuary_hogwarts.webp',
    discoveredIcon: '/assets/icons/sanctuary_hogwarts_discovered.webp',
  },
  {
    value: 'kio',
    title: 'Field Guide Page (Revelio)',
    icon: '/assets/icons/revelio.webp',
    discoveredIcon: '/assets/icons/revelio_discovered.webp',
  },
  {
    value: 'incendioDragon',
    title: 'Incendio',
    icon: '/assets/icons/incendio.webp',
    discoveredIcon: '/assets/icons/incendio_discovered.webp',
  },
  {
    value: 'sphinxPuzzle',
    title: 'Merlin Trials',
    icon: '/assets/icons/sphinx_puzzle.webp',
    discoveredIcon: '/assets/icons/sphinx_puzzle_discovered.webp',
  },
  {
    value: 'demiguise',
    title: 'Demiguise Statue',
    icon: '/assets/icons/demiguise.webp',
    discoveredIcon: '/assets/icons/demiguise_discovered.webp',
  },
];

export const getNodeType = (value: string) =>
  nodeTypes.find((nodeType) => nodeType.value === value) || unknown;
