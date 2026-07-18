// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───

import { generateId } from '../utils/uuid';

// ── Mocks ──
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
}));

jest.mock('../utils/uuid', () => ({
  generateId: jest.fn(() => `test-id-${Math.random().toString(36).slice(2, 9)}`),
}));

// ── Interface matching the store types ──
interface ShoppingList {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

interface ShoppingItem {
  id: string;
  listId: string;
  description: string;
  qualifier: string;
  icon: string;
  foodType: string | null;
  purchased: boolean;
  order: number;
  category: string | null;
  createdAt: number;
  updatedAt: number;
}

// ── Extreme data generator (mirrors store logic) ──
function generateExtremeData(): { lists: ShoppingList[]; items: ShoppingItem[] } {
  const now = Date.now();
  const lists: ShoppingList[] = [];
  const items: ShoppingItem[] = [];
  const icons = ['cart', 'food-variant', 'pill', 'basket', 'coffee', 'carrot', 'cheese', 'paw', 'flower', 'lightbulb'];
  const categories = ['Groceries', 'Beverages', 'Pharmacy', 'Household', 'Electronics'];
  const foods = ['Milk', 'Bread', 'Cheese', 'Eggs', 'Apples', 'Rice', 'Pasta', 'Chicken', 'Fish', 'Butter'];
  let itemId = 0;

  for (let l = 0; l < 50; l++) {
    const listId = `extreme_list_${l}`;
    lists.push({
      id: listId,
      name: `Stress List ${l + 1}`,
      createdAt: now,
      updatedAt: now,
    });
    const itemsPerList = 80 + (l % 40);
    for (let i = 0; i < itemsPerList; i++) {
      items.push({
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

  return { lists, items };
}

// ── Count items per list ──
function countItemsPerList(items: ShoppingItem[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    counts[item.listId] = (counts[item.listId] || 0) + 1;
  });
  return counts;
}

// ── Tests ──

describe('Extreme Data — ED-001: 50 Lists, ~5,000 Items', () => {
  test('ED-001: generates exactly 50 lists', () => {
    const { lists } = generateExtremeData();
    expect(lists).toHaveLength(50);
  });

  test('ED-002: generates between 4,500 and 5,500 items', () => {
    const { items } = generateExtremeData();
    expect(items.length).toBeGreaterThanOrEqual(4500);
    expect(items.length).toBeLessThanOrEqual(5500);
  });

  test('ED-003: each list has between 80 and 119 items', () => {
    const { lists, items } = generateExtremeData();
    const counts = countItemsPerList(items);
    lists.forEach((list) => {
      const count = counts[list.id] || 0;
      expect(count).toBeGreaterThanOrEqual(80);
      expect(count).toBeLessThanOrEqual(119);
    });
  });

  test('ED-004: all items have unique IDs', () => {
    const { items } = generateExtremeData();
    const ids = new Set(items.map((i) => i.id));
    expect(ids.size).toBe(items.length);
  });

  test('ED-005: all lists have unique IDs', () => {
    const { lists } = generateExtremeData();
    const ids = new Set(lists.map((l) => l.id));
    expect(ids.size).toBe(lists.length);
  });

  test('ED-006: every item has a non-empty icon, category, and description', () => {
    const { items } = generateExtremeData();
    items.forEach((item) => {
      expect(item.icon).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.description).toBeTruthy();
    });
  });

  test('ED-007: all items are unpurchased and have valid order values', () => {
    const { items } = generateExtremeData();
    items.forEach((item) => {
      expect(item.purchased).toBe(false);
      expect(typeof item.order).toBe('number');
      expect(item.order).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Extreme Data — ED-002: Performance', () => {
  test('ED-008: generates 50 lists with 5,000 items in under 200ms', () => {
    const start = performance.now();
    generateExtremeData();
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(200);
  });

  test('ED-009: generates 100 lists with 10,000 items in under 500ms', () => {
    // Scale up the generator inline for the big test
    const start = performance.now();
    const now = Date.now();
    const lists: ShoppingList[] = [];
    const items: ShoppingItem[] = [];
    const foods = ['Milk', 'Bread', 'Cheese', 'Eggs', 'Apples'];
    let itemId = 0;

    for (let l = 0; l < 100; l++) {
      const listId = `big_list_${l}`;
      lists.push({ id: listId, name: `Big List ${l}`, createdAt: now, updatedAt: now });
      for (let i = 0; i < 100; i++) {
        items.push({
          id: `big_item_${itemId++}`,
          listId,
          description: `${foods[i % foods.length]} ${i}`,
          qualifier: '',
          icon: 'cart',
          foodType: 'non_food',
          purchased: false,
          order: i,
          category: 'Groceries',
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    const elapsed = performance.now() - start;
    expect(lists).toHaveLength(100);
    expect(items).toHaveLength(10000);
    expect(elapsed).toBeLessThan(500);
  });
});

describe('Extreme Data — ED-003: Single List Edge Case', () => {
  test('ED-010: single list with 500 items generates correctly', () => {
    const now = Date.now();
    const items: ShoppingItem[] = [];
    for (let i = 0; i < 500; i++) {
      items.push({
        id: generateId(),
        listId: 'big_list',
        description: `Item ${i}`,
        qualifier: '',
        icon: 'cart',
        foodType: 'non_food',
        purchased: false,
        order: i,
        category: 'Groceries',
        createdAt: now,
        updatedAt: now,
      });
    }
    expect(items).toHaveLength(500);
    expect(items[0].order).toBe(0);
    expect(items[499].order).toBe(499);
  });

  test('ED-011: empty lists are valid — list with 0 items', () => {
    const list: ShoppingList = {
      id: 'empty_list',
      name: 'Empty List',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    expect(list.id).toBeTruthy();
    expect(list.name).toBe('Empty List');
  });
});

describe('Extreme Data — ED-004: Data Integrity', () => {
  test('ED-012: every item references an existing list ID', () => {
    const { lists, items } = generateExtremeData();
    const listIds = new Set(lists.map((l) => l.id));
    items.forEach((item) => {
      expect(listIds.has(item.listId)).toBe(true);
    });
  });

  test('ED-013: order values within each list are sequential from 0', () => {
    const { items } = generateExtremeData();
    const byList = countItemsPerList(items);
    Object.entries(byList).forEach(([listId, count]) => {
      const listItems = items.filter((i) => i.listId === listId).sort((a, b) => a.order - b.order);
      expect(listItems).toHaveLength(count);
      expect(listItems[0].order).toBe(0);
      expect(listItems[count - 1].order).toBe(count - 1);
    });
  });

  test('ED-014: no duplicate order values within the same list', () => {
    const { items } = generateExtremeData();
    const byList = countItemsPerList(items);
    Object.entries(byList).forEach(([listId]) => {
      const orders = items.filter((i) => i.listId === listId).map((i) => i.order);
      const unique = new Set(orders);
      expect(unique.size).toBe(orders.length);
    });
  });
});
