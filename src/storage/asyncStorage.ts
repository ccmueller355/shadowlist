import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, ShoppingItem, AppSettings } from '../types';

const KEYS = {
  lists: '@shadowlist/lists',
  items: '@shadowlist/items',
  settings: '@shadowlist/settings',
};

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
    settings: settings || {
      theme: 'fixer',
      sortByCategory: false,
      defaultIcon: 'cart',
    },
  };
}

export async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove([KEYS.lists, KEYS.items, KEYS.settings]);
}
