# Implementation Plan: Name-Based Food Type Pre-Selection

**Branch**: `002-name-food-lookup` | **Date**: 2026-06-28 | **Spec**: `specs/002-name-food-lookup/spec.md`

**Input**: Feature specification for name-based food type pre-selection — 3-layer resolution chain (learned → static → regex), 200 EN + 200 DE static entries, in-memory learned index rebuilt on boot, icon picker pre-selection.

## Summary

Add a name→food type resolution layer between typing an item name and opening the icon picker. The system remembers past user choices, ships with 200+ bilingual static entries (sourced from spec 003's test pool), and uses regex patterns for German compound words. All offline, all synchronous, all under 50ms.

## Technical Context

**Language/Version**: TypeScript 6.0, React Native 0.85, Expo SDK 56

**Primary Dependencies**: None new — uses existing Zustand, MaterialCommunityIcons, FoodType types

**Storage**: In-memory only — FoodNameIndex rebuilt on every boot from existing items. No AsyncStorage changes needed.

**Testing**: Jest — add ~20 tests for foodLookup resolver, index builder, static tables

**Target Platform**: Android (iOS compatible)

**Project Type**: Mobile app (React Native + Expo managed)

**Performance Goals**: resolveName() < 1ms, index rebuild < 50ms at 2000 items

**Constraints**: Zero network calls. Zero async. Index is read-only during session.

**Scale/Scope**: Single file `foodLookup.ts` ~5KB, one store action (`rebuildNameIndex()`), one resolver function.

## Constitution Check

No constitutional conflicts. Spec 002 is a pure UX enhancement with no new architectural complexity. The in-memory index pattern is consistent with Karpathy protocol (radical encapsulation, single-file utility).

## Project Structure

```text
specs/002-name-food-lookup/
├── spec.md              # ✅ Feature specification
├── research.md          # ✅ Research decisions
├── data-model.md        # ✅ Entity definitions
├── plan.md              # ← THIS FILE
└── tasks.md             # (created by speckit.tasks command)

src/
├── constants/
│   └── foodLookup.ts              # NEW — static lookup tables + resolveName()
├── store/
│   └── useStore.ts                # MODIFY — add foodNameIndex + rebuildNameIndex()
├── components/
│   └── EditModal.tsx              # MODIFY — accept initialFoodType/initialIcon props
├── screens/
│   └── ListDetailScreen.tsx       # MODIFY — call resolver before opening EditModal
├── types/
│   └── index.ts                   # NO CHANGE — reuses existing FoodType
├── __tests__/
│   └── foodLookup.test.ts         # NEW — ~20 tests for resolver + index
```

## Implementation Phases

### Phase 1: Static Lookup Tables (FR-007, FR-008, FR-009, FR-010)

**FRs covered**: FR-007 (200 EN entries), FR-008 (200 DE entries), FR-009 (foodType + icon + patterns), FR-010 (regex patterns)

**Changes**:
1. Create `src/constants/foodLookup.ts`
2. Transform `testData.ts` into keyword-based lookup entries (nameEn → EN entry, nameDe → DE entry)
3. Add 5-10 German regex patterns (käse, milch, brot, fleisch, wurst, salat, saft, wasser, öl, nudeln)
4. Write tests: verify all 400+ entries are properly mapped

---

### Phase 2: Learned Index (FR-005, FR-013)

**FRs covered**: FR-005 (derive from existing items), FR-013 (rebuild on boot)

**Changes**:
1. Add `foodNameIndex` state field to Zustand store
2. Add `rebuildNameIndex()` action — scans all items, builds Map<normalized name, suggestion>
3. Call `rebuildNameIndex()` at the end of `hydrate()`
4. Write tests: verify index is built correctly from mock items

---

### Phase 3: Resolution Chain (FR-001, FR-002, FR-003, FR-004, FR-011, FR-012, FR-015)

**FRs covered**: FR-001 (pre-select from name), FR-002 (3-layer chain), FR-003 (offline), FR-004 (normalization), FR-011 (cross-language fallback), FR-012 (exact before regex), FR-015 (language priority on tie)

**Changes**:
1. Implement `resolveName(name, lang, foodNameIndex): ResolutionResult` in `foodLookup.ts`
2. Algorithm: normalize → learned → static exact → static regex → cross-language fallback → none
3. Write tests: verify full chain behavior with 15+ test cases

---

### Phase 4: EditModal Integration (FR-014)

**FRs covered**: FR-014 (icon picker always available for override)

**Changes**:
1. Add optional `initialFoodType` and `initialIcon` props to EditModal
2. When provided, pre-select the matching food type tab and icon in the picker
3. When not provided, open fresh (existing behavior — no regression)
4. The user can still override — pre-selection is a suggestion, not a confirmation

---

### Phase 5: Add-Item Flow Integration (FR-006)

**FRs covered**: FR-006 (override saved back)

**Changes**:
1. In ListDetailScreen's add-item handler, call `resolveName()` before opening EditModal
2. Pass the result as `initialFoodType` + `initialIcon` to EditModal
3. When the user confirms the item with an override, save normally — no special handling needed (the item is saved with whatever values the user chose)

---

### Phase 6: Tests (all FRs)

**New test file**: `src/__tests__/foodLookup.test.ts`

| Test | VERIFIED |
|------|----------|
| Static EN table has 200+ entries | FR-007 |
| Static DE table has 200+ entries | FR-008 |
| All entries have non-null foodType + icon | FR-009 |
| Regex patterns match expected compounds | FR-010 |
| resolveName returns learned match first | FR-002 |
| resolveName falls through to static on no learned match | FR-002 |
| resolveName falls through to regex on no static match | FR-002 |
| resolveName returns none for completely unknown | FR-002 |
| Normalization trims and lowercases | FR-004 |
| Cross-language fallback works when current lang has no match | FR-011 |
| Exact keyword match wins over regex | FR-012 |
| Learned match wins over both static + regex | FR-015 |
| Index rebuild from 100 items completes | FR-005, FR-013 |
| Index skips items with foodType: null | FR-005 |

## Rollout Order

| Phase | Type | Depends on |
|-------|------|-----------|
| 1. Static lookup tables | Data (auto) | Nothing |
| 2. Learned index | Implementation | Nothing |
| 3. Resolution chain | Implementation | Phase 1 + 2 |
| 4. EditModal integration | UI (auto) | Phase 3 |
| 5. Add-item flow integration | UI (auto) | Phase 3 + 4 |
| 6. Tests | Tests | All |

## Test Strategy

~20 new tests covering: static table completeness, resolution chain priority, normalization, cross-language fallback, index rebuild, edge cases.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| German regex patterns false positive | Conservative patterns (word-end suffixes), manual review |
| Large user's item base slows boot | 2000 items × Map insert = ~5ms, negligible |
| Pre-selection confuses users | Icon picker always open — user can override |
| Cross-language fallback gives wrong suggestion | FR-015: current language match wins; fallback is last resort |
