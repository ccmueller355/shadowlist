// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
export interface ShoppingList {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ShoppingItem {
  id: string;
  listId: string;
  description: string;
  qualifier: string;
  icon: string;
  purchased: boolean;
  order: number;
  category: string | null;
  foodType: FoodType;
  createdAt: number;
  updatedAt: number;
}

export type ThemeName = 'fixer' | 'stuffer' | 'decker' | 'cyber' | 'terminal';

export type FoodType =
  | 'meat' | 'seafood' | 'egg' | 'dairy'
  | 'bakery' | 'sugar' | 'fruit' | 'vegetable'
  | 'legume' | 'fat' | 'beverage' | 'supplement'
  | 'snacks' | 'processed' | 'frozen'
  | 'non_food';

export type DietId = 'keto' | 'low-carb' | 'slow-carb' | 'vegetarian' | 'vegan' | 'gluten-free' | 'paleo';

export type AppLang = 'en' | 'de';

export interface DietRule {
  forbid: FoodType[];
  alternatives?: FoodType[];
}

export interface DietProfile {
  id: DietId;
  nameKey: string;
  descriptionKey: string;
  rules: DietRule[];
}

export interface FoodTypeInfo {
  id: FoodType;
  labelKey: string;
  icon: string;
}

export interface AppSettings {
  theme: ThemeName;
  sortByCategory: boolean;
  defaultIcon: string;
  activeDiet: DietId | null;
  lang: AppLang;
}

export interface NewItemParams {
  listId: string;
  description: string;
  qualifier?: string;
  icon?: string;
  category?: string | null;
}
