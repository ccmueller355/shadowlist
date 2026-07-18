// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { FOOD_TYPES } from '../constants/foodTypes';
import { FoodType } from '../types';

describe('FOOD_TYPES', () => {
  const allFoodTypes: FoodType[] = [
    'meat', 'seafood', 'egg', 'dairy',
    'bakery', 'sugar', 'fruit', 'vegetable',
    'legume', 'fat', 'beverage', 'supplement',
    'snacks', 'processed', 'frozen',
    'non_food',
  ];

  it('defines all 16 food types', () => {
    expect(FOOD_TYPES).toHaveLength(16);
  });

  it('covers every FoodType value', () => {
    const ids = FOOD_TYPES.map((ft) => ft.id);
    allFoodTypes.forEach((type) => {
      expect(ids).toContain(type);
    });
  });

  it('has no duplicate ids', () => {
    const ids = FOOD_TYPES.map((ft) => ft.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('each entry has id, labelKey, and icon', () => {
    FOOD_TYPES.forEach((ft) => {
      expect(ft.id).toBeDefined();
      expect(typeof ft.id).toBe('string');
      expect(ft.labelKey).toBeDefined();
      expect(typeof ft.labelKey).toBe('string');
      expect(ft.icon).toBeDefined();
      expect(typeof ft.icon).toBe('string');
    });
  });

  it('labelKey starts with "foodType."', () => {
    FOOD_TYPES.forEach((ft) => {
      expect(ft.labelKey).toMatch(/^foodType\./);
    });
  });
});
