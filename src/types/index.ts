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
  createdAt: number;
  updatedAt: number;
}

export type ThemeName = 'fixer' | 'stuffer' | 'decker';

export interface AppSettings {
  theme: ThemeName;
  sortByCategory: boolean;
  defaultIcon: string;
}

export interface NewItemParams {
  listId: string;
  description: string;
  qualifier?: string;
  icon?: string;
  category?: string | null;
}
