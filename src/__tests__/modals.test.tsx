// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import './component-test-setup';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { EditModal } from '../components/EditModal';
import { SettingsModal } from '../components/SettingsModal';
import { useStore } from '../store/useStore';

// Need i18n translation data for SettingsModal
import { en } from '../i18n/en';

describe('EditModal', () => {
  const mockItem = {
    id: 'item-1',
    listId: 'list-1',
    description: 'Test Item',
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
    visible: true,
    item: mockItem,
    onSave: jest.fn(),
    onDelete: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when item is null', () => {
    render(<EditModal {...defaultProps} item={null} />);
    expect(screen.queryByText('Test Item')).toBeNull();
  });

  it('renders item description in input field', () => {
    render(<EditModal {...defaultProps} />);
    expect(screen.getByDisplayValue('Test Item')).toBeTruthy();
  });

  it('renders qualifier in input field', () => {
    render(<EditModal {...defaultProps} />);
    expect(screen.getByDisplayValue('2x')).toBeTruthy();
  });

  it('renders icons in the grid', () => {
    render(<EditModal {...defaultProps} />);
    expect(screen.getByText('[icon:cart]')).toBeTruthy();
    expect(screen.getByText('[icon:check]')).toBeTruthy();
    expect(screen.getByText('Edit Item')).toBeTruthy();
  });

  it('calls onSave and onClose when save is pressed', () => {
    const onSave = jest.fn();
    const onClose = jest.fn();
    render(<EditModal {...defaultProps} onSave={onSave} onClose={onClose} />);
    fireEvent.press(screen.getByText('[icon:check]'));
    expect(onSave).toHaveBeenCalledWith('item-1', expect.objectContaining({
      description: 'Test Item',
      qualifier: '2x',
    }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel pressed', () => {
    const onClose = jest.fn();
    render(<EditModal {...defaultProps} onClose={onClose} />);
    fireEvent.press(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('SettingsModal', () => {
  const defaultProps = {
    visible: true,
    currentTheme: 'fixer' as const,
    sortByCategory: false,
    activeDiet: null,
    lang: 'en' as const,
    onThemeChange: jest.fn(),
    onToggleCategory: jest.fn(),
    onDietChange: jest.fn(),
    onLangChange: jest.fn(),
    onClearAll: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure store has default state for translations to work
    useStore.setState({
      lists: [],
      items: [],
      settings: { theme: 'fixer', sortByCategory: false, defaultIcon: 'cart', activeDiet: null, lang: 'en' },
      hydrated: true,
    });
  });

  it('renders settings modal when visible', () => {
    render(<SettingsModal {...defaultProps} />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<SettingsModal {...defaultProps} visible={false} />);
    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('renders language option', () => {
    render(<SettingsModal {...defaultProps} />);
    expect(screen.getByText('English')).toBeTruthy();
  });

  it('renders Deutsch language option', () => {
    render(<SettingsModal {...defaultProps} />);
    expect(screen.getByText('Deutsch')).toBeTruthy();
  });

  it('calls onClose when close icon pressed', () => {
    const onClose = jest.fn();
    render(<SettingsModal {...defaultProps} onClose={onClose} />);
    const closeIcons = screen.getAllByText('[icon:close]');
    fireEvent.press(closeIcons[0]);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onThemeChange when a theme is selected', () => {
    const onThemeChange = jest.fn();
    render(<SettingsModal {...defaultProps} onThemeChange={onThemeChange} />);
    // Find theme option via visible text
    const deckerBtn = screen.getByText('Deckers Versteck');
    fireEvent.press(deckerBtn);
    expect(onThemeChange).toHaveBeenCalledWith('decker');
  });

  it('calls onDietChange when diet is selected', () => {
    const onDietChange = jest.fn();
    render(<SettingsModal {...defaultProps} onDietChange={onDietChange} />);
    const ketoBtn = screen.getByLabelText('Diet: Keto');
    fireEvent.press(ketoBtn);
    expect(onDietChange).toHaveBeenCalledWith('keto');
  });

  it('renders clear all data button', () => {
    render(<SettingsModal {...defaultProps} />);
    expect(screen.getByLabelText('Clear All Data')).toBeTruthy();
  });
});
