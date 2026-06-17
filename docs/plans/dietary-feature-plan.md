# Dietary Feature Plan — ShadowList

## Overview

Transform shadowlist from a basic shopping list into a paid, offline-first shopping assistant with dietary rule filtering. No AI, no cloud, no food database, no medical claims.

## Core Architecture

### Food Type Tagging (drives everything)

No food database exists. The user classifies items themselves via the icon picker:

```
User picks icon → icon group suggests a food type → user confirms or overrides
                  ↓
            Diet engine checks compatibility
                  ↓
            Warning or OK
```

**13 food types:**
`meat`, `fish`, `egg`, `dairy`, `grain`, `sugar`, `fruit`, `vegetable`, `legume`, `fat`, `beverage`, `supplement`, `non_food`

Icon groups map to these. User can override in EditModal. App remembers per item.

### 7 Diet Profiles

| # | Diet | Forbids |
|---|------|---------|
| 1 | Keto | grain, sugar, fruit, legume, starchy veg |
| 2 | Low Carb | grain, sugar, fruit |
| 3 | Slow Carb (Tim Ferriss) | grain, dairy, sugar, fruit |
| 4 | Vegetarian | meat, fish, poultry |
| 5 | Vegan | meat, fish, dairy, egg, honey |
| 6 | Gluten-Free | grain (by food type) |
| 7 | Paleo | grain, dairy, legume |

### User Flow

1. Select diet in Settings → stored in `AppSettings.activeDiet`
2. Add item as usual → pick icon → icon suggests food type
3. If diet active: incompatibility check fires → ⚠ warning badge
4. Tap warning → "Try X instead?" suggestion dialog
5. User can always add anyway (advisory only)
6. EditModal shows editable food type tag

### i18n

- EN + DE initially
- Simple key-value maps
- Diet names, food type labels, warning strings, UI strings

## Implementation Phases

### Phase 1: Data Layer
- Types: `FoodType`, `DietProfile`, `DietRule`, update `ShoppingItem.foodType`, `AppSettings.activeDiet` + `lang`
- `src/constants/foodTypes.ts` — 13 food type definitions
- 7 diet profile files under `src/constants/diets/`
- Icon → foodType mapping in `src/constants/icons.ts`

### Phase 2: i18n
- `src/i18n/en.ts` + `de.ts` — all UI strings
- `src/i18n/useTranslation.ts` — hook

### Phase 3: Diet Engine
- `src/utils/dietEngine.ts` — pure function `checkItem(diet, foodType) → result`
- Fully testable, no UI dependency

### Phase 4: UI
- SettingsModal: diet picker + language toggle
- EditModal: food type tag with override dropdown
- ItemRow: ⚠ warning badge
- AddItemBar: incompatible suggestion dialog
- ListDetailScreen: active diet header indicator

### Phase 5: Store + Persistence
- Zustand: diet actions (activate/deactivate)
- AsyncStorage: persist `activeDiet` + `lang`
- Migration: existing items get `foodType = null` (untagged, no warning)

### Phase 6: Tests
- Diet engine × all 7 diets × sample items
- i18n coverage
- Icon → foodType mapping integrity

## Constraints

- No food database — user self-classifies via icon → foodType
- No GI/GL/II or medical/nutritional data — zero liability
- No AI, no cloud, no network — fully offline
- Advisory warnings only — user always wins
- Paid app (€3-5), no ads, no subscriptions
- EN+DE initially, expandable to FR+ES
- EU+US market (Western food focus, no Asian market)
