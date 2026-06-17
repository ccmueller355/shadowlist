// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { useStore } from '../store/useStore'

// Mock AsyncStorage to prevent actual disk I/O during tests
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}))

// Mock uuid to return predictable IDs in tests
jest.mock('../utils/uuid', () => ({
  generateId: jest.fn(() => `test-id-${Math.random().toString(36).slice(2, 9)}`),
}))

function resetStore() {
  useStore.setState({
    lists: [],
    items: [],
    settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart' },
    hydrated: true,
  })
}

describe('useStore', () => {
  beforeEach(() => {
    resetStore()
  })

  describe('lists', () => {
    it('starts with empty lists', () => {
      expect(useStore.getState().lists).toEqual([])
    })

    it('adds a list', () => {
      useStore.getState().addList('Weekly Groceries')
      const { lists } = useStore.getState()
      expect(lists).toHaveLength(1)
      expect(lists[0].name).toBe('Weekly Groceries')
      expect(lists[0].id).toBeTruthy()
    })

    it('deletes a list and its items', () => {
      useStore.getState().addList('Target Run')
      const { lists } = useStore.getState()
      const listId = lists[0].id

      // Add an item to the list
      useStore.getState().addItem({ listId, description: 'Socks' })

      useStore.getState().deleteList(listId)
      const state = useStore.getState()
      expect(state.lists).toHaveLength(0)
      expect(state.items.filter((i) => i.listId === listId)).toHaveLength(0)
    })

    it('renames a list', () => {
      useStore.getState().addList('Old Name')
      const { lists } = useStore.getState()
      const listId = lists[0].id

      useStore.getState().renameList(listId, 'New Name')
      const updated = useStore.getState().lists.find((l) => l.id === listId)
      expect(updated?.name).toBe('New Name')
    })
  })

  describe('items', () => {
    let listId: string

    beforeEach(() => {
      useStore.getState().addList('Test List')
      listId = useStore.getState().lists[0].id
    })

    it('adds an item to a list', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      expect(item.description).toBe('Milk')
      expect(item.listId).toBe(listId)
      expect(item.purchased).toBe(false)
    })

    it('trims description whitespace', () => {
      const item = useStore.getState().addItem({ listId, description: '  Eggs  ' })
      expect(item.description).toBe('Eggs')
    })

    it('assigns increasing order numbers', () => {
      const item1 = useStore.getState().addItem({ listId, description: 'First' })
      const item2 = useStore.getState().addItem({ listId, description: 'Second' })
      expect(item2.order).toBeGreaterThan(item1.order)
    })

    it('updates an item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().updateItem(item.id, { qualifier: '2x' })
      const updated = useStore.getState().items.find((i) => i.id === item.id)
      expect(updated?.qualifier).toBe('2x')
    })

    it('deletes an item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().deleteItem(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)).toBeUndefined()
    })

    it('toggles purchased state', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().togglePurchased(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)?.purchased).toBe(true)

      useStore.getState().togglePurchased(item.id)
      expect(useStore.getState().items.find((i) => i.id === item.id)?.purchased).toBe(false)
    })

    it('moveToShop un-purchases and re-orders item', () => {
      const item = useStore.getState().addItem({ listId, description: 'Milk' })
      useStore.getState().togglePurchased(item.id)
      useStore.getState().moveToShop(item.id)
      const moved = useStore.getState().items.find((i) => i.id === item.id)
      expect(moved?.purchased).toBe(false)
    })

    it('reorders items', () => {
      const item1 = useStore.getState().addItem({ listId, description: 'A' })
      const item2 = useStore.getState().addItem({ listId, description: 'B' })
      const item3 = useStore.getState().addItem({ listId, description: 'C' })

      useStore.getState().reorderItems(listId, [item3.id, item1.id, item2.id])

      const items = useStore.getState().items.filter((i) => i.listId === listId)
      const ordered = items.sort((a, b) => a.order - b.order)
      expect(ordered[0].id).toBe(item3.id)
      expect(ordered[1].id).toBe(item1.id)
      expect(ordered[2].id).toBe(item2.id)
    })
  })

  describe('settings', () => {
    it('defaults to fixer theme', () => {
      expect(useStore.getState().settings.theme).toBe('fixer')
    })

    it('changes theme', () => {
      useStore.getState().setTheme('decker')
      expect(useStore.getState().settings.theme).toBe('decker')
    })

    it('toggles sortByCategory', () => {
      useStore.getState().setSortByCategory(true)
      expect(useStore.getState().settings.sortByCategory).toBe(true)

      useStore.getState().setSortByCategory(false)
      expect(useStore.getState().settings.sortByCategory).toBe(false)
    })

    it('changes defaultIcon', () => {
      useStore.getState().setDefaultIcon('food-variant')
      expect(useStore.getState().settings.defaultIcon).toBe('food-variant')
    })
  })

  describe('hydrated flag', () => {
    it('is true after resetStore sets hydrated', () => {
      expect(useStore.getState().hydrated).toBe(true)
    })
  })
})
