// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { useMemo } from 'react';
import { useAppTheme } from './useTheme';

export function useThemeStyles() {
  const t = useAppTheme();
  return useMemo(() => ({
    // Backgrounds
    bg: { backgroundColor: t.colors.background },
    surface: { backgroundColor: t.colors.surface },
    header: { backgroundColor: t.colors.headerBg },
    cardBg: { backgroundColor: t.colors.surface },

    // Text
    text: { color: t.colors.textPrimary },
    textMuted: { color: t.colors.textSecondary },
    headerText: { color: t.colors.headerText },
    accent: { color: t.colors.primary },

    // Borders & glow
    border: { borderColor: t.colors.border },
    primaryBorder: { borderColor: t.colors.primary },
    glow: {
      shadowColor: t.colors.shadow,
    },
  }), [t]);
}
