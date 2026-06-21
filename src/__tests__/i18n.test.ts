// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { en } from '../i18n/en';
import { de } from '../i18n/de';

describe('i18n', () => {
  const requiredKeys = [
    // Diet names
    'diet.keto', 'diet.lowCarb', 'diet.slowCarb', 'diet.vegetarian',
    'diet.vegan', 'diet.glutenFree', 'diet.paleo',
    // Diet descriptions
    'diet.keto.desc', 'diet.lowCarb.desc', 'diet.slowCarb.desc',
    'diet.vegetarian.desc', 'diet.vegan.desc', 'diet.glutenFree.desc',
    'diet.paleo.desc',
    // Food type labels
    'foodType.meat', 'foodType.fish', 'foodType.egg', 'foodType.dairy',
    'foodType.grain', 'foodType.sugar', 'foodType.fruit', 'foodType.vegetable',
    'foodType.legume', 'foodType.fat', 'foodType.beverage', 'foodType.supplement',
    'foodType.nonFood',
    // Settings
    'settings.diet', 'settings.diet.none', 'settings.language',
    'settings.language.en', 'settings.language.de',
    // Warnings
    'warning.incompatible', 'warning.suggestion', 'warning.addAnyway',
    'warning.unchecked',
    // Edit modal
    'edit.foodType', 'edit.foodType.none',
    // General
    'general.save', 'general.cancel',
  ];

  const flattenKeys = (obj: Record<string, unknown>, prefix = ''): string[] =>
    Object.entries(obj).flatMap(([key, value]) =>
      typeof value === 'object' && value !== null
        ? flattenKeys(value as Record<string, unknown>, `${prefix}${key}.`)
        : [`${prefix}${key}`]
    );

  it('en has all required keys', () => {
    const keys = flattenKeys(en);
    requiredKeys.forEach((k) => {
      expect(keys).toContain(k);
    });
  });

  it('de has all required keys', () => {
    const keys = flattenKeys(de);
    requiredKeys.forEach((k) => {
      expect(keys).toContain(k);
    });
  });

  it('en and de have the same keyset', () => {
    const enKeys = flattenKeys(en).sort();
    const deKeys = flattenKeys(de).sort();
    expect(enKeys).toEqual(deKeys);
  });
});
