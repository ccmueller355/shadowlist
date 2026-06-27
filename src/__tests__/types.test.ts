// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import {
  ShoppingList, ShoppingItem, AppSettings, NewItemParams, ThemeName,
  FoodType, DietId, DietRule, DietProfile, FoodTypeInfo,
} from '../types'

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
    it('accepts the five valid theme names', () => {
      const themes: ThemeName[] = ['fixer', 'stuffer', 'decker', 'cyber', 'terminal']
      expect(themes).toHaveLength(5)
      themes.forEach((t) => expect(['fixer', 'stuffer', 'decker', 'cyber', 'terminal']).toContain(t))
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

  describe('FoodType', () => {
    it('has 13 string literal values', () => {
      const types: FoodType[] = [
        'meat', 'fish', 'egg', 'dairy', 'grain', 'sugar', 'fruit',
        'vegetable', 'legume', 'fat', 'beverage', 'supplement', 'non_food',
      ]
      expect(types).toHaveLength(13)
    })
  })

  describe('DietId', () => {
    it('has 7 string literal values', () => {
      const ids: DietId[] = ['keto', 'low-carb', 'slow-carb', 'vegetarian', 'vegan', 'gluten-free', 'paleo']
      expect(ids).toHaveLength(7)
    })
  })

  describe('DietRule', () => {
    it('accepts forbidden food types', () => {
      const rule: DietRule = { forbid: ['grain', 'sugar'] }
      expect(rule.forbid).toContain('grain')
    })

    it('accepts optional alternatives', () => {
      const rule: DietRule = { forbid: ['grain'], alternatives: ['vegetable', 'fruit'] }
      expect(rule.alternatives).toHaveLength(2)
    })
  })

  describe('DietProfile', () => {
    it('accepts a complete profile', () => {
      const profile: DietProfile = {
        id: 'keto',
        nameKey: 'diet.keto',
        descriptionKey: 'diet.keto.desc',
        rules: [{ forbid: ['grain', 'sugar'] }],
      }
      expect(profile.id).toBe('keto')
      expect(profile.rules[0].forbid).toContain('grain')
    })
  })

  describe('FoodTypeInfo', () => {
    it('accepts a complete food type info', () => {
      const info: FoodTypeInfo = {
        id: 'meat',
        labelKey: 'foodType.meat',
        icon: 'food-drumstick-outline',
      }
      expect(info.id).toBe('meat')
      expect(info.icon).toBeTruthy()
    })
  })

  describe('AppSettings extended', () => {
    it('accepts activeDiet and lang fields', () => {
      const settings: AppSettings = {
        theme: 'fixer',
        sortByCategory: false,
        defaultIcon: 'cart',
        activeDiet: 'keto',
        lang: 'de',
      }
      expect(settings.activeDiet).toBe('keto')
      expect(settings.lang).toBe('de')
    })

    it('allows activeDiet to be null (no diet)', () => {
      const settings: AppSettings = {
        theme: 'fixer',
        sortByCategory: false,
        defaultIcon: 'cart',
        activeDiet: null,
        lang: 'en',
      }
      expect(settings.activeDiet).toBeNull()
    })
  })

  describe('ShoppingItem extended', () => {
    it('accepts optional foodType', () => {
      const item: ShoppingItem = {
        id: 'item-3',
        listId: 'list-1',
        description: 'Chicken',
        qualifier: '',
        icon: 'food-drumstick-outline',
        purchased: false,
        order: 0,
        category: null,
        foodType: 'meat',
        createdAt: 1000,
        updatedAt: 1000,
      }
      expect(item.foodType).toBe('meat')
    })

    it('allows foodType to be null', () => {
      const item: ShoppingItem = {
        id: 'item-4',
        listId: 'list-1',
        description: 'Sponge',
        qualifier: '',
        icon: 'cart',
        purchased: false,
        order: 1,
        category: null,
        foodType: null,
        createdAt: 1000,
        updatedAt: 1000,
      }
      expect(item.foodType).toBeNull()
    })
  })
})
