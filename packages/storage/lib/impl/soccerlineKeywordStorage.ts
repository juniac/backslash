import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

type DataHash = {
  [key: string]: string;
};

type KeywordStorage = BaseStorage<DataHash> & {
  save: (key: string, value: string) => Promise<string>;
  load: (key: string) => Promise<string>;
};

const storage = createStorage<DataHash>(
  'soccerline-data-storage',
  {},
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// You can extend it with your own methods
export const soccerlineKeywordStorage: KeywordStorage = {
  ...storage,
  save: async (key: string, value: string) => {
    await storage.set(currentData => {
      currentData[key] = value;
      return currentData;
    });
    return value;
  },
  load: async (key: string) => {
    const data = await storage.get();
    return data[key];
  },
};
