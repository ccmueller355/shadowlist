// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  LayoutAnimation,
  Platform,
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
import { SuggestionDialog } from '../components/SuggestionDialog';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { checkItem, CheckResult } from '../utils/dietEngine';
import { DIET_PROFILES } from '../constants/diets';
import { resolveName } from '../constants/foodLookup';
import { useTranslation } from '../i18n/useTranslation';
import { useAppTheme } from '../theme/useTheme';
import { useThemeStyles } from '../theme/useThemeStyles';
import Toast from 'react-native-toast-message';

// ── Memoized section components to localize re-renders ─────────

const ToShopSection = memo(function ToShopSection({
  items,
  total,
  handleTogglePurchased,
  handleLongPress,
  moveToShop,
  updateItem,
  dietWarnings,
  activeDiet,
  setWarningItem,
  tr,
  cyberpunkTheme,
}: {
  items: ShoppingItem[];
  total: number;
  handleTogglePurchased: (id: string) => void;
  handleLongPress: (item: ShoppingItem) => void;
  moveToShop: (id: string) => void;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  dietWarnings: Map<string, CheckResult>;
  activeDiet: { nameKey: string } | null;
  setWarningItem: (item: { name: string; dietName: string; foodType: FoodType } | null) => void;
  tr: (key: any) => string;
  cyberpunkTheme: any;
}) {
  return (
    <>
      <View style={[{ backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
      <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
        TO SHOP
        <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({items.length} of {total})</Text>
      </Text>
      </View>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onTogglePurchased={handleTogglePurchased}
          onLongPress={handleLongPress}
          onTapBought={moveToShop}
          onUpdateItem={updateItem}
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
        />
      ))}
    </>
  );
});

const BoughtSection = memo(function BoughtSection({
  items,
  handleTogglePurchased,
  handleLongPress,
  moveToShop,
  updateItem,
  cyberpunkTheme,
}: {
  items: ShoppingItem[];
  handleTogglePurchased: (id: string) => void;
  handleLongPress: (item: ShoppingItem) => void;
  moveToShop: (id: string) => void;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  cyberpunkTheme: any;
}) {
  return (
    <>
      <View style={[styles.divider, { backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
      <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
        RECENTLY BOUGHT
        <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({items.length})</Text>
      </Text>
      </View>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onTogglePurchased={handleTogglePurchased}
          onLongPress={handleLongPress}
          onTapBought={moveToShop}
          onUpdateItem={updateItem}
        />
      ))}
    </>
  );
});

type Props = NativeStackScreenProps<any, 'ListDetail'>;

