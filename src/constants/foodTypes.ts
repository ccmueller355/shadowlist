// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { FoodType, FoodTypeInfo } from '../types';

/**
 * Food types ordered by supermarket aisle / food pyramid layout:
 * fresh produce → refrigerated → dry goods → beverages → other
 */
export const FOOD_TYPES: FoodTypeInfo[] = [
  { id: 'vegetable',   labelKey: 'foodType.vegetable',   icon: 'carrot' },
  { id: 'fruit',       labelKey: 'foodType.fruit',       icon: 'fruit-cherries' },
  { id: 'legume',      labelKey: 'foodType.legume',      icon: 'seed-outline' },
  { id: 'grain',       labelKey: 'foodType.grain',       icon: 'rice' },
  { id: 'meat',        labelKey: 'foodType.meat',        icon: 'food-drumstick-outline' },
  { id: 'seafood',     labelKey: 'foodType.seafood',     icon: 'fish' },
  { id: 'egg',         labelKey: 'foodType.egg',         icon: 'egg-outline' },
  { id: 'dairy',       labelKey: 'foodType.dairy',       icon: 'cheese' },
  { id: 'fat',         labelKey: 'foodType.fat',          icon: 'oil' },
  { id: 'convenience', labelKey: 'foodType.convenience', icon: 'food-variant' },
  { id: 'snacks',      labelKey: 'foodType.snacks',      icon: 'candy' },
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
  vegetable:  'Groceries',
  fruit:      'Groceries',
  legume:     'Groceries',
  grain:      'Groceries',
  meat:       'Groceries',
  seafood:    'Groceries',
  egg:        'Groceries',
  dairy:      'Groceries',
  fat:        'Groceries',
  convenience:'Groceries',
  snacks:     'Snacks',
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
  'vegetable',
  'fruit',
  'legume',
  'grain',
  'meat',
  'seafood',
  'egg',
  'dairy',
  'fat',
  'convenience',
  'snacks',
  'beverage',
  'supplement',
  'non_food',
];
