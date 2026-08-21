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
import { CATEGORIES, ICON_FOOD_TYPE_MAP, getCategoryForIcon } from '../constants/icons';
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
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null | undefined>(undefined);
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
      setSelectedCategory(item.category);
      setSelectedFoodType(item.foodType);
    } else if (initialFoodType !== undefined || initialIcon !== undefined || initialDescription !== undefined || initialCategory !== undefined) {
      setDescription(initialDescription || '');
      setIcon(initialIcon || 'cart');
      setSelectedFoodType(initialFoodType !== undefined ? initialFoodType : undefined);
      setSelectedCategory(initialCategory !== undefined ? initialCategory : undefined);
    }
  }, [item, initialFoodType, initialIcon, initialDescription, initialCategory]);

  const derivedFoodType = selectedFoodType !== undefined ? selectedFoodType : (ICON_FOOD_TYPE_MAP[icon] as FoodType | undefined) ?? 'non_food';
  const derivedCategory = selectedCategory !== undefined ? selectedCategory : (
    derivedFoodType && derivedFoodType !== 'non_food' ? FOOD_TYPE_TO_CATEGORY[derivedFoodType] : getCategoryForIcon(icon)
  );

  const handleSave = () => {
    if (!description.trim()) return;
    if (item) {
      onSave(item.id, {
        description: description.trim(),
        qualifier: qualifier.trim(),
        icon,
        category: derivedCategory,
        foodType: derivedFoodType,
      });
    } else if (onAdd) {
      onAdd({
        listId: '',
        description: description.trim(),
        qualifier: qualifier.trim(),
        icon,
        category: derivedCategory,
        foodType: derivedFoodType,
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
  
            {/* Food Type */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.foodType.label')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {FOOD_TYPES.map((ft) => {
                const isSelected = selectedFoodType === ft.id;
                const isHighlighted = selectedFoodType === undefined && derivedFoodType === ft.id;

                let bgColor = cyberpunkTheme.colors.background;
                let borderColor = cyberpunkTheme.colors.border;
                let textColor = cyberpunkTheme.colors.textSecondary;

                if (isSelected) {
                  bgColor = cyberpunkTheme.colors.checkedBg;
                  borderColor = cyberpunkTheme.colors.primary;
                  textColor = cyberpunkTheme.colors.primary;
                } else if (isHighlighted) {
                  borderColor = cyberpunkTheme.colors.primary;
                  textColor = cyberpunkTheme.colors.primary;
                }

                return (
                  <TouchableOpacity
                    key={ft.id}
                    style={[styles.categoryChip, { borderColor, backgroundColor: bgColor }]}
                    onPress={() => {
                      setSelectedFoodType(ft.id);
                      setSelectedCategory(undefined);
                    }}
                    accessibilityLabel={tr(ft.labelKey as any)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <MaterialCommunityIcons
                      name={ft.icon as any}
                      size={16}
                      color={textColor}
                    />
                    <Text
                      style={[styles.categoryText, { color: textColor }, (isSelected || isHighlighted) && styles.categoryTextSelected]}
                    >
                      {tr(ft.labelKey as any)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Icon Picker */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.icon')}</Text>
            <IconPickerGrid
              selected={icon}
              onSelect={(newIcon) => {
                setIcon(newIcon);
                // Clear explicit selections so that the new icon's derived values highlight correctly
                setSelectedFoodType(undefined);
                setSelectedCategory(undefined);
              }}
              activeFoodType={derivedFoodType}
              activeCategory={derivedCategory}
            />
 
            {/* Category */}
            <Text style={[styles.label, { color: cyberpunkTheme.colors.primary }]}>{tr('edit.category')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {(() => {
                const isNoneSelected = selectedCategory === null;
                const isNoneHighlighted = selectedCategory === undefined && derivedCategory === null;
                let noneBg = cyberpunkTheme.colors.background;
                let noneBorder = cyberpunkTheme.colors.border;
                let noneText = cyberpunkTheme.colors.textSecondary;

                if (isNoneSelected) {
                  noneBg = cyberpunkTheme.colors.checkedBg;
                  noneBorder = cyberpunkTheme.colors.primary;
                  noneText = cyberpunkTheme.colors.primary;
                } else if (isNoneHighlighted) {
                  noneBorder = cyberpunkTheme.colors.primary;
                  noneText = cyberpunkTheme.colors.primary;
                }

                return (
                  <TouchableOpacity
                    style={[styles.categoryChip, { borderColor: noneBorder, backgroundColor: noneBg }]}
                    onPress={() => setSelectedCategory(null)}
                  >
                    <Text style={[styles.categoryText, { color: noneText }, (isNoneSelected || isNoneHighlighted) && styles.categoryTextSelected]}>
                      {tr('edit.categoryNone')}
                    </Text>
                  </TouchableOpacity>
                );
              })()}

              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const isHighlighted = selectedCategory === undefined && derivedCategory === cat;

                let bgColor = cyberpunkTheme.colors.background;
                let borderColor = cyberpunkTheme.colors.border;
                let textColor = cyberpunkTheme.colors.textSecondary;

                if (isSelected) {
                  bgColor = cyberpunkTheme.colors.checkedBg;
                  borderColor = cyberpunkTheme.colors.primary;
                  textColor = cyberpunkTheme.colors.primary;
                } else if (isHighlighted) {
                  borderColor = cyberpunkTheme.colors.primary;
                  textColor = cyberpunkTheme.colors.primary;
                }

                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChip, { borderColor, backgroundColor: bgColor }]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setSelectedFoodType(undefined);
                    }}
                  >
                    <Text
                      style={[styles.categoryText, { color: textColor }, (isSelected || isHighlighted) && styles.categoryTextSelected]}
                    >
                      {tr(('category.' + cat.replace(/[ &]/g, '')) as any)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
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
