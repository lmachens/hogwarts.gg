import type { Database } from 'sql.js';

export function bodyToFile(body: string) {
  const blob = new Blob([body], { type: 'text/plain' });
  const file = new File([blob], 'savegame.sav', { type: 'text/plain' });
  return file;
}
export async function readSavegame(file: File) {
  const initSqlJs = window.initSqlJs;
  if (!initSqlJs) {
    throw new Error('SQL.js not initialized');
  }
  const rawdb = await extractDatabase(file);
  const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });
  const db = await new SQL.Database(rawdb);
  const player = extractPlayer(db);
  return player;
}

const MAGIC = new Uint8Array([0x47, 0x56, 0x41, 0x53]); // GVAS
const DB_START = new Uint8Array([
  0x52, 0x61, 0x77, 0x44, 0x61, 0x74, 0x61, 0x62, 0x61, 0x73, 0x65, 0x49, 0x6d,
  0x61, 0x67, 0x65,
]); // RawDatabaseImage

export async function extractDatabase(file: File) {
  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  // Check magic
  const magic = new Uint8Array(buffer, 0, 4);
  if (magic.toString() !== MAGIC.toString()) {
    throw new Error('Invalid file');
  }

  // Find pointer to the "RawDatabaseImage" property
  const dbImageStart = aob(buffer, DB_START);
  if (dbImageStart === -1) {
    throw new Error('Invalid file');
  }

  const sizePtr = dbImageStart + 61; // There's 61 bytes of metadata before the size (including the name of the property)
  const offsetPtr = sizePtr + 4; // Size is 4 bytes long

  const size = view.getUint32(sizePtr, true);

  // Extract the raw data from the file
  return new Uint8Array(buffer, offsetPtr, size);
}

// Simple AOB implementaiton for ArrayBuffer
// (Search for binary pattern inside bigger binary array)
function aob(buffer: ArrayBuffer, search: Uint8Array) {
  const arr = new Uint8Array(buffer);
  const len = arr.length;
  const searchLen = search.length;
  let i = 0;
  while (i < len) {
    let j = 0;
    while (j < searchLen && arr[i + j] === search[j]) {
      j++;
    }
    if (j === searchLen) {
      return i;
    }
    i++;
  }
  return -1;
}

export function extractPlayer(db: Database): SavefilePlayer {
  const playerSelect = db.exec(
    `SELECT DataValue FROM MiscDataDynamic WHERE DataOwner = 'Player' AND DataName IN ('HouseID', 'LocX', 'LocY', 'LocZ', 'Pitch', 'PlayerFirstName', 'PlayerLastName', 'Roll', 'World', 'Yaw', 'Year');`,
  );
  const { values } = playerSelect[0];
  const player = {
    houseId: values[0].toString(),
    position: {
      x: +values[1],
      y: +values[2],
      z: +values[3],
      pitch: +values[4],
      roll: +values[7],
      yaw: +values[9],
      world: values[8].toString(),
    },
    firstName: values[5].toString(),
    lastName: values[6].toString(),
    year: +values[10],
  };

  const locations = extractMapLocationData(db);

  return { ...player, locations };
}

