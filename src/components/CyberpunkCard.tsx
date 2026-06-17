// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { cyberpunkTheme } from '../theme/cyberpunkTheme';
import { useAppTheme } from '../theme/useTheme';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  glow?: boolean;
}

export function CyberpunkCard({ children, style, glow = true }: Props) {
  const cyberpunkTheme = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        glow && styles.glow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cyberpunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: cyberpunkTheme.colors.primary,
    borderRadius: cyberpunkTheme.borderRadius,
    padding: cyberpunkTheme.spacing.md,
  },
  glow: {
    shadowColor: cyberpunkTheme.colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
