# Implementation Plan: Bilingual Demo Data & Statistical Test Data Generator

**Branch**: `003-demo-test-data` | **Date**: 2026-06-28 | **Spec**: `specs/003-demo-test-data/spec.md`

**Input**: Feature specification for bilingual demo data with diet warnings, 200-item statistical test pool with generator, and Settings UI for one-tap generation.

## Summary

Enhance demo data to meet spec requirements (15+ items, 2 lists, bilingual), then build a 200-item bilingual grocery pool with statistical test list generator. The generator feeds into the existing Zustand store infrastructure — no new UI paradigms needed.

## Technical Context

**Language/Version**: TypeScript 6.0, React Native 0.85, Expo SDK 56

**Primary Dependencies**: None new — uses existing Zustand, MaterialCommunityIcons, i18n system

**Storage**: No new storage — generated data passed through normal store persistence to AsyncStorage

**Testing**: Jest (existing 82-test suite, add ~15 tests for pool + generator)

**Target Platform**: Android (iOS compatible but not blocking)

**Project Type**: Mobile app (React Native + Expo managed)

**Performance Goals**: `generateTestLists()` must complete in <50ms for default params (5 lists, 25 items each)

**Constraints**: Zero network calls — all data client-side. 200-item pool must be fully typed.

**Scale/Scope**: Single file `testData.ts` ~15KB, ~10 function signatures in store, 2 new test files

## Constitution Check

No constitutional conflicts. Spec 003 is a data enhancement feature with no new architectural complexity. Existing Karpathy protocol (radical encapsulation, no unsolicited refactors) is respected — new data lives in a single file, generator is a pure function.

## Project Structure

### Documentation

```text
specs/003-demo-test-data/
├── spec.md              # ✅ Feature specification
├── research.md          # ✅ Research decisions
├── data-model.md        # ✅ Entity definitions
├── plan.md              # ← THIS FILE
└── tasks.md             # (created by speckit.tasks command)
```

### Source Code

```text
src/
├── constants/
│   ├── demoData.ts              # MODIFY — add 5+ items + 2nd list
│   └── testData.ts              # NEW — 200-item pool + generator function
├── store/
│   └── useStore.ts              # MODIFY — add generateTestData action
├── components/
│   └── SettingsModal.tsx        # MODIFY — add "Generate Test Data" button
├── types/
│   └── index.ts                 # NO CHANGE — TestItem stays local to testData.ts
├── __tests__/
│   ├── demoData.test.ts         # NEW — tests for FR-001 to FR-003
│   └── testData.test.ts         # NEW — tests for FR-004 to FR-012
```

**Structure Decision**: Single-file approach for the item pool (200 items in `testData.ts`). The generator is a pure function in the same file — no class or module pattern needed. Store integration is a single action that calls the generator and dispatches result into existing addItem/addList actions.

## Implementation Phases

### Phase 1: Demo Data Polish (FR-001, FR-002, FR-003)

**FRs covered**: FR-001 (15 items, 2 lists), FR-002 (bilingual), FR-003 (one-tap load)

**Changes**:
1. Add `DEMO_LIST_2_EN` / `DEMO_LIST_2_DE` to `demoData.ts` (5+ additional items)
2. Export both lists from `getDemoData()`
3. Write `src/__tests__/demoData.test.ts` — verify 15+ items, 2 lists, bilingual, food types

**Tests before impl**: ✅ Written first, must fail, then pass after implementation

---

### Phase 2: Item Pool (FR-004, FR-005, FR-009)

**FRs covered**: FR-004 (200 items), FR-005 (2 tiers), FR-009 (foodType + icon + category)

**Changes**:
1. Create `src/constants/testData.ts`
2. Define `TIER_1_ITEMS: TestItem[]` — 100 top-tier items
3. Define `TIER_2_ITEMS: TestItem[]` — 100+ long-tail items
4. Verify: every item has non-null foodType, non-empty icon, valid category

**Data composition**:
- Groceries (food items): ~60% of pool
- Beverages: ~10%
- Household: ~10%
- Personal care: ~5%
- Pet: ~3%
- Other categories: ~12%

Food type distribution (for diet warning visibility):
- grain: ~10%, dairy: ~8%, meat: ~7%, fish: ~3%, fruit: ~12%, vegetable: ~15%, egg: ~2%, sugar: ~5%, beverage: ~8%, oil: ~3%, nuts: ~3%, legumes: ~3%, spice: ~3%, non_food: ~18%