export function extractMapLocationData(db: Database) {
  const mapLocationData = db.exec(
    `SELECT MapLocationID, State FROM MapLocationDataDynamic;`,
  );
  const { values } = mapLocationData[0];
  const data = values as [string, number][];
  const fastTravelsOverland = data.filter((value) =>
    value[0].startsWith('FT_OL_'),
  );
  const fastTravelsHogwarts = data.filter((value) =>
    value[0].startsWith('FT_HW_'),
  );
  const fastTravelsHogsmeade = data.filter((value) =>
    value[0].startsWith('FT_Hogsmeade'),
  );
  const chestsOverland = data.filter(
    (value) =>
      value[0].startsWith('Chest_') &&
      !value[0].startsWith('Chest_HW_') &&
      !value[0].startsWith('Chest_HM_'),
  );
  const chestsHogwarts = data.filter((value) =>
    value[0].startsWith('Chest_HW_'),
  );
  const chestsHogsmeade = data.filter((value) =>
    value[0].startsWith('Chest_HM_'),
  );
  const collectionsOverland = data.filter(
    (value) =>
      value[0].includes('Collect_') &&
      !value[0].includes('Collect_HW_') &&
      !value[0].includes('Collect_HM_'),
  );
  const collectionsHogwarts = data.filter((value) =>
    value[0].includes('Collect_HW_'),
  );
  const collectionsHogsmeade = data.filter((value) =>
    value[0].includes('Collect_HM_'),
  );
  const kioOverland = data.filter((value) =>
    value[0].startsWith('KIO_Overland_'),
  );
  const kioHogwarts = data.filter((value) => value[0].startsWith('KIO_HW_'));
  const kioHogsmeade = data.filter((value) =>
    value[0].startsWith('KIO_Hogsmeade_'),
  );
  const sphinxPuzzlesOverland = data.filter((value) =>
    value[0].startsWith('SphinxPuzzle'),
  );
  const demiguiseStatuesOverland = data.filter((value) =>
    value[0].includes('_Demiguise_'),
  );

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.data = data;
  }
  return {
    overland: {
      fastTravels: {
        values: fastTravelsOverland
          .filter((value) => value[1] !== 8)
          .map((value) => value[0]),
        max: fastTravelsOverland.length,
      },
      chests: {
        values: chestsOverland
          .filter((value) => value[1] !== 2)
          .map((value) => value[0]),
        max: chestsOverland.length,
      },
      collections: {
        values: collectionsOverland
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: collectionsOverland.length,
      },
      fieldGuidePages: {
        values: kioOverland
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: kioOverland.length,
      },
      sphinxPuzzles: {
        values: sphinxPuzzlesOverland
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: sphinxPuzzlesOverland.length,
      },
      demiguiseStatues: {
        values: demiguiseStatuesOverland
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: demiguiseStatuesOverland.length,
      },
    },
    hogwarts: {
      fastTravels: {
        values: fastTravelsHogwarts
          .filter((value) => value[1] !== 8)
          .map((value) => value[0]),
        max: fastTravelsHogwarts.length,
      },
      chests: {
        values: chestsHogwarts
          .filter((value) => value[1] !== 2)
          .map((value) => value[0]),
        max: chestsHogwarts.length,
      },
      collections: {
        values: collectionsHogwarts
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: collectionsHogwarts.length,
      },
      fieldGuidePages: {
        values: kioHogwarts
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: kioHogwarts.length,
      },
    },
    hogsmeade: {
      fastTravels: {
        values: fastTravelsHogsmeade
          .filter((value) => value[1] !== 8)
          .map((value) => value[0]),
        max: fastTravelsHogsmeade.length,
      },
      chests: {
        values: chestsHogsmeade
          .filter((value) => value[1] !== 2)
          .map((value) => value[0]),
        max: chestsHogsmeade.length,
      },
      collections: {
        values: collectionsHogsmeade
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: collectionsHogsmeade.length,
      },
      fieldGuidePages: {
        values: kioHogsmeade
          .filter((value) => value[1] !== 3)
          .map((value) => value[0]),
        max: kioHogsmeade.length,
      },
    },
  };
}

export type MapLocations = {
  fastTravels: {
    values: string[];
    max: number;
  };
  chests: {
    values: string[];
    max: number;
  };
  collections: {
    values: string[];
    max: number;
  };
  fieldGuidePages: {
    values: string[];
    max: number;
  };
};
export type SavefilePlayer = {
  houseId: string;
  position: {
    x: number;
    y: number;
    z: number;
    pitch: number;
    roll: number;
    yaw: number;
    world: string;
  };
  firstName: string;
  lastName: string;
  year: number;
  locations: {
    overland: MapLocations & {
      sphinxPuzzles: {
        values: string[];
        max: number;
      };
      demiguiseStatues: {
        values: string[];
        max: number;
      };
    };
    hogwarts: MapLocations;
    hogsmeade: MapLocations;
  };
};
