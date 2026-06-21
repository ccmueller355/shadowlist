// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { ListCard } from '../components/ListCard';
import { EmptyPlaceholder } from '../components/EmptyPlaceholder';
import { CyberpunkCard } from '../components/CyberpunkCard';
import { SettingsModal } from '../components/SettingsModal';
import { generateId } from '../utils/uuid';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import { useAppTheme } from '../theme/useTheme';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<any, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const cyberpunkTheme = useAppTheme();
  const lists = useStore((s) => s.lists);
  const items = useStore((s) => s.items);
  const addList = useStore((s) => s.addList);
  const deleteList = useStore((s) => s.deleteList);
  const hydrated = useStore((s) => s.hydrated);
  const addDemoData = useStore((s) => s.addDemoData);
  const settings = useStore((s) => s.settings);
  const setTheme = useStore((s) => s.setTheme);
  const setSortByCategory = useStore((s) => s.setSortByCategory);
  const setActiveDiet = useStore((s) => s.setActiveDiet);
  const setLang = useStore((s) => s.setLang);
  const clearAll = useStore((s) => s.clearAll);

  const [showNewListInput, setShowNewListInput] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newListName, setNewListName] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleCreateList = () => {
    const name = newListName.trim();
    if (!name) return;
    addList(name);
    setNewListName('');
    setShowNewListInput(false);
    Toast.show({ type: 'success', text1: `Created "${name}"`, position: 'bottom' });
  };

  const handleDeleteList = (id: string, name: string) => {
    Alert.alert('Delete List', `Delete "${name}" and all its items?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteList(id);
          Toast.show({ type: 'info', text1: `Deleted "${name}"`, position: 'bottom' });
        },
      },
    ]);
  };

  const getItemCount = useCallback(
    (listId: string) => items.filter((i) => i.listId === listId && !i.purchased).length,
    [items]
  );

  // Auto-create default list on first launch
  React.useEffect(() => {
    if (hydrated && lists.length === 0) {
      addList('Weekly Groceries');
      // Also add demo data for testing
      setTimeout(() => {
        addDemoData();
      }, 100);
    }
  }, [hydrated]);

  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading ShadowList...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="cart-outline" size={28} color={cyberpunkTheme.colors.headerText} />
        <Text style={styles.headerTitle}>ShadowList</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
          <MaterialCommunityIcons name="cog" size={24} color={cyberpunkTheme.colors.headerText} />
        </TouchableOpacity>
      </View>

      {/* New list input inline */}
      {showNewListInput && (
        <CyberpunkCard style={styles.newListCard}>
          <View style={styles.newListRow}>
            <TextInput
              ref={inputRef}
              style={styles.newListInput}
              placeholder="List name..."
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
              value={newListName}
              onChangeText={setNewListName}
              onSubmitEditing={handleCreateList}
              autoFocus
            />
            <TouchableOpacity onPress={handleCreateList} style={styles.createButton}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowNewListInput(false); setNewListName(''); }}>
              <MaterialCommunityIcons name="close" size={22} color={cyberpunkTheme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </CyberpunkCard>
      )}

      {/* List of lists */}
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListCard
            list={item}
            itemCount={getItemCount(item.id)}
            onPress={() => navigation.navigate('ListDetail', { listId: item.id, listName: item.name })}
            onDelete={() => handleDeleteList(item.id, item.name)}
          />
        )}
        ListEmptyComponent={
          <EmptyPlaceholder
            message="Create your first shopping list"
            icon="clipboard-plus-outline"
          />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setShowNewListInput(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#0a0a0a" />
      </TouchableOpacity>

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: cyberpunkTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 16,
    color: cyberpunkTheme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.headerBg,
    paddingHorizontal: cyberpunkTheme.spacing.md,
    paddingVertical: cyberpunkTheme.spacing.md,
    paddingTop: 50,
  },
  headerTitle: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 22,
    fontWeight: 'bold',
    color: cyberpunkTheme.colors.headerText,
    flex: 1,
  },
  headerSubtitle: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.textSecondary,
  },
  newListCard: {
    marginHorizontal: cyberpunkTheme.spacing.md,
    marginTop: cyberpunkTheme.spacing.sm,
    padding: cyberpunkTheme.spacing.sm,
  },
  newListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
  },
  newListInput: {
    flex: 1,
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 15,
    color: cyberpunkTheme.colors.textPrimary,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    borderRadius: cyberpunkTheme.borderRadius,
    padding: 8,
  },
  createButton: {
    backgroundColor: cyberpunkTheme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: cyberpunkTheme.borderRadius,
  },
  createButtonText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
  listContent: {
    padding: cyberpunkTheme.spacing.md,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: cyberpunkTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: cyberpunkTheme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
