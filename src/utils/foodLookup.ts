// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───

import { FoodType } from '../types';
import { FOOD_TYPE_TO_CATEGORY } from '../constants/foodTypes';
import {
  resolveName,
  ResolutionResult,
  FoodNameIndex,
  DE_REGEX,
  EN_REGEX,
  DE_LOOKUP,
  EN_LOOKUP,
} from '../constants/foodLookup';

export * from '../constants/foodLookup';

export interface ProductResolution {
  foodType: FoodType;
  icon: string | null;
  category: string | null;
  cleanName: string;
  source: ResolutionResult['source'];
}

/**
 * Extracts a clean canonical food name from a full retail product name
 * by stripping brand, weights, volumes, packaging, and commercial adjectives,
 * and identifying the canonical root noun (e.g. Milch, Wasser, Brot).
 */
export function extractCleanFoodName(
  fullName: string,
  brand?: string | null,
  lang: 'en' | 'de' = 'de',
  foodNameIndex: FoodNameIndex = new Map(),
  genericName?: string | null
): string {
  // If genericName is provided (e.g. from Open GTIN DB or Open Food Facts), prefer it for clean base name
  const candidate = genericName && genericName.trim().length > 0 ? genericName.trim() : fullName.trim();
  let cleaned = candidate;

  // Strip brand if present
  if (brand && brand.trim()) {
    const escapedBrand = brand.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cleaned = cleaned.replace(new RegExp(`(^|\\s)${escapedBrand}([:\\s-]+|$)`, 'gi'), ' ');
  }

  // Strip brackets and parentheses
  cleaned = cleaned.replace(/\(.*?\)/g, ' ').replace(/\[.*?\]/g, ' ');

  // Strip quantities, percentages, and units
  cleaned = cleaned.replace(/\b\d+([.,]\d+)?\s*(%|g|kg|ml|l|liter|cl|oz|lb)\b/gi, ' ');

  // Strip German common commercial / packaging adjectives
  cleaned = cleaned.replace(
    /\b(natürliches|natürlich|haltbare|haltbar|fettarme|fettarm|frische|frisch|bio|vegan|vegetarisch|original|klassisch|feine|feiner|feines|mild|milde|milder|grob|grobe|grober|natur|naturell|leicht|extra)\b/gi,
    ' '
  );

  // Strip English common commercial adjectives
  cleaned = cleaned.replace(
    /\b(natural|fresh|organic|low.?fat|whole|skimmed|semi.?skimmed|uht|unsweetened|sweetened|pure|classic|extra)\b/gi,
    ' '
  );

  // Clean punctuation and multiple spaces
  cleaned = cleaned.replace(/[^\p{L}\s]/gu, ' ').trim().replace(/\s+/g, ' ');

  if (!cleaned) {
    return fullName.trim();
  }

  // Check if any word or compound matches known root patterns (e.g. /wasser$/i -> Wasser, /milch$/i -> Milch)
  const regexes = lang === 'en' ? EN_REGEX : DE_REGEX;
  const words = cleaned.split(' ').filter(Boolean);
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i].toLowerCase();

    // Check compound suffix regexes
    for (const re of regexes) {
      if (re.pattern.test(w)) {
        // Extract root word if regex is a compound suffix like /milch$/i or /wasser$/i
        const strPattern = re.pattern.source;
        const matchSuffix = strPattern.match(/([a-zäöüß]+)\$/i);
        if (matchSuffix && matchSuffix[1]) {
          const root = matchSuffix[1];
          return root.charAt(0).toUpperCase() + root.slice(1).toLowerCase();
        }
      }
    }

    // Check exact lookup entries
    const lookups = lang === 'en' ? EN_LOOKUP : DE_LOOKUP;
    for (const entry of lookups) {
      if (entry.keywords.includes(w)) {
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      }
    }
  }

  // Capitalize words
  const capitalized = words
    .map((w) => (w.length > 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');

  return capitalized || fullName.trim();
}

/**
 * Resolves a full retail product name through the food resolution engine
 * and maps the resulting foodType to an icon and category.
 */
export function resolveProductInfo(
  fullName: string,
  brand?: string | null,
  lang: 'en' | 'de' = 'de',
  foodNameIndex: FoodNameIndex = new Map(),
  genericName?: string | null
): ProductResolution {
  const cleanName = extractCleanFoodName(fullName, brand, lang, foodNameIndex, genericName);

  // First try resolving the full name
  let resolution = resolveName(fullName, lang, foodNameIndex);

  // If full name yielded no foodType, try genericName if available
  if (resolution.foodType === 'non_food' && genericName) {
    const genericResolution = resolveName(genericName, lang, foodNameIndex);
    if (genericResolution.foodType !== 'non_food') {
      resolution = genericResolution;
    }
  }

  // If still no foodType, try the extracted clean name
  if (resolution.foodType === 'non_food' && cleanName) {
    const cleanResolution = resolveName(cleanName, lang, foodNameIndex);
    if (cleanResolution.foodType !== 'non_food') {
      resolution = cleanResolution;
    }
  }

  const foodType = resolution.foodType;
  const icon = resolution.icon;
  const category = foodType && foodType !== 'non_food' ? (FOOD_TYPE_TO_CATEGORY[foodType] ?? null) : null;

  return {
    foodType,
    icon,
    category,
    cleanName,
    source: resolution.source,
  };
}
