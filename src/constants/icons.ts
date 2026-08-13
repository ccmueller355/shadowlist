// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
export const SHOPPING_ICONS = [
  // Produce / Fresh
  { name: 'carrot', label: 'Vegetable' },
  { name: 'fruit-cherries', label: 'Fruit' },

  // Meat & Seafood
  { name: 'food-drumstick-outline', label: 'Meat' },
  { name: 'fish', label: 'Fish' },

  // Dairy & Egg
  { name: 'cheese', label: 'Dairy' },
  { name: 'egg-outline', label: 'Egg' },

  // Staple / Grains / Legume / Fat
  { name: 'bread-slice-outline', label: 'Bakery' },
  { name: 'rice', label: 'Grain' },
  { name: 'seed-outline', label: 'Legume' },
  { name: 'oil', label: 'Oil/Fat' },

  // Frozen / Convenience
  { name: 'snowflake', label: 'Frozen' },
  { name: 'food-variant', label: 'Convenience' },

  // Snacks
  { name: 'candy', label: 'Snacks' },

  // Beverages
  { name: 'cup', label: 'Beverage' },

  // Health / Pharmacy
  { name: 'pill', label: 'Pharmacy' },

  // General / Non-Food
  { name: 'package-variant', label: 'Package' },
  { name: 'cart', label: 'Groceries' },
  { name: 'basket', label: 'Basket' },
];

// Map icon names to FoodType for pre-selection when user picks an icon
export const ICON_FOOD_TYPE_MAP: Record<string, string> = {
  // Meat / Fish / Egg / Dairy
  'food-drumstick-outline': 'meat',
  'fish': 'seafood',
  'egg-outline': 'egg',
  'cheese': 'dairy',

  // Grain / Legume / Fat
  'rice': 'grain',
  'bread-slice-outline': 'grain',
  'seed-outline': 'legume',
  'oil': 'fat',

  // Produce
  'fruit-cherries': 'fruit',
  'carrot': 'vegetable',

  // Snacks / Convenience
  'candy': 'snacks',
  'food-variant': 'convenience',
  'snowflake': 'convenience',

  // Beverages
  'cup': 'beverage',

  // Supplement / Non-food
  'pill': 'supplement',
  'package-variant': 'non_food',
  'cart': 'non_food',
  'basket': 'non_food',
};

export const CATEGORIES = [
  'Groceries',
  'Beverages',
  'Frozen',
  'Bakery',
  'Deli',
  'International',
  'Snacks',
  'Pharmacy',
  'Beauty',
  'Home & DIY',
  'Gardening',
  'Clothing',
  'Household',
  'Electronics',
  'Office',
  'Sports',
  'Automotive',
  'Pets',
  'Baby',
  'Books & Media',
  'Party',
  'Travel',
  'General',
  'Other',
];
