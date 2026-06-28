# Research: Bilingual Demo Data & Statistical Test Data Generator

**Date**: 2026-06-28 | **Spec**: `003-demo-test-data`

## Research Items

### 1. Current State Assessment

| Item | Status |
|------|--------|
| FR-001 (15 items, 2 lists, foodType + icon) | **Partial** — 10 items, 1 list. Need 5+ more items and 2nd list |
| FR-002 (EN + DE names) | ✅ Complete — all items bilingual |
| FR-003 (one-tap load in Settings) | ✅ Complete — `addDemoData()` exists |
| FR-004 to FR-012 (200-item pool + generator) | ❌ Not started |

### 2. Approach: Hardcoded Pool vs Generated

**Decision**: Hardcoded pool in a separate file `src/constants/testData.ts`. Rationale:
- 200 items is manageable (~6KB of JSON-ish TypeScript)
- Predictable and testable — no randomness in the data itself
- Generator only handles list composition (which items to pick, how many)
- File size: ~15KB total with both EN/DE names — negligible for a mobile app

**Rejected alternatives**:
- JSON import — adds complexity, no benefit over TypeScript
- API call — not offline-capable, violates spec assumption
- CSV parse — unnecessary overhead for 200 items

### 3. TestItem Data Structure

```
TestItem {
  nameEn: string       // English name (e.g., "Whole Wheat Bread")
  nameDe: string       // German name (e.g., "Vollkornbrot")
  foodType: FoodType   // One of the 13 existing types
  icon: string         // MaterialCommunityIcons name from existing pool
  category: string     // Category key from i18n (e.g., "groceries")
  tier: 1 | 2          // 1 = top 100 (frequent), 2 = long-tail (rare)
}
```

### 4. Generator Algorithm

```
generateTestLists(params):
  listCount = params.listCount || 3
  minItems  = params.minItems  || 8
  maxItems  = params.maxItems  || 25
  highWeight = params.highTierWeight || 70  // % chance to pick from tier 1
  
  for n in listCount:
    listSize = random(minItems, maxItems)
    items = []
    for i in listSize:
      if random(0,100) < highWeight:
        pick from tier1 pool (random weighted)
      else:
        pick from tier2 pool (random weighted)
      ensure no duplicate within list
    items → ShoppingItem format with generated IDs
    wrap in ShoppingList
```

### 5. Integration Points

| Component | What changes needed |
|-----------|-------------------|
| `src/constants/testData.ts` | NEW — item pool + generator function |
| `src/store/useStore.ts` | NEW action: `generateTestData()` |
| `src/components/SettingsModal.tsx` | NEW button: "Generate Test Data" |
| `src/constants/demoData.ts` | Add 5+ items + 2nd list to FR-001 compliance |
| `src/__tests__/demoData.test.ts` | NEW — tests for FR-001 to FR-003 |
| `src/__tests__/testData.test.ts` | NEW — tests for FR-004 to FR-012 |

### 6. Icon Assignment Strategy

Each TestItem needs an icon from MaterialCommunityIcons (via `@expo/vector-icons`). Strategy:
- Map foodType → default icon (e.g., dairy → `cheese`, meat → `food-drumstick-outline`)
- Use `ICON_FOOD_TYPE_MAP` from existing `src/constants/foodTypes.ts` where possible
- For items with well-known specific icons (e.g., Apples → `fruit-cherries`), use the specific icon
- All icons must exist in MaterialCommunityIcons — no custom SVGs

### 7. Category Assignment

Items are categorized into the existing 19 categories from `src/constants/icons.ts`:
- Groceries: food items (bread, milk, produce, meat, etc.)
- Beverages: coffee, tea, juice, soda, water
- Household: cleaning supplies, paper goods
- Personal: toiletries, health items
- Electronics: batteries, cables
- Pet: pet food, supplies
- (and others as needed — items only assigned to relevant categories)
