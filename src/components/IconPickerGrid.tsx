// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHOPPING_ICONS } from '../constants/icons';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  selected: string;
  onSelect: (icon: string) => void;
}

export function IconPickerGrid({ selected, onSelect }: Props) {
  const cyberpunkTheme = useAppTheme();
  return (
    <View style={styles.grid}>
      {SHOPPING_ICONS.map((icon) => {
        const isSelected = icon.name === selected;
        return (
          <TouchableOpacity
            key={icon.name}
            style={[
              styles.iconButton,
              isSelected && { borderColor: cyberpunkTheme.colors.danger, borderWidth: 2 },
            ]}
            onPress={() => onSelect(icon.name)}
          >
            <MaterialCommunityIcons
              name={icon.name as any}
              size={28}
              color={isSelected ? cyberpunkTheme.colors.primary : cyberpunkTheme.colors.textSecondary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
