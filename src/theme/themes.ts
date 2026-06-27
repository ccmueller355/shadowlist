// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
import { AppSettings } from '../types';

export type ThemeName = AppSettings['theme'];

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    shadow: string;
    danger: string;
    headerBg: string;
    headerText: string;
    checkedBg: string;
    sectionHeader: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: number;
  fontFamily: 'monospace';
  label: string;
  description: string;
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const borderRadius = 8;
const fontFamily = 'monospace' as const;

// ── A: Fixer's Notebook (dark paper noir) ──
export const fixerTheme: Theme = {
  colors: {
    primary: '#cc4444',
    secondary: '#c4a44a',
    background: '#1a1815',
    surface: '#2b2722',
    textPrimary: '#e8dcc8',
    textSecondary: '#8a8478',
    border: '#3d3833',
    shadow: 'rgba(204,68,68,0.15)',
    danger: '#8b0000',
    headerBg: '#141210',
    headerText: '#e8dcc8',
    checkedBg: '#332e28',
    sectionHeader: '#c4a44a',
  },
  spacing,
  borderRadius,
  fontFamily,
  label: "Fixer's Notebook",
  description: 'Dark paper noir with red & gold',
};

// ── B: Stuffer Shack (light paper + ink) ──
export const stufferTheme: Theme = {
  colors: {
    primary: '#8b1a1a',
    secondary: '#4a4a4a',
    background: '#f5efe4',
    surface: '#fffaf2',
    textPrimary: '#1a1a1a',
    textSecondary: '#7a6e60',
    border: '#e0d5c5',
    shadow: 'rgba(139,26,26,0.08)',
    danger: '#cc0000',
    headerBg: '#2a2a2a',
    headerText: '#f5efe4',
    checkedBg: '#f0e8da',
    sectionHeader: '#8b1a1a',
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Stuffer Shack',
  description: 'Aged parchment & dark ink',
};

// ── C: Decker's Den (dark terminal + synth) ──
export const deckerTheme: Theme = {
  colors: {
    primary: '#c084fc',
    secondary: '#7c3aed',
    background: '#0c0814',
    surface: '#161026',
    textPrimary: '#e8dcc8',
    textSecondary: '#8a7a98',
    border: '#282040',
    shadow: 'rgba(192,132,252,0.12)',
    danger: '#e04040',
    headerBg: '#0a0610',
    headerText: '#e8dcc8',
    checkedBg: '#1e1530',
    sectionHeader: '#a855f7',
  },
  spacing,
  borderRadius,
  fontFamily,
  label: "Decker's Den",
  description: 'Dark terminal with synth purple & orange',
};

// ── D: Cyber Blue (dark + blue neon) ──
export const cyberTheme: Theme = {
  colors: {
    primary: '#00d4ff',
    secondary: '#0066cc',
    background: '#0a1628',
    surface: '#0f1f3a',
    textPrimary: '#d0e8ff',
    textSecondary: '#6080a0',
    border: '#1a3050',
    shadow: 'rgba(0,212,255,0.15)',
    danger: '#2266ff',
    headerBg: '#060e1a',
    headerText: '#d0e8ff',
    checkedBg: '#0d1a30',
    sectionHeader: '#00d4ff',
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Cyber Blue',
  description: 'Deep blue night with cyan neon',
};

// ── E: Terminal Green (monitor glow) ──
export const terminalTheme: Theme = {
  colors: {
    primary: '#00ff41',
    secondary: '#00cc33',
    background: '#0a140a',
    surface: '#0d1f0d',
    textPrimary: '#c0ffc0',
    textSecondary: '#408040',
    border: '#1a3a1a',
    shadow: 'rgba(0,255,65,0.12)',
    danger: '#66cc00',
    headerBg: '#060d06',
    headerText: '#c0ffc0',
    checkedBg: '#091709',
    sectionHeader: '#00ff41',
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Terminal Green',
  description: 'CRT monitor phosphor green',
};

export const themes: Record<ThemeName, Theme> = {
  fixer: fixerTheme,
  stuffer: stufferTheme,
  decker: deckerTheme,
  cyber: cyberTheme,
  terminal: terminalTheme,
};
