Closes #33, #34, #35, #36, #37, #38

### Changes

**#33** — Input text invisible on dark themes
→ Added `color: cyberpunkTheme.colors.textPrimary` to AddItemBar TextInput

**#34** — List filters after adding items (debounce race)
→ Added `.cancel()` method to debounce utility, called on clear/submit

**#35** — Items not ordered by food type within categories
→ Sort by FOOD_TYPE_SORT_ORDER (fresh → refrigerated → dry goods → beverages → other) then alphabetically

**#36** — No `processed` food type for ready-made/industrial foods
→ Added to FoodType union, FOOD_TYPES, mappings, and i18n

**#37** — No `snacks` food type for chips, candy, sweets
→ Added to FoodType union, FOOD_TYPES, mappings, and i18n

**#38** — Vegetables after sugar in food type picker
→ Reordered FOOD_TYPES to follow supermarket layout

### Verification
- TypeScript: npx tsc --noEmit — clean
- Tests: 268 passed, 19 suites — all green
