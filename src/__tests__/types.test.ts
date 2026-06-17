import { ShoppingList, ShoppingItem, AppSettings, NewItemParams, ThemeName } from '../types'

describe('Type definitions', () => {
  describe('ShoppingList', () => {
    it('accepts a valid ShoppingList object', () => {
      const list: ShoppingList = {
        id: 'abc-123',
        name: 'Weekly Groceries',
        createdAt: 1000,
        updatedAt: 2000,
      }
      expect(list.name).toBe('Weekly Groceries')
      expect(list.createdAt).toBeLessThan(list.updatedAt)
    })
  })

  describe('ShoppingItem', () => {
    it('accepts a valid ShoppingItem with all fields', () => {
      const item: ShoppingItem = {
        id: 'item-1',
        listId: 'list-1',
        description: 'Milk',
        qualifier: '2x',
        icon: 'cart',
        purchased: false,
        order: 0,
        category: 'Groceries',
        createdAt: 1000,
        updatedAt: 2000,
      }
      expect(item.description).toBe('Milk')
      expect(item.purchased).toBe(false)
      expect(item.category).toBe('Groceries')
    })

    it('allows null category', () => {
      const item: ShoppingItem = {
        id: 'item-2',
        listId: 'list-1',
        description: 'Bread',
        qualifier: '',
        icon: 'cart',
        purchased: false,
        order: 1,
        category: null,
        createdAt: 1000,
        updatedAt: 1000,
      }
      expect(item.category).toBeNull()
    })
  })

  describe('AppSettings', () => {
    it('accepts valid settings', () => {
      const settings: AppSettings = {
        theme: 'fixer',
        sortByCategory: false,
        defaultIcon: 'cart',
      }
      expect(settings.theme).toBe('fixer')
    })
  })

  describe('ThemeName', () => {
    it('accepts the three valid theme names', () => {
      const themes: ThemeName[] = ['fixer', 'stuffer', 'decker']
      expect(themes).toHaveLength(3)
      themes.forEach((t) => expect(['fixer', 'stuffer', 'decker']).toContain(t))
    })
  })

  describe('NewItemParams', () => {
    it('requires listId and description', () => {
      const params: NewItemParams = {
        listId: 'list-1',
        description: 'Eggs',
      }
      expect(params.listId).toBe('list-1')
      expect(params.description).toBe('Eggs')
    })

    it('accepts optional qualifier, icon, category', () => {
      const params: NewItemParams = {
        listId: 'list-1',
        description: 'Cheese',
        qualifier: '200g',
        icon: 'food-variant',
        category: 'Groceries',
      }
      expect(params.qualifier).toBe('200g')
      expect(params.icon).toBe('food-variant')
      expect(params.category).toBe('Groceries')
    })
  })
})
