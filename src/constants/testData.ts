// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
// 200+ item bilingual grocery pool for statistical test list generation.
// Two tiers: TIER_1 (top 100 frequency) and TIER_2 (long-tail, 100+ items).

import { FoodType, ShoppingList, ShoppingItem } from '../types';
import { generateId } from '../utils/uuid';

export interface TestItem {
  nameEn: string;
  nameDe: string;
  foodType: FoodType;
  icon: string;
  category: string;
  tier: 1 | 2;
}

// ─── TIER 1: Top-100 frequency items ──────────────────────────────

export const TIER_1_ITEMS: TestItem[] = [
  // ── Vegetables (15) ──
  { nameEn: 'Carrot', nameDe: 'Karotte', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Potato', nameDe: 'Kartoffel', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Onion', nameDe: 'Zwiebel', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Tomato', nameDe: 'Tomate', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Cucumber', nameDe: 'Gurke', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Lettuce', nameDe: 'Salat', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Bell Pepper', nameDe: 'Paprika', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Broccoli', nameDe: 'Brokkoli', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Spinach', nameDe: 'Spinat', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Zucchini', nameDe: 'Zucchini', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Mushroom', nameDe: 'Champignon', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Garlic', nameDe: 'Knoblauch', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Cabbage', nameDe: 'Kohl', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Cauliflower', nameDe: 'Blumenkohl', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Green Beans', nameDe: 'Grüne Bohnen', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },

  // ── Fruits (12) ──
  { nameEn: 'Apple', nameDe: 'Apfel', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Banana', nameDe: 'Banane', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Orange', nameDe: 'Orange', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Strawberry', nameDe: 'Erdbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Grapes', nameDe: 'Weintrauben', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Lemon', nameDe: 'Zitrone', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Avocado', nameDe: 'Avocado', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Blueberry', nameDe: 'Heidelbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Watermelon', nameDe: 'Wassermelone', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Peach', nameDe: 'Pfirsich', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Pear', nameDe: 'Birne', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },
  { nameEn: 'Kiwi', nameDe: 'Kiwi', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 1 },

  // ── Grain (10) ──
  { nameEn: 'Bread', nameDe: 'Brot', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Rice', nameDe: 'Reis', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 1 },
  { nameEn: 'Pasta', nameDe: 'Nudeln', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 1 },
  { nameEn: 'Flour', nameDe: 'Mehl', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Oats', nameDe: 'Haferflocken', foodType: 'grain', icon: 'seed', category: 'Groceries', tier: 1 },
  { nameEn: 'Cereal', nameDe: 'Müsli', foodType: 'grain', icon: 'seed', category: 'Groceries', tier: 1 },
  { nameEn: 'Tortilla', nameDe: 'Tortilla', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Couscous', nameDe: 'Couscous', foodType: 'grain', icon: 'seed', category: 'Groceries', tier: 1 },
  { nameEn: 'Quinoa', nameDe: 'Quinoa', foodType: 'grain', icon: 'seed', category: 'Groceries', tier: 1 },
  { nameEn: 'Crackers', nameDe: 'Cracker', foodType: 'snacks', icon: 'bread-slice-outline', category: 'Snacks', tier: 1 },

  // ── Dairy (10) ──
  { nameEn: 'Milk', nameDe: 'Milch', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Cheese', nameDe: 'Käse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Butter', nameDe: 'Butter', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Yogurt', nameDe: 'Joghurt', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Cream', nameDe: 'Sahne', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Sour Cream', nameDe: 'Sauerrahm', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Cottage Cheese', nameDe: 'Hüttenkäse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Cream Cheese', nameDe: 'Frischkäse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Condensed Milk', nameDe: 'Kondensmilch', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Ice Cream', nameDe: 'Eiscreme', foodType: 'dairy', icon: 'cheese', category: 'Snacks', tier: 1 },

  // ── Meat / Fish / Egg (8) ──
  { nameEn: 'Chicken Breast', nameDe: 'Hähnchenbrust', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Ground Beef', nameDe: 'Hackfleisch', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Bacon', nameDe: 'Speck', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Pork Chops', nameDe: 'Schweinefleisch', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Salmon', nameDe: 'Lachs', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 1 },
  { nameEn: 'Tuna', nameDe: 'Thunfisch', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 1 },
  { nameEn: 'Eggs', nameDe: 'Eier', foodType: 'egg', icon: 'egg-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Shrimp', nameDe: 'Garnelen', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 1 },

  // ── Beverages (10) ──
  { nameEn: 'Water', nameDe: 'Wasser', foodType: 'beverage', icon: 'water', category: 'Beverages', tier: 1 },
  { nameEn: 'Coffee', nameDe: 'Kaffee', foodType: 'beverage', icon: 'coffee', category: 'Beverages', tier: 1 },
  { nameEn: 'Black Tea', nameDe: 'Schwarzer Tee', foodType: 'beverage', icon: 'coffee', category: 'Beverages', tier: 1 },
  { nameEn: 'Orange Juice', nameDe: 'Orangensaft', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 1 },
  { nameEn: 'Apple Juice', nameDe: 'Apfelsaft', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 1 },
  { nameEn: 'Sparkling Water', nameDe: 'Sprudelwasser', foodType: 'beverage', icon: 'bottle-wine', category: 'Beverages', tier: 1 },
  { nameEn: 'Beer', nameDe: 'Bier', foodType: 'beverage', icon: 'bottle-wine', category: 'Beverages', tier: 1 },
  { nameEn: 'Wine', nameDe: 'Wein', foodType: 'beverage', icon: 'bottle-wine', category: 'Beverages', tier: 1 },
  { nameEn: 'Soda', nameDe: 'Limonade', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 1 },
  { nameEn: 'Energy Drink', nameDe: 'Energy Drink', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 1 },

  // ── Sugar / Snacks (8) ──
  { nameEn: 'Chocolate', nameDe: 'Schokolade', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 1 },
  { nameEn: 'Cookies', nameDe: 'Kekse', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 1 },
  { nameEn: 'Honey', nameDe: 'Honig', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 1 },
  { nameEn: 'Jam', nameDe: 'Marmelade', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 1 },
  { nameEn: 'Candy', nameDe: 'Bonbons', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 1 },
  { nameEn: 'Chips', nameDe: 'Chips', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 1 },
  { nameEn: 'Granola Bar', nameDe: 'Müsliriegel', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 1 },
  { nameEn: 'Maple Syrup', nameDe: 'Ahornsirup', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 1 },

  // ── Fats / Oils / Condiments (7) ──
  { nameEn: 'Olive Oil', nameDe: 'Olivenöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Vegetable Oil', nameDe: 'Pflanzenöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Vinegar', nameDe: 'Essig', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Ketchup', nameDe: 'Ketchup', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Mayonnaise', nameDe: 'Mayonnaise', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Salt', nameDe: 'Salz', foodType: 'supplement', icon: 'pill', category: 'Groceries', tier: 1 },
  { nameEn: 'Pepper', nameDe: 'Pfeffer', foodType: 'supplement', icon: 'pill', category: 'Groceries', tier: 1 },

  // ── Household / Non-Food (5) ──
  { nameEn: 'Paper Towels', nameDe: 'Küchenrolle', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 1 },
  { nameEn: 'Toilet Paper', nameDe: 'Toilettenpapier', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 1 },
  { nameEn: 'Dish Soap', nameDe: 'Spülmittel', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Household', tier: 1 },
  { nameEn: 'Garbage Bags', nameDe: 'Müllbeutel', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 1 },
  { nameEn: 'Laundry Detergent', nameDe: 'Waschmittel', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Household', tier: 1 },

  // ── Other Groceries / Legumes / Pantry (15) ──
  { nameEn: 'Frozen Pizza', nameDe: 'Tiefkühlpizza', foodType: 'convenience', icon: 'bread-slice-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Canned Tomatoes', nameDe: 'Dosentomaten', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Canned Tuna', nameDe: 'Thunfischdose', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 1 },
  { nameEn: 'Tomato Sauce', nameDe: 'Tomatensoße', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
  { nameEn: 'Peanut Butter', nameDe: 'Erdnussbutter', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Mixed Nuts', nameDe: 'Nüsse gemischt', foodType: 'legume', icon: 'seed-outline', category: 'Snacks', tier: 1 },
  { nameEn: 'Canned Beans', nameDe: 'Bohnen Dose', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Lentils', nameDe: 'Linsen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Tofu', nameDe: 'Tofu', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 1 },
  { nameEn: 'Vegetable Broth', nameDe: 'Gemüsebrühe', foodType: 'supplement', icon: 'pill', category: 'Groceries', tier: 1 },
  { nameEn: 'Baking Soda', nameDe: 'Natron', foodType: 'supplement', icon: 'pill', category: 'Groceries', tier: 1 },
  { nameEn: 'Vanilla Extract', nameDe: 'Vanilleextrakt', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 1 },
  { nameEn: 'Coconut Milk', nameDe: 'Kokosmilch', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 1 },
  { nameEn: 'Olives', nameDe: 'Oliven', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 1 },
  { nameEn: 'Pickles', nameDe: 'Gurken eingelegt', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 1 },
];

// ─── TIER 2: Long-tail items (ranked ~100-1000) ───────────────────

export const TIER_2_ITEMS: TestItem[] = [
  // Vegetables – exotic / long-tail
  { nameEn: 'Artichoke', nameDe: 'Artischocke', foodType: 'vegetable', icon: 'corn', category: 'Groceries', tier: 2 },
  { nameEn: 'Arugula', nameDe: 'Rucola', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Asparagus', nameDe: 'Spargel', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Beetroot', nameDe: 'Rote Bete', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Bell Pepper', nameDe: 'Paprika', foodType: 'vegetable', icon: 'chili-hot', category: 'Groceries', tier: 2 },
  { nameEn: 'Bok Choy', nameDe: 'Pak Choi', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Broccoli', nameDe: 'Brokkoli', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Brussels Sprouts', nameDe: 'Rosenkohl', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Celeriac', nameDe: 'Knollensellerie', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Chard', nameDe: 'Mangold', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Chicory', nameDe: 'Chicorée', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Collard Greens', nameDe: 'Grünkohl', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Endive', nameDe: 'Endivie', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Fennel', nameDe: 'Fenchel', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Horseradish', nameDe: 'Meerrettich', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Jalapeño', nameDe: 'Jalapeño', foodType: 'vegetable', icon: 'chili-hot', category: 'Groceries', tier: 2 },
  { nameEn: 'Kale', nameDe: 'Grünkohl', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Kohlrabi', nameDe: 'Kohlrabi', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Okra', nameDe: 'Okra', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Parsnip', nameDe: 'Pastinake', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Radicchio', nameDe: 'Radicchio', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Rhubarb', nameDe: 'Rhabarber', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Savoy Cabbage', nameDe: 'Wirsing', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Shallot', nameDe: 'Schalotte', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Sugar Snap Peas', nameDe: 'Zuckerschoten', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Zucchini', nameDe: 'Zucchini', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },

  // Fruits – exotic / long-tail
  { nameEn: 'Apricot', nameDe: 'Aprikose', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Blackberry', nameDe: 'Brombeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Blueberry', nameDe: 'Heidelbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Cherry', nameDe: 'Kirsche', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Cranberry', nameDe: 'Preiselbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Currant', nameDe: 'Johannisbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Date', nameDe: 'Dattel', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Dragon Fruit', nameDe: 'Drachenfrucht', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Fig', nameDe: 'Feige', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Gooseberry', nameDe: 'Stachelbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Grapefruit', nameDe: 'Grapefruit', foodType: 'fruit', icon: 'fruit-citrus', category: 'Groceries', tier: 2 },
  { nameEn: 'Guava', nameDe: 'Guave', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Kiwi', nameDe: 'Kiwi', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Kumquat', nameDe: 'Kumquat', foodType: 'fruit', icon: 'fruit-citrus', category: 'Groceries', tier: 2 },
  { nameEn: 'Lychee', nameDe: 'Litschi', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Mango', nameDe: 'Mango', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Nectarine', nameDe: 'Nektarine', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Papaya', nameDe: 'Papaya', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Passion Fruit', nameDe: 'Maracuja', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Peach', nameDe: 'Pfirsich', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Pear', nameDe: 'Birne', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Persimmon', nameDe: 'Kaki', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Plum', nameDe: 'Pflaume', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Pomegranate', nameDe: 'Granatapfel', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Quince', nameDe: 'Quitte', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Rambutan', nameDe: 'Rambutan', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Raspberry', nameDe: 'Himbeere', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Star Fruit', nameDe: 'Sternfrucht', foodType: 'fruit', icon: 'fruit-cherries', category: 'Groceries', tier: 2 },
  { nameEn: 'Watermelon', nameDe: 'Wassermelone', foodType: 'fruit', icon: 'fruit-watermelon', category: 'Groceries', tier: 2 },

  // Dairy – specialty cheeses & long-tail
  { nameEn: 'Blue Cheese', nameDe: 'Blauschimmelkäse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Brie', nameDe: 'Brie', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Camembert', nameDe: 'Camembert', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Cottage Cheese', nameDe: 'Hüttenkäse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Crème Fraîche', nameDe: 'Crème fraîche', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Feta', nameDe: 'Feta', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Goat Cheese', nameDe: 'Ziegenkäse', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Gouda', nameDe: 'Gouda', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Greek Yogurt', nameDe: 'Griechischer Joghurt', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Gruyère', nameDe: 'Gruyère', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Mascarpone', nameDe: 'Mascarpone', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Mozzarella', nameDe: 'Mozzarella', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Parmesan', nameDe: 'Parmesan', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Ricotta', nameDe: 'Ricotta', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Sour Cream', nameDe: 'Sauerrahm', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },
  { nameEn: 'Whipped Cream', nameDe: 'Schlagsahne', foodType: 'dairy', icon: 'cheese', category: 'Groceries', tier: 2 },

  // Meat – specialty cuts & long-tail
  { nameEn: 'Beef Steak', nameDe: 'Rindersteak', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },
  { nameEn: 'Duck Breast', nameDe: 'Entenbrust', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Goat Mutton', nameDe: 'Ziegenfleisch', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Ground Turkey', nameDe: 'Hackfleisch vom Truthahn', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Lamb Chops', nameDe: 'Lammlachse', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },
  { nameEn: 'Osso Buco', nameDe: 'Osso Buco', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },
  { nameEn: 'Pork Belly', nameDe: 'Schweinebauch', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },
  { nameEn: 'Prosciutto', nameDe: 'Prosciutto', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Rabbit', nameDe: 'Kaninchen', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Salami', nameDe: 'Salami', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Turkey Breast', nameDe: 'Putenbrust', foodType: 'meat', icon: 'food-drumstick-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Veal', nameDe: 'Kalbfleisch', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },
  { nameEn: 'Venison', nameDe: 'Wildfleisch', foodType: 'meat', icon: 'food-steak', category: 'Groceries', tier: 2 },

  // Fish & Seafood – long-tail
  { nameEn: 'Anchovies', nameDe: 'Sardellen', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Calamari', nameDe: 'Kalmar', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Clams', nameDe: 'Muscheln', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Cod', nameDe: 'Kabeljau', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Crab', nameDe: 'Krabbe', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Eel', nameDe: 'Aal', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Herring', nameDe: 'Hering', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Lobster', nameDe: 'Hummer', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Mackerel', nameDe: 'Makrele', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Mussels', nameDe: 'Miesmuscheln', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Octopus', nameDe: 'Oktopus', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Oysters', nameDe: 'Austern', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Rainbow Trout', nameDe: 'Regenbogenforelle', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Sardines', nameDe: 'Sardinen', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Shrimp', nameDe: 'Garnelen', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Smoked Salmon', nameDe: 'Räucherlachs', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Squid', nameDe: 'Tintenfisch', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Trout', nameDe: 'Forelle', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },
  { nameEn: 'Tuna Steak', nameDe: 'Thunfischsteak', foodType: 'seafood', icon: 'fish', category: 'Groceries', tier: 2 },

  // Legumes & Nuts – long-tail
  { nameEn: 'Adzuki Beans', nameDe: 'Adzukibohnen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Almonds', nameDe: 'Mandeln', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Black Beans', nameDe: 'Schwarze Bohnen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Brazil Nuts', nameDe: 'Paranüsse', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Cashews', nameDe: 'Cashewkerne', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Chickpeas', nameDe: 'Kichererbsen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Coconut Milk', nameDe: 'Kokosmilch', foodType: 'legume', icon: 'corn', category: 'Groceries', tier: 2 },
  { nameEn: 'Edamame', nameDe: 'Edamame', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Hazelnuts', nameDe: 'Haselnüsse', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Lentils (Red)', nameDe: 'Rote Linsen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Macadamia Nuts', nameDe: 'Macadamianüsse', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Peanuts', nameDe: 'Erdnüsse', foodType: 'legume', icon: 'peanut', category: 'Groceries', tier: 2 },
  { nameEn: 'Pecans', nameDe: 'Pekannüsse', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Pine Nuts', nameDe: 'Pinienkerne', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Pistachios', nameDe: 'Pistazien', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Soy Beans', nameDe: 'Sojabohnen', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Walnuts', nameDe: 'Walnüsse', foodType: 'legume', icon: 'seed-outline', category: 'Groceries', tier: 2 },

  // Grains & Baking – long-tail
  { nameEn: 'Buckwheat', nameDe: 'Buchweizen', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Bulgur', nameDe: 'Bulgur', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Chickpea Flour', nameDe: 'Kichererbsenmehl', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Couscous', nameDe: 'Couscous', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Crispbread', nameDe: 'Knäckebrot', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Farro', nameDe: 'Emmer', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Gnocchi', nameDe: 'Gnocchi', foodType: 'grain', icon: 'pasta', category: 'Groceries', tier: 2 },
  { nameEn: 'Millet', nameDe: 'Hirse', foodType: 'grain', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Oatmeal', nameDe: 'Haferflocken', foodType: 'grain', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Panko Breadcrumbs', nameDe: 'Panko', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Polenta', nameDe: 'Polenta', foodType: 'grain', icon: 'corn', category: 'Groceries', tier: 2 },
  { nameEn: 'Pumpkin Seeds', nameDe: 'Kürbiskerne', foodType: 'grain', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Quinoa', nameDe: 'Quinoa', foodType: 'grain', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Rice Noodles', nameDe: 'Reisnudeln', foodType: 'grain', icon: 'pasta', category: 'Groceries', tier: 2 },
  { nameEn: 'Rye Bread', nameDe: 'Roggenbrot', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Soba Noodles', nameDe: 'Soba-Nudeln', foodType: 'grain', icon: 'pasta', category: 'Groceries', tier: 2 },
  { nameEn: 'Spelt', nameDe: 'Dinkel', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Sushi Rice', nameDe: 'Sushireis', foodType: 'grain', icon: 'rice', category: 'Groceries', tier: 2 },
  { nameEn: 'Tortilla Wrap', nameDe: 'Tortilla-Wrap', foodType: 'grain', icon: 'bread-slice-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Whole Wheat Pasta', nameDe: 'Vollkornnudeln', foodType: 'grain', icon: 'pasta', category: 'Groceries', tier: 2 },

  // Oils, Fats & Condiments
  { nameEn: 'Avocado Oil', nameDe: 'Avocadoöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Coconut Oil', nameDe: 'Kokosöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Flaxseed Oil', nameDe: 'Leinöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Ghee', nameDe: 'Ghee', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Sesame Oil', nameDe: 'Sesamöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Truffle Oil', nameDe: 'Trüffelöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Walnut Oil', nameDe: 'Walnussöl', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Lard', nameDe: 'Schmalz', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },
  { nameEn: 'Tahini', nameDe: 'Tahini', foodType: 'fat', icon: 'oil', category: 'Groceries', tier: 2 },

  // Herbs, Spices & Seasonings
  { nameEn: 'Basil (Fresh)', nameDe: 'Basilikum frisch', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Bay Leaves', nameDe: 'Lorbeerblätter', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Capers', nameDe: 'Kapern', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Cardamom', nameDe: 'Kardamom', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Cayenne Pepper', nameDe: 'Cayennepfeffer', foodType: 'vegetable', icon: 'chili-hot', category: 'Groceries', tier: 2 },
  { nameEn: 'Chili Flakes', nameDe: 'Chiliflocken', foodType: 'vegetable', icon: 'chili-hot', category: 'Groceries', tier: 2 },
  { nameEn: 'Cinnamon Sticks', nameDe: 'Zimtstangen', foodType: 'vegetable', icon: 'candy', category: 'Groceries', tier: 2 },
  { nameEn: 'Cloves', nameDe: 'Nelken', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Coriander (Fresh)', nameDe: 'Koriander frisch', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Cumin', nameDe: 'Kreuzkümmel', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Curry Leaves', nameDe: 'Curryblätter', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Dill', nameDe: 'Dill', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Ginger Root', nameDe: 'Ingwer', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Lemongrass', nameDe: 'Zitronengras', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Nutmeg', nameDe: 'Muskatnuss', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Oregano', nameDe: 'Oregano', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Paprika (Smoked)', nameDe: 'Räucherpaprika', foodType: 'vegetable', icon: 'chili-hot', category: 'Groceries', tier: 2 },
  { nameEn: 'Rosemary', nameDe: 'Rosmarin', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Saffron', nameDe: 'Safran', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Sage', nameDe: 'Salbei', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Star Anise', nameDe: 'Sternanis', foodType: 'vegetable', icon: 'seed-outline', category: 'Groceries', tier: 2 },
  { nameEn: 'Tarragon', nameDe: 'Estragon', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Thyme', nameDe: 'Thymian', foodType: 'vegetable', icon: 'leaf', category: 'Groceries', tier: 2 },
  { nameEn: 'Turmeric Root', nameDe: 'Kurkuma', foodType: 'vegetable', icon: 'carrot', category: 'Groceries', tier: 2 },
  { nameEn: 'Vanilla Pod', nameDe: 'Vanilleschote', foodType: 'vegetable', icon: 'candy', category: 'Groceries', tier: 2 },

  // Sugars & Sweeteners
  { nameEn: 'Agave Syrup', nameDe: 'Agavendicksaft', foodType: 'grain', icon: 'bee', category: 'Groceries', tier: 2 },
  { nameEn: 'Brown Sugar', nameDe: 'Brauner Zucker', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 2 },
  { nameEn: 'Coconut Sugar', nameDe: 'Kokosblütenzucker', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 2 },
  { nameEn: 'Date Syrup', nameDe: 'Dattelsirup', foodType: 'grain', icon: 'bee', category: 'Groceries', tier: 2 },
  { nameEn: 'Maple Syrup', nameDe: 'Ahornsirup', foodType: 'grain', icon: 'bee', category: 'Groceries', tier: 2 },
  { nameEn: 'Molasses', nameDe: 'Melasse', foodType: 'grain', icon: 'bee', category: 'Groceries', tier: 2 },
  { nameEn: 'Powdered Sugar', nameDe: 'Puderzucker', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 2 },
  { nameEn: 'Stevia', nameDe: 'Stevia', foodType: 'grain', icon: 'candy', category: 'Groceries', tier: 2 },

  // Beverages – long-tail
  { nameEn: 'Chai Latte', nameDe: 'Chai Latte', foodType: 'beverage', icon: 'coffee', category: 'Beverages', tier: 2 },
  { nameEn: 'Cherry Juice', nameDe: 'Kirschsaft', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Coconut Water', nameDe: 'Kokoswasser', foodType: 'beverage', icon: 'corn', category: 'Beverages', tier: 2 },
  { nameEn: 'Earl Grey Tea', nameDe: 'Earl Grey', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Elderflower Syrup', nameDe: 'Holunderblütensirup', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Ginger Beer', nameDe: 'Ingwerbier', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Green Tea', nameDe: 'Grüner Tee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Herbal Tea', nameDe: 'Kräutertee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Hibiscus Tea', nameDe: 'Hibiskustee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Iced Tea', nameDe: 'Eistee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Kombucha', nameDe: 'Kombucha', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Matcha Powder', nameDe: 'Matchapulver', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Peppermint Tea', nameDe: 'Pfefferminztee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Pomegranate Juice', nameDe: 'Granatapfelsaft', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Rooibos Tea', nameDe: 'Rooibostee', foodType: 'beverage', icon: 'tea', category: 'Beverages', tier: 2 },
  { nameEn: 'Sparkling Water', nameDe: 'Sprudelwasser', foodType: 'beverage', icon: 'water', category: 'Beverages', tier: 2 },
  { nameEn: 'Tomato Juice', nameDe: 'Tomatensaft', foodType: 'beverage', icon: 'cup', category: 'Beverages', tier: 2 },
  { nameEn: 'Tonic Water', nameDe: 'Tonic Water', foodType: 'beverage', icon: 'water', category: 'Beverages', tier: 2 },

  // Snacks – long-tail
  { nameEn: 'Dark Chocolate (85%)', nameDe: 'Zartbitterschokolade 85%', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 2 },
  { nameEn: 'Dried Mango', nameDe: 'Getrocknete Mango', foodType: 'fruit', icon: 'fruit-cherries', category: 'Snacks', tier: 2 },
  { nameEn: 'Edamame (Dry Roasted)', nameDe: 'Edamame geröstet', foodType: 'legume', icon: 'seed-outline', category: 'Snacks', tier: 2 },
  { nameEn: 'Falafel', nameDe: 'Falafel', foodType: 'legume', icon: 'food-variant', category: 'Snacks', tier: 2 },
  { nameEn: 'Granola', nameDe: 'Granola', foodType: 'grain', icon: 'seed-outline', category: 'Snacks', tier: 2 },
  { nameEn: 'Hummus', nameDe: 'Hummus', foodType: 'legume', icon: 'food-variant', category: 'Snacks', tier: 2 },
  { nameEn: 'Olives (Kalamata)', nameDe: 'Kalamata-Oliven', foodType: 'fat', icon: 'seed-outline', category: 'Snacks', tier: 2 },
  { nameEn: 'Olives (Green)', nameDe: 'Grüne Oliven', foodType: 'fat', icon: 'seed-outline', category: 'Snacks', tier: 2 },
  { nameEn: 'Pita Chips', nameDe: 'Pita-Chips', foodType: 'snacks', icon: 'pizza', category: 'Snacks', tier: 2 },
  { nameEn: 'Popcorn (Kernels)', nameDe: 'Popcornmais', foodType: 'grain', icon: 'popcorn', category: 'Snacks', tier: 2 },
  { nameEn: 'Pretzel Sticks', nameDe: 'Laugenstangen', foodType: 'snacks', icon: 'pretzel', category: 'Snacks', tier: 2 },
  { nameEn: 'Protein Bar', nameDe: 'Proteinriegel', foodType: 'grain', icon: 'candy', category: 'Snacks', tier: 2 },
  { nameEn: 'Rice Cakes', nameDe: 'Reiswaffeln', foodType: 'snacks', icon: 'rice', category: 'Snacks', tier: 2 },
  { nameEn: 'Seaweed Snacks', nameDe: 'Algensnacks', foodType: 'vegetable', icon: 'fish', category: 'Snacks', tier: 2 },
  { nameEn: 'Tortilla Chips', nameDe: 'Tortilla-Chips', foodType: 'snacks', icon: 'pizza', category: 'Snacks', tier: 2 },
  { nameEn: 'Trail Mix', nameDe: 'Studentenfutter', foodType: 'legume', icon: 'seed-outline', category: 'Snacks', tier: 2 },
  { nameEn: 'Veggie Chips', nameDe: 'Gemüsechips', foodType: 'vegetable', icon: 'carrot', category: 'Snacks', tier: 2 },

  // Household & Kitchen
  { nameEn: 'Aluminum Foil', nameDe: 'Alufolie', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Baking Soda', nameDe: 'Natron', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Cling Wrap', nameDe: 'Frischhaltefolie', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Dish Soap', nameDe: 'Spülmittel', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Household', tier: 2 },
  { nameEn: 'Freezer Bags', nameDe: 'Gefrierbeutel', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Garbage Bags', nameDe: 'Müllbeutel', foodType: 'non_food', icon: 'trash-can', category: 'Household', tier: 2 },
  { nameEn: 'Kitchen Roll', nameDe: 'Küchenrolle', foodType: 'non_food', icon: 'toilet', category: 'Household', tier: 2 },
  { nameEn: 'Laundry Detergent', nameDe: 'Waschmittel', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Household', tier: 2 },
  { nameEn: 'Parchment Paper', nameDe: 'Backpapier', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Spatula', nameDe: 'Pfannenwender', foodType: 'non_food', icon: 'silverware', category: 'Household', tier: 2 },
  { nameEn: 'Sponge', nameDe: 'Schwamm', foodType: 'non_food', icon: 'spray-bottle', category: 'Household', tier: 2 },
  { nameEn: 'Tin Foil', nameDe: 'Alufolie', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },
  { nameEn: 'Wooden Skewers', nameDe: 'Holzspieße', foodType: 'non_food', icon: 'silverware', category: 'Household', tier: 2 },
  { nameEn: 'Ziplock Bags', nameDe: 'Gefrierbeutel mit Clip', foodType: 'non_food', icon: 'package-variant', category: 'Household', tier: 2 },

  // Personal Care
  { nameEn: 'Deodorant', nameDe: 'Deodorant', foodType: 'non_food', icon: 'spray-bottle', category: 'Personal', tier: 2 },
  { nameEn: 'Floss', nameDe: 'Zahnseide', foodType: 'non_food', icon: 'toothbrush', category: 'Personal', tier: 2 },
  { nameEn: 'Hand Cream', nameDe: 'Handcreme', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Personal', tier: 2 },
  { nameEn: 'Lip Balm', nameDe: 'Lippenbalsam', foodType: 'non_food', icon: 'lipstick', category: 'Personal', tier: 2 },
  { nameEn: 'Mouthwash', nameDe: 'Mundspülung', foodType: 'non_food', icon: 'toothbrush', category: 'Personal', tier: 2 },
  { nameEn: 'Razor Blades', nameDe: 'Rasierklingen', foodType: 'non_food', icon: 'package-variant', category: 'Personal', tier: 2 },
  { nameEn: 'Shampoo', nameDe: 'Shampoo', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Personal', tier: 2 },
  { nameEn: 'Shaving Cream', nameDe: 'Rasierschaum', foodType: 'non_food', icon: 'spray-bottle', category: 'Personal', tier: 2 },
  { nameEn: 'Sunscreen', nameDe: 'Sonnencreme', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Personal', tier: 2 },
  { nameEn: 'Toothbrush', nameDe: 'Zahnbürste', foodType: 'non_food', icon: 'toothbrush', category: 'Personal', tier: 2 },
  { nameEn: 'Toothpaste', nameDe: 'Zahnpasta', foodType: 'non_food', icon: 'toothbrush', category: 'Personal', tier: 2 },
  { nameEn: 'Wet Wipes', nameDe: 'Feuchttücher', foodType: 'non_food', icon: 'package-variant', category: 'Personal', tier: 2 },

  // Pet Supplies
  { nameEn: 'Cat Food (Wet)', nameDe: 'Nassfutter Katze', foodType: 'non_food', icon: 'cat', category: 'Pet', tier: 2 },
  { nameEn: 'Cat Litter', nameDe: 'Katzenstreu', foodType: 'non_food', icon: 'paw', category: 'Pet', tier: 2 },
  { nameEn: 'Cat Treats', nameDe: 'Katzenleckerli', foodType: 'non_food', icon: 'cat', category: 'Pet', tier: 2 },
  { nameEn: 'Dog Food (Dry)', nameDe: 'Trockenfutter Hund', foodType: 'non_food', icon: 'dog', category: 'Pet', tier: 2 },
  { nameEn: 'Dog Food (Wet)', nameDe: 'Nassfutter Hund', foodType: 'non_food', icon: 'dog', category: 'Pet', tier: 2 },
  { nameEn: 'Dog Treats', nameDe: 'Hundeleckerli', foodType: 'non_food', icon: 'paw', category: 'Pet', tier: 2 },
  { nameEn: 'Fish Food', nameDe: 'Fischfutter', foodType: 'non_food', icon: 'fish', category: 'Pet', tier: 2 },
  { nameEn: 'Flea Treatment', nameDe: 'Flohmittel', foodType: 'non_food', icon: 'medication', category: 'Pet', tier: 2 },
  { nameEn: 'Hamster Bedding', nameDe: 'Hamsterstreu', foodType: 'non_food', icon: 'paw', category: 'Pet', tier: 2 },
  { nameEn: 'Pet Shampoo', nameDe: 'Tiershampoo', foodType: 'non_food', icon: 'hand-wash-outline', category: 'Pet', tier: 2 },

  // Electronics
  { nameEn: 'AA Batteries', nameDe: 'AA-Batterien', foodType: 'non_food', icon: 'battery', category: 'Electronics', tier: 2 },
  { nameEn: 'AAA Batteries', nameDe: 'AAA-Batterien', foodType: 'non_food', icon: 'battery', category: 'Electronics', tier: 2 },
  { nameEn: 'Button Cell Battery', nameDe: 'Knopfzelle', foodType: 'non_food', icon: 'battery', category: 'Electronics', tier: 2 },
  { nameEn: 'HDMI Cable', nameDe: 'HDMI-Kabel', foodType: 'non_food', icon: 'cable-data', category: 'Electronics', tier: 2 },
  { nameEn: 'Light Bulb (LED)', nameDe: 'LED-Lampe', foodType: 'non_food', icon: 'lightbulb', category: 'Electronics', tier: 2 },
  { nameEn: 'Lightning Cable', nameDe: 'Lightning-Kabel', foodType: 'non_food', icon: 'cable-data', category: 'Electronics', tier: 2 },
  { nameEn: 'Power Bank', nameDe: 'Powerbank', foodType: 'non_food', icon: 'battery-charging', category: 'Electronics', tier: 2 },
  { nameEn: 'Power Strip', nameDe: 'Steckdosenleiste', foodType: 'non_food', icon: 'power-plug', category: 'Electronics', tier: 2 },
  { nameEn: 'Rechargeable Battery', nameDe: 'Akkus', foodType: 'non_food', icon: 'battery-charging', category: 'Electronics', tier: 2 },
  { nameEn: 'USB-C Cable', nameDe: 'USB-C-Kabel', foodType: 'non_food', icon: 'cable-data', category: 'Electronics', tier: 2 },
  { nameEn: 'USB Flash Drive', nameDe: 'USB-Stick', foodType: 'non_food', icon: 'usb', category: 'Electronics', tier: 2 },

  // Pharmacy
  { nameEn: 'Allergy Tablets', nameDe: 'Allergietabletten', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Band-Aids', nameDe: 'Pflaster', foodType: 'supplement', icon: 'bandage', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Cough Syrup', nameDe: 'Hustensaft', foodType: 'supplement', icon: 'medication', category: 'Pharmacy', tier: 2 },
  { nameEn: 'First Aid Kit', nameDe: 'Erste-Hilfe-Set', foodType: 'supplement', icon: 'bandage', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Ibuprofen', nameDe: 'Ibuprofen', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Insect Repellent', nameDe: 'Insektenschutz', foodType: 'supplement', icon: 'spray-bottle', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Magnesium', nameDe: 'Magnesium', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Multivitamins', nameDe: 'Multivitamin', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Paracetamol', nameDe: 'Paracetamol', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Thermometer', nameDe: 'Thermometer', foodType: 'supplement', icon: 'medication', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Throat Lozenges', nameDe: 'Halsschmerztabletten', foodType: 'supplement', icon: 'candy', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Vitamin C', nameDe: 'Vitamin C', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Vitamin D', nameDe: 'Vitamin D', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
  { nameEn: 'Zinc Tablets', nameDe: 'Zinktabletten', foodType: 'supplement', icon: 'pill', category: 'Pharmacy', tier: 2 },
];

// ─── Generator ────────────────────────────────────────────────────

export interface TestListParams {
  listCount: number;
  minItems: number;
  maxItems: number;
  highTierWeight: number; // 0-100, probability of picking from tier 1
}

export interface TestDataResult {
  lists: ShoppingList[];
  items: ShoppingItem[];
}

export function generateTestLists(params?: Partial<TestListParams>): TestDataResult {
  const {
    listCount = 5,
    minItems = 8,
    maxItems = 25,
    highTierWeight = 70,
  } = params || {};

  const allItems: TestItem[] = [...TIER_1_ITEMS, ...TIER_2_ITEMS];
  const now = Date.now();
  const lists: ShoppingList[] = [];
  const items: ShoppingItem[] = [];

  for (let l = 0; l < listCount; l++) {
    const listId = generateId();
    const listSize = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));
    const listName = `Test List ${l + 1}`;

    lists.push({
      id: listId,
      name: listName,
      createdAt: now - (listCount - l) * 60000,
      updatedAt: now,
    });

    const usedDescriptions = new Set<string>();
    let attempts = 0;

    while (items.filter(i => i.listId === listId).length < listSize && attempts < listSize * 3) {
      attempts++;
      const useTier1 = Math.random() * 100 < highTierWeight;
      const pool = useTier1 ? TIER_1_ITEMS : TIER_2_ITEMS;
      const candidate = pool[Math.floor(Math.random() * pool.length)];
      const descEn = candidate.nameEn;
      const descDe = candidate.nameDe;

      if (usedDescriptions.has(descEn.toLowerCase()) && usedDescriptions.has(descDe.toLowerCase())) {
        continue;
      }

      usedDescriptions.add(descEn.toLowerCase());
      usedDescriptions.add(descDe.toLowerCase());

      const order = items.filter(i => i.listId === listId).length;
      items.push({
        id: generateId(),
        listId,
        description: descEn,
        qualifier: '',
        icon: candidate.icon,
        foodType: candidate.foodType,
        purchased: false,
        order,
        category: candidate.category,
        createdAt: now - 3600000,
        updatedAt: now,
      });
    }
  }

  return { lists, items };
}
