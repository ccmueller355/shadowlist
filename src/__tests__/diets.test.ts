// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { DIET_PROFILES } from '../constants/diets';
import { DietId } from '../types';

describe('DIET_PROFILES', () => {
  const allDietIds: DietId[] = [
    'keto', 'low-carb', 'slow-carb', 'vegetarian', 'vegan', 'gluten-free', 'paleo',
  ];

  it('defines all 7 diet profiles', () => {
    expect(DIET_PROFILES).toHaveLength(7);
  });

  it('covers every DietId value', () => {
    const ids = DIET_PROFILES.map((d) => d.id);
    allDietIds.forEach((id) => {
      expect(ids).toContain(id);
    });
  });

  it('has no duplicate ids', () => {
    const ids = DIET_PROFILES.map((d) => d.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('each profile has id, nameKey, descriptionKey, and rules', () => {
    DIET_PROFILES.forEach((d) => {
      expect(d.id).toBeDefined();
      expect(typeof d.id).toBe('string');
      expect(d.nameKey).toBeDefined();
      expect(d.nameKey).toMatch(/^diet\./);
      expect(d.descriptionKey).toBeDefined();
      expect(d.descriptionKey).toMatch(/^diet\./);
      expect(d.rules).toBeInstanceOf(Array);
      expect(d.rules.length).toBeGreaterThan(0);
    });
  });

  it('each rule has at least one forbidden food type', () => {
    DIET_PROFILES.forEach((d) => {
      d.rules.forEach((rule) => {
        expect(rule.forbid).toBeInstanceOf(Array);
        expect(rule.forbid.length).toBeGreaterThan(0);
      });
    });
  });

  it('keto forbids grain, sugar, fruit, legume', () => {
    const keto = DIET_PROFILES.find((d) => d.id === 'keto')!;
    const forbid = keto.rules.flatMap((r) => r.forbid);
    expect(forbid).toContain('grain');
    expect(forbid).toContain('grain');
    expect(forbid).toContain('fruit');
    expect(forbid).toContain('legume');
  });

  it('vegan forbids meat, fish, dairy, egg', () => {
    const vegan = DIET_PROFILES.find((d) => d.id === 'vegan')!;
    const forbid = vegan.rules.flatMap((r) => r.forbid);
    expect(forbid).toContain('meat');
    expect(forbid).toContain('seafood');
    expect(forbid).toContain('dairy');
    expect(forbid).toContain('egg');
  });

  it('paleo forbids grain, dairy, legume', () => {
    const paleo = DIET_PROFILES.find((d) => d.id === 'paleo')!;
    const forbid = paleo.rules.flatMap((r) => r.forbid);
    expect(forbid).toContain('grain');
    expect(forbid).toContain('dairy');
    expect(forbid).toContain('legume');
  });

  it('gluten-free forbids grain', () => {
    const gf = DIET_PROFILES.find((d) => d.id === 'gluten-free')!;
    const forbid = gf.rules.flatMap((r) => r.forbid);
    expect(forbid).toContain('grain');
  });
});
