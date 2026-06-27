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
    secondary: '#2a2a2a',
    background: '#ede5d5',
    surface: '#f5f0e8',
    textPrimary: '#1a1a1a',
    textSecondary: '#6b6058',
    border: '#d4c5b0',
    shadow: 'rgba(139,26,26,0.1)',
    danger: '#cc0000',
    headerBg: '#2a2a2a',
    headerText: '#f5f0e8',
    checkedBg: '#ece2cf',
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
    primary: '#c055e0',
    secondary: '#ff6b35',
    background: '#0f0d14',
    surface: '#1a1721',
    textPrimary: '#e8dcc8',
    textSecondary: '#6a6678',
    border: '#252133',
    shadow: 'rgba(192,85,224,0.15)',
    danger: '#cc3333',
    headerBg: '#0a0810',
    headerText: '#e8dcc8',
    checkedBg: '#1e1b26',
    sectionHeader: '#ff6b35',
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
    secondary: '#0088cc',
    background: '#0a0e17',
    surface: '#121b2e',
    textPrimary: '#d0e8ff',
    textSecondary: '#6080a0',
    border: '#1a2a45',
    shadow: 'rgba(0,212,255,0.15)',
    danger: '#cc3333',
    headerBg: '#060a12',
    headerText: '#d0e8ff',
    checkedBg: '#0e1728',
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
    background: '#0c0c0c',
    surface: '#121212',
    textPrimary: '#c0ffc0',
    textSecondary: '#408040',
    border: '#1a2a1a',
    shadow: 'rgba(0,255,65,0.12)',
    danger: '#cc3333',
    headerBg: '#050505',
    headerText: '#c0ffc0',
    checkedBg: '#0d1a0d',
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
