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
        { backgroundColor: cyberpunkTheme.colors.surface, borderColor: cyberpunkTheme.colors.primary },
        glow && { shadowColor: cyberpunkTheme.colors.primary },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: cyberpunkTheme.borderRadius,
    padding: cyberpunkTheme.spacing.md,
  },
});
