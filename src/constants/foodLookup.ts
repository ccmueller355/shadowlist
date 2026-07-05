// ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
// Bilingual static lookup tables for name → food type pre-selection.
// Derived from testData.ts (spec 003) — 379 items providing EN + DE entries.

import { FoodType } from '../types';
import { TIER_1_ITEMS, TIER_2_ITEMS } from './testData';

// --- Types -----------------------------------------------------------------

export interface StaticLookupEntry {
  keywords: string[];
  foodType: FoodType;
  icon: string;
  lang: 'en' | 'de';
}

export interface RegexEntry {
  pattern: RegExp;
  foodType: FoodType;
  icon: string;
}

// --- Build lookup from testData pool --------------------------------------

const ALL_ITEMS = [...TIER_1_ITEMS, ...TIER_2_ITEMS];

function buildEnLookup(): StaticLookupEntry[] {
  return ALL_ITEMS.map((item) => ({
    keywords: [item.nameEn.toLowerCase()],
    foodType: item.foodType,
    icon: item.icon,
    lang: 'en' as const,
  }));
}

function buildDeLookup(): StaticLookupEntry[] {
  return ALL_ITEMS.map((item) => ({
    keywords: [item.nameDe.toLowerCase()],
    foodType: item.foodType,
    icon: item.icon,
    lang: 'de' as const,
  }));
}

// --- Exported tables ------------------------------------------------------

export const EN_LOOKUP: StaticLookupEntry[] = buildEnLookup();
export const DE_LOOKUP: StaticLookupEntry[] = buildDeLookup();

// --- Regex patterns for German compounds ----------------------------------

export const EN_REGEX: RegexEntry[] = [];

export const DE_REGEX: RegexEntry[] = [
  { pattern: /käse$/i,   foodType: 'dairy',     icon: 'cheese' },
  { pattern: /milch$/i,  foodType: 'beverage',  icon: 'cup' },
  { pattern: /brot$/i,   foodType: 'grain',     icon: 'bread-slice-outline' },
  { pattern: /fleisch$/i,foodType: 'meat',      icon: 'food-drumstick-outline' },
  { pattern: /wurst$/i,  foodType: 'meat',      icon: 'food-drumstick-outline' },
  { pattern: /nudeln/i,  foodType: 'grain',     icon: 'rice' },
  { pattern: /saft$/i,   foodType: 'beverage',  icon: 'cup' },
  { pattern: /wasser$/i, foodType: 'beverage',  icon: 'water' },
  { pattern: /öl$/i,     foodType: 'fat',       icon: 'oil' },
  { pattern: /salat$/i,  foodType: 'vegetable', icon: 'carrot' },
];

// --- Resolution result type -----------------------------------------------

export interface ResolutionResult {
  foodType: FoodType;
  icon: string | null;
  source: 'learned' | 'static_exact' | 'static_regex' | 'cross_lang' | 'none';
}

// --- Name resolver ---------------------------------------------------------

type FoodNameIndex = Map<string, { foodType: FoodType; icon: string }>;

function matchExact(
  normalized: string,
  lookup: StaticLookupEntry[]
): ResolutionResult | null {
  for (const entry of lookup) {
    if (entry.keywords.includes(normalized)) {
      return { foodType: entry.foodType, icon: entry.icon, source: 'static_exact' };
    }
  }
  return null;
}

function matchRegex(
  normalized: string,
  regexList: RegexEntry[]
): ResolutionResult | null {
  for (const re of regexList) {
    if (re.pattern.test(normalized)) {
      return { foodType: re.foodType, icon: re.icon, source: 'static_regex' };
    }
  }
  return null;
}

/**
 * Resolve a typed item name to a suggested food type + icon.
 *
 * Resolution chain (FR-002):
 *   1. Learned (from past items) — foodNameIndex
 *   2. Static exact (current language keywords)
 *   3. Static regex (current language patterns)
 *   4. Cross-language fallback (other language exact + regex)
 *   5. None — no match
 */
export function resolveName(
  name: string,
  lang: 'en' | 'de',
  foodNameIndex: FoodNameIndex
): ResolutionResult {
  const normalized = name.trim().toLowerCase();
  if (!normalized) {
    return { foodType: 'non_food', icon: null, source: 'none' };
  }

  // Layer 1 — Learned
  const learned = foodNameIndex.get(normalized);
  if (learned) {
    return { foodType: learned.foodType, icon: learned.icon, source: 'learned' };
  }

  // Determine primary and fallback languages
  const primaryLang = lang;
  const fallbackLang: 'en' | 'de' = lang === 'en' ? 'de' : 'en';

  // Layer 2 — Static exact (primary language)
  const primaryLookup = primaryLang === 'en' ? EN_LOOKUP : DE_LOOKUP;
  const exact = matchExact(normalized, primaryLookup);
  if (exact) return exact;

  // Layer 3 — Static regex (primary language)
  const primaryRegex = primaryLang === 'en' ? EN_REGEX : DE_REGEX;
  const regex = matchRegex(normalized, primaryRegex);
  if (regex) return regex;

  // Layer 4 — Cross-language fallback
  const fallbackLookup = fallbackLang === 'en' ? EN_LOOKUP : DE_LOOKUP;
  const fallbackExact = matchExact(normalized, fallbackLookup);
  if (fallbackExact) {
    return { ...fallbackExact, source: 'cross_lang' };
  }

  const fallbackRegex = fallbackLang === 'en' ? EN_REGEX : DE_REGEX;
  const fallbackRegexResult = matchRegex(normalized, fallbackRegex);
  if (fallbackRegexResult) {
    return { ...fallbackRegexResult, source: 'cross_lang' };
  }

  // Layer 5 — No match
  return { foodType: 'non_food', icon: null, source: 'none' };
}
