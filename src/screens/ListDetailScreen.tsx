import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useStore } from '../store/useStore';
import { ShoppingItem } from '../types';
import { AddItemBar } from '../components/AddItemBar';
import { ItemRow } from '../components/ItemRow';
import { EditModal } from '../components/EditModal';
import { SettingsModal } from '../components/SettingsModal';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<any, 'ListDetail'>;

export function ListDetailScreen({ route, navigation }: Props) {
  const { listId, listName } = route.params as { listId: string; listName: string };

  const items = useStore((s) => s.items);
  const lists = useStore((s) => s.lists);
  const settings = useStore((s) => s.settings);
  const addItem = useStore((s) => s.addItem);
  const updateItem = useStore((s) => s.updateItem);
  const deleteItem = useStore((s) => s.deleteItem);
  const togglePurchased = useStore((s) => s.togglePurchased);
  const moveToShop = useStore((s) => s.moveToShop);
  const reorderItems = useStore((s) => s.reorderItems);
  const setSortByCategory = useStore((s) => s.setSortByCategory);
  const addDemoData = useStore((s) => s.addDemoData);
  const clearAll = useStore((s) => s.clearAll);

  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<ShoppingItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Get current list name
  const currentList = lists.find((l) => l.id === listId);
  const displayName = currentList?.name || listName;

  // Filter items for this list
  const listItems = useMemo(
    () => items.filter((i) => i.listId === listId),
    [items, listId]
  );

  const activeItems = useMemo(
    () =>
      listItems
        .filter((i) => !i.purchased)
        .sort((a, b) => a.order - b.order),
    [listItems]
  );

  const boughtItems = useMemo(
    () =>
      listItems
        .filter((i) => i.purchased)
        .sort((a, b) => b.updatedAt - a.updatedAt) // Most recent first
        .slice(0, 50), // Keep last 50
    [listItems]
  );

  // Search filter
  const filteredActive = useMemo(() => {
    if (!search.trim()) return activeItems;
    const q = search.toLowerCase();
    return activeItems.filter((i) => i.description.toLowerCase().includes(q));
  }, [activeItems, search]);

  const filteredBought = useMemo(() => {
    if (!search.trim()) return boughtItems;
    const q = search.toLowerCase();
    return boughtItems.filter((i) => i.description.toLowerCase().includes(q));
  }, [boughtItems, search]);

  // Category grouping
  const groupedActive = useMemo(() => {
    if (!settings.sortByCategory) return null;
    const groups: Record<string, ShoppingItem[]> = {};
    filteredActive.forEach((item) => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [filteredActive, settings.sortByCategory]);

  const groupedBought = useMemo(() => {
    if (!settings.sortByCategory) return null;
    const groups: Record<string, ShoppingItem[]> = {};
    filteredBought.forEach((item) => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [filteredBought, settings.sortByCategory]);

  // Handlers
  const handleAddItem = useCallback(
    (description: string) => {
      // Check if this item exists in bought items → re-add with same properties
      const existing = boughtItems.find(
        (i) => i.description.toLowerCase() === description.toLowerCase()
      );
      if (existing) {
        moveToShop(existing.id);
        Toast.show({ type: 'success', text1: `Re-added "${description}"`, position: 'bottom' });
      } else {
        addItem({ listId, description });
        Toast.show({ type: 'success', text1: `Added "${description}"`, position: 'bottom' });
      }
    },
    [listId, boughtItems, addItem, moveToShop]
  );

  const handleLongPress = (item: ShoppingItem) => {
    setEditItem(item);
    setShowEdit(true);
  };

  const handleSaveEdit = (id: string, updates: Partial<ShoppingItem>) => {
    updateItem(id, updates);
    Toast.show({ type: 'success', text1: 'Item updated', position: 'bottom' });
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    Alert.alert('Delete Item', `Delete "${item?.description || 'this item'}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteItem(id);
          Toast.show({ type: 'info', text1: 'Item deleted', position: 'bottom' });
        },
      },
    ]);
  };

  const handleDragEnd = ({ data }: { data: ShoppingItem[] }) => {
    reorderItems(listId, data.map((i) => i.id));
  };

  // Render category section
  const renderCategoryGroup = (
    group: Record<string, ShoppingItem[]>,
    onToggle: (id: string) => void,
    onLongPress: (item: ShoppingItem) => void,
    onTapBought: (id: string) => void,
    onDelete: (id: string) => void,
    isBought: boolean
  ) => {
    const cats = Object.keys(group).sort();
    return cats.map((cat) => (
      <View key={cat}>
        <Text style={styles.categoryHeader}>
          {cat}
        </Text>
        {group[cat].map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onTogglePurchased={onToggle}
            onLongPress={onLongPress}
            onTapBought={onTapBought}
            onDelete={onDelete}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{displayName}</Text>
        <Text style={styles.headerCount}>
          {activeItems.length}
        </Text>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
      </View>

      {/* Add/Search bar */}
      <View style={styles.barContainer}>
        <AddItemBar
          listId={listId}
          recentBought={boughtItems}
          onAddItem={handleAddItem}
        />
      </View>

      {/* Search input */}
      <View style={styles.searchRow}>
        <MaterialCommunityIcons name="magnify" size={18} color={cyberpunkTheme.colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Filter items..."
          placeholderTextColor={cyberpunkTheme.colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          returnKeyType="done"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color={cyberpunkTheme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ===== TO SHOP SECTION ===== */}
        {activeItems.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>
              TO SHOP
              <Text style={styles.sectionCount}> ({activeItems.length})</Text>
            </Text>

            {settings.sortByCategory && groupedActive ? (
              // Category grouped view
              renderCategoryGroup(groupedActive, togglePurchased, handleLongPress, moveToShop, handleDeleteItem, false)
            ) : (
              // Draggable list for active items
              <DraggableFlatList
                data={filteredActive}
                renderItem={({ item, drag, isActive }: RenderItemParams<ShoppingItem>) => (
                  <ScaleDecorator>
                    <View style={isActive ? styles.dragging : undefined}>
                      <ItemRow
                        item={item}
                        drag={drag}
                        isActive={isActive}
                        onTogglePurchased={togglePurchased}
                        onLongPress={handleLongPress}
                        onTapBought={moveToShop}
                        onDelete={handleDeleteItem}
                      />
                    </View>
                  </ScaleDecorator>
                )}
                keyExtractor={(item) => item.id}
                onDragEnd={handleDragEnd}
                scrollEnabled={false}
              />
            )}
          </>
        )}

        {/* ===== RECENTLY BOUGHT SECTION ===== */}
        {boughtItems.length > 0 && (
          <>
            <View style={styles.divider}>
              <MaterialCommunityIcons name="check-circle-outline" size={16} color={cyberpunkTheme.colors.sectionHeader} />
              <Text style={styles.sectionHeader}>
                RECENTLY BOUGHT
                <Text style={styles.sectionCount}> ({boughtItems.length})</Text>
              </Text>
            </View>

            {settings.sortByCategory && groupedBought ? (
              renderCategoryGroup(groupedBought, togglePurchased, handleLongPress, moveToShop, handleDeleteItem, true)
            ) : (
              filteredBought.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onTogglePurchased={togglePurchased}
                  onLongPress={handleLongPress}
                  onTapBought={moveToShop}
                  onDelete={handleDeleteItem}
                />
              ))
            )}
          </>
        )}

        {/* Empty state */}
        {activeItems.length === 0 && boughtItems.length === 0 && (
          <EmptyPlaceholder
            message="Your shopping list is empty — add items above"
            icon="cart-outline"
          />
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modals */}
      <EditModal
        visible={showEdit}
        item={editItem}
        onSave={handleSaveEdit}
        onClose={() => { setShowEdit(false); setEditItem(null); }}
      />

      <SettingsModal
        visible={showSettings}
        sortByCategory={settings.sortByCategory}
        hasDemoData={false}
        onToggleCategory={setSortByCategory}
        onLoadDemo={addDemoData}
        onClearAll={clearAll}
        onClose={() => setShowSettings(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.headerBg,
    paddingHorizontal: cyberpunkTheme.spacing.md,
    paddingVertical: cyberpunkTheme.spacing.sm,
    paddingTop: 50,
  },
  headerTitle: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
    color: cyberpunkTheme.colors.headerText,
    flex: 1,
  },
  headerCount: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 14,
    color: cyberpunkTheme.colors.primary,
    fontWeight: 'bold',
  },
  barContainer: {
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    paddingVertical: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cyberpunkTheme.colors.surface,
    marginHorizontal: cyberpunkTheme.spacing.sm,
    marginBottom: cyberpunkTheme.spacing.sm,
    paddingHorizontal: 8,
    borderRadius: cyberpunkTheme.borderRadius,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    gap: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 13,
    color: cyberpunkTheme.colors.textPrimary,
    paddingVertical: 6,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 13,
    fontWeight: 'bold',
    color: cyberpunkTheme.colors.sectionHeader,
    paddingVertical: cyberpunkTheme.spacing.sm,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    color: cyberpunkTheme.colors.textSecondary,
    fontWeight: 'normal',
  },
  categoryHeader: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    color: cyberpunkTheme.colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: cyberpunkTheme.colors.border,
    marginTop: cyberpunkTheme.spacing.sm,
    paddingTop: 4,
  },
  dragging: {
    opacity: 0.8,
    shadowColor: cyberpunkTheme.colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomSpacer: {
    height: 80,
  },
});