export function ListDetailScreen({ route, navigation }: Props) {
  const { listId, listName } = route.params as { listId: string; listName: string };

  const items = useStore((s) => s.items);
  const lists = useStore((s) => s.lists);
  const settings = useStore((s) => s.settings);
  const addItem = useStore((s) => s.addItem);
  const updateItem = useStore((s) => s.updateItem);
  const deleteItem = useStore((s) => s.deleteItem);
  const storeTogglePurchased = useStore((s) => s.togglePurchased);
  const handleTogglePurchased = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    storeTogglePurchased(id);
  }, [storeTogglePurchased]);
  const moveToShop = useStore((s) => s.moveToShop);
  const reorderItems = useStore((s) => s.reorderItems);
  const foodNameIndex = useStore((s) => s.foodNameIndex);

  const { t: tr } = useTranslation();
  const cyberpunkTheme = useAppTheme();

  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<ShoppingItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [showAllBought, setShowAllBought] = useState(false);
  const [warningItem, setWarningItem] = useState<{ name: string; dietName: string; foodType: FoodType } | null>(null);
  const [addItemFoodType, setAddItemFoodType] = useState<FoodType | null | undefined>(undefined);
  const [addItemIcon, setAddItemIcon] = useState<string | undefined>(undefined);
  const [addItemDescription, setAddItemDescription] = useState<string | undefined>(undefined);

  const MAX_COMPACT_ITEMS = 40;
  const MAX_VISIBLE_BOUGHT = 20;
  const insets = useSafeAreaInsets();
  const ts = useThemeStyles();


  // Back button: close open modal, else navigate away
  useEffect(() => {
    const handler = () => {
      if (showEdit) { setShowEdit(false); setEditItem(null); return true; }
      return false;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [showEdit]);

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

  // Only keep last 200 purchased items — enough for "View all", fast enough to sort
  const MAX_BOUGHT_HISTORY = 200;
  const allPurchased = useMemo(
    () => listItems.filter((i) => i.purchased),
    [listItems]
  );

  const boughtItems = useMemo(
    () =>
      allPurchased
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, MAX_BOUGHT_HISTORY),
    [allPurchased]
  );

  // Compact default view — up to 50 items total: active first, then bought
  const compactActive = useMemo(
    () => activeItems.slice(0, MAX_COMPACT_ITEMS),
    [activeItems]
  );
  const compactBought = useMemo(
    () => boughtItems.slice(0, MAX_COMPACT_ITEMS - compactActive.length),
    [boughtItems, compactActive.length]
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

  const displayBought = useMemo(
    () => showAllBought ? filteredBought : filteredBought.slice(0, MAX_VISIBLE_BOUGHT),
    [filteredBought, showAllBought]
  );

  const hasMoreBought = !showAllBought && boughtItems.length > MAX_VISIBLE_BOUGHT;

  // Active diet profile
  const activeDiet = settings.activeDiet
    ? DIET_PROFILES.find((d) => d.id === settings.activeDiet) ?? null
    : null;

  // Diet check cache — only compute for active (visible) items
  const dietWarnings = useMemo(() => {
    if (!activeDiet) return new Map<string, CheckResult>();
    const map = new Map<string, CheckResult>();
    activeItems.forEach((item) => {
      if (item.foodType && item.foodType !== 'non_food') {
        const result = checkItem(activeDiet, item.foodType);
        if (!result.compatible) {
          map.set(item.id, result);
        }
      }
    });
    return map;
  }, [activeDiet, activeItems]);

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
    displayBought.forEach((item) => {
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
      // 3. New item — resolve name + open EditModal for food type selection
      const resolution = resolveName(description, settings.lang, foodNameIndex);
      if (resolution.source !== 'none') {
        setAddItemFoodType(resolution.foodType);
        setAddItemIcon(resolution.icon ?? undefined);
      } else {
        setAddItemFoodType(undefined);
        setAddItemIcon(undefined);
      }
      setAddItemDescription(description);
      setEditItem(null);
      setShowEdit(true);
    },
    [listId, activeItems, boughtItems, addItem, moveToShop, activeDiet, settings.lang, foodNameIndex]
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

  const handleAddNewItem = (params: { listId: string; description: string; qualifier: string; icon: string; category: string | null; foodType: FoodType | null }) => {
    const newItem = addItem({
      listId,
      description: params.description,
      qualifier: params.qualifier,
      icon: params.icon,
      category: params.category,
    });
    // Update foodType separately if provided
    if (params.foodType) {
      updateItem(newItem.id, { foodType: params.foodType });
    }
    Toast.show({ type: 'success', text1: `Added "${params.description}"`, position: 'bottom' });
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
      <View style={[styles.header, { backgroundColor: cyberpunkTheme.colors.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: cyberpunkTheme.colors.headerText }]} numberOfLines={1}>{displayName}</Text>
      </View>

      {/* Active diet header indicator */}
      {activeDiet && (
        <View style={[styles.dietHeader, { backgroundColor: cyberpunkTheme.colors.surface, borderTopColor: cyberpunkTheme.colors.border, borderTopWidth: 1, borderBottomColor: cyberpunkTheme.colors.border }]}>
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      {/* Content — Compact or Full view */}
      {!showAllItems ? (
        // ── COMPACT VIEW — Last 50 items (mix of active + bought) ──
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
        >
          {/* ===== TO SHOP (compact) ===== */}
          {compactActive.length > 0 && (
            <ToShopSection
              items={compactActive}
              total={activeItems.length}
               handleTogglePurchased={handleTogglePurchased}
               handleLongPress={handleLongPress}
               moveToShop={moveToShop}
               updateItem={updateItem}
               dietWarnings={dietWarnings}
               activeDiet={activeDiet}
               setWarningItem={setWarningItem}
               tr={tr}
               cyberpunkTheme={cyberpunkTheme}
             />
           )}

           {/* ===== RECENTLY BOUGHT (compact) ===== */}
           {compactBought.length > 0 && (
             <BoughtSection
               items={compactBought}
               handleTogglePurchased={handleTogglePurchased}
              handleLongPress={handleLongPress}
              moveToShop={moveToShop}
              updateItem={updateItem}
              cyberpunkTheme={cyberpunkTheme}
            />
          )}

          {listItems.length > MAX_COMPACT_ITEMS && (
            <TouchableOpacity
              style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
              onPress={() => setShowAllItems(true)}
            >
              <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.primary }]}>
                View all {listItems.length} items →
              </Text>
            </TouchableOpacity>
          )}

          {listItems.length === 0 && (
            <EmptyPlaceholder
              message={tr('general.emptyListMessage')}
              icon="cart-outline"
            />
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      ) : showAllItems && settings.sortByCategory ? (
        // ── FULL VIEW — Category sorted ──
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
        >
          <TouchableOpacity
            style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
            onPress={() => setShowAllItems(false)}
          >
            <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.textSecondary }]}>
              ↑ Show compact view
            </Text>
          </TouchableOpacity>

          {/* ===== TO SHOP SECTION ===== */}
          {activeItems.length > 0 && (
            <>
              <View style={[{ backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
              <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
                TO SHOP
                <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({activeItems.length})</Text>
              </Text>
              </View>
              {groupedActive && renderCategoryGroup(groupedActive, handleTogglePurchased, handleLongPress, moveToShop, updateItem, false)}
            </>
          )}

          {/* ===== RECENTLY BOUGHT SECTION ===== */}
          {boughtItems.length > 0 && (
            <>
              <View style={styles.divider}>
                <MaterialCommunityIcons name="check-circle-outline" size={16} color={cyberpunkTheme.colors.sectionHeader} />
                <View style={[{ backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
                <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
                  RECENTLY BOUGHT
                  <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({displayBought.length} of {boughtItems.length})</Text>
                </Text>
                </View>
              </View>
              {groupedBought && renderCategoryGroup(groupedBought, handleTogglePurchased, handleLongPress, moveToShop, updateItem, true)}
              {hasMoreBought && (
                <TouchableOpacity
                  style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
                  onPress={() => setShowAllBought(true)}
                >
                  <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.primary }]}>
                    View all {boughtItems.length - MAX_VISIBLE_BOUGHT} purchased items →
                  </Text>
                </TouchableOpacity>
              )}
              {showAllBought && (
                <TouchableOpacity
                  style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
                  onPress={() => setShowAllBought(false)}
                >
                  <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.textSecondary }]}>
                    ↑ Show less
                  </Text>
                </TouchableOpacity>
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
      ) : (
        // ── FULL VIEW — Draggable ──
        <View style={styles.scrollArea}>
          <TouchableOpacity
            style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
            onPress={() => setShowAllItems(false)}
          >
            <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.textSecondary }]}>
              ↑ Show compact view
            </Text>
          </TouchableOpacity>

          {/* TO SHOP HEADER */}
          {activeItems.length > 0 && (
            <View style={[{ backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
              <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader, paddingHorizontal: 8 }]}>
                TO SHOP
                <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({activeItems.length})</Text>
              </Text>
            </View>
          )}

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
                    onTogglePurchased={handleTogglePurchased}
                    onLongPress={handleLongPress}
                    onTapBought={moveToShop}
                    onUpdateItem={updateItem}
                  />
                </View>
              </ScaleDecorator>
            )}
            keyExtractor={(item) => item.id}
            onDragEnd={handleDragEnd}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
            ListFooterComponent={boughtItems.length > 0 ? (
              <View>
                <View style={styles.divider}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={cyberpunkTheme.colors.sectionHeader} />
                  <View style={[{ backgroundColor: cyberpunkTheme.colors.surface, borderTopWidth: 1, borderTopColor: cyberpunkTheme.colors.border }]}>
                  <Text style={[styles.sectionHeader, { color: cyberpunkTheme.colors.sectionHeader }]}>
                    RECENTLY BOUGHT
                    <Text style={[styles.sectionCount, { color: cyberpunkTheme.colors.textSecondary }]}> ({displayBought.length} of {boughtItems.length})</Text>
                  </Text>
                  </View>
                </View>
                {displayBought.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onTogglePurchased={handleTogglePurchased}
                    onLongPress={handleLongPress}
                    onTapBought={moveToShop}
                    onUpdateItem={updateItem}
                  />
                ))}
                {hasMoreBought && (
                  <TouchableOpacity
                    style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
                    onPress={() => setShowAllBought(true)}
                  >
                    <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.primary }]}>
                      View all {boughtItems.length - MAX_VISIBLE_BOUGHT} purchased items →
                    </Text>
                  </TouchableOpacity>
                )}
                {showAllBought && (
                  <TouchableOpacity
                    style={[styles.viewAllButton, { borderColor: cyberpunkTheme.colors.border }]}
                    onPress={() => setShowAllBought(false)}
                  >
                    <Text style={[styles.viewAllText, { color: cyberpunkTheme.colors.textSecondary }]}>
                      ↑ Show less
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.bottomSpacer} />
              </View>
            ) : (
              <View style={styles.bottomSpacer} />
            )}
            ListEmptyComponent={
              activeItems.length === 0 && boughtItems.length === 0 ? (
                <EmptyPlaceholder
                  message={tr('general.emptyListMessage')}
                  icon="cart-outline"
                />
              ) : null
            }
          />
        </View>
      )}

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
      </KeyboardAvoidingView>

      {/* Modals */}
      <EditModal
        visible={showEdit}
        item={editItem}
        onSave={handleSaveEdit}
        onDelete={handleDeleteItem}
        onAdd={handleAddNewItem}
        initialDescription={editItem ? undefined : addItemDescription}
        initialFoodType={editItem ? undefined : addItemFoodType}
        initialIcon={editItem ? undefined : addItemIcon}
        onClose={() => {
          setShowEdit(false);
          setEditItem(null);
          setAddItemDescription(undefined);
          setAddItemFoodType(undefined);
          setAddItemIcon(undefined);
        }}
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
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 50,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  headerCount: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomBar: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 12,
    paddingVertical: 4,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 'normal',
  },
  categoryHeader: {
    fontFamily: 'monospace',
    fontSize: 11,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 4,
  },
  dragging: {
    opacity: 0.8,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 4,
    borderTopWidth: 1,
  },
  viewAllText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 80,
  },
  dietHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  dietHeaderText: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
  },
  dietWarningsText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '600',
  },
});