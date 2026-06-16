import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingItem } from '../types';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';

interface Props {
  item: ShoppingItem;
  drag?: () => void;
  isActive?: boolean;
  onTogglePurchased: (id: string) => void;
  onLongPress: (item: ShoppingItem) => void;
  onTapBought: (id: string) => void;
  onDelete: (id: string) => void;
}

function ItemRowComponent({
  item,
  drag,
  isActive,
  onTogglePurchased,
  onLongPress,
  onTapBought,
  onDelete,
}: Props) {
  const isBought = item.purchased;

  const handlePress = () => {
    if (isBought) {
      onTapBought(item.id);
    } else {
      onTogglePurchased(item.id);
    }
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
        {item.qualifier ? (
          <Text style={[styles.qualifier, isBought && styles.qualifierBought]}>
            {item.qualifier}
          </Text>
        ) : null}
      </View>

      {/* Category badge (small) */}
      {item.category && (
        <Text style={styles.categoryBadge} numberOfLines={1}>
          {item.category}
        </Text>
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

      {/* Delete */}
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name="close-circle-outline"
          size={18}
          color={cyberpunkTheme.colors.textSecondary}
        />
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
});
