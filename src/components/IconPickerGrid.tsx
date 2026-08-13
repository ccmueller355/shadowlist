// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHOPPING_ICONS, ICON_FOOD_TYPE_MAP } from '../constants/icons';
import { useAppTheme } from '../theme/useTheme';
import { FoodType } from '../types';

interface Props {
  selected: string;
  onSelect: (icon: string) => void;
  activeFoodType?: FoodType;
  activeCategory?: string | null;
}

const CATEGORY_TO_ICONS: Record<string, string[] | 'ALL_FOOD' | 'ALL_NON_FOOD'> = {
  'Electronics': ['television'],
  'Home & DIY': ['hammer-wrench'],
  'Clothing': ['hanger'],
  'Pets': ['paw'],
  'Gardening': ['flower'],
  'Automotive': ['car'],
  'Baby': ['baby-bottle-outline'],
  'Party': ['party-popper'],
  'Books & Media': ['book-open-variant'],
  'Household': ['spray-bottle'],
  'Sports': ['basketball'],
  'Bakery': ['bread-slice-outline'],
  'Beverages': ['cup'],
  'Snacks': ['candy'],
  'Pharmacy': ['pill'],
  'Groceries': 'ALL_FOOD',
  'Frozen': 'ALL_FOOD',
  'Deli': 'ALL_FOOD',
  'International': 'ALL_FOOD',
  'General': 'ALL_NON_FOOD',
  'Other': 'ALL_NON_FOOD',
  'Office': 'ALL_NON_FOOD',
  'Beauty': 'ALL_NON_FOOD',
  'Travel': 'ALL_NON_FOOD',
};

export function IconPickerGrid({ selected, onSelect, activeFoodType, activeCategory }: Props) {
  const cyberpunkTheme = useAppTheme();

  const foodIcons = SHOPPING_ICONS.filter(icon => ICON_FOOD_TYPE_MAP[icon.name] && ICON_FOOD_TYPE_MAP[icon.name] !== 'non_food');
  const nonFoodIcons = SHOPPING_ICONS.filter(icon => ICON_FOOD_TYPE_MAP[icon.name] === 'non_food' || !ICON_FOOD_TYPE_MAP[icon.name]);

  const isDimmed = (iconName: string) => {
    if (iconName === selected) return false;

    const mappedType = ICON_FOOD_TYPE_MAP[iconName];
    const isNonFoodIcon = mappedType === 'non_food' || !mappedType;
    const isFoodIcon = !isNonFoodIcon;

    let catMatch = false;
    if (activeCategory && CATEGORY_TO_ICONS[activeCategory]) {
      const mapping = CATEGORY_TO_ICONS[activeCategory];
      if (mapping === 'ALL_FOOD') {
        catMatch = isFoodIcon;
      } else if (mapping === 'ALL_NON_FOOD') {
        catMatch = isNonFoodIcon;
      } else if (Array.isArray(mapping)) {
        catMatch = mapping.includes(iconName);
      }
    }

    let ftMatch = false;
    if (activeFoodType && mappedType === activeFoodType) {
      ftMatch = true;
    }

    if (activeCategory) {
      const mapping = CATEGORY_TO_ICONS[activeCategory];
      if (mapping === 'ALL_FOOD') {
        if (!activeFoodType || activeFoodType === 'non_food') {
          return !isFoodIcon;
        } else {
          // Both active category (general food) and specific food type are selected.
          // In this case, highlight the specific food type.
          return !ftMatch;
        }
      } else if (mapping === 'ALL_NON_FOOD') {
        return !isNonFoodIcon;
      } else if (mapping) {
        // Specific category (Array)
        return !catMatch;
      } else {
         // Fallback for unknown categories not in mapping
         if (!activeFoodType || activeFoodType === 'non_food') {
            return false; // Don't dim anything if we don't know the category and there's no specific food type
         } else {
            return !ftMatch;
         }
      }
    } else {
      if (!activeFoodType || activeFoodType === 'non_food') {
        return !isNonFoodIcon;
      } else if (activeFoodType) {
        return !ftMatch;
      }
    }

    return false;
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
