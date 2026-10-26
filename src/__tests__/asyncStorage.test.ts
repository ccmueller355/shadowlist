// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { getSchemaVersion, runMigrations, loadAllData, saveLists, saveItems, saveSettings, clearAllData, exportAllData, importAllData, loadLists, loadItems, loadSettings } from '../storage/asyncStorage';
import { ThemeName, AppLang, DietId } from '../types';

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
      expect(version).toBe(2);
    });

    it('does nothing if already at current version', async () => {
      mockMemory.set('@shadowlist/schema_version', '1');
      const storeKeysBefore = [...mockMemory.keys()].filter(k => k.startsWith('@shadowlist/'));

      await runMigrations();

      const version = await getSchemaVersion();
      expect(version).toBe(2);

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
          icon: 'cart', purchased: false, order: 0, category: null, foodType: 'non_food',
          createdAt: 100, updatedAt: 100 },
      ];
      mockMemory.set('@shadowlist/lists', JSON.stringify(existingLists));
      mockMemory.set('@shadowlist/items', JSON.stringify(existingItems));

      await runMigrations();

      // Version should be bumped
      const version = await getSchemaVersion();
      expect(version).toBe(2);

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
      expect(version1).toBe(2);

      // Call again
      await runMigrations();
      const version2 = await getSchemaVersion();
      expect(version2).toBe(2);

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


  describe('export / import backup', () => {
    const testLists = [
      { id: 'list1', name: 'Groceries', createdAt: 1000, updatedAt: 1000 },
      { id: 'list2', name: 'Hardware', createdAt: 2000, updatedAt: 2000 },
    ];
    
    const testItems = [
      { id: 'item1', listId: 'list1', description: 'Apples', qualifier: '5pcs', icon: 'apple', purchased: false, order: 0, category: null, foodType: 'fruit', createdAt: 1000, updatedAt: 1000 },
      { id: 'item2', listId: 'list1', description: 'Bread', qualifier: '1 loaf', icon: 'bread', purchased: true, order: 1, category: null, foodType: 'non_food', createdAt: 1100, updatedAt: 1100 },
      { id: 'item3', listId: 'list2', description: 'Hammer', qualifier: null, icon: 'hammer', purchased: false, order: 0, category: null, foodType: 'non_food', createdAt: 2000, updatedAt: 2000 },
    ];
    
    const testSettings = {
      theme: 'fixer' as ThemeName,
      sortByCategory: true,
      defaultIcon: 'cart',
      activeDiet: 'keto' as DietId | null,
      lang: 'en' as AppLang,
    };

    beforeEach(async () => {
      // Clear storage and set up test data
      await clearAllData();
      await saveLists(testLists);
      await saveItems(testItems);
      await saveSettings(testSettings);
      // Set schema version directly in mock
      mockMemory.set('@shadowlist/schema_version', '2');
    });

    describe('exportAllData', () => {
      it('exports complete backup with correct structure', async () => {
        const backup = await exportAllData();
        
        // Check top-level structure
        expect(backup).toHaveProperty('app', 'shadowlist');
        expect(backup).toHaveProperty('appVersion');
        expect(backup).toHaveProperty('schemaVersion');
        expect(backup).toHaveProperty('exportedAt');
        expect(backup).toHaveProperty('data');
        
        // Check appVersion matches package.json
        // expect(backup.appVersion).toBe(expect.any(String));
        expect(backup.appVersion.length).toBeGreaterThan(0);
        
        // Check schemaVersion is current
        expect(backup.schemaVersion).toBe(2);
        
        // Check exportedAt is valid ISO string
        expect(typeof backup.exportedAt).toBe('string');
        expect(new Date(backup.exportedAt).toString()).not.toContain('Invalid');
        
        // Check data section
        expect(backup.data).toHaveProperty('lists');
        expect(backup.data).toHaveProperty('items');
        expect(backup.data).toHaveProperty('settings');
        
        // Check data integrity
        expect(backup.data.lists).toHaveLength(2);
        expect(backup.data.lists[0].name).toBe('Groceries');
        expect(backup.data.lists[1].name).toBe('Hardware');
        
        expect(backup.data.items).toHaveLength(3);
        expect(backup.data.items[0].description).toBe('Apples');
        expect(backup.data.items[1].description).toBe('Bread');
        expect(backup.data.items[2].description).toBe('Hammer');
        
        expect(backup.data.settings.theme).toBe('fixer');
        expect(backup.data.settings.sortByCategory).toBe(true);
        expect(backup.data.settings.activeDiet).toBe('keto');
        expect(backup.data.settings.lang).toBe('en');
      });
    });

    describe('importAllData', () => {
      it('imports valid payload in replace mode', async () => {
        // Create a valid backup payload
        const backupPayload = {
          app: 'shadowlist',
          appVersion: '0.19.12',
          schemaVersion: 2,
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: {
            lists: [
              { id: 'importedList1', name: 'Imported Groceries', createdAt: 3000, updatedAt: 3000 },
              { id: 'importedList2', name: 'Imported Hardware', createdAt: 4000, updatedAt: 4000 },
            ],
            items: [
              { id: 'importedItem1', listId: 'importedList1', description: 'Bananas', qualifier: '3pcs', icon: 'banana', purchased: false, order: 0, category: null, foodType: 'fruit', createdAt: 3000, updatedAt: 3000 },
              { id: 'importedItem2', listId: 'importedList2', description: 'Screwdriver', qualifier: null, icon: 'screwdriver', purchased: true, order: 0, category: null, foodType: 'non_food', createdAt: 4000, updatedAt: 4000 },
            ],
            settings: {
              theme: 'cyberpunk',
              sortByCategory: false,
              defaultIcon: 'star',
              activeDiet: null,
              lang: 'en',
            },
          },
        };
        
        // Import in replace mode
        await importAllData(backupPayload, 'replace');
        
        // Verify data was replaced
        const lists = await loadLists();
        const items = await loadItems();
        const settings = await loadSettings();
        
        expect(lists).toHaveLength(2);
        expect(lists[0].name).toBe('Imported Groceries');
        expect(lists[1].name).toBe('Imported Hardware');
        
        expect(items).toHaveLength(2);
        expect(items[0].description).toBe('Bananas');
        expect(items[1].description).toBe('Screwdriver');
        
        expect(settings).not.toBeNull();
        expect(settings!.theme).toBe('cyberpunk');
        expect(settings!.sortByCategory).toBe(false);
        expect(settings!.activeDiet).toBeNull();
        expect(settings!.lang).toBe('en');
        
        // Schema version should be current
        const version = await getSchemaVersion();
        expect(version).toBe(2);
      });
      
      it('imports valid payload in merge mode', async () => {
        // First, add some existing data
        const existingList = { id: 'existingList', name: 'Existing List', createdAt: 5000, updatedAt: 5000 };
        const existingItem = { id: 'existingItem', listId: 'existingList', description: 'Existing Item', qualifier: '1pc', icon: 'dot-circle', purchased: false, order: 0, category: null, foodType: 'non_food', createdAt: 5000, updatedAt: 5000 };
        const existingSettings = { theme: 'fixer', sortByCategory: true, defaultIcon: 'cart', activeDiet: 'vegan', lang: 'en' };
        
        await saveLists([existingList]);
        await saveItems([existingItem]);
        await saveSettings(existingSettings);
        
        // Create backup payload to merge
        const backupPayload = {
          app: 'shadowlist',
          appVersion: '0.19.12',
          schemaVersion: 2,
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: {
            lists: [
              { id: 'newList', name: 'New List', createdAt: 6000, updatedAt: 6000 }, // New list
              { id: 'existingList', name: 'Updated Existing List', createdAt: 7000, updatedAt: 7000 }, // Same ID as existing - should update
            ],
            items: [
              { id: 'newItem', listId: 'newList', description: 'New Item', qualifier: '2pcs', icon: 'checkbox-marked', purchased: true, order: 0, category: null, foodType: 'non_food', createdAt: 6000, updatedAt: 6000 }, // New item
              { id: 'existingItem', listId: 'existingList', description: 'Updated Existing Item', qualifier: '2pc', icon: 'check', purchased: false, order: 0, category: null, foodType: 'non_food', createdAt: 7000, updatedAt: 7000 }, // Same ID as existing - should replace
            ],
            settings: {
              theme: 'decker', // Should merge with existing
              sortByCategory: false, // Should override existing
              // defaultIcon not provided - should keep existing
              activeDiet: null, // Should override existing
              // lang not provided - should keep existing
            },
          },
        };
        
        // Import in merge mode
        await importAllData(backupPayload, 'merge');
        
        // Verify merged data
        const lists = await loadLists();
        const items = await loadItems();
        const settings = await loadSettings();
        
        // Should have 2 lists: existingList (updated name) and newList
        expect(lists).toHaveLength(2);
        const listNames = lists.map(l => l.name).sort();
        // Actually, let's check what happened:
        // existingList in payload has name "Updated Existing List"
        // Since we're merging by ID, the existing list should keep its ID but update its name
        // newList is completely new
        const listNamesActual = lists.map(l => l.name).sort();
        expect(listNamesActual).toEqual(['New List', 'Updated Existing List']);
        
        // Should have 2 items: existingItem (updated) and newItem
        expect(items).toHaveLength(2);
        const itemDescriptions = items.map(i => i.description).sort();
        expect(itemDescriptions).toEqual(['New Item', 'Updated Existing Item']);
        
        // Settings: theme from payload (decker), sortByCategory from payload (false), 
        // defaultIcon from existing (cart), activeDiet from payload (null), lang from existing (en)
        expect(settings).not.toBeNull();
        expect(settings!.theme).toBe('decker');
        expect(settings!.sortByCategory).toBe(false);
        expect(settings!.defaultIcon).toBe('cart');
        expect(settings!.activeDiet).toBeNull();
        expect(settings!.lang).toBe('en');
        
        // Schema version should be current
        const version = await getSchemaVersion();
        expect(version).toBe(2);
      });
      
      it('rejects invalid payload (non-object)', async () => {
        await expect(importAllData(null as any)).rejects.toThrow('Invalid backup payload: must be a non-null object');
        await expect(importAllData('string' as any)).rejects.toThrow('Invalid backup payload: must be a non-null object');
        await expect(importAllData(123 as any)).rejects.toThrow('Invalid backup payload: must be a non-null object');
        await expect(importAllData(undefined as any)).rejects.toThrow('Invalid backup payload: must be a non-null object');
      });
      
      it('rejects payload with wrong app identifier', async () => {
        const payload = {
          app: 'wrongapp',
          schemaVersion: 2,
          data: { lists: [], items: [], settings: {} },
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: app identifier mismatch');
      });
      
      it('rejects payload with invalid schemaVersion', async () => {
        const payload = {
          app: 'shadowlist',
          schemaVersion: 0, // Invalid (<= 0)
          data: { lists: [], items: [], settings: {} },
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: missing or invalid schemaVersion');
        
        const payload2 = {
          app: 'shadowlist',
          schemaVersion: -1, // Invalid
          data: { lists: [], items: [], settings: {} },
        };
        await expect(importAllData(payload2)).rejects.toThrow('Invalid backup payload: missing or invalid schemaVersion');
        
        const payload3 = {
          app: 'shadowlist',
          schemaVersion: 'not-a-number', // Not a number
          data: { lists: [], items: [], settings: {} },
        };
        await expect(importAllData(payload3)).rejects.toThrow('Invalid backup payload: missing or invalid schemaVersion');
      });
      
      it('rejects payload with missing data object', async () => {
        const payload = {
          app: 'shadowlist',
          schemaVersion: 2,
          // missing data
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: missing data object');
      });
      
      it('rejects payload with non-array lists or items', async () => {
        const payload = {
          app: 'shadowlist',
          schemaVersion: 2,
          data: {
            lists: 'not-an-array',
            items: [],
            settings: {},
          },
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: lists and items must be arrays');
        
        const payload2 = {
          app: 'shadowlist',
          schemaVersion: 2,
          data: {
            lists: [],
            items: 'not-an-array',
            settings: {},
          },
        };
        await expect(importAllData(payload2)).rejects.toThrow('Invalid backup payload: lists and items must be arrays');
      });
      
      it('rejects payload with invalid item structure', async () => {
        const payload = {
          app: 'shadowlist',
          schemaVersion: 2,
          data: {
            lists: [],
            items: [
              { id: 'item1', description: 'Missing listId' }, // Missing listId
              { id: 'item2', listId: 'list1' }, // Missing description
              { listId: 'list1', description: 'item3' }, // Missing id
            ],
            settings: {},
          },
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: item structure invalid');
      });
      
      it('rejects payload with invalid list structure', async () => {
        const payload = {
          app: 'shadowlist',
          schemaVersion: 2,
          data: {
            lists: [
              { id: 'list1', name: 'List 1' }, // Valid
              { name: 'List 2' }, // Missing id
              { id: 'list3' }, // Missing name
            ],
            items: [],
            settings: {},
          },
        };
        await expect(importAllData(payload)).rejects.toThrow('Invalid backup payload: list structure invalid');
      });
      
      it('handles schema migration when importing older schema version', async () => {
        // Create a payload with schema version 1 (older than current 2)
        // In v1, items could have foodType: null
        const payload = {
          app: 'shadowlist',
          appVersion: '0.19.12',
          schemaVersion: 1, // Older version
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: {
            lists: [
              { id: 'oldList', name: 'Old List', createdAt: 8000, updatedAt: 8000 },
            ],
            items: [
              { id: 'oldItem1', listId: 'oldList', description: 'Old Item with null foodType', qualifier: '1pc', icon: 'question', purchased: false, order: 0, category: null, foodType: null, createdAt: 8000, updatedAt: 8000 }, // foodType: null (v1)
              { id: 'oldItem2', listId: 'oldList', description: 'Old Item with foodType', qualifier: '2pcs', icon: 'apple', purchased: true, order: 1, category: null, foodType: 'fruit', createdAt: 8000, updatedAt: 8000 }, // foodType: 'fruit'
            ],
            settings: {
              theme: 'fixer',
              sortByCategory: false,
              defaultIcon: 'question-mark',
              activeDiet: null,
              lang: 'en',
            },
          },
        };
        
        await importAllData(payload, 'replace');
        
        // After import, items should have been migrated: foodType null -> 'non_food'
        const items = await loadItems();
        expect(items).toHaveLength(2);
        
        // Find the item that originally had null foodType
        const nullFoodItem = items.find(i => i.description === 'Old Item with null foodType');
        expect(nullFoodItem).not.toBeUndefined();
        expect(nullFoodItem!.foodType).toBe('non_food'); // Should be migrated
        
        // Find the item that already had foodType
        const fruitItem = items.find(i => i.description === 'Old Item with foodType');
        expect(fruitItem).not.toBeUndefined();
        expect(fruitItem!.foodType).toBe('fruit'); // Should remain unchanged
        
        // Schema version should be current after import
        const version = await getSchemaVersion();
        expect(version).toBe(2);
      });
    });
  });
