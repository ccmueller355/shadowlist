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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { IconPickerGrid } from './IconPickerGrid';
import { CATEGORIES } from '../constants/icons';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';

interface Props {
  visible: boolean;
  item: ShoppingItem | null;
  onSave: (id: string, updates: Partial<ShoppingItem>) => void;
  onClose: () => void;
}

export function EditModal({ visible, item, onSave, onClose }: Props) {
  const [description, setDescription] = useState('');
  const [qualifier, setQualifier] = useState('');
  const [icon, setIcon] = useState('cart');
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setQualifier(item.qualifier);
      setIcon(item.icon);
      setCategory(item.category);
    }
  }, [item]);

  const handleSave = () => {
    if (!item || !description.trim()) return;
    onSave(item.id, {
      description: description.trim(),
      qualifier: qualifier.trim(),
      icon,
      category,
    });
    onClose();
  };

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Edit Item</Text>

            {/* Icon Picker */}
            <Text style={styles.label}>Icon</Text>
            <IconPickerGrid selected={icon} onSelect={setIcon} />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Item name"
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />

            {/* Qualifier */}
            <Text style={styles.label}>Qualifier</Text>
            <TextInput
              style={styles.input}
              value={qualifier}
              onChangeText={setQualifier}
              placeholder="2x, 500g, 1L..."
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
            />

            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              <TouchableOpacity
                style={[styles.categoryChip, category === null && styles.categorySelected]}
                onPress={() => setCategory(null)}
              >
                <Text style={[styles.categoryText, category === null && styles.categoryTextSelected]}>
                  None
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
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <MaterialCommunityIcons name="check" size={20} color="#0a0a0a" />
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    backgroundColor: cyberpunkTheme.colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: cyberpunkTheme.spacing.lg,
    maxHeight: '85%',
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
    justifyContent: 'flex-end',
    gap: cyberpunkTheme.spacing.sm,
    marginTop: cyberpunkTheme.spacing.lg,
    paddingBottom: cyberpunkTheme.spacing.md,
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
