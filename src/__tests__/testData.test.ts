// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { TIER_1_ITEMS, TIER_2_ITEMS, TestItem } from '../constants/testData';

const ALL_ITEMS: TestItem[] = [...TIER_1_ITEMS, ...TIER_2_ITEMS];

describe('Test Data Pool — FR-004: 200+ items', () => {
  test('T011: TIER_1_ITEMS has exactly 100 items', () => {
    expect(TIER_1_ITEMS).toHaveLength(100);
  });

  test('T012: TIER_2_ITEMS has at least 100 items', () => {
    expect(TIER_2_ITEMS.length).toBeGreaterThanOrEqual(100);
  });

  test('pool has 200+ items total', () => {
    expect(ALL_ITEMS.length).toBeGreaterThanOrEqual(200);
  });
});

describe('Test Data Pool — FR-005: Two tiers', () => {
  test('T016: all TIER_1 items have tier: 1', () => {
    for (const item of TIER_1_ITEMS) {
      expect(item.tier).toBe(1);
    }
  });

  test('T017: all TIER_2 items have tier: 2', () => {
    for (const item of TIER_2_ITEMS) {
      expect(item.tier).toBe(2);
    }
  });
});

describe('Test Data Pool — FR-009: All items typed', () => {
  test('T013: all items have non-null foodType', () => {
    for (const item of ALL_ITEMS) {
      expect(item.foodType).not.toBeNull();
    }
  });

  test('T014: all items have non-empty icon', () => {
    for (const item of ALL_ITEMS) {
      expect(item.icon).toBeTruthy();
    }
  });

  test('T015: all items have valid category', () => {
    const validCategories = ['Groceries', 'Beverages', 'Snacks', 'Frozen', 'Household', 'Personal', 'Electronics', 'Pet', 'Baby', 'Office', 'Garden', 'Auto', 'Sports', 'Books', 'Toys', 'Music', 'Clothing', 'Shoes', 'Pharmacy', 'General'];
    for (const item of ALL_ITEMS) {
      expect(validCategories).toContain(item.category);
    }
  });

  test('T018: all items have non-empty EN and DE names', () => {
    for (const item of ALL_ITEMS) {
      expect(item.nameEn).toBeTruthy();
      expect(item.nameDe).toBeTruthy();
    }
  });
});

describe('Test Data Pool — No duplicates', () => {
  test('TIER_1 has no duplicate nameEn values', () => {
    const names = TIER_1_ITEMS.map(i => i.nameEn.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  test('TIER_2 has no duplicate nameEn values', () => {
    const names = TIER_2_ITEMS.map(i => i.nameEn.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});

import { generateTestLists, TestListParams } from '../constants/testData';

describe('Test List Generator — FR-006 to FR-011', () => {
  test('T023: generateTestLists() returns listCount lists', () => {
    const result = generateTestLists({ listCount: 5 });
    expect(result.lists).toHaveLength(5);
    expect(result.items.length).toBeGreaterThan(0);
  });

  test('T024: each generated list has 8-25 items (default)', () => {
    const result = generateTestLists({ listCount: 5 });
    const counts = result.lists.map(l =>
      result.items.filter(i => i.listId === l.id).length
    );
    for (const c of counts) {
      expect(c).toBeGreaterThanOrEqual(8);
      expect(c).toBeLessThanOrEqual(25);
    }
  });

  test('T025: no duplicate items within a single generated list', () => {
    const result = generateTestLists({ listCount: 3 });
    for (const list of result.lists) {
      const itemDescs = result.items
        .filter(i => i.listId === list.id)
        .map(i => i.description.toLowerCase());
      expect(new Set(itemDescs).size).toBe(itemDescs.length);
    }
  });

  test('T026: every generated item has non-null foodType', () => {
    const result = generateTestLists({ listCount: 3 });
    for (const item of result.items) {
      expect(item.foodType).not.toBeNull();
    }
  });

  test('T027: generateTestLists() accepts custom params', () => {
    const result = generateTestLists({ listCount: 2, minItems: 5, maxItems: 10, highTierWeight: 90 });
    expect(result.lists).toHaveLength(2);
    for (const list of result.lists) {
      const count = result.items.filter(i => i.listId === list.id).length;
      expect(count).toBeGreaterThanOrEqual(5);
      expect(count).toBeLessThanOrEqual(10);
    }
  });

  test('T028: over 30 runs, all items have non-null foodType', () => {
    for (let r = 0; r < 30; r++) {
      const result = generateTestLists({ listCount: 2 });
      for (const item of result.items) {
        expect(item.foodType).not.toBeNull();
      }
    }
  });

  test('T030: generateTestLists() completes in under 100ms for default params', () => {
    const start = performance.now();
    generateTestLists({ listCount: 5 });
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(100);
  });
});
