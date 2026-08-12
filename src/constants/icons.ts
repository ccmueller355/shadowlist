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

  // Added high-level categories
  { name: 'television', label: 'Electronics' },
  { name: 'hammer-wrench', label: 'DIY' },
  { name: 'hanger', label: 'Clothing' },
  { name: 'book-open-variant', label: 'Media' },
  { name: 'paw', label: 'Pets' },
  { name: 'flower', label: 'Gardening' },
  { name: 'car', label: 'Automotive' },
  { name: 'baby-bottle-outline', label: 'Baby' },
  { name: 'party-popper', label: 'Party' },
  { name: 'desk-lamp', label: 'Home' },
  { name: 'basketball', label: 'Sports' },
  { name: 'spray-bottle', label: 'Household' },
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
  'television': 'non_food',
  'hammer-wrench': 'non_food',
  'hanger': 'non_food',
  'book-open-variant': 'non_food',
  'paw': 'non_food',
  'flower': 'non_food',
  'car': 'non_food',
  'baby-bottle-outline': 'non_food',
  'party-popper': 'non_food',
  'desk-lamp': 'non_food',
  'basketball': 'non_food',
  'spray-bottle': 'non_food',
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
