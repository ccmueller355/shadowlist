// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { FoodType, DietProfile, DietId } from '../types';

export interface DietWarning {
  foodType: FoodType;
  dietId: DietId;
}

export interface CheckResult {
  compatible: boolean;
  warnings?: DietWarning[];
}

/**
 * Check whether a food type is compatible with an active diet profile.
 * Returns { compatible: true } if the food type is not forbidden by any rule.
 * Returns { compatible: false, warnings: [{ foodType, dietId }] } if any rule forbids it.
 *
 * Pure function — no side effects, no dependencies on store or UI.
 */
export function checkItem(diet: DietProfile, foodType: FoodType): CheckResult {
  for (const rule of diet.rules) {
    if (rule.forbid.includes(foodType)) {
      return {
        compatible: false,
        warnings: [{ foodType, dietId: diet.id }],
      };
    }
  }

  return { compatible: true };
}
