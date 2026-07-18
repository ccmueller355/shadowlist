// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import './component-test-setup';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { CyberpunkCard } from '../components/CyberpunkCard';
import { IconPickerGrid } from '../components/IconPickerGrid';
import { ListCard } from '../components/ListCard';

describe('EmptyPlaceholder', () => {
  it('renders default message', () => {
    render(<EmptyPlaceholder />);
    expect(screen.getByText('Add your first item')).toBeTruthy();
  });

  it('renders custom message', () => {
    render(<EmptyPlaceholder message="No items found" icon="alert" />);
    expect(screen.getByText('No items found')).toBeTruthy();
  });

  it('renders icon', () => {
    render(<EmptyPlaceholder />);
    expect(screen.getByText('[icon:cart-plus]')).toBeTruthy();
  });
});

describe('CyberpunkCard', () => {
  it('renders children', () => {
    render(
      <CyberpunkCard>
        <Text>Hello Card</Text>
      </CyberpunkCard>
    );
    expect(screen.getByText('Hello Card')).toBeTruthy();
  });

  it('renders without glow', () => {
    render(
      <CyberpunkCard glow={false}>
        <Text>No glow</Text>
      </CyberpunkCard>
    );
    expect(screen.getByText('No glow')).toBeTruthy();
  });
});

describe('IconPickerGrid', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders icon buttons', () => {
    render(<IconPickerGrid selected="cart" onSelect={mockOnSelect} />);
    // TouchableOpacity renders as accessible Views; verify first icon renders
    expect(screen.getByText('[icon:cart]')).toBeTruthy();
    expect(screen.getByText('[icon:fridge]')).toBeTruthy();
    expect(screen.getByText('[icon:basket]')).toBeTruthy();
  });

  it('calls onSelect when an icon is pressed', () => {
    render(<IconPickerGrid selected="cart" onSelect={mockOnSelect} />);
    fireEvent.press(screen.getByText('[icon:cart]'));
    expect(mockOnSelect).toHaveBeenCalledWith('cart');
  });
});

describe('ListCard', () => {
  const mockList = { id: 'list-1', name: 'Test List', createdAt: 1, updatedAt: 1 };
  const mockOnPress = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders list name', () => {
    render(<ListCard list={mockList} itemCount={3} onPress={mockOnPress} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test List')).toBeTruthy();
  });

  it('shows singular "item" for count of 1', () => {
    render(<ListCard list={mockList} itemCount={1} onPress={mockOnPress} onDelete={mockOnDelete} />);
    expect(screen.getByText('1 item')).toBeTruthy();
  });

  it('shows plural "items" for count > 1', () => {
    render(<ListCard list={mockList} itemCount={5} onPress={mockOnPress} onDelete={mockOnDelete} />);
    expect(screen.getByText('5 items')).toBeTruthy();
  });

  it('has delete icon', () => {
    render(<ListCard list={mockList} itemCount={0} onPress={mockOnPress} onDelete={mockOnDelete} />);
    expect(screen.getByText('[icon:delete-outline]')).toBeTruthy();
  });

  it('calls onDelete when delete icon pressed', () => {
    render(<ListCard list={mockList} itemCount={0} onPress={mockOnPress} onDelete={mockOnDelete} />);
    fireEvent.press(screen.getByText('[icon:delete-outline]'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
