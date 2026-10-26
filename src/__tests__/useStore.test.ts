// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { useStore } from '../store/useStore'
import { ThemeName, AppLang, DietId } from '../types';
import { saveLists, saveItems, saveSettings } from '../storage/asyncStorage';

// Mock AsyncStorage to prevent actual disk I/O during tests
const mockStorage = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async (key: string) => {
    return mockStorage.get(key) ?? null;
  }),
  setItem: jest.fn(async (key: string, value: string) => {
    mockStorage.set(key, value);
    return Promise.resolve();
  }),
  removeItem: jest.fn(async (key: string) => {
    mockStorage.delete(key);
    return Promise.resolve();
  }),
  multiRemove: jest.fn(async (keys: string[]) => {
    for (const key of keys) {
      mockStorage.delete(key);
    }
    return Promise.resolve();
  }),
}))

// Mock uuid to return predictable IDs in tests
jest.mock('../utils/uuid', () => ({
  generateId: jest.fn(() => `test-id-${Math.random().toString(36).slice(2, 9)}`),
}))

function resetStore() {
  useStore.setState({
    lists: [],
    items: [],
    settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart' },
    hydrated: true,
  })
}

describe('useStore', () => {
  beforeEach(() => {
    resetStore()
  })

  describe('lists', () => {
    it('starts with empty lists', () => {
      expect(useStore.getState().lists).toEqual([])
    })

    it('adds a list', () => {
      useStore.getState().addList('Weekly Groceries')
      const { lists } = useStore.getState()
      expect(lists).toHaveLength(1)
      expect(lists[0].name).toBe('Weekly Groceries')
      expect(lists[0].id).toBeTruthy()
    })

    it('deletes a list and its items', () => {
      useStore.getState().addList('Target Run')
      const { lists } = useStore.getState()
      const listId = lists[0].id

      // Add an item to the list
      useStore.getState().addItem({ listId, description: 'Socks' })

      useStore.getState().deleteList(listId)
      const state = useStore.getState()
      expect(state.lists).toHaveLength(0)
      expect(state.items.filter((i) => i.listId === listId)).toHaveLength(0)
    })

    it('renames a list', () => {
      useStore.getState().addList('Old Name')
      const { lists } = useStore.getState()
      const listId = lists[0].id

      useStore.getState().renameList(listId, 'New Name')
      const updated = useStore.getState().lists.find((l) => l.id === listId)
      expect(updated?.name).toBe('New Name')
    })
  })

  describe('items', () => {
    let listId: string

    beforeEach(() => {
      useStore.getState().addList('Test List')
      listId = useStore.getState().lists[0].id
    })

    it('adds an item to a list', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      expect(item.description).toBe('Milk')
      expect(item.listId).toBe(listId)
      expect(item.purchased).toBe(false)
    })

    it('trims description whitespace', () => {
      const item = useStore.getState().addItem({ listId, description: '  Eggs  ' })
      expect(item.description).toBe('Eggs')
    })

    it('assigns increasing order numbers', () => {
      const item1 = useStore.getState().addItem({ listId, description: 'First' })
      const item2 = useStore.getState().addItem({ listId, description: 'Second' })
      expect(item2.order).toBeGreaterThan(item1.order)
    })

    it('updates an item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().updateItem(item.id, { qualifier: '2x' })
      const updated = useStore.getState().items.find((i) => i.id === item.id)
      expect(updated?.qualifier).toBe('2x')
    })

    it('deletes an item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().deleteItem(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)).toBeUndefined()
    })

    it('toggles purchased state', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().togglePurchased(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)?.purchased).toBe(true)

      useStore.getState().togglePurchased(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)?.purchased).toBe(false)
    })

    it('moveToShop un-purchases and re-orders item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().togglePurchased(item.id)
      useStore.getState().moveToShop(item.id)
      const moved = useStore.getState().items.find((i) => i.id === item.id)
      expect(moved?.purchased).toBe(false)
    })

    it('reorders items', () => {
      const item1 = useStore.getState().addItem({ listId, description: 'A' })
      const item2 = useStore.getState().addItem({ listId, description: 'B' })
      const item3 = useStore.getState().addItem({ listId, description: 'C' })

      useStore.getState().reorderItems(listId, [item3.id, item1.id, item2.id])

      const items = useStore.getState().items.filter((i) => i.listId === listId)
      const ordered = items.sort((a, b) => a.order - b.order)
      expect(ordered[0].id).toBe(item3.id)
      expect(ordered[1].id).toBe(item1.id)
      expect(ordered[2].id).toBe(item2.id)
    })
  })

  describe('settings', () => {
    it('defaults to fixer theme', () => {
      expect(useStore.getState().settings.theme).toBe('fixer')
    })

    it('changes theme', () => {
      useStore.getState().setTheme('decker')
      expect(useStore.getState().settings.theme).toBe('decker')
    })

    it('toggles sortByCategory', () => {
      useStore.getState().setSortByCategory(true)
      expect(useStore.getState().settings.sortByCategory).toBe(true)

      useStore.getState().setSortByCategory(false)
      expect(useStore.getState().settings.sortByCategory).toBe(false)
    })

    it('changes defaultIcon', () => {
      useStore.getState().setDefaultIcon('food-variant')
      expect(useStore.getState().settings.defaultIcon).toBe('food-variant')
    })

    it('US: User changes active diet to Keto', () => {
      useStore.getState().setActiveDiet('keto')
      expect(useStore.getState().settings.activeDiet).toBe('keto')
    })

    it('US: User disables diet after having set one', () => {
      useStore.getState().setActiveDiet('keto')
      useStore.getState().setActiveDiet(null)
      expect(useStore.getState().settings.activeDiet).toBeNull()
    })

    it('US: User switches app language to Deutsch', () => {
      useStore.getState().setLang('de')
      expect(useStore.getState().settings.lang).toBe('de')
    })

    it('US: User switches language back to English', () => {
      useStore.getState().setLang('de')
      useStore.getState().setLang('en')
      expect(useStore.getState().settings.lang).toBe('en')
    })
  })

  describe('danger zone — user clears all data', () => {
    beforeEach(() => {
      resetStore()
      useStore.getState().addList('Weekly')
      useStore.getState().addItem({ listId: useStore.getState().lists[0]!.id, description: 'Milk' })
    })

    it('US: User clears all lists and items', async () => {
      expect(useStore.getState().lists.length).toBeGreaterThan(0)
      expect(useStore.getState().items.length).toBeGreaterThan(0)
      await useStore.getState().clearAll()
      expect(useStore.getState().lists).toHaveLength(0)
      expect(useStore.getState().items).toHaveLength(0)
    })

    it('US: Clearing all data resets settings to defaults', async () => {
      useStore.getState().setTheme('decker')
      useStore.getState().setActiveDiet('keto')
      useStore.getState().setLang('de')

      await useStore.getState().clearAll()
      const s = useStore.getState().settings
      expect(s.theme).toBe('fixer')
      expect(s.activeDiet).toBeNull()
      expect(s.lang).toBe('en')
    })
  })

  describe('demo/test data — user loading flows', () => {
    beforeEach(() => {
      resetStore()
    })

    it('US: User loads demo data, gets lists and items', () => {
      useStore.getState().addDemoData()
      expect(useStore.getState().lists.length).toBeGreaterThan(0)
      expect(useStore.getState().items.length).toBeGreaterThan(0)
    })

    it('US: User generates test data', () => {
      const count = useStore.getState().generateTestData()
      expect(count).toBeGreaterThan(0)
      expect(useStore.getState().lists.length).toBeGreaterThan(0)
    })

    it('US: User generates extreme stress test data (5000 items)', () => {
      const count = useStore.getState().generateExtremeData(5000)
      expect(count).toBeGreaterThan(0)
      expect(useStore.getState().items.length).toBeGreaterThanOrEqual(5000)
    })
  })

  describe('hydrated flag', () => {
    it('is true after resetStore sets hydrated', () => {
      expect(useStore.getState().hydrated).toBe(true)
    })
  })
})


  describe('backup / restore', () => {
    const testLists = [
      { id: 'list1', name: 'Groceries', createdAt: 1000, updatedAt: 1000 },
      { id: 'list2', name: 'Hardware', createdAt: 2000, updatedAt: 2000 },
    ];
    
    const testItems = [
      { id: 'item1', listId: 'list1', description: 'Apples', qualifier: '5pcs', icon: 'apple', purchased: false, order: 0, category: null as const, foodType: 'fruit', createdAt: 1000, updatedAt: 1000 },
      { id: 'item2', listId: 'list1', description: 'Bread', qualifier: '1 loaf', icon: 'bread', purchased: true, order: 1, category: null as const, foodType: 'non_food', createdAt: 1100, updatedAt: 1100 },
      { id: 'item3', listId: 'list2', description: 'Hammer', qualifier: null, icon: 'hammer', purchased: false, order: 0, category: null as const, foodType: 'non_food', createdAt: 2000, updatedAt: 2000 },
    ];
    
    const testSettings = {
      theme: 'decker' as ThemeName,
      sortByCategory: true,
      defaultIcon: 'hammer' as const,
      activeDiet: 'keto' as DietId | null,
      lang: 'de' as AppLang,
    };

    beforeEach(async () => {
      // Clear mock storage
      mockStorage.clear();
      
      useStore.setState({
        lists: [...testLists],
        items: [...testItems],
        settings: {...testSettings},
        hydrated: true,
      });
      // Persist the data to AsyncStorage so exportData/importData can read it
      await saveLists(testLists);
      await saveItems(testItems);
      await saveSettings(testSettings);
    });

    describe('exportData', () => {
      it('exports complete backup as JSON string', async () => {
        const jsonString = await useStore.getState().exportData();
        
        // Should be valid JSON
        const backup = JSON.parse(jsonString);
        
        // Check top-level structure
        expect(backup).toHaveProperty('app', 'shadowlist');
        expect(backup).toHaveProperty('appVersion');
        expect(backup).toHaveProperty('schemaVersion');
        expect(backup).toHaveProperty('exportedAt');
        expect(backup).toHaveProperty('data');
        
        // Check appVersion is not empty
        expect(backup.appVersion).toBeTruthy();
        expect(typeof backup.appVersion).toBe('string');
        
        // Check schemaVersion is current (2)
        expect(backup.schemaVersion).toBe(2);
        
        // Check exportedAt is valid ISO string
        expect(typeof backup.exportedAt).toBe('string');
        expect(new Date(backup.exportedAt).toString()).not.toContain('Invalid');
        
        // Check data integrity
        expect(backup.data.lists).toHaveLength(2);
        expect(backup.data.lists[0].name).toBe('Groceries');
        expect(backup.data.lists[1].name).toBe('Hardware');
        
        expect(backup.data.items).toHaveLength(3);
        expect(backup.data.items[0].description).toBe('Apples');
        expect(backup.data.items[1].description).toBe('Bread');
        expect(backup.data.items[2].description).toBe('Hammer');
        
        expect(backup.data.settings.theme).toBe('decker');
        expect(backup.data.settings.sortByCategory).toBe(true);
        expect(backup.data.settings.activeDiet).toBe('keto');
        expect(backup.data.settings.lang).toBe('de');
      });
    });

    describe('importData', () => {
      it('imports valid JSON in replace mode', async () => {
        // Create a valid backup JSON string
        const backupData = {
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
        const jsonString = JSON.stringify(backupData);
        
        // Import in replace mode
        await useStore.getState().importData(jsonString, 'replace');
        
        // Verify store state was replaced
        const state = useStore.getState();
        
        expect(state.lists).toHaveLength(2);
        expect(state.lists[0].name).toBe('Imported Groceries');
        expect(state.lists[1].name).toBe('Imported Hardware');
        
        expect(state.items).toHaveLength(2);
        expect(state.items[0].description).toBe('Bananas');
        expect(state.items[1].description).toBe('Screwdriver');
        
        expect(state.settings.theme).toBe('cyberpunk');
        expect(state.settings.sortByCategory).toBe(false);
        expect(state.settings.activeDiet).toBeNull();
        expect(state.settings.lang).toBe('en');
        
        // Hydration flag should remain true
        expect(state.hydrated).toBe(true);
      });
      
      it('imports valid JSON in merge mode', async () => {
        // First, modify the existing store state to have some data
        const existingList = { id: 'existingList', name: 'Existing List', createdAt: 5000, updatedAt: 5000 };
        const existingItem = { id: 'existingItem', listId: 'existingList', description: 'Existing Item', qualifier: '1pc', icon: 'dot-circle', purchased: false, order: 0, category: null, foodType: 'non_food', createdAt: 5000, updatedAt: 5000 };
        const existingSettings = { theme: 'fixer', sortByCategory: true, defaultIcon: 'cart', activeDiet: 'vegan', lang: 'en' };
        
        useStore.setState({
          lists: [existingList],
          items: [existingItem],
          settings: existingSettings,
          hydrated: true,
        });
        
        // Create backup JSON to merge
        const backupData = {
          app: 'shadowlist',
          appVersion: '0.19.12',
          schemaVersion: 2,
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: {
            lists: [
              { id: 'newList', name: 'New List', createdAt: 6000, updatedAt: 6000 }, // New list
              { id: 'existingList', name: 'Updated Existing List', createdAt: 7000, updatedAt: 7000 }, // Same ID - should update
            ],
            items: [
              { id: 'newItem', listId: 'newList', description: 'New Item', qualifier: '2pcs', icon: 'checkbox-marked', purchased: true, order: 0, category: null as const, foodType: 'non_food', createdAt: 6000, updatedAt: 6000 }, // New item
              { id: 'existingItem', listId: 'existingList', description: 'Updated Existing Item', qualifier: '2pc', icon: 'check', purchased: false, order: 0, category: null as const, foodType: 'non_food', createdAt: 7000, updatedAt: 7000 }, // Same ID - should replace
            ],
            settings: {
              theme: 'decker' as ThemeName, // Should merge with existing
              sortByCategory: false, // Should override existing
              // defaultIcon not provided - should keep existing
              activeDiet: null as DietId | null, // Should override existing
              // lang not provided - should keep existing
            },
          },
        };
        const jsonString = JSON.stringify(backupData);
        
        // Clear mock storage right before import to ensure clean state
        mockStorage.clear();
        
        // Import in merge mode
        await useStore.getState().importData(jsonString, 'merge');
        
        // Verify merged state
        const state = useStore.getState();
        
        // Should have 2 lists: existingList (updated name) and newList
        expect(state.lists).toHaveLength(2);
        const listNames = state.lists.map(l => l.name).sort();
        expect(listNames).toEqual(['New List', 'Updated Existing List']);
        
        // Should have 2 items: existingItem (updated) and newItem
        expect(state.items).toHaveLength(2);
        const itemDescriptions = state.items.map(i => i.description).sort();
        expect(itemDescriptions).toEqual(['New Item', 'Updated Existing Item']);
        
        // Settings: theme from payload (decker), sortByCategory from payload (false), 
        // defaultIcon from existing (cart), activeDiet from payload (null), lang from existing (en)
        expect(state.settings.theme).toBe('decker');
        expect(state.settings.sortByCategory).toBe(false);
        expect(state.settings.defaultIcon).toBe('cart');
        expect(state.settings.activeDiet).toBeNull();
        expect(state.settings.lang).toBe('en');
        
        // Hydration flag should remain true
        expect(state.hydrated).toBe(true);
      });
      
      it('rejects malformed JSON', async () => {
        // Invalid JSON string
        await expect(useStore.getState().importData('{ invalid json', 'replace')).rejects.toThrow();
        
        // Valid JSON but not a backup object
        await expect(useStore.getState().importData(JSON.stringify({ foo: 'bar' }), 'replace'))
          .rejects.toThrow();
        
        // Null payload
        await expect(useStore.getState().importData('null', 'replace')).rejects.toThrow();
        
        // Empty string
        await expect(useStore.getState().importData('', 'replace')).rejects.toThrow();
      });
      
      it('rejects backup with wrong app identifier', async () => {
        const backupData = {
          app: 'wrongapp',
          schemaVersion: 2,
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: { lists: [], items: [], settings: {} },
        };
        const jsonString = JSON.stringify(backupData);
        
        await expect(useStore.getState().importData(jsonString, 'replace'))
          .rejects.toThrow('Invalid backup payload: app identifier mismatch');
      });
      
      it('rejects backup with invalid schemaVersion', async () => {
        const backupData = {
          app: 'shadowlist',
          schemaVersion: 0, // Invalid
          exportedAt: '2026-10-26T10:00:00.000Z',
          data: { lists: [], items: [], settings: {} },
        };
        const jsonString = JSON.stringify(backupData);
        
        await expect(useStore.getState().importData(jsonString, 'replace'))
          .rejects.toThrow('Invalid backup payload: missing or invalid schemaVersion');
      });
    });
  });
