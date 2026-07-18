// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShoppingList } from '../types';
import { CyberpunkCard } from './CyberpunkCard';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  list: ShoppingList;
  itemCount: number;
  onPress: () => void;
  onDelete: () => void;
  onLongPress?: () => void;
}

export function ListCard({ list, itemCount, onPress, onDelete, onLongPress }: Props) {
  const cyberpunkTheme = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.7}>
      <CyberpunkCard style={styles.card}>
        <View style={styles.row}>
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="format-list-checks"
              size={28}
              color={cyberpunkTheme.colors.primary}
            />
            <View style={styles.info}>
              <Text style={[styles.name, { color: cyberpunkTheme.colors.textPrimary }]} numberOfLines={1}>{list.name}</Text>
              <Text style={[styles.meta, { color: cyberpunkTheme.colors.textSecondary }]}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={22}
              color={cyberpunkTheme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </CyberpunkCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meta: {
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 2,
  },
});
