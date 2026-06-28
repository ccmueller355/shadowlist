// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useStore } from '../store/useStore';
import { FoodType, ShoppingItem } from '../types';
import { AddItemBar } from '../components/AddItemBar';
import { ItemRow } from '../components/ItemRow';
import { EditModal } from '../components/EditModal';
import { SettingsModal } from '../components/SettingsModal';
import { SuggestionDialog } from '../components/SuggestionDialog';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { checkItem, CheckResult } from '../utils/dietEngine';
import { DIET_PROFILES } from '../constants/diets';
import { useTranslation } from '../i18n/useTranslation';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import { useThemeStyles } from '../theme/useThemeStyles';
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
  const setTheme = useStore((s) => s.setTheme);
  const setActiveDiet = useStore((s) => s.setActiveDiet);
  const setLang = useStore((s) => s.setLang);
  const clearAll = useStore((s) => s.clearAll);

  const { t: tr } = useTranslation();

  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<ShoppingItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [warningItem, setWarningItem] = useState<{ name: string; dietName: string; foodType: FoodType } | null>(null);
  const insets = useSafeAreaInsets();
  const ts = useThemeStyles();

  // Back button: close open modal, else navigate away
  useEffect(() => {
    const handler = () => {
      if (showEdit) { setShowEdit(false); setEditItem(null); return true; }
      if (showSettings) { setShowSettings(false); return true; }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [showEdit, showSettings]);

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

  // Active diet profile
  const activeDiet = settings.activeDiet
    ? DIET_PROFILES.find((d) => d.id === settings.activeDiet) ?? null
    : null;

  // Diet check cache — which items have warnings
  const dietWarnings = useMemo(() => {
    if (!activeDiet) return new Map<string, CheckResult>();
    const map = new Map<string, CheckResult>();
    listItems.forEach((item) => {
      if (item.foodType && item.foodType !== 'non_food') {
        const result = checkItem(activeDiet, item.foodType);
        if (!result.compatible) {
          map.set(item.id, result);
        }
      }
    });
    return map;
  }, [activeDiet, listItems]);

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
  // Type + Enter: dedup active items, re-add from bought, or create new
  const handleAddItem = useCallback(
    (description: string) => {
      const lowerDesc = description.toLowerCase();
      // 1. Already in active list? Skip
      const inActive = activeItems.find(
        (i) => i.description.toLowerCase() === lowerDesc
      );
      if (inActive) {
        Toast.show({ type: 'info', text1: `"${description}" already in list`, position: 'bottom' });
        return;
      }
      // 2. In bought items? Re-add from bought
      const inBought = boughtItems.find(
        (i) => i.description.toLowerCase() === lowerDesc
      );
      if (inBought) {
        moveToShop(inBought.id);
        Toast.show({ type: 'success', text1: `Re-added "${description}"`, position: 'bottom' });
        // Show diet warning for re-added item if applicable
        if (activeDiet && inBought.foodType && inBought.foodType !== 'non_food') {
          const result = checkItem(activeDiet, inBought.foodType);
          if (!result.compatible) {
            Toast.show({ type: 'info', text1: `⚠ "${description}" — ${result.warnings?.[0] ?? 'diet warning'}`, position: 'bottom' });
          }
        }
        return;
      }
      // 3. New item — create
      addItem({ listId, description });
      Toast.show({ type: 'success', text1: `Added "${description}"`, position: 'bottom' });
    },
    [listId, activeItems, boughtItems, addItem, moveToShop, activeDiet]
  );

  // Tap suggestion in AddItemBar → re-add from bought, preserving icon/qualifier
  const handleReAddItem = useCallback(
    (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        if (!item.purchased) {
          Toast.show({ type: 'info', text1: `"${item.description}" already in list`, position: 'bottom' });
          return;
        }
        moveToShop(itemId);
        Toast.show({ type: 'success', text1: `Re-added "${item.description}"`, position: 'bottom' });
      }
    },
    [items, moveToShop]
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
    onUpdateItem: (id: string, updates: Partial<ShoppingItem>) => void,
    isBought: boolean
  ) => {
    const cats = Object.keys(group).sort();
    return cats.map((cat) => (
      <View key={cat}>
        <Text style={[styles.categoryHeader, { color: cyberpunkTheme.colors.secondary, backgroundColor: cyberpunkTheme.colors.background }]}>
          {tr(('category.' + cat.replace(/[ &]/g, '')) as any)}
        </Text>
        {group[cat].map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onTogglePurchased={onToggle}
            onLongPress={onLongPress}
            onTapBought={onTapBought}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={[styles.container, ts.bg]}>
      {/* Header */}
      <View style={[styles.header, ts.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: cyberpunkTheme.colors.headerText }]} numberOfLines={1}>{displayName}</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
          <MaterialCommunityIcons name="cog" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
      </View>

      {/* Active diet header indicator */}
      {activeDiet && (
        <View style={[styles.dietHeader, { backgroundColor: cyberpunkTheme.colors.checkedBg, borderBottomColor: cyberpunkTheme.colors.border }]}>
          <MaterialCommunityIcons name="food-apple" size={16} color={cyberpunkTheme.colors.primary} />
          <Text style={[styles.dietHeaderText, { color: cyberpunkTheme.colors.primary }]}>
            {tr(activeDiet.nameKey as any)}
          </Text>
          {dietWarnings.size > 0 && (
            <Text style={[styles.dietWarningsText, { color: cyberpunkTheme.colors.danger }]}>
              {dietWarnings.size} warning{dietWarnings.size !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ===== TO SHOP SECTION ===== */}
        {activeItems.length > 0 && (
          <>
            <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
              TO SHOP
              <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({activeItems.length})</Text>
            </Text>

            {settings.sortByCategory && groupedActive ? (
              // Category grouped view
              renderCategoryGroup(groupedActive, togglePurchased, handleLongPress, moveToShop, updateItem, false)
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
                        showDietWarning={dietWarnings.has(item.id)}
                        onDietWarningPress={() => {
                          if (activeDiet && item.foodType) {
                            setWarningItem({
                              name: item.description,
                              dietName: tr(activeDiet.nameKey as any),
                              foodType: item.foodType,
                            });
                          }
                        }}
                        onTogglePurchased={togglePurchased}
                        onLongPress={handleLongPress}
                        onTapBought={moveToShop}
                        onUpdateItem={updateItem}
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
              <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
                RECENTLY BOUGHT
                <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({boughtItems.length})</Text>
              </Text>
            </View>

            {settings.sortByCategory && groupedBought ? (
              renderCategoryGroup(groupedBought, togglePurchased, handleLongPress, moveToShop, updateItem, true)
            ) : (
              filteredBought.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onTogglePurchased={togglePurchased}
                  onLongPress={handleLongPress}
                  onTapBought={moveToShop}
                  onUpdateItem={updateItem}
                />
              ))
            )}
          </>
        )}

        {/* Empty state */}
        {activeItems.length === 0 && boughtItems.length === 0 && (
          <EmptyPlaceholder
            message={tr('general.emptyListMessage')}
            icon="cart-outline"
          />
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom add/search bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <AddItemBar
          listId={listId}
          recentBought={boughtItems}
          onAddItem={handleAddItem}
          onReAddItem={handleReAddItem}
          onSearchChange={setSearch}
        />
      </View>

      {/* Modals */}
      <EditModal
        visible={showEdit}
        item={editItem}
        onSave={handleSaveEdit}
        onDelete={handleDeleteItem}
        onClose={() => { setShowEdit(false); setEditItem(null); }}
      />

      <SettingsModal
        visible={showSettings}
        currentTheme={settings.theme}
        sortByCategory={settings.sortByCategory}
        activeDiet={settings.activeDiet ?? null}
        lang={settings.lang}
        onThemeChange={setTheme}
        onToggleCategory={setSortByCategory}
        onDietChange={setActiveDiet}
        onLangChange={setLang}
        onClearAll={clearAll}
        onClose={() => setShowSettings(false)}
      />

      {/* Diet warning suggestion dialog */}
      <SuggestionDialog
        visible={warningItem !== null}
        itemName={warningItem?.name ?? ''}
        dietName={warningItem?.dietName ?? ''}
        suggestions={[]}
        onAcceptSuggestion={(label) => {
          if (warningItem) {
            addItem({ listId, description: label });
            Toast.show({ type: 'success', text1: `Added "${label}"`, position: 'bottom' });
          }
          setWarningItem(null);
        }}
        onAddAnyway={() => setWarningItem(null)}
        onClose={() => setWarningItem(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
    paddingHorizontal: cyberpunkTheme.spacing.md,
    paddingVertical: cyberpunkTheme.spacing.sm,
    paddingTop: 50,
  },
  headerTitle: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  headerCount: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomBar: {
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    paddingVertical: cyberpunkTheme.spacing.sm,
    borderTopWidth: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: cyberpunkTheme.spacing.sm,
    marginBottom: cyberpunkTheme.spacing.sm,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    paddingVertical: 4,
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
    paddingVertical: cyberpunkTheme.spacing.sm,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    fontWeight: 'normal',
  },
  categoryHeader: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    paddingVertical: 4,
    paddingHorizontal: cyberpunkTheme.spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    marginTop: cyberpunkTheme.spacing.sm,
    paddingTop: 4,
  },
  dragging: {
    opacity: 0.8,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomSpacer: {
    height: 80,
  },
  dietHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: cyberpunkTheme.spacing.md,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  dietHeaderText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
  },
  dietWarningsText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 11,
    fontWeight: '600',
  },
});
