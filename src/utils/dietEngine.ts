// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { FoodType, DietProfile } from '../types';

export interface CheckResult {
  compatible: boolean;
  warnings?: string[];
}

/**
 * Check whether a food type is compatible with an active diet profile.
 * Returns { compatible: true } if the food type is not forbidden by any rule.
 * Returns { compatible: false, warnings: [...] } if any rule forbids it.
 *
 * Pure function — no side effects, no dependencies on store or UI.
 */
export function checkItem(diet: DietProfile, foodType: FoodType): CheckResult {
  const forbidden: string[] = [];

  for (const rule of diet.rules) {
    if (rule.forbid.includes(foodType)) {
      forbidden.push(foodType);
    }
  }

  if (forbidden.length > 0) {
    return {
      compatible: false,
      warnings: [`${foodType} is not compatible with ${diet.id}`],
    };
  }

  return { compatible: true };
}
