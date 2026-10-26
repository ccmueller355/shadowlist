// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, ShoppingItem, AppSettings, ShadowlistBackup, BackupImportMode } from '../types';
import packageJson from '../../package.json';

const KEYS = {
  lists: '@shadowlist/lists',
  items: '@shadowlist/items',
  settings: '@shadowlist/settings',
  schemaVersion: '@shadowlist/schema_version',
};

// ── Schema Versioning & Migration ──

const CURRENT_SCHEMA_VERSION = 2;

type Migration = () => Promise<void>;

/**
 * Each migration transforms data from version N to N+1.
 * Index 0 = v0→v1, index 1 = v1→v2, etc.
 * Only write ONE-STEP migrations. The runner chains them.
 */
const MIGRATIONS: Migration[] = [
  // v0 → v1: Baseline — mark as versioned.
  async () => {
    // Data already matches current types. Nothing to transform.
  },

  // v1 → v2: foodType null → 'non_food' (PR #13 — remove nullable foodType)
  async () => {
    const raw = await AsyncStorage.getItem(KEYS.items);
    if (!raw) return;
    const items: ShoppingItem[] = JSON.parse(raw);
    let changed = false;
    for (const item of items) {
      if ((item as any).foodType === null) {
        (item as any).foodType = 'non_food';
        changed = true;
      }
    }
    if (changed) {
      await AsyncStorage.setItem(KEYS.items, JSON.stringify(items));
    }
  },
];

/** Read the stored schema version (0 if unversioned / fresh install). */
export async function getSchemaVersion(): Promise<number> {
  const raw = await AsyncStorage.getItem(KEYS.schemaVersion);
  if (raw === null) return 0;
  const v = parseInt(raw, 10);
  return Number.isNaN(v) ? 0 : v;
}

/** Write schema version after migrations complete. */
async function setSchemaVersion(version: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.schemaVersion, String(version));
}

/**
 * Run all pending migrations in order.
 * Call this ONCE before any data is loaded on app boot.
 */
export async function runMigrations(): Promise<void> {
  const current = await getSchemaVersion();

  if (current >= CURRENT_SCHEMA_VERSION) {
    return; // Already up to date
  }

  for (let v = current; v < CURRENT_SCHEMA_VERSION; v++) {
    const migration = MIGRATIONS[v];
    if (!migration) {
      throw new Error(`Missing migration for version ${v} → ${v + 1}`);
    }
    await migration();
  }

  await setSchemaVersion(CURRENT_SCHEMA_VERSION);
}

// ── Data I/O ──

export async function loadLists(): Promise<ShoppingList[]> {
  const raw = await AsyncStorage.getItem(KEYS.lists);
  return raw ? JSON.parse(raw) : [];
}

export async function saveLists(lists: ShoppingList[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.lists, JSON.stringify(lists));
}

export async function loadItems(): Promise<ShoppingItem[]> {
  const raw = await AsyncStorage.getItem(KEYS.items);
  return raw ? JSON.parse(raw) : [];
}

export async function saveItems(items: ShoppingItem[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.items, JSON.stringify(items));
}

export async function loadSettings(): Promise<AppSettings | null> {
  const raw = await AsyncStorage.getItem(KEYS.settings);
  return raw ? JSON.parse(raw) : null;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export async function loadAllData(): Promise<{
  lists: ShoppingList[];
  items: ShoppingItem[];
  settings: AppSettings;
}> {
  const [lists, items, settings] = await Promise.all([
    loadLists(),
    loadItems(),
    loadSettings(),
  ]);
  return {
    lists,
    items,
    settings: {
      theme: 'fixer',
      sortByCategory: false,
      defaultIcon: 'cart',
      activeDiet: null,
      lang: 'en',
      ...(settings || {}),
    },
  };
}

export async function clearAllData(): Promise<void> {
  await Promise.all([
    AsyncStorage.removeItem(KEYS.lists),
    AsyncStorage.removeItem(KEYS.items),
    AsyncStorage.removeItem(KEYS.settings),
    AsyncStorage.removeItem(KEYS.schemaVersion),
  ]);
}

// ── Export / Import Backup ──

export async function exportAllData(): Promise<ShadowlistBackup> {
  const { lists, items, settings } = await loadAllData();
  const schemaVersion = await getSchemaVersion();
  return {
    app: 'shadowlist',
    appVersion: packageJson.version,
    schemaVersion: schemaVersion > 0 ? schemaVersion : CURRENT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      lists,
      items,
      settings,
    },
  };
}

