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

export interface AppSettings {
  theme: 'light';
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
