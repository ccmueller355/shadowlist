// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
// Central mocks for React Native component tests
// This file is NOT a test suite — it's a shared mock/setup module imported by test files.

// Empty test to prevent Jest's "must contain at least one test" error
describe('setup', () => { it('loads mocks', () => {}); });

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  const MockIcon = ({ name, size, color, ...props }: any) =>
    React.createElement(View, props, React.createElement(Text, null, `[icon:${name}]`));
  return {
    MaterialCommunityIcons: MockIcon,
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: any) => require('react').createElement('View', null, children),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock uuid
jest.mock('../utils/uuid', () => ({
  generateId: jest.fn(() => `test-id-${Math.random().toString(36).slice(2, 9)}`),
}));

// Mock Alert
jest.spyOn(require('react-native').Alert, 'alert').mockImplementation(() => {});

// Mock BackHandler
jest.spyOn(require('react-native').BackHandler, 'addEventListener').mockImplementation(
  () => ({ remove: jest.fn() })
);

// Seed the Zustand store with default state for tests
import { useStore } from '../store/useStore';

// Reset store to known defaults
const defaultStoreState = {
  lists: [],
  items: [],
  settings: { theme: 'fixer' as const, sortByCategory: false, defaultIcon: 'cart', activeDiet: null, lang: 'en' as const },
  hydrated: true,
  foodNameIndex: new Map(),
};

export function resetStore() {
  // Preserve only actions, reset data
  const actions = useStore.getState();
  useStore.setState({
    ...defaultStoreState,
    hydrate: actions.hydrate,
    addList: actions.addList,
    deleteList: actions.deleteList,
    renameList: actions.renameList,
    addItem: actions.addItem,
    updateItem: actions.updateItem,
    deleteItem: actions.deleteItem,
    togglePurchased: actions.togglePurchased,
    moveToShop: actions.moveToShop,
    reorderItems: actions.reorderItems,
    setTheme: actions.setTheme,
    setSortByCategory: actions.setSortByCategory,
    setDefaultIcon: actions.setDefaultIcon,
    setActiveDiet: actions.setActiveDiet,
    setLang: actions.setLang,
    addDemoData: actions.addDemoData,
    generateTestData: actions.generateTestData,
    generateExtremeData: actions.generateExtremeData,
    clearAll: actions.clearAll,
    rebuildNameIndex: actions.rebuildNameIndex,
  });
}
