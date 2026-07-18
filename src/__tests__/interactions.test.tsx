// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import './component-test-setup';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AddItemBar } from '../components/AddItemBar';
import { ItemRow } from '../components/ItemRow';
import { SuggestionDialog } from '../components/SuggestionDialog';
import { Text } from 'react-native';

// Mock timers for debounce
jest.useFakeTimers();

describe('AddItemBar', () => {
  const mockItem = {
    id: 'item-1',
    listId: 'list-1',
    description: 'Milk',
    qualifier: '',
    icon: 'cart',
    purchased: false,
    order: 0,
    category: null,
    foodType: 'non_food',
    createdAt: 1,
    updatedAt: 1,
  };

  const defaultProps = {
    listId: 'list-1',
    recentBought: [mockItem],
    onAddItem: jest.fn(),
    onReAddItem: jest.fn(),
    onSearchChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field', () => {
    render(<AddItemBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search or add item...')).toBeTruthy();
  });

  it('calls onAddItem on submit with trimmed text', () => {
    render(<AddItemBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    fireEvent.changeText(input, '  Eggs  ');
    fireEvent(input, 'submitEditing');
    expect(defaultProps.onAddItem).toHaveBeenCalledWith('Eggs');
  });

  it('does not call onAddItem for empty text', () => {
    render(<AddItemBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    fireEvent.changeText(input, '   ');
    fireEvent(input, 'submitEditing');
    expect(defaultProps.onAddItem).not.toHaveBeenCalled();
  });

  it('shows clear button when text is entered', () => {
    render(<AddItemBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    fireEvent.changeText(input, 'Milk');
    expect(screen.getByText('[icon:close-circle]')).toBeTruthy();
  });

  it('clears input on clear button press', () => {
    const onSearchChange = jest.fn();
    render(<AddItemBar {...defaultProps} onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    fireEvent.changeText(input, 'Milk');
    fireEvent.press(screen.getByText('[icon:close-circle]'));
    expect(onSearchChange).toHaveBeenCalledWith('');
  });

  it('disables keyboard-native autocomplete so the built-in suggestion dropdown takes precedence', () => {
    render(<AddItemBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search or add item...');
    expect(input.props.autoComplete).toBe('off');
    expect(input.props.autoCorrect).toBe(false);
  });
});

describe('ItemRow', () => {
  const defaultItem = {
    id: 'item-1',
    listId: 'list-1',
    description: 'Organic Milk',
    qualifier: '2x',
    icon: 'cart',
    purchased: false,
    order: 0,
    category: 'dairy',
    foodType: 'dairy' as const,
    createdAt: 1,
    updatedAt: 1,
  };

  const defaultProps = {
    item: defaultItem,
    drag: jest.fn(),
    isActive: false,
    showDietWarning: false,
    onDietWarningPress: jest.fn(),
    onTogglePurchased: jest.fn(),
    onLongPress: jest.fn(),
    onTapBought: jest.fn(),
    onUpdateItem: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders item description', () => {
    render(<ItemRow {...defaultProps} />);
    expect(screen.getByText('Organic Milk')).toBeTruthy();
  });

  it('renders qualifier text', () => {
    render(<ItemRow {...defaultProps} />);
    expect(screen.getByText('2x')).toBeTruthy();
  });

  it('shows drag handle', () => {
    render(<ItemRow {...defaultProps} />);
    expect(screen.getByText('[icon:drag]')).toBeTruthy();
  });

  it('shows diet warning badge when showDietWarning is true and not bought', () => {
    render(<ItemRow {...defaultProps} showDietWarning={true} />);
    expect(screen.getByText('[icon:alert-circle]')).toBeTruthy();
  });

  it('does not show diet warning badge when item is bought', () => {
    render(<ItemRow {...defaultProps} item={{ ...defaultItem, purchased: true }} showDietWarning={true} />);
    expect(screen.queryByText('[icon:alert-circle]')).toBeNull();
  });

  it('renders check icon when bought', () => {
    render(<ItemRow {...defaultProps} item={{ ...defaultItem, purchased: true }} />);
    expect(screen.getByText('[icon:check-bold]')).toBeTruthy();
  });

  it('calls onTapBought when pressing a bought item', () => {
    const onTapBought = jest.fn();
    render(<ItemRow {...defaultProps} item={{ ...defaultItem, purchased: true }} onTapBought={onTapBought} />);
    fireEvent.press(screen.getByText('Organic Milk'));
    expect(onTapBought).toHaveBeenCalledWith('item-1');
  });

  it('calls onTogglePurchased when pressing an unbought item', () => {
    const onTogglePurchased = jest.fn();
    render(<ItemRow {...defaultProps} onTogglePurchased={onTogglePurchased} />);
    fireEvent.press(screen.getByText('Organic Milk'));
    expect(onTogglePurchased).toHaveBeenCalledWith('item-1');
  });

  it('calls onLongPress on long press', () => {
    const onLongPress = jest.fn();
    render(<ItemRow {...defaultProps} onLongPress={onLongPress} />);
    // The TouchableOpacity renders as an accessible View — longPress event fires onPress handler
    // fire longPress on the container around the description
    fireEvent(screen.getByText('Organic Milk'), 'longPress');
    expect(onLongPress).toHaveBeenCalledWith(defaultItem);
  });

  it('calls onUpdateItem when qualifier editing is submitted', () => {
    const onUpdateItem = jest.fn();
    render(<ItemRow {...defaultProps} onUpdateItem={onUpdateItem} />);
    // Tap qualifier to start editing
    fireEvent.press(screen.getByText('2x'));
    // Find the qualifier input and submit
    const input = screen.getByDisplayValue('2x');
    fireEvent(input, 'submitEditing');
    expect(onUpdateItem).toHaveBeenCalledWith('item-1', { qualifier: '2x' });
  });

  it('shows add qualifier button when no qualifier', () => {
    render(<ItemRow {...defaultProps} item={{ ...defaultItem, qualifier: '' }} />);
    expect(screen.getByText('[icon:plus]')).toBeTruthy();
  });
});

describe('SuggestionDialog', () => {
  const defaultProps = {
    visible: true,
    itemName: 'White Bread',
    dietName: 'Keto',
    suggestions: [
      { label: 'Almond Bread', icon: 'bread-slice' },
      { label: 'Lettuce Wrap', icon: 'leaf' },
    ],
    onAcceptSuggestion: jest.fn(),
    onAddAnyway: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when visible', () => {
    render(<SuggestionDialog {...defaultProps} />);
    expect(screen.getByText(/White Bread/)).toBeTruthy();
    expect(screen.getByText(/Keto/)).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<SuggestionDialog {...defaultProps} visible={false} />);
    expect(screen.queryByText(/White Bread/)).toBeNull();
  });

  it('shows suggestions', () => {
    render(<SuggestionDialog {...defaultProps} />);
    expect(screen.getByText('Almond Bread')).toBeTruthy();
    expect(screen.getByText('Lettuce Wrap')).toBeTruthy();
  });

  it('calls onAcceptSuggestion when a suggestion is pressed', () => {
    render(<SuggestionDialog {...defaultProps} />);
    fireEvent.press(screen.getByText('Almond Bread'));
    expect(defaultProps.onAcceptSuggestion).toHaveBeenCalledWith('Almond Bread');
  });

  it('calls onAddAnyway when the button is pressed', () => {
    render(<SuggestionDialog {...defaultProps} />);
    fireEvent.press(screen.getByText('Add anyway'));
    expect(defaultProps.onAddAnyway).toHaveBeenCalled();
  });

  it('calls onClose when cancel is pressed', () => {
    render(<SuggestionDialog {...defaultProps} />);
    fireEvent.press(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
