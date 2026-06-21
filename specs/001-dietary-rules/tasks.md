# Dietary Rules — Tasks

## Phase 1: Data Layer

- [x] **1.1** Define `FoodType` enum (13 values: meat, fish, egg, dairy, grain, sugar, fruit, vegetable, legume, fat, beverage, supplement, non_food) in `src/types/index.ts`
- [x] **1.2** Define `DietProfile` and `DietRule` types in `src/types/index.ts`
- [x] **1.3** Extend `ShoppingItem` with optional `foodType: FoodType | null`
- [x] **1.4** Extend `AppSettings` with `activeDiet: DietId | null` and `lang: AppLang`
- [x] **1.5** Create `src/constants/foodTypes.ts` — 13 food type definitions with labels and icon associations
- [x] **1.6** Create `src/constants/diets/` with 7 diet profile files (keto, low-carb, slow-carb, vegetarian, vegan, gluten-free, paleo)
- [x] **1.7** Extend `src/constants/icons.ts` — map icon groups to food types
- [x] **1.8** Update `src/__tests__/types.test.ts` — verify new types compile and serialize correctly

## Phase 2: i18n

- [x] **2.1** Create `src/i18n/en.ts` — all UI strings in English
- [x] **2.2** Create `src/i18n/de.ts` — all UI strings in German
- [x] **2.3** Create `src/i18n/useTranslation.ts` — custom hook wrapping lang + t(key) function
- [x] **2.4** i18n tests — verify all keys present in both languages

## Phase 3: Diet Engine

- [x] **3.1** Create `src/utils/dietEngine.ts` — pure function `checkItem(diet, foodType) → { compatible, warnings, suggestions }`
- [x] **3.2** Diet engine tests — test all 7 diets against sample items with known food types

## Phase 4: UI

- [x] **4.1** Update SettingsModal — diet picker dropdown (with "no diet" option) + language toggle
- [x] **4.2** Update EditModal — food type tag with override dropdown
- [x] **4.3** Update ItemRow — ⚠ warning badge when diet active + item incompatible
- [x] **4.4** Create suggestion dialog — "Try X instead?" on warning badge tap
- [x] **4.5** Update AddItemBar — hook into diet engine on item add (via ListDetailScreen handler)
- [x] **4.6** Update ListDetailScreen — active diet header indicator (hidden when no diet)
- [x] **4.7** Accessibility — `accessibilityLabel` on all new elements, 48dp touch targets, contrast check

## Phase 5: Store + Persistence

- [x] **5.1** Zustand diet actions — `activateDiet(id)`, `deactivateDiet()`, `setLang(lang)`
- [x] **5.2** AsyncStorage — persist `activeDiet` + `lang`, hydrate on boot
- [x] **5.3** Migration — existing items without `foodType` default to `null`

## Phase 6: Tests

- [x] **6.1** Full diet engine × 7 diets × sample items (11 tests in dietEngine.test.ts)
- [x] **6.2** i18n coverage — all keys present in EN + DE (3 tests in i18n.test.ts)
- [x] **6.3** Icon → foodType mapping integrity (8 tests in iconFoodTypes.test.ts)
- [x] **6.4** Edge case tests — null foodType, no diet, empty lookup (10 tests in types.test.ts)