export async function importAllData(
  payload: unknown,
  mode: BackupImportMode = 'replace'
): Promise<void> {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid backup payload: must be a non-null object');
  }

  const dataObj = payload as Partial<ShadowlistBackup>;

  if (dataObj.app !== 'shadowlist') {
    throw new Error('Invalid backup payload: app identifier mismatch');
  }

  if (
    typeof dataObj.schemaVersion !== 'number' ||
    !Number.isInteger(dataObj.schemaVersion) ||
    dataObj.schemaVersion <= 0
  ) {
    throw new Error('Invalid backup payload: missing or invalid schemaVersion');
  }

  if (!dataObj.data || typeof dataObj.data !== 'object') {
    throw new Error('Invalid backup payload: missing data object');
  }

  const { lists, items, settings } = dataObj.data as Partial<ShadowlistBackup['data']>;

  if (!Array.isArray(lists) || !Array.isArray(items)) {
    throw new Error('Invalid backup payload: lists and items must be arrays');
  }

  // Validate items basic structure if present
  for (const item of items) {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || typeof item.listId !== 'string') {
      throw new Error('Invalid backup payload: item structure invalid');
    }
  }

  for (const list of lists) {
    if (!list || typeof list !== 'object' || typeof list.id !== 'string' || typeof list.name !== 'string') {
      throw new Error('Invalid backup payload: list structure invalid');
    }
  }

  // Handle migration if imported payload schema is older than CURRENT_SCHEMA_VERSION
  let migratedItems = [...items];
  let currentPayloadSchema = dataObj.schemaVersion;

  if (currentPayloadSchema < 2 && CURRENT_SCHEMA_VERSION >= 2) {
    // Migration v1 -> v2: foodType null -> 'non_food'
    migratedItems = migratedItems.map((item) => {
      if ((item as any).foodType === null || (item as any).foodType === undefined) {
        return { ...item, foodType: 'non_food' };
      }
      return item;
    });
    currentPayloadSchema = 2;
  }

  if (mode === 'replace') {
    const existingSettings = await loadSettings();
    const finalSettings: AppSettings = settings
      ? {
          theme: settings.theme ?? 'fixer',
          sortByCategory: settings.sortByCategory ?? false,
          defaultIcon: settings.defaultIcon ?? 'cart',
          activeDiet: settings.activeDiet ?? null,
          lang: settings.lang ?? 'en',
        }
      : existingSettings || {
          theme: 'fixer',
          sortByCategory: false,
          defaultIcon: 'cart',
          activeDiet: null,
          lang: 'en',
        };

    await Promise.all([
      saveLists(lists),
      saveItems(migratedItems),
      saveSettings(finalSettings),
      setSchemaVersion(CURRENT_SCHEMA_VERSION),
    ]);
  } else if (mode === 'merge') {
    const existingData = await loadAllData();
    const existingLists = existingData.lists;
    const existingItems = existingData.items;

    // Deduplicate or merge lists
    const listIdMap = new Map<string, string>(); // oldListId -> newListId
    const mergedLists: ShoppingList[] = [...existingLists];

    for (const newList of lists) {
      const existingList = mergedLists.find((l) => l.id === newList.id);
      if (existingList) {
        // List with same ID exists: update existing list with imported data
        Object.assign(existingList, newList);
        listIdMap.set(newList.id, existingList.id);
      } else {
        // Check if list with same name exists
        const sameNameList = mergedLists.find(
          (l) => l.name.trim().toLowerCase() === newList.name.trim().toLowerCase()
        );
        if (sameNameList) {
          listIdMap.set(newList.id, sameNameList.id);
        } else {
          // Unique list: keep as is
          mergedLists.push(newList);
          listIdMap.set(newList.id, newList.id);
        }
      }
    }

    // Merge items
    const mergedItems: ShoppingItem[] = [...existingItems];
    for (const newItem of migratedItems) {
      const targetListId = listIdMap.get(newItem.listId) || newItem.listId;
      const updatedItem = { ...newItem, listId: targetListId };

      const existingItemIndex = mergedItems.findIndex((i) => i.id === updatedItem.id);
      if (existingItemIndex >= 0) {
        // Overwrite existing item with imported version or keep newer
        mergedItems[existingItemIndex] = updatedItem;
      } else {
        mergedItems.push(updatedItem);
      }
    }

    const finalSettings: AppSettings = existingData.settings
      ? { ...existingData.settings, ...(settings || {}) }
      : settings || {
          theme: 'fixer',
          sortByCategory: false,
          defaultIcon: 'cart',
          activeDiet: null,
          lang: 'en',
        };

    await Promise.all([
      saveLists(mergedLists),
      saveItems(mergedItems),
      saveSettings(finalSettings),
      setSchemaVersion(CURRENT_SCHEMA_VERSION),
    ]);
  }
}

