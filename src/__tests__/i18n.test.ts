// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { en } from '../i18n/en';
import { de } from '../i18n/de';

describe('i18n', () => {
  const requiredKeys = [
    // Diet names
    'diet.keto.label', 'diet.lowCarb.label', 'diet.slowCarb.label', 'diet.vegetarian.label',
    'diet.vegan.label', 'diet.glutenFree.label', 'diet.paleo.label',
    // Diet descriptions
    'diet.keto.desc', 'diet.lowCarb.desc', 'diet.slowCarb.desc',
    'diet.vegetarian.desc', 'diet.vegan.desc', 'diet.glutenFree.desc',
    'diet.paleo.desc',
    // Food type labels
    'foodType.vegetable', 'foodType.fruit', 'foodType.legume', 'foodType.grain',
    'foodType.meat', 'foodType.seafood', 'foodType.egg', 'foodType.dairy',
    'foodType.fat', 'foodType.convenience', 'foodType.snacks',
    'foodType.beverage', 'foodType.supplement',
    'foodType.nonFood',
    // Themes
    'theme.fixer.label', 'theme.fixer.desc', 'theme.stuffer.label', 'theme.stuffer.desc',
    'theme.decker.label', 'theme.decker.desc', 'theme.cyber.label', 'theme.cyber.desc',
    'theme.terminal.label', 'theme.terminal.desc',
    // Settings
    'settings.sortByCategory', 'settings.diet.label', 'settings.diet.none',
    'settings.diet.descNone', 'settings.language.label',
    'settings.language.en', 'settings.language.de', 'settings.clearAllData',
    // Edit modal
    'edit.title', 'edit.icon', 'edit.description', 'edit.descriptionPlaceholder',
    'edit.amount', 'edit.amountPlaceholder', 'edit.category', 'edit.categoryNone',
    'edit.foodType.label', 'edit.foodType.none',
    // Warnings
    'warning.incompatible', 'warning.suggestion', 'warning.addAnyway',
    'warning.unchecked',
    // General
    'general.save', 'general.cancel', 'general.delete',
    'general.addItemPlaceholder', 'general.emptyListMessage',
    // Categories
    'category.Groceries', 'category.Beverages', 'category.Frozen',
    'category.Bakery', 'category.Deli', 'category.International', 'category.Snacks',
    'category.Pharmacy', 'category.Beauty',
    'category.HomeDIY', 'category.Gardening', 'category.Clothing', 'category.Household',
    'category.Electronics', 'category.Office', 'category.Sports', 'category.Automotive',
    'category.Pets', 'category.Baby', 'category.BooksMedia', 'category.Party',
    'category.Travel', 'category.General', 'category.Other',
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
