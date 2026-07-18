// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { FoodType, FoodTypeInfo } from '../types';

/**
 * Food types ordered by supermarket aisle / food pyramid layout:
 * fresh produce → refrigerated → dry goods → beverages → other
 */
export const FOOD_TYPES: FoodTypeInfo[] = [
  { id: 'fruit',       labelKey: 'foodType.fruit',       icon: 'fruit-cherries' },
  { id: 'vegetable',   labelKey: 'foodType.vegetable',   icon: 'carrot' },
  { id: 'legume',      labelKey: 'foodType.legume',      icon: 'seed-outline' },
  { id: 'meat',        labelKey: 'foodType.meat',        icon: 'food-drumstick-outline' },
  { id: 'seafood',     labelKey: 'foodType.seafood',     icon: 'fish' },
  { id: 'egg',         labelKey: 'foodType.egg',         icon: 'egg-outline' },
  { id: 'dairy',       labelKey: 'foodType.dairy',       icon: 'cheese' },
  { id: 'frozen',      labelKey: 'foodType.frozen',      icon: 'snowflake' },
  { id: 'bakery',      labelKey: 'foodType.bakery',      icon: 'bread-slice-outline' },
  { id: 'snacks',      labelKey: 'foodType.snacks',      icon: 'candy' },
  { id: 'sugar',       labelKey: 'foodType.sugar',       icon: 'corn' },
  { id: 'processed',   labelKey: 'foodType.processed',   icon: 'food-variant' },
  { id: 'fat',         labelKey: 'foodType.fat',          icon: 'oil' },
  { id: 'beverage',    labelKey: 'foodType.beverage',    icon: 'cup' },
  { id: 'supplement',  labelKey: 'foodType.supplement',  icon: 'pill' },
  { id: 'non_food',    labelKey: 'foodType.nonFood',     icon: 'package-variant' },
];

/**
 * Maps each FoodType to a default shopping category.
 * Used for auto-pre-selection when the name resolver matches a food type.
 * non_food → null — no automatic categorization for non-food items.
 */
export const FOOD_TYPE_TO_CATEGORY: Record<FoodType, string | null> = {
  meat:       'Groceries',
  seafood:    'Groceries',
  egg:        'Groceries',
  dairy:      'Groceries',
  frozen:     'Frozen',
  bakery:     'Groceries',
  sugar:      'Groceries',
  fruit:      'Groceries',
  vegetable:  'Groceries',
  legume:     'Groceries',
  snacks:     'Groceries',
  processed:  'Groceries',
  fat:        'Groceries',
  beverage:   'Beverages',
  supplement: 'Pharmacy',
  non_food:   null,
};

/**
 * Sort order for items within a category group.
 * Follows supermarket layout: fresh → refrigerated → dry goods → beverages → other.
 * Items with unrecognized food types sort last.
 */
export const FOOD_TYPE_SORT_ORDER: FoodType[] = [
  'fruit',
  'vegetable',
  'legume',
  'meat',
  'seafood',
  'egg',
  'dairy',
  'frozen',
  'bakery',
  'snacks',
  'sugar',
  'processed',
  'fat',
  'beverage',
  'supplement',
  'non_food',
];
