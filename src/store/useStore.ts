import { create } from 'zustand';
import { ShoppingList, ShoppingItem, AppSettings, NewItemParams } from '../types';
import { loadAllData, saveLists, saveItems, saveSettings, clearAllData } from '../storage/asyncStorage';
import { generateId } from '../utils/uuid';
import { DEMO_LISTS, DEMO_ITEMS } from '../constants/demoData';

interface ShoppingState {
  lists: ShoppingList[];
  items: ShoppingItem[];
  settings: AppSettings;
  hydrated: boolean;

  // Init
  hydrate: () => Promise<void>;

  // List actions
  addList: (name: string) => void;
  deleteList: (id: string) => void;
  renameList: (id: string, name: string) => void;

  // Item actions
  addItem: (params: NewItemParams) => ShoppingItem;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  togglePurchased: (id: string) => void;
  moveToShop: (id: string) => void;
  reorderItems: (listId: string, orderedIds: string[]) => void;

  // Settings
  setSortByCategory: (value: boolean) => void;
  setDefaultIcon: (icon: string) => void;

  // Demo / Danger
  addDemoData: () => void;
  clearAll: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  sortByCategory: false,
  defaultIcon: 'cart',
};

export const useStore = create<ShoppingState>((set, get) => ({
  lists: [],
  items: [],
  settings: DEFAULT_SETTINGS,
  hydrated: false,

  hydrate: async () => {
    const data = await loadAllData();
    set({
      lists: data.lists,
      items: data.items,
      settings: data.settings,
      hydrated: true,
    });
  },

  addList: (name: string) => {
    const now = Date.now();
    const newList: ShoppingList = {
      id: generateId(),
      name,
      createdAt: now,
      updatedAt: now,
    };
    const lists = [...get().lists, newList];
    set({ lists });
    saveLists(lists);
  },

  deleteList: (id: string) => {
    const lists = get().lists.filter((l) => l.id !== id);
    const items = get().items.filter((i) => i.listId !== id);
    set({ lists, items });
    saveLists(lists);
    saveItems(items);
  },

  renameList: (id: string, name: string) => {
    const lists = get().lists.map((l) =>
      l.id === id ? { ...l, name, updatedAt: Date.now() } : l
    );
    set({ lists });
    saveLists(lists);
  },

  addItem: (params: NewItemParams) => {
    const now = Date.now();
    const items = get().items;
    const listItems = items.filter((i) => i.listId === params.listId && !i.purchased);
    const maxOrder = listItems.length > 0 ? Math.max(...listItems.map((i) => i.order)) : -1;
    const newItem: ShoppingItem = {
      id: generateId(),
      listId: params.listId,
      description: params.description.trim(),
      qualifier: params.qualifier || '',
      icon: params.icon || get().settings.defaultIcon,
      purchased: false,
      order: maxOrder + 1,
      category: params.category ?? null,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [...items, newItem];
    set({ items: updated });
    saveItems(updated);
    return newItem;
  },

  updateItem: (id: string, updates: Partial<ShoppingItem>) => {
    const items = get().items.map((i) =>
      i.id === id ? { ...i, ...updates, updatedAt: Date.now() } : i
    );
    set({ items });
    saveItems(items);
  },

  deleteItem: (id: string) => {
    const items = get().items.filter((i) => i.id !== id);
    set({ items });
    saveItems(items);
  },

  togglePurchased: (id: string) => {
    const now = Date.now();
    const items = get().items.map((i) => {
      if (i.id !== id) return i;
      const newPurchased = !i.purchased;
      return {
        ...i,
        purchased: newPurchased,
        // When moving to purchased, preserve order within purchased section
        order: newPurchased
          ? get().items.filter((x) => x.listId === i.listId && x.purchased).length
          : get().items.filter((x) => x.listId === i.listId && !x.purchased).length,
        updatedAt: now,
      };
    });
    set({ items });
    saveItems(items);
  },

  moveToShop: (id: string) => {
    const now = Date.now();
    const items = get().items.map((i) => {
      if (i.id !== id) return i;
      const listUnpurchased = get().items.filter(
        (x) => x.listId === i.listId && !x.purchased && x.id !== id
      );
      return {
        ...i,
        purchased: false,
        order: listUnpurchased.length,
        updatedAt: now,
      };
    });
    set({ items });
    saveItems(items);
  },

  reorderItems: (listId: string, orderedIds: string[]) => {
    const items = get().items.map((i) => {
      if (i.listId !== listId) return i;
      const idx = orderedIds.indexOf(i.id);
      return { ...i, order: idx >= 0 ? idx : i.order };
    });
    set({ items });
    saveItems(items);
  },

  setSortByCategory: (value: boolean) => {
    const settings = { ...get().settings, sortByCategory: value };
    set({ settings });
    saveSettings(settings);
  },

  setDefaultIcon: (icon: string) => {
    const settings = { ...get().settings, defaultIcon: icon };
    set({ settings });
    saveSettings(settings);
  },

  addDemoData: () => {
    const lists = [...get().lists, ...DEMO_LISTS];
    const items = [...get().items, ...DEMO_ITEMS];
    set({ lists, items });
    saveLists(lists);
    saveItems(items);
  },

  clearAll: async () => {
    set({ lists: [], items: [], settings: DEFAULT_SETTINGS });
    await clearAllData();
  },
}));
