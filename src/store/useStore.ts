// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { create } from 'zustand';
import { InteractionManager } from 'react-native';
import { ShoppingList, ShoppingItem, AppSettings, NewItemParams, AppLang, DietId, FoodType } from '../types';
import { runMigrations, loadAllData, saveLists, saveItems, saveSettings, clearAllData } from '../storage/asyncStorage';
import { generateId } from '../utils/uuid';
import { getDemoData } from '../constants/demoData';
import { generateTestLists } from '../constants/testData';

interface ShoppingState {
  lists: ShoppingList[];
  items: ShoppingItem[];
  settings: AppSettings;
  hydrated: boolean;
  foodNameIndex: Map<string, { foodType: FoodType; icon: string }>;

  // Init
  hydrate: () => Promise<void>;
  rebuildNameIndex: () => void;

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
  reorderLists: (orderedIds: string[]) => void;

  // Settings
  setTheme: (theme: AppSettings['theme']) => void;
  setSortByCategory: (value: boolean) => void;
  setDefaultIcon: (icon: string) => void;
  setActiveDiet: (dietId: DietId | null) => void;
  setLang: (lang: AppLang) => void;

  // Demo / Test Data / Danger
  addDemoData: () => void;
  generateTestData: () => number;
  generateExtremeData: (totalItems?: number) => number;
  clearAll: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'fixer',
  sortByCategory: false,
  defaultIcon: 'cart',
  activeDiet: null,
  lang: 'en',
};

export const useStore = create<ShoppingState>((set, get) => ({
  lists: [],
  items: [],
  settings: DEFAULT_SETTINGS,
  hydrated: false,
  foodNameIndex: new Map(),

  rebuildNameIndex: () => {
    const items = get().items;
    const index = new Map<string, { foodType: FoodType; icon: string }>();
    for (const item of items) {
      const key = item.description.trim().toLowerCase();
      if (!key) continue;
      // Last-write-wins — later items override earlier ones for the same name
      index.set(key, { foodType: item.foodType, icon: item.icon });
    }
    set({ foodNameIndex: index });
  },

  hydrate: async () => {
    await runMigrations();
    const data = await loadAllData();
    set({
      lists: data.lists,
      items: data.items,
      settings: data.settings,
      hydrated: true,
    });
    get().rebuildNameIndex();
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
      foodType: 'non_food',
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
    const allItems = get().items;
    // Find the target item first to get its listId and current state
    const targetItem = allItems.find((i) => i.id === id);
    if (!targetItem) return;
    const newPurchased = !targetItem.purchased;
    // Pre-compute the new order once — avoids filter() inside map()
    const listItems = allItems.filter((x) => x.listId === targetItem.listId);
    const newOrder = newPurchased
      ? listItems.filter((x) => x.purchased).length
      : listItems.filter((x) => !x.purchased).length;
    const items = allItems.map((i) => {
      if (i.id !== id) return i;
      return { ...i, purchased: newPurchased, order: newOrder, updatedAt: now };
    });
    set({ items });
    InteractionManager.runAfterInteractions(() => saveItems(items));
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
    InteractionManager.runAfterInteractions(() => saveItems(items));
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

  reorderLists: (orderedIds: string[]) => {
    const listMap = new Map(get().lists.map((l) => [l.id, l]));
    const lists = orderedIds.map((id) => listMap.get(id)!).filter(Boolean);
    set({ lists });
    saveLists(lists);
  },

  setTheme: (theme: AppSettings['theme']) => {
    const settings = { ...get().settings, theme };
    set({ settings });
    saveSettings(settings);
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

  setActiveDiet: (dietId: DietId | null) => {
    const settings = { ...get().settings, activeDiet: dietId };
    set({ settings });
    saveSettings(settings);
  },

  setLang: (lang: AppLang) => {
    const settings = { ...get().settings, lang };
    set({ settings });
    saveSettings(settings);
  },

  generateTestData: () => {
    const { lists: newLists, items: newItems } = generateTestLists();
    const lists = [...get().lists, ...newLists];
    const items = [...get().items, ...newItems];
    set({ lists, items });
    saveLists(lists);
    saveItems(items);
    return newLists.length;
  },

  generateExtremeData: (totalItems = 5000) => {
    const now = Date.now();
    const newLists: ShoppingList[] = [];
    const newItems: ShoppingItem[] = [];
    const icons = ['cart', 'food-variant', 'pill', 'basket', 'coffee', 'carrot', 'cheese', 'paw', 'flower', 'lightbulb'];
    const categories = ['Groceries', 'Beverages', 'Pharmacy', 'Household', 'Electronics'];
    const foods = ['Milk', 'Bread', 'Cheese', 'Eggs', 'Apples', 'Rice', 'Pasta', 'Chicken', 'Fish', 'Butter'];
    let itemId = 0;

    // Distribute items across lists (10-30 items per list, scale number of lists to match totalItems)
    const itemsPerList = Math.min(30, Math.max(10, Math.round(totalItems / 25)));
    const listCount = Math.ceil(totalItems / itemsPerList);
    for (let l = 0; l < listCount; l++) {
      const listId = `extreme_list_${l}`;
      newLists.push({
        id: listId,
        name: `Stress List ${l + 1}`,
        createdAt: now,
        updatedAt: now,
      });
      const itemsPerList = 80 + (l % 40); // 80-119 items per list
      for (let i = 0; i < itemsPerList; i++) {
        newItems.push({
          id: `extreme_item_${itemId++}`,
          listId,
          description: `${foods[i % foods.length]} #${Math.floor(i / foods.length) + 1}`,
          qualifier: '',
          icon: icons[Math.floor(Math.random() * icons.length)],
          foodType: 'non_food',
          purchased: false,
          order: i,
          category: categories[Math.floor(Math.random() * categories.length)],
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    const lists = [...get().lists, ...newLists];
    const items = [...get().items, ...newItems];
    set({ lists, items });
    saveLists(lists);
    saveItems(items);
    return newLists.length;
  },

  addDemoData: () => {
    const { lists: demoLists, items: demoItems } = getDemoData(get().settings.lang);
    // Replace existing demo data with current language version
    const otherLists = get().lists.filter((l) => !l.id.startsWith('list_demo_'));
    const otherItems = get().items.filter((i) => !i.id.startsWith('item_demo_'));
    const lists = [...otherLists, ...demoLists];
    const items = [...otherItems, ...demoItems];
    set({ lists, items });
    saveLists(lists);
    saveItems(items);
  },

  clearAll: async () => {
    set({ lists: [], items: [], settings: DEFAULT_SETTINGS });
    await clearAllData();
  },
}));
