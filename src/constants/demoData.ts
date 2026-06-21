// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { ShoppingList, ShoppingItem } from '../types';

const now = Date.now();

export const DEMO_LISTS: ShoppingList[] = [
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

export const DEMO_ITEMS: ShoppingItem[] = [
  // --- Weekly Groceries (To Shop) ---
  { id: 'item_demo_1', listId: 'list_demo_1', description: 'Milk', qualifier: '2x', icon: 'cart', foodType: null, purchased: false, order: 0, category: 'Groceries', createdAt: now, updatedAt: now },
  { id: 'item_demo_2', listId: 'list_demo_1', description: 'Carrots', qualifier: '1kg', icon: 'food-variant', foodType: null, purchased: false, order: 1, category: 'Groceries', createdAt: now, updatedAt: now },
  { id: 'item_demo_3', listId: 'list_demo_1', description: 'Cheese', qualifier: '200g', icon: 'food-variant', foodType: null, purchased: false, order: 2, category: 'Groceries', createdAt: now, updatedAt: now },
  { id: 'item_demo_4', listId: 'list_demo_1', description: 'Chicken Breast', qualifier: '500g', icon: 'food-drumstick', foodType: null, purchased: false, order: 3, category: 'Groceries', createdAt: now, updatedAt: now },
  { id: 'item_demo_5', listId: 'list_demo_1', description: 'Coffee Beans', qualifier: '1x', icon: 'coffee', foodType: null, purchased: false, order: 4, category: 'Beverages', createdAt: now, updatedAt: now },
  { id: 'item_demo_6', listId: 'list_demo_1', description: 'Bread', qualifier: '1x', icon: 'food-variant', foodType: null, purchased: false, order: 5, category: 'Groceries', createdAt: now, updatedAt: now },

  // --- Weekly Groceries (Recently Bought) ---
  { id: 'item_demo_7', listId: 'list_demo_1', description: 'Apples', qualifier: '3x', icon: 'food-variant', foodType: null, purchased: true, order: 0, category: 'Groceries', createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_8', listId: 'list_demo_1', description: 'Eggs', qualifier: '12x', icon: 'food-variant', foodType: null, purchased: true, order: 1, category: 'Groceries', createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_9', listId: 'list_demo_1', description: 'Salmon', qualifier: '300g', icon: 'food-variant', foodType: null, purchased: true, order: 2, category: 'Groceries', createdAt: now - 172800000, updatedAt: now },
  { id: 'item_demo_10', listId: 'list_demo_1', description: 'Butter', qualifier: '250g', icon: 'food-variant', foodType: null, purchased: true, order: 3, category: 'Groceries', createdAt: now - 172800000, updatedAt: now },

  // --- Party Supplies ---
  { id: 'item_demo_11', listId: 'list_demo_2', description: 'Chips', qualifier: '3 bags', icon: 'package-variant', foodType: null, purchased: false, order: 0, category: 'General', createdAt: now, updatedAt: now },
  { id: 'item_demo_12', listId: 'list_demo_2', description: 'Soda', qualifier: '6x', icon: 'bottle-wine', foodType: null, purchased: false, order: 1, category: 'Beverages', createdAt: now, updatedAt: now },
  { id: 'item_demo_13', listId: 'list_demo_2', description: 'Ice Cream', qualifier: '1 tub', icon: 'food-variant', foodType: null, purchased: false, order: 2, category: 'Groceries', createdAt: now, updatedAt: now },
  { id: 'item_demo_14', listId: 'list_demo_2', description: 'Cups', qualifier: '20x', icon: 'cup', foodType: null, purchased: false, order: 3, category: 'Beverages', createdAt: now, updatedAt: now },
  { id: 'item_demo_15', listId: 'list_demo_2', description: 'Napkins', qualifier: '1 pack', icon: 'toilet-paper', foodType: null, purchased: true, order: 0, category: 'Household', createdAt: now - 86400000, updatedAt: now },
];
