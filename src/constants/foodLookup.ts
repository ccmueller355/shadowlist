// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
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

/**
 * Generate common German plural variants for a singular noun.
 * Covers predictable patterns for food-related nouns:
 *   -el → -eln  (Kartoffel → Kartoffeln, Zwiebel → Zwiebeln, Nudel → Nudeln)
 *   -e  → -en   (Tomate → Tomaten, Karotte → Karotten, Gurke → Gurken)
 *   -er → -ern  (Eier → Eiern — uncommon for food but safe)
 * Does NOT handle umlaut shifts (Apfel → Äpfel) or -s plurals (Auto → Autos).
 */
function germanPluralVariants(singular: string): string[] {
  const variants = [singular];
  if (singular.endsWith('el')) {
    variants.push(singular + 'n');
  }
  if (singular.endsWith('e') && !singular.endsWith('ee')) {
    variants.push(singular + 'n');
  }
  if (singular.endsWith('er')) {
    variants.push(singular + 'n');
  }
  return variants;
}

function buildEnLookup(): StaticLookupEntry[] {
  return ALL_ITEMS.map((item) => ({
    keywords: [item.nameEn.toLowerCase()],
    foodType: item.foodType,
    icon: item.icon,
    lang: 'en' as const,
  }));
}

function buildDeLookup(): StaticLookupEntry[] {
  return ALL_ITEMS.map((item) => {
    const base = item.nameDe.toLowerCase();
    return {
      keywords: germanPluralVariants(base),
      foodType: item.foodType,
      icon: item.icon,
      lang: 'de' as const,
    };
  });
}

// --- Exported tables ------------------------------------------------------

export const EN_LOOKUP: StaticLookupEntry[] = buildEnLookup();
export const DE_LOOKUP: StaticLookupEntry[] = buildDeLookup();

// --- Regex patterns for German compounds ----------------------------------

export const EN_REGEX: RegexEntry[] = [
  // Herbs & Spices
  { pattern: /basil/i,       foodType: 'vegetable', icon: 'leaf' },
  { pattern: /oregano/i,     foodType: 'vegetable', icon: 'leaf' },
  { pattern: /thyme$/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /rosemary/i,    foodType: 'vegetable', icon: 'leaf' },
  { pattern: /sage$/i,       foodType: 'vegetable', icon: 'leaf' },
  { pattern: /dill$/i,       foodType: 'vegetable', icon: 'leaf' },
  { pattern: /parsley/i,     foodType: 'vegetable', icon: 'leaf' },
  { pattern: /garlic/i,      foodType: 'vegetable', icon: 'garlic' },
  { pattern: /pepper$/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /paprika/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /chili/i,       foodType: 'vegetable', icon: 'chili-hot' },
  { pattern: /curry/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /cinnamon/i,    foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /coriander/i,   foodType: 'vegetable', icon: 'leaf' },
  { pattern: /ginger/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /mint$/i,       foodType: 'vegetable', icon: 'leaf' },
  { pattern: /cumin/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /nutmeg/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /vanilla/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /clove/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /anise/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /mustard/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /sesame/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /spice/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /herb/i,        foodType: 'vegetable', icon: 'leaf' },

  // Convenience / Ready-Made
  { pattern: /frozen/i,      foodType: 'convenience', icon: 'snowflake' },
  { pattern: /microwave/i,   foodType: 'convenience', icon: 'food-variant' },
  { pattern: /instant/i,     foodType: 'convenience', icon: 'food-variant' },
  { pattern: /tv.?dinner/i,  foodType: 'convenience', icon: 'food-variant' },
  { pattern: /ramen/i,        foodType: 'convenience', icon: 'rice' },
  { pattern: /canned/i,       foodType: 'convenience', icon: 'food-variant' },
  { pattern: /ready.?meal/i, foodType: 'convenience', icon: 'food-variant' },

  // Snacks
  { pattern: /chocolate/i,   foodType: 'snacks', icon: 'candy' },
  { pattern: /candy/i,       foodType: 'snacks', icon: 'candy' },
  { pattern: /cookie/i,      foodType: 'snacks', icon: 'candy' },
  { pattern: /chips$/i,      foodType: 'snacks', icon: 'pizza' },
  { pattern: /popcorn/i,     foodType: 'snacks', icon: 'popcorn' },
  { pattern: /granola.?bar/i,foodType: 'snacks', icon: 'candy' },
  { pattern: /protein.?bar/i,foodType: 'snacks', icon: 'candy' },
  { pattern: /gummy/i,       foodType: 'snacks', icon: 'candy' },
  { pattern: /licorice/i,    foodType: 'snacks', icon: 'candy' },
  { pattern: /jerky/i,       foodType: 'snacks', icon: 'food-drumstick-outline' },
  { pattern: /pudding/i,     foodType: 'snacks', icon: 'cup' },
  { pattern: /ice.?cream/i,  foodType: 'snacks', icon: 'ice-cream' },
  { pattern: /snack/i,       foodType: 'snacks', icon: 'candy' },
  { pattern: /treat/i,       foodType: 'snacks', icon: 'candy' },
];

