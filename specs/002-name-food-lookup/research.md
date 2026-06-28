# Research: Name-Based Food Type Pre-Selection

**Date**: 2026-06-28 | **Spec**: `002-name-food-lookup`

## Research Items

### 1. Static Lookup Data Source

**Decision**: Derive static lookup tables from the existing `testData.ts` pool (spec 003).

Rationale:
- `testData.ts` already has 200+ items with `nameEn`, `nameDe`, `foodType`, `icon`
- Transform into lookup entries: `{ keywords: [normalized name], foodType, icon, lang }`
- Saves ~80% of manual data entry — the pool already covers the target distribution
- Add regex patterns as separate entries (käse, milch, brot, etc.)

**Rejected alternatives**:
- Hand-crafted lookup table — duplicate work, the pool already exists
- Auto-generated from demo data — too few items (18 items)
- API-based lookup — violates FR-003 (offline requirement)

### 2. Learned Index Storage Strategy

**Decision**: In-memory `Map<string, FoodSuggestion>` rebuilt on every app boot.

- Index built by scanning all `items` in Zustand store at startup
- Key = normalized name (lowercase, trimmed)
- Value = the most recent `{ foodType, icon }` assigned to that name
- No separate storage — the items ARE the cache (FR-005)
- Rebuild time: O(n) where n = total items. At ~2000 items, this is under 10ms.

**Edge cases handled**:
- Item deleted → its mapping removed from index on next rebuild
- Item edited (foodType changed) → index updates on next rebuild
- Multiple items with same name → last-written wins (most recent user intent)

### 3. Integration Points

| Component | Hook | What changes |
|-----------|------|-------------|
| `src/store/useStore.ts` | NEW action `rebuildNameIndex()` | Called in `hydrate()` after data load |
| `src/constants/foodLookup.ts` | NEW file | Static lookup tables + resolver function |
| `src/components/EditModal.tsx` | Props `initialFoodType`, `initialIcon` | Accept pre-selected values from caller |
| `src/components/AddItemBar.tsx` | Add item flow | Run resolution before opening picker |
| `src/screens/ListDetailScreen.tsx` | Add item handler | Call resolver, pass result to EditModal |

### 4. Resolution Chain Algorithm

```
resolveName(name: string, lang: AppLang): ResolutionResult

1. Normalize: name.trim().toLowerCase()
2. Layer 1 — Learned: foodNameIndex.get(normalized)
   → if found AND foodType !== null → return { learned }
3. Layer 2 — Static exact: staticLookup[lang].keywords.includes(normalized)
   → if found → return { static }
4. Layer 3 — Static regex: staticLookup[lang].regexes.some(r => r.test(normalized))
   → if found → return { regex }
5. Layer 4 — Cross-language fallback: repeat layers 3+4 with other lang
   → if found → return { static_cross }
6. No match → return { source: 'none' }
```

### 5. Performance Budget

| Operation | Budget | Actual (est.) |
|-----------|--------|---------------|
| Index rebuild (2000 items) | < 50ms | ~5ms |
| Single resolve call | < 10ms | ~0.1ms |
| Static lookup (200 entries × 2 langs) | N/A | In-memory O(1) |
| Regex test (5-10 patterns) | N/A | ~0.01ms per pattern |

Zero network. Zero async. Pure synchronous Map and Array operations.
