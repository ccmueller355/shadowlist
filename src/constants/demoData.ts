// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
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
    name: 'Bakery & Snacks',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_3',
    name: 'Pharmacy & Health',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_4',
    name: 'Household & Cleaning',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_5',
    name: 'Pet Supplies',
    createdAt: now - 86400000,
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
  { id: 'item_demo_11', listId: 'list_demo_1', description: 'Bananas',      qualifier: '1 bunch', icon: 'fruit-cherries',       foodType: 'fruit',      purchased: false, order: 6, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_12', listId: 'list_demo_1', description: 'Rice',         qualifier: '1kg',   icon: 'rice',                  foodType: 'grain',      purchased: false, order: 7, category: 'Groceries',  createdAt: now, updatedAt: now },

  // --- Weekly Groceries (Recently Bought) ---
  { id: 'item_demo_7', listId: 'list_demo_1', description: 'Apples',        qualifier: '3x',    icon: 'fruit-cherries',        foodType: 'fruit',      purchased: true,  order: 0, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_8', listId: 'list_demo_1', description: 'Eggs',          qualifier: '12x',   icon: 'egg-outline',           foodType: 'egg',        purchased: true,  order: 1, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_9', listId: 'list_demo_1', description: 'Salmon',        qualifier: '300g',  icon: 'fish',                  foodType: 'seafood',       purchased: true,  order: 2, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_10', listId: 'list_demo_1', description: 'Butter',       qualifier: '250g',  icon: 'cheese',                foodType: 'dairy',      purchased: true,  order: 3, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },

  // --- Bakery & Snacks (To Shop) ---
  { id: 'item_demo_13', listId: 'list_demo_2', description: 'Croissant',    qualifier: '2x',    icon: 'bread-slice-outline',   foodType: 'grain',      purchased: false, order: 0, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_14', listId: 'list_demo_2', description: 'Bagels',       qualifier: '4x',    icon: 'baguette',                 foodType: 'grain',      purchased: false, order: 1, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_15', listId: 'list_demo_2', description: 'Mixed Nuts',   qualifier: '200g',  icon: 'seed',                  foodType: 'legume',     purchased: false, order: 2, category: 'Snacks',     createdAt: now, updatedAt: now },
  { id: 'item_demo_16', listId: 'list_demo_2', description: 'Dark Chocolate', qualifier: '100g', icon: 'candy',                foodType: 'grain',      purchased: false, order: 3, category: 'Snacks',     createdAt: now, updatedAt: now },
  { id: 'item_demo_17', listId: 'list_demo_2', description: 'Organic Honey', qualifier: '1 jar', icon: 'bee',                 foodType: 'grain',      purchased: true,  order: 4, category: 'Groceries',  createdAt: now - 86400000, updatedAt: now },
  { id: 'item_demo_18', listId: 'list_demo_2', description: 'Cheddar Crackers', qualifier: '1 box', icon: 'pizza',             foodType: 'grain',      purchased: true,  order: 5, category: 'Snacks',     createdAt: now - 86400000, updatedAt: now },

  // --- Pharmacy & Health (To Shop) ---
  { id: 'item_demo_19', listId: 'list_demo_3', description: 'Allergy Tablets', qualifier: '1 pack',  icon: 'pill',            foodType: 'supplement', purchased: false, order: 0, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_20', listId: 'list_demo_3', description: 'Band-Aids',       qualifier: '1 box',   icon: 'bandage',          foodType: 'supplement', purchased: false, order: 1, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_21', listId: 'list_demo_3', description: 'Vitamin C',       qualifier: '60 tabs', icon: 'medication',        foodType: 'supplement', purchased: false, order: 2, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_22', listId: 'list_demo_3', description: 'Lip Balm',        qualifier: '1x',      icon: 'lipstick',          foodType: 'supplement', purchased: false, order: 3, category: 'Beauty',     createdAt: now, updatedAt: now },
  { id: 'item_demo_23', listId: 'list_demo_3', description: 'Toothbrush',      qualifier: '1x',      icon: 'toothbrush',        foodType: 'supplement', purchased: false, order: 4, category: 'Pharmacy',   createdAt: now, updatedAt: now },

  // --- Household & Cleaning (To Shop) ---
  { id: 'item_demo_24', listId: 'list_demo_4', description: 'Dish Soap',       qualifier: '1 bottle', icon: 'hand-wash-outline', foodType: 'non_food',   purchased: false, order: 0, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_25', listId: 'list_demo_4', description: 'Paper Towels',    qualifier: '3 rolls',  icon: 'toilet',            foodType: 'non_food',   purchased: false, order: 1, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_26', listId: 'list_demo_4', description: 'Lightbulbs',      qualifier: '4x',       icon: 'lightbulb',         foodType: 'non_food',   purchased: false, order: 2, category: 'Home & DIY', createdAt: now, updatedAt: now },
  { id: 'item_demo_27', listId: 'list_demo_4', description: 'All-Purpose Cleaner', qualifier: '1x', icon: 'spray-bottle',       foodType: 'non_food',   purchased: false, order: 3, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_28', listId: 'list_demo_4', description: 'Batteries',       qualifier: '8 pack',  icon: 'battery',           foodType: 'non_food',   purchased: false, order: 4, category: 'Electronics', createdAt: now, updatedAt: now },

  // --- Pet Supplies (To Shop) ---
  { id: 'item_demo_29', listId: 'list_demo_5', description: 'Dog Food',        qualifier: '4 kg',    icon: 'paw',               foodType: 'non_food',   purchased: false, order: 0, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_30', listId: 'list_demo_5', description: 'Cat Litter',      qualifier: '10 L',    icon: 'paw',               foodType: 'non_food',   purchased: false, order: 1, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_31', listId: 'list_demo_5', description: 'Fish Food',       qualifier: '1 pack',  icon: 'fish',              foodType: 'non_food',   purchased: false, order: 2, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_32', listId: 'list_demo_5', description: 'Pet Shampoo',     qualifier: '1x',      icon: 'hand-wash-outline', foodType: 'non_food',   purchased: false, order: 3, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_33', listId: 'list_demo_5', description: 'Dog Treats',      qualifier: '1 bag',   icon: 'paw',               foodType: 'non_food',   purchased: false, order: 4, category: 'Pets',       createdAt: now, updatedAt: now },
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
    name: 'Bäckerei & Snacks',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_3',
    name: 'Apotheke & Gesundheit',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_4',
    name: 'Haushalt & Reinigung',
    createdAt: now - 86400000,
    updatedAt: now,
  },
  {
    id: 'list_demo_5',
    name: 'Tierbedarf',
    createdAt: now - 86400000,
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
  { id: 'item_demo_11', listId: 'list_demo_1', description: 'Bananen',      qualifier: '1 Bund', icon: 'fruit-cherries',       foodType: 'fruit',      purchased: false, order: 6, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_12', listId: 'list_demo_1', description: 'Reis',         qualifier: '1kg',   icon: 'rice',                  foodType: 'grain',      purchased: false, order: 7, category: 'Groceries',  createdAt: now, updatedAt: now },

  // --- Wocheneinkauf (Recently Bought) ---
  { id: 'item_demo_7', listId: 'list_demo_1', description: 'Äpfel',         qualifier: '3x',    icon: 'fruit-cherries',        foodType: 'fruit',      purchased: true,  order: 0, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_8', listId: 'list_demo_1', description: 'Eier',          qualifier: '12x',   icon: 'egg-outline',           foodType: 'egg',        purchased: true,  order: 1, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_9', listId: 'list_demo_1', description: 'Lachs',         qualifier: '300g',  icon: 'fish',                  foodType: 'seafood',       purchased: true,  order: 2, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_10', listId: 'list_demo_1', description: 'Butter',       qualifier: '250g',  icon: 'cheese',                foodType: 'dairy',      purchased: true,  order: 3, category: 'Groceries',  createdAt: now - 172800000, updatedAt: now },

  // --- Bäckerei & Snacks (To Shop) ---
  { id: 'item_demo_13', listId: 'list_demo_2', description: 'Croissant',    qualifier: '2x',    icon: 'bread-slice-outline',   foodType: 'grain',      purchased: false, order: 0, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_14', listId: 'list_demo_2', description: 'Bagels',       qualifier: '4x',    icon: 'baguette',                 foodType: 'grain',      purchased: false, order: 1, category: 'Groceries',  createdAt: now, updatedAt: now },
  { id: 'item_demo_15', listId: 'list_demo_2', description: 'Nüsse gemischt', qualifier: '200g', icon: 'seed',                 foodType: 'legume',     purchased: false, order: 2, category: 'Snacks',     createdAt: now, updatedAt: now },
  { id: 'item_demo_16', listId: 'list_demo_2', description: 'Zartbitterschokolade', qualifier: '100g', icon: 'candy',       foodType: 'grain',      purchased: false, order: 3, category: 'Snacks',     createdAt: now, updatedAt: now },
  { id: 'item_demo_17', listId: 'list_demo_2', description: 'Waldhonig',    qualifier: '1 Glas', icon: 'bee',                foodType: 'grain',      purchased: true,  order: 4, category: 'Groceries',  createdAt: now - 86400000, updatedAt: now },
  { id: 'item_demo_18', listId: 'list_demo_2', description: 'Cheddar Cracker', qualifier: '1 Pack', icon: 'pizza',           foodType: 'grain',      purchased: true,  order: 5, category: 'Snacks',     createdAt: now - 86400000, updatedAt: now },

  // --- Apotheke & Gesundheit (To Shop) ---
  { id: 'item_demo_19', listId: 'list_demo_3', description: 'Allergietabletten', qualifier: '1 Pack',  icon: 'pill',        foodType: 'supplement', purchased: false, order: 0, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_20', listId: 'list_demo_3', description: 'Pflaster',          qualifier: '1 Box',   icon: 'bandage',      foodType: 'supplement', purchased: false, order: 1, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_21', listId: 'list_demo_3', description: 'Vitamin C',         qualifier: '60 Tab.', icon: 'medication',   foodType: 'supplement', purchased: false, order: 2, category: 'Pharmacy',   createdAt: now, updatedAt: now },
  { id: 'item_demo_22', listId: 'list_demo_3', description: 'Lippenbalsam',      qualifier: '1x',      icon: 'lipstick',     foodType: 'supplement', purchased: false, order: 3, category: 'Beauty',     createdAt: now, updatedAt: now },
  { id: 'item_demo_23', listId: 'list_demo_3', description: 'Zahnbürste',        qualifier: '1x',      icon: 'toothbrush',   foodType: 'supplement', purchased: false, order: 4, category: 'Pharmacy',   createdAt: now, updatedAt: now },

  // --- Haushalt & Reinigung (To Shop) ---
  { id: 'item_demo_24', listId: 'list_demo_4', description: 'Spülmittel',        qualifier: '1 Flasche', icon: 'hand-wash-outline', foodType: 'non_food', purchased: false, order: 0, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_25', listId: 'list_demo_4', description: 'Küchenrolle',       qualifier: '3 Rollen',  icon: 'toilet',            foodType: 'non_food', purchased: false, order: 1, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_26', listId: 'list_demo_4', description: 'Glühbirnen',        qualifier: '4x',        icon: 'lightbulb',         foodType: 'non_food', purchased: false, order: 2, category: 'Home & DIY', createdAt: now, updatedAt: now },
  { id: 'item_demo_27', listId: 'list_demo_4', description: 'Allzweckreiniger',  qualifier: '1x',        icon: 'spray-bottle',      foodType: 'non_food', purchased: false, order: 3, category: 'Household',  createdAt: now, updatedAt: now },
  { id: 'item_demo_28', listId: 'list_demo_4', description: 'Batterien',         qualifier: '8er Pack',  icon: 'battery',           foodType: 'non_food', purchased: false, order: 4, category: 'Electronics', createdAt: now, updatedAt: now },

  // --- Tierbedarf (To Shop) ---
  { id: 'item_demo_29', listId: 'list_demo_5', description: 'Hundefutter',       qualifier: '4 kg',     icon: 'paw',               foodType: 'non_food', purchased: false, order: 0, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_30', listId: 'list_demo_5', description: 'Katzenstreu',       qualifier: '10 L',     icon: 'paw',               foodType: 'non_food', purchased: false, order: 1, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_31', listId: 'list_demo_5', description: 'Fischfutter',       qualifier: '1 Pack',   icon: 'fish',              foodType: 'non_food', purchased: false, order: 2, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_32', listId: 'list_demo_5', description: 'Tiershampoo',       qualifier: '1x',       icon: 'hand-wash-outline', foodType: 'non_food', purchased: false, order: 3, category: 'Pets',       createdAt: now, updatedAt: now },
  { id: 'item_demo_33', listId: 'list_demo_5', description: 'Hundeleckerli',     qualifier: '1 Tüte',   icon: 'paw',               foodType: 'non_food', purchased: false, order: 4, category: 'Pets',       createdAt: now, updatedAt: now },
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
