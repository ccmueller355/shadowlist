// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, ShoppingItem, AppSettings } from '../types';

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
