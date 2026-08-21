// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHOPPING_ICONS, ICON_FOOD_TYPE_MAP, iconMatchesCategory } from '../constants/icons';
import { useAppTheme } from '../theme/useTheme';
import { FoodType } from '../types';

interface Props {
  selected: string;
  onSelect: (icon: string) => void;
  activeFoodType?: FoodType;
  activeCategory?: string | null;
}

export function IconPickerGrid({ selected, onSelect, activeFoodType, activeCategory }: Props) {
  const cyberpunkTheme = useAppTheme();

  const foodIcons = SHOPPING_ICONS.filter(icon => ICON_FOOD_TYPE_MAP[icon.name] && ICON_FOOD_TYPE_MAP[icon.name] !== 'non_food');
  const nonFoodIcons = SHOPPING_ICONS.filter(icon => ICON_FOOD_TYPE_MAP[icon.name] === 'non_food' || !ICON_FOOD_TYPE_MAP[icon.name]);

  const isDimmed = (iconName: string) => {
    if (iconName === selected) return false;

    // Check if the icon matches the derived category or food type
    let matched = false;

    if (activeCategory && iconMatchesCategory(iconName, activeCategory)) {
      matched = true;
    }

    if (activeFoodType && ICON_FOOD_TYPE_MAP[iconName] === activeFoodType) {
      matched = true;
    }

    // Special behavior if 'Groceries' ('ALL_FOOD') is active, but we have a more specific activeFoodType
    if (activeCategory && iconMatchesCategory(iconName, activeCategory) && activeFoodType && activeFoodType !== 'non_food') {
       // If both a broad category (like Groceries which matches ALL food) and a specific food type are set,
       // only highlight the specific food type to avoid highlighting everything.
       // E.g., if Groceries AND Fruit are active, dim non-fruits even though Groceries matches them.
       // However, the `iconMatchesCategory` helper simplifies this: if it matches the broad category,
       // but we want to restrict it, we can just enforce the ftMatch.
       const isNonFoodIcon = ICON_FOOD_TYPE_MAP[iconName] === 'non_food' || !ICON_FOOD_TYPE_MAP[iconName];
       const isFoodIcon = !isNonFoodIcon;

       if (isFoodIcon) {
         return ICON_FOOD_TYPE_MAP[iconName] !== activeFoodType;
       }
    }

    // If no specific category or food type is active (which shouldn't happen with derived props, but just in case)
    if (!activeCategory && (!activeFoodType || activeFoodType === 'non_food')) {
      const isNonFoodIcon = ICON_FOOD_TYPE_MAP[iconName] === 'non_food' || !ICON_FOOD_TYPE_MAP[iconName];
      return !isNonFoodIcon;
    }

    return !matched;
  };

  const renderIconList = (icons: typeof SHOPPING_ICONS) => {
    return icons.map((icon) => {
      const isSelected = icon.name === selected;
      const dimmed = isDimmed(icon.name);

      return (
        <TouchableOpacity
          key={icon.name}
          style={[
            styles.iconButton,
            isSelected && { borderColor: cyberpunkTheme.colors.danger, borderWidth: 2 },
            dimmed && { opacity: 0.3 }
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
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {renderIconList(foodIcons)}
      </View>
      <View style={[styles.divider, { backgroundColor: cyberpunkTheme.colors.border }]} />
      <View style={styles.grid}>
        {renderIconList(nonFoodIcons)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  divider: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 12,
    opacity: 0.5,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