export const DE_REGEX: RegexEntry[] = [
  { pattern: /käse$/i,       foodType: 'dairy',     icon: 'cheese' },
  { pattern: /milch$/i,      foodType: 'dairy',     icon: 'cup' },
  { pattern: /brot$/i,       foodType: 'grain',     icon: 'bread-slice-outline' },
  { pattern: /fleisch$/i,    foodType: 'meat',      icon: 'food-drumstick-outline' },
  { pattern: /wurst$/i,      foodType: 'meat',      icon: 'food-drumstick-outline' },
  { pattern: /nudeln/i,      foodType: 'grain',     icon: 'rice' },
  { pattern: /reis$/i,       foodType: 'grain',     icon: 'rice' },
  { pattern: /fisch$/i,      foodType: 'seafood',   icon: 'fish' },
  { pattern: /saft$/i,       foodType: 'beverage',  icon: 'cup' },
  { pattern: /wasser$/i,     foodType: 'beverage',  icon: 'water' },
  { pattern: /öl$/i,         foodType: 'fat',       icon: 'oil' },
  { pattern: /salat$/i,      foodType: 'vegetable', icon: 'carrot' },

  // Herbs & Spices (Kräuter und Gewürze)
  { pattern: /pfeffer$/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /chili/i,        foodType: 'vegetable', icon: 'chili-hot' },
  { pattern: /curry/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /zimt/i,         foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /koriander/i,    foodType: 'vegetable', icon: 'leaf' },
  { pattern: /ingwer$/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /minze$/i,       foodType: 'vegetable', icon: 'leaf' },
  { pattern: /gewürz/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /basilikum/i,    foodType: 'vegetable', icon: 'leaf' },
  { pattern: /oregano/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /thymian/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /rosmarin/i,     foodType: 'vegetable', icon: 'leaf' },
  { pattern: /salbei$/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /dill$/i,        foodType: 'vegetable', icon: 'leaf' },
  { pattern: /petersilie/i,   foodType: 'vegetable', icon: 'leaf' },
  { pattern: /schnittlauch/i, foodType: 'vegetable', icon: 'leaf' },
  { pattern: /lorbeer/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /majoran/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /bohnenkraut/i,  foodType: 'vegetable', icon: 'leaf' },
  { pattern: /knoblauch/i,    foodType: 'vegetable', icon: 'garlic' },
  { pattern: /paprika$/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /kümmel/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /muskat/i,       foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /vanille/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /nelke/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /anis$/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /fenchel/i,      foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /senf$/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /sesam/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /mohn$/i,        foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /kardamom/i,     foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /wacholder/i,    foodType: 'vegetable', icon: 'food-variant' },
  { pattern: /estragon/i,     foodType: 'vegetable', icon: 'leaf' },
  { pattern: /melisse/i,      foodType: 'vegetable', icon: 'leaf' },
  { pattern: /lavendel/i,     foodType: 'vegetable', icon: 'leaf' },

  // Convenience / Ready-Made
  { pattern: /fertiggericht/i, foodType: 'convenience', icon: 'food-variant' },
  { pattern: /tiefkühl/i,      foodType: 'convenience', icon: 'snowflake' },
  { pattern: /mikrowellen/i,   foodType: 'convenience', icon: 'food-variant' },
  { pattern: /tütensuppe/i,    foodType: 'convenience', icon: 'food-variant' },
  { pattern: /fischstäb/i,     foodType: 'convenience', icon: 'fish' },
  { pattern: /nuggets/i,       foodType: 'convenience', icon: 'food-drumstick-outline' },
  { pattern: /ramen/i,          foodType: 'convenience', icon: 'rice' },
  { pattern: /instant/i,       foodType: 'convenience', icon: 'food-variant' },
  { pattern: /konserven/i,     foodType: 'convenience', icon: 'food-variant' },

  // Snacks
  { pattern: /schokolade/i,   foodType: 'snacks', icon: 'candy' },
  { pattern: /schokoriegel/i, foodType: 'snacks', icon: 'candy' },
  { pattern: /gummibär/i,     foodType: 'snacks', icon: 'candy' },
  { pattern: /lakritz/i,      foodType: 'snacks', icon: 'candy' },
  { pattern: /bonbons/i,      foodType: 'snacks', icon: 'candy' },
  { pattern: /kekse$/i,       foodType: 'snacks', icon: 'candy' },
  { pattern: /chips$/i,       foodType: 'snacks', icon: 'pizza' },
  { pattern: /müsli/i,        foodType: 'snacks', icon: 'candy' },
  { pattern: /popcorn/i,      foodType: 'snacks', icon: 'popcorn' },
  { pattern: /proteinriegel/i,foodType: 'snacks', icon: 'candy' },
  { pattern: /eiscreme/i,     foodType: 'snacks', icon: 'ice-cream' },
  { pattern: /pudding/i,      foodType: 'snacks', icon: 'cup' },
  { pattern: /joghurt/i,      foodType: 'snacks', icon: 'cheese' },
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
