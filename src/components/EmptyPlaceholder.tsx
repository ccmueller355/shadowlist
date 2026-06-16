import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
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
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon as any}
        size={64}
        color={cyberpunkTheme.colors.border}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: cyberpunkTheme.spacing.md,
  },
  text: {
    fontFamily: cyberpunkTheme.fontFamily,
    fontSize: 16,
    color: cyberpunkTheme.colors.textSecondary,
    marginTop: cyberpunkTheme.spacing.md,
    textAlign: 'center',
  },
});
