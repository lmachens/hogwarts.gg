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
    icon: '/assets/icons/treasure_chest.png',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.png',
  },
  {
    value: 'conjurationsRecipeChest',
    title: 'Conjurations Recipe Chest',
    icon: '/assets/icons/treasure_chest.png',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.png',
  },
  {
    value: 'largeGoldSuperChest',
    title: 'Large Gold Super Chest',
    icon: '/assets/icons/treasure_chest.png',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.png',
  },
  {
    value: 'mediumGearChest',
    title: 'Medium Gear Chest',
    icon: '/assets/icons/treasure_chest.png',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.png',
  },
  {
    value: 'wandskinChest',
    title: 'Wandskin Chest',
    icon: '/assets/icons/treasure_chest.png',
    discoveredIcon: '/assets/icons/treasure_chest_discovered.png',
  },
  {
    value: 'houseChest',
    title: 'House Chest',
    icon: '/assets/icons/chest.png',
  },
  {
    value: 'accioPage',
    title: 'Accio Page',
    icon: '/assets/icons/accio_page.png',
    discoveredIcon: '/assets/icons/accio_page_discovered.png',
  },
  {
    value: 'guardianLeviosa',
    title: 'Winguardian Leviosa',
    icon: '/assets/icons/wingardium.png',
    discoveredIcon: '/assets/icons/wingardium_discovered.png',
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
    icon: '/assets/icons/fast_travel.png',
    discoveredIcon: '/assets/icons/fast_travel_discovered.png',
  },
  {
    value: 'fastTravelSanctuaryHogwarts',
    title: 'Fast Travel Sanctuary',
    icon: '/assets/icons/sanctuary_hogwarts.png',
    discoveredIcon: '/assets/icons/sanctuary_hogwarts_discovered.png',
  },
  {
    value: 'kio',
    title: 'Field Guide Page (Revelio)',
    icon: '/assets/icons/revelio.png',
    discoveredIcon: '/assets/icons/revelio_discovered.png',
  },
  {
    value: 'incendioDragon',
    title: 'Incendio',
    icon: '/assets/icons/incendio.png',
    discoveredIcon: '/assets/icons/incendio_discovered.png',
  },
  {
    value: 'sphinxPuzzle',
    title: 'Merlin Trials',
    icon: '/assets/icons/sphinx_puzzle.png',
    discoveredIcon: '/assets/icons/sphinx_puzzle_discovered.png',
  },
];

export const getNodeType = (value: string) =>
  nodeTypes.find((nodeType) => nodeType.value === value) || unknown;
