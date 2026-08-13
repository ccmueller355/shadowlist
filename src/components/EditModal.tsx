// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FoodType, ShoppingItem } from '../types';
import { IconPickerGrid } from './IconPickerGrid';
import { CATEGORIES, ICON_FOOD_TYPE_MAP } from '../constants/icons';
import { FOOD_TYPES, FOOD_TYPE_TO_CATEGORY } from '../constants/foodTypes';
import { useAppTheme } from '../theme/useTheme';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  visible: boolean;
  item: ShoppingItem | null;
  onSave: (id: string, updates: Partial<ShoppingItem>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  onAdd?: (params: { listId: string; description: string; qualifier: string; icon: string; category: string | null; foodType: FoodType }) => void;
  initialDescription?: string;
  initialFoodType?: FoodType;
  initialIcon?: string;
  initialCategory?: string | null;
}

export function EditModal({ visible, item, onSave, onDelete, onClose, onAdd, initialDescription, initialFoodType, initialIcon, initialCategory }: Props) {
  const cyberpunkTheme = useAppTheme();
  const [description, setDescription] = useState('');
  const [qualifier, setQualifier] = useState('');
  const [icon, setIcon] = useState('cart');
  const [category, setCategory] = useState<string | null>(null);
  const [foodType, setFoodType] = useState<FoodType>('non_food');
  const insets = useSafeAreaInsets();
  const { t: tr } = useTranslation();

  // Back button → close modal
  useEffect(() => {
    if (!visible) return;
    const handler = () => { onClose(); return true; };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [visible, onClose]);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setQualifier(item.qualifier);
      setIcon(item.icon);
      setCategory(item.category);
      setFoodType(item.foodType);
    } else if (initialFoodType !== undefined || initialIcon !== undefined || initialDescription !== undefined || initialCategory !== undefined) {
      setDescription(initialDescription || '');
      setIcon(initialIcon || 'cart');
      setFoodType(initialFoodType ?? 'non_food');
      setCategory(initialCategory ?? null);
    }
  }, [item, initialFoodType, initialIcon, initialDescription, initialCategory]);

  // Auto-sync category when food type changes (#20)
  useEffect(() => {
    const mapped = FOOD_TYPE_TO_CATEGORY[foodType];
    setCategory(mapped);
  }, [foodType]);

  const handleSave = () => {
    if (!description.trim()) return;
    if (item) {
      onSave(item.id, {
        description: description.trim(),
        qualifier: qualifier.trim(),
        icon,
        category,
        foodType,
      });
    } else if (onAdd) {
      onAdd({
        listId: '',
        description: description.trim(),
        qualifier: qualifier.trim(),
        icon,
        category,
        foodType,
      });
    }
    onClose();
  };

  if (!item && initialFoodType === undefined && initialIcon === undefined && initialDescription === undefined) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
      >
        <View style={[styles.container, { backgroundColor: cyberpunkTheme.colors.surface }]}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={styles.scrollBody}>
            <Text style={[styles.title, { color: cyberpunkTheme.colors.textPrimary }]}>{tr('edit.title')}</Text>
  
            {/* Description */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.description')}</Text>
            <TextInput
              style={[styles.input, { color: cyberpunkTheme.colors.textPrimary, borderColor: cyberpunkTheme.colors.border, backgroundColor: cyberpunkTheme.colors.background }]}
              value={description}
              onChangeText={setDescription}
              placeholder={tr('edit.descriptionPlaceholder')}
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />
  
            {/* Amount / Qualifier */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.amount')}</Text>
            <TextInput
              style={[styles.input, { color: cyberpunkTheme.colors.textPrimary, borderColor: cyberpunkTheme.colors.border, backgroundColor: cyberpunkTheme.colors.background }]}
              value={qualifier}
              onChangeText={setQualifier}
              placeholder={tr('edit.amountPlaceholder')}
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />
  
            {/* Icon Picker */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.icon')}</Text>
            <IconPickerGrid
              selected={icon}
              onSelect={(newIcon) => {
                setIcon(newIcon);
                if (ICON_FOOD_TYPE_MAP[newIcon]) {
                  setFoodType(ICON_FOOD_TYPE_MAP[newIcon] as FoodType);
                }
              }}
            />
 
            {/* Category */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.category')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryChip, { borderColor: category === null ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: category === null ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                onPress={() => setCategory(null)}
              >
                <Text style={[styles.categoryText, { color: category === null ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, category === null && styles.categoryTextSelected]}>
                  {tr('edit.categoryNone')}
                </Text>
              </TouchableOpacity>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, { borderColor: category === cat ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: category === cat ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[styles.categoryText, { color: category === cat ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, category === cat && styles.categoryTextSelected]}
                  >
                    {tr(('category.' + cat.replace(/[ &]/g, '')) as any)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Food Type */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.foodType.label')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {FOOD_TYPES.map((ft) => (
                <TouchableOpacity
                  key={ft.id}
                  style={[styles.categoryChip, { borderColor: foodType === ft.id ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.border, backgroundColor: foodType === ft.id ? cyberpunkTheme.colors.checkedBg : cyberpunkTheme.colors.background }]}
                  onPress={() => setFoodType(ft.id)}
                  accessibilityLabel={tr(ft.labelKey as any)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: foodType === ft.id }}
                >
                  <MaterialCommunityIcons
                    name={ft.icon as any}
                    size={16}
                    color={cyberpunkTheme.colors.primary}
                  />
                  <Text
                    style={[styles.categoryText, { color: foodType === ft.id ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary }, foodType === ft.id && styles.categoryTextSelected]}
                  >
                    {tr(ft.labelKey as any)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>

          {/* Fixed footer with buttons */}
          <View style={[styles.footer, { borderTopColor: cyberpunkTheme.colors.border, paddingBottom: insets.bottom + 8 }]}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.deleteButton, { borderColor: cyberpunkTheme.colors.danger }]}
                onPress={() => {
                  if (item) onDelete(item.id);
                  onClose();
                }}
              >
                <Text style={[styles.deleteText, { color: cyberpunkTheme.colors.danger }]}>{tr('general.delete')}</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacer} />
              <TouchableOpacity style={[styles.cancelButton, { borderColor: cyberpunkTheme.colors.border }]} onPress={onClose}>
                <Text style={[styles.cancelText, { color: cyberpunkTheme.colors.textSecondary }]}>{tr('general.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveButton, { backgroundColor: cyberpunkTheme.colors.primary }]} onPress={handleSave}>
                <MaterialCommunityIcons name="check" size={20} color={cyberpunkTheme.colors.background} />
                <Text style={[styles.saveText, { color: cyberpunkTheme.colors.background }]}>{tr('general.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  scrollBody: {
    flex: 1,
  },
  footer: {
    paddingTop: 8,
    borderTopWidth: 1,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: 'monospace',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  categoryTextSelected: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 24,
    paddingBottom: 16,
  },
  buttonSpacer: {
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  deleteText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelText: {
    fontFamily: 'monospace',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});