---

### Phase 3: Generator Function (FR-006, FR-007, FR-008, FR-010, FR-011)

**FRs covered**: FR-006 (generateTestLists function), FR-007 (8-25 items per list), FR-008 (statistical tier frequency), FR-010 (diet engine compatibility), FR-011 (configurable params)

**Changes**:
1. Implement `generateTestLists(params): TestDataResult` in `testData.ts`
2. Algorithm: weighted random selection with tier bias
3. No duplicates within a list (re-roll on collision)

**Statistical verification** (FR-008):
- Run 50 generated lists → count tier 1 appearances ≥ 60%
- Run 50 generated lists → count tier 2 appearances ≤ 30%
- This is tested in the test file with seeded random

---

### Phase 4: Store Integration (FR-012)

**FRs covered**: FR-012 (Settings button)

**Changes**:
1. Add `generateTestData()` action to Zustand store
2. Action calls `generateTestLists()`, then `addList()` + `addItem()` for each generated item
3. Show toast: "N test lists generated"

---

### Phase 5: Settings UI (FR-012)

**FRs covered**: FR-012 (Settings entry)

**Changes**:
1. Add "Generate Test Data" button in SettingsModal, placed near existing "Load Demo Data"
2. Button calls `generateTestData()` from store
3. i18n: add `settings.generateTestData` key to both EN and DE translations

---

### Phase 6: Tests (all FRs)

**New test files**:

| File | Tests |
|------|-------|
| `src/__tests__/demoData.test.ts` | FR-001 (15 items, 2 lists), FR-002 (EN/DE names), FR-003 (loadable) |
| `src/__tests__/testData.test.ts` | FR-004 (200 items), FR-005 (tiers), FR-006 (generation), FR-007 (size), FR-008 (frequency), FR-009 (typing), FR-011 (params), FR-012 (store action) |

## Rollout Order

| Phase | Depends on | Auto/manual |
|-------|-----------|-------------|
| 1. Demo data polish | Nothing | Auto |
| 2. Item pool | Nothing | Auto — data entry |
| 3. Generator function | Phase 2 | Auto |
| 4. Store integration | Phase 3 | Auto |
| 5. Settings UI | Phase 4 | Auto |
| 6. Tests | All above | Auto — TDD per phase |

## Test Strategy

| Test | What it validates | FR |
|------|-------------------|----|
| `demoData has 15+ items` | Pool size | FR-001 |
| `demoData has 2+ lists` | List count | FR-001 |
| `demoData items have foodType` | Non-null food types | FR-001 |
| `demo data bilingual` | EN + DE for all items | FR-002 |
| `demo data loadable` | `getDemoData()` returns data | FR-003 |
| `test pool has 200+ items` | Pool size | FR-004 |
| `test pool has 100 tier1 + 100+ tier2` | Tier distribution | FR-005 |
| `generator returns lists` | Function produces output | FR-006 |
| `generated lists 8-25 items` | List size bounds | FR-007 |
| `tier 1 appears ≥60%` over 50 runs | Statistical frequency | FR-008 |
| `all items have foodType + icon + category` | Completeness | FR-009 |
| `generated items pass diet check` | Diet engine compat | FR-010 |
| `generator accepts custom params` | Configurable | FR-011 |
| `generateTestData store action works` | Integration | FR-012 |

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| 200-item pool is tedious data entry | Use generation script (AI-assisted) in Phase 2 |
| German translations inaccurate | Use common grocery terms — native-level accuracy not critical for test data |
| `generateTestLists()` too slow at 200 items | O(200) = negligible for 200 items × 25 per list |
| Generated lists have duplicate names | Append timestamp to list names |
| Test data fills user's storage | Generator is additive, user can delete — no persistence guarantee needed |

## Handoff Packet

- Branch: `003-demo-test-data` (fork from `004-build-pipeline` after merge)
- Next action: Phase 1 — expand demoData.ts to 15+ items, 2 lists
- Key files: `src/constants/testData.ts` (new), `src/constants/demoData.ts` (modify), `src/store/useStore.ts` (modify), `src/components/SettingsModal.tsx` (modify)
- New tests: `src/__tests__/demoData.test.ts`, `src/__tests__/testData.test.ts`
