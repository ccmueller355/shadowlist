// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { memo, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  item: ShoppingItem;
  drag?: () => void;
  isActive?: boolean;
  showDietWarning?: boolean;
  onDietWarningPress?: () => void;
  onTogglePurchased: (id: string) => void;
  onLongPress: (item: ShoppingItem) => void;
  onTapBought: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<ShoppingItem>) => void;
}

function ItemRowComponent({
  item,
  drag,
  isActive,
  showDietWarning,
  onDietWarningPress,
  onTogglePurchased,
  onLongPress,
  onTapBought,
  onUpdateItem,
}: Props) {
  const cyberpunkTheme = useAppTheme();
  const isBought = item.purchased;
  const [editingQualifier, setEditingQualifier] = useState(false);
  const [qualifierDraft, setQualifierDraft] = useState('');
  const qualifierRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (isBought) {
      onTapBought(item.id);
    } else {
      onTogglePurchased(item.id);
    }
  };

  const startEditingQualifier = () => {
    setQualifierDraft(item.qualifier || '');
    setEditingQualifier(true);
    setTimeout(() => qualifierRef.current?.focus(), 100);
  };

  const submitQualifier = () => {
    const trimmed = qualifierDraft.trim();
    onUpdateItem(item.id, { qualifier: trimmed });
    setEditingQualifier(false);
  };

  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(item)}
      onPress={handlePress}
      activeOpacity={0.6}
      style={[
        styles.container,
        isActive && styles.active,
        isBought && styles.bought,
      ]}
    >
      {/* Drag handle */}
      <TouchableOpacity onLongPress={drag} onPress={drag} delayLongPress={100}>
        <MaterialCommunityIcons
          name="drag"
          size={20}
          color={cyberpunkTheme.colors.border}
        />
      </TouchableOpacity>

      {/* Icon */}
      <MaterialCommunityIcons
        name={item.icon as any}
        size={22}
        color={isBought ? cyberpunkTheme.colors.textSecondary : cyberpunkTheme.colors.primary}
      />

      {/* Description + qualifier */}
      <View style={styles.info}>
        <View style={styles.descriptionRow}>
          <Text
            style={[
              styles.description,
              isBought && styles.descriptionBought,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
          {editingQualifier ? (
            <TextInput
              ref={qualifierRef}
              style={styles.qualifierInput}
              value={qualifierDraft}
              onChangeText={setQualifierDraft}
              onSubmitEditing={submitQualifier}
              onBlur={submitQualifier}
              placeholder="e.g. 2x"
              placeholderTextColor={cyberpunkTheme.colors.textSecondary}
              returnKeyType="done"
            />
          ) : item.qualifier ? (
            <TouchableOpacity onPress={startEditingQualifier}>
              <Text style={[styles.qualifier, isBought && styles.qualifierBought]}>
                {item.qualifier}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startEditingQualifier} style={styles.addQualifierButton}>
              <MaterialCommunityIcons name="plus" size={14} color={cyberpunkTheme.colors.border} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category badge (small) */}
      {item.category && (
        <Text style={styles.categoryBadge} numberOfLines={1}>
          {item.category}
        </Text>
      )}

      {/* Diet warning badge */}
      {showDietWarning && !isBought && (
        <TouchableOpacity
          onPress={onDietWarningPress}
          style={styles.warningBadge}
          accessibilityLabel="Diet warning: item may not be compatible with active diet"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons name="alert-circle" size={20} color={cyberpunkTheme.colors.danger} />
        </TouchableOpacity>
      )}

      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onTogglePurchased(item.id)}
        style={[styles.checkbox, isBought && styles.checkboxChecked]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {isBought ? (
          <MaterialCommunityIcons name="check-bold" size={16} color={cyberpunkTheme.colors.primary} />
        ) : null}
      </TouchableOpacity>

    </TouchableOpacity>
  );
}

export const ItemRow = memo(ItemRowComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: cyberpunkTheme.spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: cyberpunkTheme.spacing.sm,
    backgroundColor: cyberpunkTheme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: cyberpunkTheme.colors.border,
  },
  active: {
    backgroundColor: cyberpunkTheme.colors.checkedBg,
    shadowColor: cyberpunkTheme.colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bought: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  description: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 15,
    color: cyberpunkTheme.colors.textPrimary,
    flexShrink: 1,
  },
  descriptionBought: {
    textDecorationLine: 'line-through',
    color: cyberpunkTheme.colors.textSecondary,
  },
  qualifier: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.primary,
    fontWeight: 'bold',
  },
  qualifierBought: {
    color: cyberpunkTheme.colors.textSecondary,
  },
  qualifierInput: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 12,
    color: cyberpunkTheme.colors.textPrimary,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 50,
    backgroundColor: cyberpunkTheme.colors.checkedBg,
  },
  addQualifierButton: {
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.border,
    borderStyle: 'dashed',
    borderRadius: 4,
    padding: 2,
  },
  categoryBadge: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 9,
    color: cyberpunkTheme.colors.textSecondary,
    backgroundColor: cyberpunkTheme.colors.background,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    maxWidth: 60,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: cyberpunkTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: cyberpunkTheme.colors.checkedBg,
  },
  warningBadge: {
    padding: 2,
  },
});
