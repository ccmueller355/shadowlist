// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
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
import { CATEGORIES } from '../constants/icons';
import { FOOD_TYPES } from '../constants/foodTypes';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import { useAppTheme } from '../theme/useTheme';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  visible: boolean;
  item: ShoppingItem | null;
  onSave: (id: string, updates: Partial<ShoppingItem>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function EditModal({ visible, item, onSave, onDelete, onClose }: Props) {
  const cyberpunkTheme = useAppTheme();
  const [description, setDescription] = useState('');
  const [qualifier, setQualifier] = useState('');
  const [icon, setIcon] = useState('cart');
  const [category, setCategory] = useState<string | null>(null);
  const [foodType, setFoodType] = useState<FoodType | null>(null);
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
      setFoodType(item.foodType ?? null);
    }
  }, [item]);

  const handleSave = () => {
    if (!item || !description.trim()) return;
    onSave(item.id, {
      description: description.trim(),
      qualifier: qualifier.trim(),
      icon,
      category,
      foodType,
    });
    onClose();
  };

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" style={styles.scrollBody}>
            <Text style={styles.title}>{tr('edit.title')}</Text>
 
            {/* Icon Picker */}
            <Text style={styles.label}>{tr('edit.icon')}</Text>
            <IconPickerGrid selected={icon} onSelect={setIcon} />
 
            {/* Description */}
            <Text style={styles.label}>{tr('edit.description')}</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder={tr('edit.descriptionPlaceholder')}
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />
 
            {/* Amount / Qualifier */}
            <Text style={styles.label}>{tr('edit.amount')}</Text>
            <TextInput
              style={styles.input}
              value={qualifier}
              onChangeText={setQualifier}
              placeholder={tr('edit.amountPlaceholder')}
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />
 
            {/* Category */}
            <Text style={styles.label}>{tr('edit.category')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryChip, category === null && styles.categorySelected]}
                onPress={() => setCategory(null)}
              >
                <Text style={[styles.categoryText, category === null && styles.categoryTextSelected]}>
                  {tr('edit.categoryNone')}
                </Text>
              </TouchableOpacity>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, category === cat && styles.categorySelected]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[styles.categoryText, category === cat && styles.categoryTextSelected]}
                  >
                    {tr('category.' + cat.replace(/[ &]/g, ''))}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Food Type */}
            <Text style={styles.label}>{tr('edit.foodType.label')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryChip, foodType === null && styles.categorySelected]}
                onPress={() => setFoodType(null)}
                accessibilityLabel={tr('edit.foodType.none')}
                accessibilityRole="radio"
                accessibilityState={{ selected: foodType === null }}
              >
                <Text style={[styles.categoryText, foodType === null && styles.categoryTextSelected]}>
                  {tr('edit.foodType.none')}
                </Text>
              </TouchableOpacity>
              {FOOD_TYPES.map((ft) => (
                <TouchableOpacity
                  key={ft.id}
                  style={[styles.categoryChip, foodType === ft.id && styles.categorySelected]}
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
                    style={[styles.categoryText, foodType === ft.id && styles.categoryTextSelected]}
                  >
                    {tr(ft.labelKey as any)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>

          {/* Fixed footer with buttons */}
          <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  if (item) onDelete(item.id);
                  onClose();
                }}
              >
                <Text style={styles.deleteText}>{tr('general.delete')}</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacer} />
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>{tr('general.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <MaterialCommunityIcons name="check" size={20} color="#0a0a0a" />
                <Text style={styles.saveText}>{tr('general.save')}</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: cyberpunkTheme.colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: cyberpunkTheme.spacing.lg,
    paddingHorizontal: cyberpunkTheme.spacing.lg,
  },
  scrollBody: {
    flex: 1,
  },
  footer: {
    paddingTop: cyberpunkTheme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: cyberpunkTheme.colors.border,
  },
  title: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    color: cyberpunkTheme.colors.textPrimary,
    marginBottom: cyberpunkTheme.spacing.md,
  },
  label: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.primary,
    marginTop: cyberpunkTheme.spacing.sm,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  input: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 16,
    color: cyberpunkTheme.colors.textPrimary,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    borderRadius: cyberpunkTheme.borderRadius,
    padding: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  categoryRow: {
    flexDirection: 'row',
    marginVertical: cyberpunkTheme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    marginRight: 8,
    backgroundColor: cyberpunkTheme.colors.background,
  },
  categorySelected: {
    borderColor: cyberpunkTheme.colors.primary,
    backgroundColor: cyberpunkTheme.colors.checkedBg,
  },
  categoryText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.textSecondary,
  },
  categoryTextSelected: {
    color: cyberpunkTheme.colors.primary,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: cyberpunkTheme.spacing.sm,
    marginTop: cyberpunkTheme.spacing.lg,
    paddingBottom: cyberpunkTheme.spacing.md,
  },
  buttonSpacer: {
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: cyberpunkTheme.borderRadius,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.danger,
  },
  deleteText: {
    fontFamily: cyberpunkTheme.fontFamily,
    color: cyberpunkTheme.colors.danger,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: cyberpunkTheme.borderRadius,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
  },
  cancelText: {
    fontFamily: cyberpunkTheme.fontFamily,
    color: cyberpunkTheme.colors.textSecondary,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: cyberpunkTheme.borderRadius,
    backgroundColor: cyberpunkTheme.colors.primary,
  },
  saveText: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
});
