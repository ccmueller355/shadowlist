// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
export const SHOPPING_ICONS = [
  // 🛒 Groceries / Food
  { name: 'cart', label: 'Groceries' },
  { name: 'food-variant', label: 'Food' },
  { name: 'fridge', label: 'Fridge' },
  { name: 'basket', label: 'Basket' },
  { name: 'snowflake', label: 'Frozen' },

  // 🍺 Beverages
  { name: 'bottle-wine', label: 'Beverages' },
  { name: 'coffee', label: 'Coffee' },
  { name: 'cup', label: 'Drinks' },
  { name: 'water', label: 'Water' },

  // 💊 Health / Pharmacy
  { name: 'pill', label: 'Medicine' },
  { name: 'medication', label: 'Pharmacy' },
  { name: 'toothbrush', label: 'Hygiene' },
  { name: 'bandage', label: 'First Aid' },

  // 💄 Beauty / Cosmetics
  { name: 'lipstick', label: 'Cosmetics' },
  { name: 'hair-dryer', label: 'Haircare' },

  // 🏠 Home / DIY / OBI
  { name: 'home-variant', label: 'Home' },
  { name: 'hammer', label: 'Tools' },
  { name: 'wrench', label: 'Hardware' },
  { name: 'paint-bucket', label: 'Paint' },
  { name: 'lightbulb', label: 'Lighting' },
  { name: 'screwdriver', label: 'DIY' },

  // 🌿 Gardening
  { name: 'flower', label: 'Plants' },
  { name: 'tree', label: 'Garden' },
  { name: 'sprinkler', label: 'Watering' },

  // 👕 Clothing / Fashion
  { name: 'hanger', label: 'Clothing' },
  { name: 'tshirt-crew', label: 'Apparel' },
  { name: 'shoe-sneaker', label: 'Shoes' },
  { name: 'sunglasses', label: 'Sunglasses' },

  // 🏡 Household / Kitchen
  { name: 'broom', label: 'Cleaning' },
  { name: 'soap', label: 'Soap' },
  { name: 'toilet-paper', label: 'Paper' },
  { name: 'spray-bottle', label: 'Spray' },
  { name: 'silverware', label: 'Kitchen' },
  { name: 'pot', label: 'Cookware' },

  // 🔌 Electronics
  { name: 'cellphone', label: 'Electronics' },
  { name: 'power-plug', label: 'Cables' },
  { name: 'battery', label: 'Batteries' },

  // ✏️ Office / Stationery
  { name: 'pencil', label: 'Stationery' },
  { name: 'notebook', label: 'Notebook' },

  // 🏃 Sports / Outdoor
  { name: 'bike', label: 'Bike' },
  { name: 'dumbbell', label: 'Fitness' },
  { name: 'campfire', label: 'Outdoor' },

  // 🚗 Automotive
  { name: 'car', label: 'Auto' },
  { name: 'oil', label: 'Oil' },

  // 🐾 Pets
  { name: 'paw', label: 'Pets' },

  // 👶 Baby / Kids
  { name: 'baby-bottle', label: 'Baby' },
  { name: 'toy', label: 'Toys' },

  // 📚 Books / Media
  { name: 'book', label: 'Books' },
  { name: 'gamepad', label: 'Games' },

  // 🎉 Party / Seasonal
  { name: 'balloon', label: 'Party' },
  { name: 'cake', label: 'Cake' },

  // 🧳 Travel
  { name: 'luggage', label: 'Travel' },

  // 🎁 General / Other
  { name: 'shopping', label: 'Shopping' },
  { name: 'store', label: 'Store' },
  { name: 'package-variant', label: 'Package' },
  { name: 'gift', label: 'Gifts' },
  { name: 'clipboard-list', label: 'List' },
];

// Map icon names to FoodType for pre-selection when user picks an icon
export const ICON_FOOD_TYPE_MAP: Record<string, string> = {
  // Meat / Fish / Egg / Dairy
  'food-drumstick-outline': 'meat',
  'fish': 'fish',
  'egg-outline': 'egg',
  'cheese': 'dairy',

  // Grain / Sugar / Fruit / Vegetable
  'bread-slice-outline': 'grain',
  'candy': 'sugar',
  'fruit-cherries': 'fruit',
  'carrot': 'vegetable',

  // Legume / Fat
  'seed-outline': 'legume',
  'oil': 'fat',

  // Beverages
  'cup': 'beverage',
  'bottle-wine': 'beverage',
  'coffee': 'beverage',
  'water': 'beverage',

  // Supplement / Non-food
  'pill': 'supplement',
  'medication': 'supplement',
  'package-variant': 'non_food',
};

export const CATEGORIES = [
  'Groceries',
  'Beverages',
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
