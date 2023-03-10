import type { MESSAGE_STATUS } from './messages';

let cachedLatestFile: string | null = null;
let hasError = false;
export async function listenToSavegamesFolder(
  callback: (savegames: MESSAGE_STATUS['savegame']) => void,
) {
  const [steamFolders, epicGamesFolders] = await Promise.all([
    listSavegames(
      `${overwolf.io.paths.localAppData}\\Hogwarts Legacy\\Saved\\SaveGames`,
    ),
    listSavegames(
      `${overwolf.io.paths.localAppData}\\HogwartsLegacy\\Saved\\SaveGames`,
    ),
  ]);

  let files: string[];
  if (Array.isArray(steamFolders)) {
    files = steamFolders;
    hasError = false;
  } else if (Array.isArray(epicGamesFolders)) {
    files = epicGamesFolders;
    hasError = false;
  } else {
    files = [];
    if (!hasError) {
      hasError = true;
      console.error(steamFolders);
      console.error(epicGamesFolders);
    }
  }
  const latestFile = files[0];
  if (latestFile && latestFile !== cachedLatestFile) {
    cachedLatestFile = latestFile;
    const parts = latestFile.split('\\');
    const name = parts[parts.length - 1];
    listenToFile(latestFile, (body) => {
      const savegame: MESSAGE_STATUS['savegame'] = {
        name,
        path: latestFile,
        body,
        lastUpdate: new Date().toISOString(),
      };
      callback(savegame);
    });
  }
  setTimeout(() => {
    listenToSavegamesFolder(callback);
  }, 100);
}

export async function listSavegames(folderPath: string) {
  return await new Promise<string | string[]>((resolve) => {
    overwolf.io.dir(folderPath, async (result) => {
      if (result.error || !result.data) {
        return resolve(result.error || 'Could not list savegames');
      }
      if (!result.data || result.data.length === 0) {
        return resolve('No savegames found');
      }
      if (result.data[0].type !== 'dir') {
        return resolve('Savegames folder is not a directory');
      }
      const folder = result.data[0];
      overwolf.io.dir(`${folderPath}\\${folder.name}`, async (result) => {
        if (!result.data) {
          return resolve([]);
        }
        const files = result.data.filter(
          (fileOrDir) =>
            fileOrDir.type === 'file' &&
            fileOrDir.name.startsWith('HL') &&
            fileOrDir.name.endsWith('.sav'),
        );
        resolve(
          files.map((file) => `${folderPath}\\${folder.name}\\${file.name}`),
        );
      });
    });
  });
}

async function readFile(filePath: string) {
  const body = await new Promise<string>((resolve, reject) => {
    overwolf.io.readBinaryFile(
      filePath,
      {
        encoding: 'UTF8' as overwolf.io.enums.eEncoding.UTF8,
        maxBytesToRead: 0,
        offset: 0,
      },
      (result) => {
        if (typeof result.content === 'undefined') {
          reject(result.error);
        } else {
          resolve(result.content);
        }
      },
    );
  });
  return body;
}

function listenToFile(filePath: string, callback: (body: string) => void) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore https://github.com/overwolf/types/pull/66
  overwolf.io.watchFile(filePath, async () => {
    const body = await readFile(filePath);
    callback(body);
  });
}
