// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { getSchemaVersion, runMigrations, loadAllData, saveLists, saveItems, clearAllData } from '../storage/asyncStorage';

// ── In-memory AsyncStorage mock ──
// Note: Jest requires mock variable names to be prefixed with "mock" for scope access
const mockMemory = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(mockMemory.get(key) ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    mockMemory.set(key, value);
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    mockMemory.delete(key);
    return Promise.resolve();
  }),
  multiRemove: jest.fn((keys: string[]) => {
    for (const key of keys) mockMemory.delete(key);
    return Promise.resolve();
  }),
}));

beforeEach(() => {
  mockMemory.clear();
});

describe('migration system', () => {
  describe('getSchemaVersion', () => {
    it('returns 0 on fresh install (no version stored)', async () => {
      const version = await getSchemaVersion();
      expect(version).toBe(0);
    });

    it('returns stored version number', async () => {
      mockMemory.set('@shadowlist/schema_version', '1');
      const version = await getSchemaVersion();
      expect(version).toBe(1);
    });

    it('returns 0 for invalid stored value', async () => {
      mockMemory.set('@shadowlist/schema_version', 'not-a-number');
      const version = await getSchemaVersion();
      expect(version).toBe(0);
    });
  });

  describe('runMigrations', () => {
    it('does nothing on fresh install (version 0 → 1, no-op)', async () => {
      await runMigrations();
      const version = await getSchemaVersion();
      expect(version).toBe(1);
    });

    it('does nothing if already at current version', async () => {
      mockMemory.set('@shadowlist/schema_version', '1');
      const storeKeysBefore = [...mockMemory.keys()].filter(k => k.startsWith('@shadowlist/'));

      await runMigrations();

      const version = await getSchemaVersion();
      expect(version).toBe(1);

      // No new keys written beyond what was there
      const storeKeysAfter = [...mockMemory.keys()].filter(k => k.startsWith('@shadowlist/'));
      expect(storeKeysAfter).toEqual(storeKeysBefore);
    });

    it('migrates existing data from unversioned (v0) to v1 without data loss', async () => {
      // Simulate existing data with no schema_version
      const existingLists = [
        { id: 'list_1', name: 'Test List', createdAt: 100, updatedAt: 100 },
      ];
      const existingItems = [
        { id: 'item_1', listId: 'list_1', description: 'Milk', qualifier: '1L',
          icon: 'cart', purchased: false, order: 0, category: null, foodType: null,
          createdAt: 100, updatedAt: 100 },
      ];
      mockMemory.set('@shadowlist/lists', JSON.stringify(existingLists));
      mockMemory.set('@shadowlist/items', JSON.stringify(existingItems));

      await runMigrations();

      // Version should be bumped
      const version = await getSchemaVersion();
      expect(version).toBe(1);

      // Data should still be readable after migration
      const data = await loadAllData();
      expect(data.lists).toHaveLength(1);
      expect(data.lists[0].name).toBe('Test List');
      expect(data.items).toHaveLength(1);
      expect(data.items[0].description).toBe('Milk');
    });

    it('does not double-migrate when called twice', async () => {
      // Seed data at v0
      mockMemory.set('@shadowlist/lists', JSON.stringify([
        { id: 'l1', name: 'List', createdAt: 1, updatedAt: 1 },
      ]));

      await runMigrations();
      const version1 = await getSchemaVersion();
      expect(version1).toBe(1);

      // Call again
      await runMigrations();
      const version2 = await getSchemaVersion();
      expect(version2).toBe(1);

      // Data still intact
      const data = await loadAllData();
      expect(data.lists).toHaveLength(1);
    });

    it('clears version on full data wipe', async () => {
      // Simulate having data with version
      const lists = [{ id: 'l1', name: 'List', createdAt: 1, updatedAt: 1 }];
      mockMemory.set('@shadowlist/lists', JSON.stringify(lists));
      mockMemory.set('@shadowlist/schema_version', '1');

      await clearAllData();

      const version = await getSchemaVersion();
      expect(version).toBe(0);
      const data = await loadAllData();
      expect(data.lists).toHaveLength(0);
    });

    it('preserves settings through migration', async () => {
      mockMemory.set('@shadowlist/settings', JSON.stringify({
        theme: 'decker', sortByCategory: true, defaultIcon: 'cart',
        activeDiet: 'keto', lang: 'en',
      }));

      await runMigrations();

      const data = await loadAllData();
      expect(data.settings.theme).toBe('decker');
      expect(data.settings.sortByCategory).toBe(true);
      expect(data.settings.activeDiet).toBe('keto');
    });
  });
});
