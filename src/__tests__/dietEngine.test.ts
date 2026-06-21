// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { checkItem } from '../utils/dietEngine';
import { DIET_PROFILES } from '../constants/diets';

describe('dietEngine', () => {
  describe('checkItem', () => {
    it('returns compatible: true for matching food types', () => {
      const keto = DIET_PROFILES.find((d) => d.id === 'keto')!;
      expect(checkItem(keto, 'meat').compatible).toBe(true);
      expect(checkItem(keto, 'fish').compatible).toBe(true);
      expect(checkItem(keto, 'egg').compatible).toBe(true);
      expect(checkItem(keto, 'dairy').compatible).toBe(true);
      expect(checkItem(keto, 'vegetable').compatible).toBe(true);
      expect(checkItem(keto, 'fat').compatible).toBe(true);
      expect(checkItem(keto, 'beverage').compatible).toBe(true);
    });

    it('returns compatible: false for forbidden food types', () => {
      const keto = DIET_PROFILES.find((d) => d.id === 'keto')!;
      expect(checkItem(keto, 'grain').compatible).toBe(false);
      expect(checkItem(keto, 'sugar').compatible).toBe(false);
      expect(checkItem(keto, 'fruit').compatible).toBe(false);
      expect(checkItem(keto, 'legume').compatible).toBe(false);
    });

    it('returns compatible: true for non_food regardless of diet', () => {
      DIET_PROFILES.forEach((d) => {
        expect(checkItem(d, 'non_food').compatible).toBe(true);
      });
    });

    it('returns warning message when incompatible', () => {
      const keto = DIET_PROFILES.find((d) => d.id === 'keto')!;
      const result = checkItem(keto, 'grain');
      expect(result.compatible).toBe(false);
      expect(result.warnings).toBeDefined();
      expect(result.warnings!.length).toBeGreaterThan(0);
    });

    it('returns no warnings when compatible', () => {
      const keto = DIET_PROFILES.find((d) => d.id === 'keto')!;
      const result = checkItem(keto, 'meat');
      expect(result.warnings).toBeUndefined();
    });
  });

  describe('× all 7 diets × sample items', () => {
    it('vegetarian forbids meat and fish', () => {
      const veg = DIET_PROFILES.find((d) => d.id === 'vegetarian')!;
      expect(checkItem(veg, 'meat').compatible).toBe(false);
      expect(checkItem(veg, 'fish').compatible).toBe(false);
      expect(checkItem(veg, 'vegetable').compatible).toBe(true);
    });

    it('vegan forbids meat, fish, dairy, and egg', () => {
      const vegan = DIET_PROFILES.find((d) => d.id === 'vegan')!;
      expect(checkItem(vegan, 'meat').compatible).toBe(false);
      expect(checkItem(vegan, 'fish').compatible).toBe(false);
      expect(checkItem(vegan, 'dairy').compatible).toBe(false);
      expect(checkItem(vegan, 'egg').compatible).toBe(false);
      expect(checkItem(vegan, 'fruit').compatible).toBe(true);
    });

    it('paleo forbids grain, dairy, legume', () => {
      const paleo = DIET_PROFILES.find((d) => d.id === 'paleo')!;
      expect(checkItem(paleo, 'grain').compatible).toBe(false);
      expect(checkItem(paleo, 'dairy').compatible).toBe(false);
      expect(checkItem(paleo, 'legume').compatible).toBe(false);
      expect(checkItem(paleo, 'meat').compatible).toBe(true);
    });

    it('gluten-free forbids grain', () => {
      const gf = DIET_PROFILES.find((d) => d.id === 'gluten-free')!;
      expect(checkItem(gf, 'grain').compatible).toBe(false);
      expect(checkItem(gf, 'dairy').compatible).toBe(true);
    });

    it('low-carb forbids grain, sugar, fruit', () => {
      const lc = DIET_PROFILES.find((d) => d.id === 'low-carb')!;
      expect(checkItem(lc, 'grain').compatible).toBe(false);
      expect(checkItem(lc, 'sugar').compatible).toBe(false);
      expect(checkItem(lc, 'fruit').compatible).toBe(false);
      expect(checkItem(lc, 'meat').compatible).toBe(true);
    });

    it('slow-carb forbids grain, dairy, sugar, fruit', () => {
      const sc = DIET_PROFILES.find((d) => d.id === 'slow-carb')!;
      expect(checkItem(sc, 'grain').compatible).toBe(false);
      expect(checkItem(sc, 'dairy').compatible).toBe(false);
      expect(checkItem(sc, 'sugar').compatible).toBe(false);
      expect(checkItem(sc, 'fruit').compatible).toBe(false);
      expect(checkItem(sc, 'meat').compatible).toBe(true);
      expect(checkItem(sc, 'legume').compatible).toBe(true);
    });
  });
});
