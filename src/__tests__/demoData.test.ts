// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { DEMO_LISTS_EN, DEMO_ITEMS_EN, DEMO_LISTS_DE, DEMO_ITEMS_DE, getDemoData } from '../constants/demoData';

describe('Demo Data — FR-001: 15+ items, 2+ lists with foodType', () => {
  test('T001: has 15+ items across all English lists', () => {
    expect(DEMO_ITEMS_EN.length).toBeGreaterThanOrEqual(15);
  });

  test('T001 (DE): has 15+ items across all German lists', () => {
    expect(DEMO_ITEMS_DE.length).toBeGreaterThanOrEqual(15);
  });

  test('T002: has 2+ English lists', () => {
    expect(DEMO_LISTS_EN.length).toBeGreaterThanOrEqual(2);
  });

  test('T002 (DE): has 2+ German lists', () => {
    expect(DEMO_LISTS_DE.length).toBeGreaterThanOrEqual(2);
  });

  test('T003: every English demo item has non-null foodType', () => {
    for (const item of DEMO_ITEMS_EN) {
      expect(item.foodType).not.toBeNull();
    }
  });

  test('T003 (DE): every German demo item has non-null foodType', () => {
    for (const item of DEMO_ITEMS_DE) {
      expect(item.foodType).not.toBeNull();
    }
  });

  test('T004: demo data includes both EN and DE list names', () => {
    const enNames = DEMO_LISTS_EN.map(l => l.name).join(', ');
    const deNames = DEMO_LISTS_DE.map(l => l.name).join(', ');
    expect(enNames.length).toBeGreaterThan(0);
    expect(deNames.length).toBeGreaterThan(0);
    // Lists should have different names (translated)
    expect(DEMO_LISTS_EN[0].name).not.toBe(DEMO_LISTS_DE[0].name);
  });

  test('T005: getDemoData("de") returns German list names', () => {
    const de = getDemoData('de');
    // At least the first list name should be German
    const en = getDemoData('en');
    expect(de.lists[0].name).not.toBe(en.lists[0].name);
  });

  test('T006: getDemoData runs without error', () => {
    const en = getDemoData('en');
    const de = getDemoData('de');
    expect(en.lists.length).toBeGreaterThan(0);
    expect(en.items.length).toBeGreaterThan(0);
    expect(de.lists.length).toBeGreaterThan(0);
    expect(de.items.length).toBeGreaterThan(0);
  });

  test('demo EN lists reference only EN items (by listId match)', () => {
    const listIds = new Set(DEMO_LISTS_EN.map(l => l.id));
    for (const item of DEMO_ITEMS_EN) {
      expect(listIds.has(item.listId)).toBe(true);
    }
  });

  test('demo DE lists reference only DE items (by listId match)', () => {
    const listIds = new Set(DEMO_LISTS_DE.map(l => l.id));
    for (const item of DEMO_ITEMS_DE) {
      expect(listIds.has(item.listId)).toBe(true);
    }
  });
});
