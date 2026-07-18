// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  message?: string;
  icon?: string;
}

export function EmptyPlaceholder({
  message = 'Add your first item',
  icon = 'cart-plus',
}: Props) {
  const cyberpunkTheme = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: cyberpunkTheme.colors.background }]}>
      <MaterialCommunityIcons
        name={icon as any}
        size={64}
        color={cyberpunkTheme.colors.border}
      />
      <Text style={[styles.text, { color: cyberpunkTheme.colors.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
