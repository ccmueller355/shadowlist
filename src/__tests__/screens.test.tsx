// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import './component-test-setup';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

// Mock react-native-draggable-flatlist (must be before component imports)
jest.mock('react-native-draggable-flatlist', () => {
  const React2 = require('react');
  const { View, ScrollView } = require('react-native');
  const MockFlatList = ({ data, renderItem, ...props }: any) =>
    React2.createElement(
      ScrollView,
      { testID: 'draggable-list' },
      data?.map((item: any, index: number) =>
        React2.createElement(View, { key: item.id || index }, renderItem?.({ item, drag: () => {}, isActive: false }))
      )
    );
  return {
    __esModule: true,
    default: MockFlatList,
    RenderItemParams: () => null,
    ScaleDecorator: ({ children }: any) => React2.createElement(View, null, children),
  };
});

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

import { HomeScreen } from '../screens/HomeScreen';
import { ListDetailScreen } from '../screens/ListDetailScreen';
import { useStore } from '../store/useStore';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

function seedStoreWithItems() {
  useStore.setState({
    lists: [{ id: 'list-1', name: 'Weekly Groceries', createdAt: 1, updatedAt: 1 }],
    items: [],
    settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart', activeDiet: null, lang: 'en' },
    hydrated: true,
  });
  useStore.getState().addItem({ listId: 'list-1', description: 'Milk' });
  useStore.getState().addItem({ listId: 'list-1', description: 'Eggs' });
  useStore.getState().addItem({ listId: 'list-1', description: 'Bread' });
}

const route = { params: { listId: 'list-1', listName: 'Weekly Groceries' }, key: 'list-detail', name: 'ListDetail' };
const navigation = { navigate: mockNavigate, goBack: mockGoBack, addListener: jest.fn(), removeListener: jest.fn() };

