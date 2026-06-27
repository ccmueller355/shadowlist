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

// ═══════════════════════════════════════════
//  A: Fixer's Notebook — warm paper noir
//  Warm browns, muted rust-red, brass gold.
//  Like an old leather journal under lamplight.
// ═══════════════════════════════════════════
export const fixerTheme: Theme = {
  colors: {
    primary: '#c46a4a',       // Aged leather — warm rust, not fire-engine red
    secondary: '#b8a066',     // Brass/gold — muted, not bright yellow
    background: '#1c1915',    // Dark leather — warm, never pure black
    surface: '#282420',       // Leather page — subtle lift from background
    textPrimary: '#e4d6c0',   // Ivory — soft warm white, not harsh #fff
    textSecondary: '#8c8474', // Muted sand — readable but subordinate
    border: '#38322c',        // Warm dark gray — visible but not intrusive
    shadow: 'rgba(196,106,74,0.12)',
    danger: '#b34444',        // Muted crimson — warning without shouting
    headerBg: '#15120f',      // Slightly deeper than background
    headerText: '#e4d6c0',
    checkedBg: '#2e2a24',     // Between surface and background
    sectionHeader: '#b8a066', // Brass matches secondary
  },
  spacing,
  borderRadius,
  fontFamily,
  label: "Fixer's Notebook",
  description: 'Warm leather tones with rust and brass',
};

// ═══════════════════════════════════════════
//  B: Stuffer Shack — aged parchment (LIGHT)
//  Cream paper, dark ink, subdued red accent.
//  Like a well-worn shopping list on a counter.
// ═══════════════════════════════════════════
export const stufferTheme: Theme = {
  colors: {
    primary: '#8c3a3a',       // Deep ink red — muted, not bright
    secondary: '#6b5544',     // Dark sepia — like dried ink
    background: '#f3ecde',    // Parchment base — warm, soft
    surface: '#faf5ed',       // Paper white — subtle lift, never pure #fff
    textPrimary: '#2e241a',   // Dark ink — black-brown, not pure #000
    textSecondary: '#7a6e5e', // Faded ink — warm gray
    border: '#e0d5c4',        // Parchment fold line
    shadow: 'rgba(140,58,58,0.06)',
    danger: '#b04444',        // Subdued red — warning that fits the palette
    headerBg: '#2e241a',      // Dark ink band — anchors the top
    headerText: '#faf5ed',
    checkedBg: '#f0e6d6',     // Slightly deeper paper — checked items
    sectionHeader: '#8c3a3a', // Ink red matches primary
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Stuffer Shack',
  description: 'Aged parchment with dark ink accents',
};

// ═══════════════════════════════════════════
//  C: Decker's Den — deep purple terminal
//  Cool violet-black, soft lavender, muted violet.
//  Like a synthwave terminal in a dark booth.
// ═══════════════════════════════════════════
export const deckerTheme: Theme = {
  colors: {
    primary: '#a888c0',       // Soft lavender — gentle, not neon
    secondary: '#7c5c96',     // Muted violet — depth without glare
    background: '#14101c',    // Deep purple-black — cool, not harsh
    surface: '#1e1a28',       // Dark violet card — subtle lift
    textPrimary: '#e0d8ec',   // Pale purple-white — readable comfort
    textSecondary: '#8c80a0', // Muted grape — subordinate text
    border: '#2e2840',        // Purple-tinted divider
    shadow: 'rgba(168,136,192,0.10)',
    danger: '#c86060',        // Muted rose — warning that fits purple palette
    headerBg: '#0e0b14',      // Deeper than background
    headerText: '#e0d8ec',
    checkedBg: '#242030',     // Purple-tinted checked state
    sectionHeader: '#a888c0', // Lavender matches primary
  },
  spacing,
  borderRadius,
  fontFamily,
  label: "Decker's Den",
  description: 'Cool violet tones with soft lavender glow',
};

// ═══════════════════════════════════════════
//  D: Cyber Blue — deep ocean terminal
//  Cool navy, calm cyan, muted steel blue.
//  Like a corporate terminal at 3 AM.
// ═══════════════════════════════════════════
export const cyberTheme: Theme = {
  colors: {
    primary: '#64b8cc',       // Calm cyan-teal — readable, not blinding
    secondary: '#4a80a0',     // Muted steel blue — depth
    background: '#101820',    // Deep navy — cool, comfortable dark
    surface: '#1a2430',       // Blue-tinted card — subtle lift
    textPrimary: '#d8e8f0',   // Ice blue-white — soft on eyes
    textSecondary: '#7090a8', // Muted blue-gray — subordinate
    border: '#283848',        // Blue-tinted divider
    shadow: 'rgba(100,184,204,0.10)',
    danger: '#cc8866',        // Muted coral — warning that fits blue palette
    headerBg: '#0a1018',      // Deeper than background
    headerText: '#d8e8f0',
    checkedBg: '#202c38',     // Blue-tinted checked state
    sectionHeader: '#64b8cc', // Cyan matches primary
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Cyber Blue',
  description: 'Deep ocean tones with calm cyan accents',
};

// ═══════════════════════════════════════════
//  E: Terminal Green — CRT phosphor
//  Dark green-black, subdued phosphor, olive depth.
//  Like a vintage monochrome monitor.
// ═══════════════════════════════════════════
export const terminalTheme: Theme = {
  colors: {
    primary: '#60b860',       // Subdued phosphor green — readable, not neon
    secondary: '#408848',     // Deeper pine — depth without glare
    background: '#101810',    // Dark green-black — cool, comfortable
    surface: '#1a2418',       // Green-tinted card — subtle lift
    textPrimary: '#d0e8c8',   // Pale mint — soft glow on eyes
    textSecondary: '#609060', // Muted olive — subordinate
    border: '#284028',        // Green-tinted divider
    shadow: 'rgba(96,184,96,0.10)',
    danger: '#ccaa44',        // Muted amber — warning that fits green palette
    headerBg: '#0a100a',      // Deeper than background
    headerText: '#d0e8c8',
    checkedBg: '#202c20',     // Green-tinted checked state
    sectionHeader: '#60b860', // Phosphor matches primary
  },
  spacing,
  borderRadius,
  fontFamily,
  label: 'Terminal Green',
  description: 'Subdued phosphor green on dark monitor',
};

export const themes: Record<ThemeName, Theme> = {
  fixer: fixerTheme,
  stuffer: stufferTheme,
  decker: deckerTheme,
  cyber: cyberTheme,
  terminal: terminalTheme,
};
