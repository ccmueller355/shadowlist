// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { ShoppingList, ShoppingItem, AppLang } from '../types';

const now = Date.now();

// ─── ENGLISH DEMO DATA ───

export const DEMO_LISTS_EN: ShoppingList[] = [
  {
    id: 'list_demo_1',
    name: 'Weekly Groceries',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_2',
    name: 'Party Supplies',
    createdAt: now - 43200000,
    updatedAt: now,
  },
];

export const DEMO_ITEMS_EN: ShoppingItem[] = [
  // --- Weekly Groceries (To Shop) ---
  { id: 'item_demo_1', listId: 'list_demo_1', description: 'Milk',          qualifier: '2x',    icon: 'cheese',                foodType: 'dairy',      purchased: false, order: 0, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_2', listId: 'list_demo_1', description: 'Carrots',       qualifier: '1kg',   icon: 'carrot',                foodType: 'vegetable',  purchased: false, order: 1, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_3', listId: 'list_demo_1', description: 'Cheese',        qualifier: '200g',  icon: 'cheese',                foodType: 'dairy',      purchased: false, order: 2, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_4', listId: 'list_demo_1', description: 'Chicken Breast', qualifier: '500g', icon: 'food-drumstick-outline', foodType: 'meat',       purchased: false, order: 3, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_5', listId: 'list_demo_1', description: 'Coffee Beans',  qualifier: '1x',    icon: 'coffee',                foodType: 'beverage',   purchased: false, order: 4, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_6', listId: 'list_demo_1', description: 'Bread',         qualifier: '1x',    icon: 'bread-slice-outline',   foodType: 'grain',      purchased: false, order: 5, category: 'Groceries',  createdAt: now, updatedAt: now },

  // --- Weekly Groceries (Recently Bought) ---
  { id: 'item_demo_7', listId: 'list_demo_1', description: 'Apples',        qualifier: '3x',    icon: 'fruit-cherries',        foodType: 'fruit',      purchased: true,  order: 0, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_8', listId: 'list_demo_1', description: 'Eggs',          qualifier: '12x',   icon: 'egg-outline',           foodType: 'egg',        purchased: true,  order: 1, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_9', listId: 'list_demo_1', description: 'Salmon',        qualifier: '300g',  icon: 'fish',                  foodType: 'fish',       purchased: true,  order: 2, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_10', listId: 'list_demo_1', description: 'Butter',       qualifier: '250g',  icon: 'cheese',                foodType: 'dairy',      purchased: true,  order: 3, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },

  // --- Party Supplies ---
  { id: 'item_demo_11', listId: 'list_demo_2', description: 'Chips',        qualifier: '3 bags', icon: 'food-variant',         foodType: 'grain',      purchased: false, order: 0, category: 'General',    createdAt: now, updatedAt: now },
  { id: 'item_demo_12', listId: 'list_demo_2', description: 'Soda',         qualifier: '6x',     icon: 'bottle-wine',           foodType: 'beverage',   purchased: false, order: 1, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_13', listId: 'list_demo_2', description: 'Ice Cream',    qualifier: '1 tub',  icon: 'candy',                 foodType: 'sugar',      purchased: false, order: 2, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_14', listId: 'list_demo_2', description: 'Cups',         qualifier: '20x',    icon: 'cup',                   foodType: 'non_food',   purchased: false, order: 3, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_15', listId: 'list_demo_2', description: 'Napkins',      qualifier: '1 pack', icon: 'toilet-paper',          foodType: 'non_food',   purchased: true,  order: 0, category: 'Household',  createdAt: now - 86400000, updatedAt: now },
];

// ─── GERMAN DEMO DATA ───

export const DEMO_LISTS_DE: ShoppingList[] = [
  {
    id: 'list_demo_1',
    name: 'Wocheneinkauf',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_2',
    name: 'Partybedarf',
    createdAt: now - 43200000,
    updatedAt: now,
  },
];

export const DEMO_ITEMS_DE: ShoppingItem[] = [
  // --- Wocheneinkauf (To Shop) ---
  { id: 'item_demo_1', listId: 'list_demo_1', description: 'Milch',         qualifier: '2x',    icon: 'cheese',                foodType: 'dairy',      purchased: false, order: 0, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_2', listId: 'list_demo_1', description: 'Karotten',      qualifier: '1kg',   icon: 'carrot',                foodType: 'vegetable',  purchased: false, order: 1, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_3', listId: 'list_demo_1', description: 'Käse',          qualifier: '200g',  icon: 'cheese',                foodType: 'dairy',      purchased: false, order: 2, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_4', listId: 'list_demo_1', description: 'Hähnchenbrust', qualifier: '500g',  icon: 'food-drumstick-outline', foodType: 'meat',       purchased: false, order: 3, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_5', listId: 'list_demo_1', description: 'Kaffeebohnen',  qualifier: '1x',    icon: 'coffee',                foodType: 'beverage',   purchased: false, order: 4, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_6', listId: 'list_demo_1', description: 'Brot',          qualifier: '1x',    icon: 'bread-slice-outline',   foodType: 'grain',      purchased: false, order: 5, category: 'Groceries',  createdAt: now, updatedAt: now },

  // --- Wocheneinkauf (Recently Bought) ---
  { id: 'item_demo_7', listId: 'list_demo_1', description: 'Äpfel',         qualifier: '3x',    icon: 'fruit-cherries',        foodType: 'fruit',      purchased: true,  order: 0, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_8', listId: 'list_demo_1', description: 'Eier',          qualifier: '12x',   icon: 'egg-outline',           foodType: 'egg',        purchased: true,  order: 1, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_9', listId: 'list_demo_1', description: 'Lachs',         qualifier: '300g',  icon: 'fish',                  foodType: 'fish',       purchased: true,  order: 2, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_10', listId: 'list_demo_1', description: 'Butter',       qualifier: '250g',  icon: 'cheese',                foodType: 'dairy',      purchased: true,  order: 3, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },

  // --- Partybedarf ---
  { id: 'item_demo_11', listId: 'list_demo_2', description: 'Chips',        qualifier: '3 bags', icon: 'food-variant',         foodType: 'grain',      purchased: false, order: 0, category: 'General',    createdAt: now, updatedAt: now },
  { id: 'item_demo_12', listId: 'list_demo_2', description: 'Limonade',     qualifier: '6x',     icon: 'bottle-wine',           foodType: 'beverage',   purchased: false, order: 1, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_13', listId: 'list_demo_2', description: 'Eiscreme',     qualifier: '1 tub',  icon: 'candy',                 foodType: 'sugar',      purchased: false, order: 2, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_14', listId: 'list_demo_2', description: 'Becher',       qualifier: '20x',    icon: 'cup',                   foodType: 'non_food',   purchased: false, order: 3, category: 'Beverages',  createdAt: now, updatedAt: now },
  { id: 'item_demo_15', listId: 'list_demo_2', description: 'Servietten',   qualifier: '1 pack', icon: 'toilet-paper',          foodType: 'non_food',   purchased: true,  order: 0, category: 'Household',  createdAt: now - 86400000, updatedAt: now },
];

// ─── LANGUAGE SELECTION ───

export interface DemoDataSet {
  lists: ShoppingList[];
  items: ShoppingItem[];
}

export function getDemoData(lang: AppLang): DemoDataSet {
  if (lang === 'de') {
    return { lists: DEMO_LISTS_DE, items: DEMO_ITEMS_DE };
  }
  return { lists: DEMO_LISTS_EN, items: DEMO_ITEMS_EN };
}

// Re-export EN as default for backward compatibility
export const DEMO_LISTS = DEMO_LISTS_EN;
export const DEMO_ITEMS = DEMO_ITEMS_EN;