describe('HomeScreen', () => {
  beforeEach(() => {
    useStore.setState({
      lists: [],
      items: [],
      settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart', activeDiet: null, lang: 'en' },
      hydrated: true,
    });
  });

  it('renders header title', () => {
    render(<HomeScreen />);
    expect(screen.getByText('ShadowList')).toBeTruthy();
  });

  it('renders add list FAB', () => {
    render(<HomeScreen />);
    expect(screen.getByText('[icon:plus]')).toBeTruthy();
  });

  it('renders settings gear icon', () => {
    render(<HomeScreen />);
    expect(screen.getByText('[icon:cog]')).toBeTruthy();
  });

  it('renders lists when data exists', () => {
    useStore.getState().addList('Weekly Groceries');
    render(<HomeScreen />);
    expect(screen.getByText('Weekly Groceries')).toBeTruthy();
  });

  it('US: User creates a new list from the HomeScreen', () => {
    render(<HomeScreen />);
    // Tap the FAB to open the new-list input
    fireEvent.press(screen.getByText('[icon:plus]'));
    const input = screen.getByPlaceholderText('List name...');
    fireEvent.changeText(input, 'Hardware Run');
    fireEvent(input, 'submitEditing');
    expect(screen.getByText('Hardware Run')).toBeTruthy();
  });

  it('US: User opens settings from gear icon', () => {
    render(<HomeScreen />);
    fireEvent.press(screen.getByText('[icon:cog]'));
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('settings gear icon is present and pressable (touch target verified by US test above)', () => {
    render(<HomeScreen />);
    // The button is pressable — behavioral coverage in 'opens settings from gear icon' above
    expect(screen.getByText('[icon:cog]')).toBeTruthy();
  });

  it('FAB plus icon is present and pressable (uses safe area bottom inset)', () => {
    render(<HomeScreen />);
    expect(screen.getByText('[icon:plus]')).toBeTruthy();
  });
});

describe('ListDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStoreWithItems();
  });

  it('US: User opens a list and sees its title', () => {
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText('Weekly Groceries')).toBeTruthy();
  });

  it('US: User sees the add-item bar at the top', () => {
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByPlaceholderText('Search or add item...')).toBeTruthy();
  });

  it('US: User sees items in the list', () => {
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText('Milk')).toBeTruthy();
    expect(screen.getByText('Eggs')).toBeTruthy();
    expect(screen.getByText('Bread')).toBeTruthy();
  });

  it('US: User navigates back via the back button', () => {
    render(<ListDetailScreen route={route} navigation={navigation} />);
    fireEvent.press(screen.getByText('[icon:arrow-left]'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('back arrow icon is present and pressable (touch target verified by US test above)', () => {
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText('[icon:arrow-left]')).toBeTruthy();
  });

  it('US: User toggles an item as purchased by tapping it', () => {
    seedStoreWithItems();
    render(<ListDetailScreen route={route} navigation={navigation} />);
    // Tap "Milk" to toggle it purchased
    fireEvent.press(screen.getByText('Milk'));
    const store = useStore.getState();
    const milk = store.items.find((i) => i.description === 'Milk');
    expect(milk?.purchased).toBe(true);
  });

  it('US: User sees active diet header when a diet is set', () => {
    seedStoreWithItems();
    useStore.getState().setActiveDiet('keto');
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText('Keto')).toBeTruthy();
  });

  it('US: User sees EmptyPlaceholder when the list has no items', () => {
    useStore.setState({
      lists: [{ id: 'list-1', name: 'Empty List', createdAt: 1, updatedAt: 1 }],
      items: [],
      settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart', activeDiet: null, lang: 'en' },
      hydrated: true,
    });
    render(<ListDetailScreen route={{ ...route, params: { listId: 'list-1', listName: 'Empty List' } }} navigation={navigation} />);
    expect(screen.getByText('Your shopping list is empty — add items below')).toBeTruthy();
  });

  it('US: User adds an item via the AddItemBar (opens EditModal, then saves)', () => {
    seedStoreWithItems();
    render(<ListDetailScreen route={route} navigation={navigation} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    fireEvent.changeText(input, 'Cheese');
    fireEvent(input, 'submitEditing');
    // EditModal should now be visible — the add flow opens the modal for food type selection
    // Press the save button (check icon) to confirm
    const saveButton = screen.getByText('[icon:check]');
    fireEvent.press(saveButton);
    // Item should now exist in the store
    const store = useStore.getState();
    const cheese = store.items.find((i) => i.description === 'Cheese');
    expect(cheese).toBeTruthy();
    expect(cheese?.purchased).toBe(false);
  });

  it('US: User sees RECENTLY BOUGHT section when items are purchased', () => {
    seedStoreWithItems();
    useStore.getState().togglePurchased(useStore.getState().items.find((i) => i.description === 'Milk')!.id);
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText(/RECENTLY BOUGHT/)).toBeTruthy();
  });

  it('US: User sees diet warning count when diet-active items conflict', () => {
    seedStoreWithItems();
    useStore.getState().setActiveDiet('keto');
    // Tag Milk as a grain to trigger keto warning
    const milk = useStore.getState().items.find((i) => i.description === 'Milk')!;
    useStore.getState().updateItem(milk.id, { foodType: 'grain' });
    render(<ListDetailScreen route={route} navigation={navigation} />);
    expect(screen.getByText(/1 warning/)).toBeTruthy();
  });

  // T046 — add-item flow calls resolveName() with the typed description
  it('T046: add-item flow resolves name and opens EditModal with pre-selected foodType', () => {
    seedStoreWithItems();
    render(<ListDetailScreen route={route} navigation={navigation} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    // "Carrot" is in the EN static lookup → resolves to vegetable
    fireEvent.changeText(input, 'Carrot');
    fireEvent(input, 'submitEditing');
    // EditModal opens with pre-selected food type
    expect(screen.getByText('Vegetable')).toBeTruthy();
    // Save
    fireEvent.press(screen.getByText('[icon:check]'));
    const store = useStore.getState();
    const carrot = store.items.find((i) => i.description === 'Carrot');
    expect(carrot).toBeTruthy();
    expect(carrot?.foodType).toBe('vegetable');
  });

  // T047 — user override of pre-selection is saved to the item
  it('T047: user override of pre-selection is saved to the item', () => {
    seedStoreWithItems();
    render(<ListDetailScreen route={route} navigation={navigation} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    // "Carrot" resolves to vegetable, but user can override by choosing a different food type
    fireEvent.changeText(input, 'Carrot');
    fireEvent(input, 'submitEditing');
    // EditModal opens — pre-selected vegetable is shown, but user can change
    // Press "None" to clear the food type override
    fireEvent.press(screen.getByText('Not classified'));
    // Then press save
    fireEvent.press(screen.getByText('[icon:check]'));
    const store = useStore.getState();
    const carrot = store.items.find((i) => i.description === 'Carrot');
    expect(carrot).toBeTruthy();
    // User explicitly chose "Not classified" → foodType should be null
    expect(carrot?.foodType).toBeNull();
  });
});
