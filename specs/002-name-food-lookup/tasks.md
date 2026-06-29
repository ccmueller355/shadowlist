# Tasks: Name-Based Food Type Pre-Selection

**Input**: Plan from `specs/002-name-food-lookup/plan.md`

**Prerequisites**: spec.md, plan.md, research.md, data-model.md

**Tests**: Test tasks are included and MUST be written and FAIL before implementation (TDD discipline).

**Organization**: Tasks grouped by phase with user story alignment. Parallelizable tasks marked `[P]`.

---

## Phase 1: Static Lookup Tables — FR-007, FR-008, FR-009, FR-010

**Purpose**: Create the bilingual static lookup tables sourced from the existing 200-item test pool (spec 003).

### Tests for Phase 1

> **Write these tests FIRST, ensure they FAIL before implementation**

- [x] T001 **[P]** **[US3]** Write test: `EN_LOOKUP` has 200+ entries — `foodLookup.test.ts`
- [x] T002 **[P]** **[US3]** Write test: `DE_LOOKUP` has 200+ entries — `foodLookup.test.ts`
- [x] T003 **[P]** **[US3]** Write test: all EN entries have non-null `foodType` and non-empty `icon` — `foodLookup.test.ts`
- [x] T004 **[P]** **[US3]** Write test: all DE entries have non-null `foodType` and non-empty `icon` — `foodLookup.test.ts`
- [x] T005 **[P]** **[US4]** Write test: regex patterns match expected compounds (e.g., `/käse$/i` matches "Hüttenkäse") — `foodLookup.test.ts`
- [x] T006 **[P]** **[US4]** Write test: regex patterns do NOT match known false positives — `foodLookup.test.ts`

### Implementation for Phase 1

- [x] T007 Create `src/constants/foodLookup.ts` with `StaticLookupEntry` interface and `EN_LOOKUP`, `DE_LOOKUP`, `EN_REGEX`, `DE_REGEX` arrays
- [x] T008 **[P]** **[US3]** Derive `EN_LOOKUP` from TIER_1_ITEMS + TIER_2_ITEMS — each item's `nameEn` becomes a keyword, `foodType` and `icon` map directly
- [x] T009 **[P]** **[US3]** Derive `DE_LOOKUP` from same pool — each item's `nameDe` becomes keyword
- [x] T010 **[P]** **[US4]** Add German regex patterns: `/käse$/i`, `/milch$/i`, `/brot$/i`, `/fleisch$/i`, `/wurst$/i`, `/saft$/i`, `/wasser$/i`, `/öl$/i`, `/nudeln/i` — each mapping to the appropriate foodType
- [x] T011 Run Phase 1 tests (T001-T006) — all pass

**Checkpoint**: FR-007 (200 EN entries), FR-008 (200 DE entries), FR-009 (typed), FR-010 (regex) all satisfied.

---

## Phase 2: Learned Index — FR-005, FR-013

**Purpose**: Build the in-memory FoodNameIndex that learns from past user items.

### Tests for Phase 2

> **Write these tests FIRST, ensure they FAIL before implementation**

- [x] T012 Write test: `rebuildNameIndex()` creates a Map with correct size from mock items — `foodLookup.test.ts`
- [x] T013 Write test: index keys are normalized (lowercase, trimmed) — `foodLookup.test.ts`
- [x] T014 Write test: items with `foodType: null` are skipped in the index — `foodLookup.test.ts`
- [x] T015 Write test: duplicate normalized names resolve to the last item's values — `foodLookup.test.ts`
- [x] T016 Write test: index is populated after `hydrate()` completes (integration, store mock) — `foodLookup.test.ts`

### Implementation for Phase 2

- [x] T017 Add `foodNameIndex` state field of type `Map<string, { foodType: FoodType | null; icon: string }>` to Zustand store
- [x] T018 Add `rebuildNameIndex()` action to store — scan all items → build Map, skip null foodType entries
- [x] T019 Call `rebuildNameIndex()` at the end of the `hydrate()` function (after data loads)
- [x] T020 Run Phase 2 tests (T012-T016) — all pass

**Checkpoint**: FR-005 (derived from items), FR-013 (rebuilt on boot) satisfied.

---

## Phase 3: Resolution Chain — FR-001, FR-002, FR-003, FR-004, FR-011, FR-012, FR-015

**Purpose**: Implement the 5-layer resolution algorithm.

### Tests for Phase 3

> **Write these tests FIRST, ensure they FAIL before implementation**

- [x] T021 **[US1]** Write test: `resolveName()` returns learned match first when name exists in index — `foodLookup.test.ts`
- [x] T022 **[US1]** Write test: `resolveName()` falls through to static exact match when no learned match — `foodLookup.test.ts`
- [x] T023 **[US1]** Write test: `resolveName()` falls through to static regex when no exact static match — `foodLookup.test.ts`
- [x] T024 **[US1]** Write test: `resolveName()` returns `source: 'none'` for completely unknown names — `foodLookup.test.ts`
- [x] T025 **[US2]** Write test: `resolveName()` normalizes input (lowercase + trim) before lookup — `foodLookup.test.ts`
- [x] T026 **[US3]** Write test: `resolveName('de', ...)` checks DE lookup when lang='de' — `foodLookup.test.ts`
- [x] T027 **[US3]** Write test: cross-language fallback works when current lang has no match — `foodLookup.test.ts`
- [x] T028 **[US3]** Write test: exact keyword match wins over regex when both match — `foodLookup.test.ts`
- [x] T029 **[US1]** Write test: learned match wins over both static and regex (FR-015) — `foodLookup.test.ts`
- [x] T030 **[US2]** Write test: `resolveName()` returns `source: 'learned'` with correct foodType and icon — `foodLookup.test.ts`

### Implementation for Phase 3

- [x] T031 Implement `resolveName(name: string, lang: AppLang, foodNameIndex: FoodNameIndex): ResolutionResult` in `foodLookup.ts`
- [x] T032 Normalize step: `name.trim().toLowerCase()`
- [x] T033 Layer 1 — Learned: `foodNameIndex.get(normalized)` → if found and foodType !== null → return
- [x] T034 Layer 2 — Static exact: check `keywords` arrays in `EN_LOOKUP` / `DE_LOOKUP` for normalized name
- [x] T035 Layer 3 — Static regex: test `EN_REGEX` / `DE_REGEX` patterns against normalized name
- [x] T036 Layer 4 — Cross-language fallback: repeat layers 2+3 with the other language
- [x] T037 Layer 5 — No match: return `{ foodType: null, icon: null, source: 'none' }`
- [x] T038 Run Phase 3 tests (T021-T030) — all pass

**Checkpoint**: FR-001 (pre-select from name), FR-002 (3-layer chain), FR-003 (offline), FR-004 (normalization), FR-011 (cross-language), FR-012 (exact before regex), FR-015 (language priority) all satisfied.

---

## Phase 4: EditModal Integration — FR-014

**Purpose**: Wire pre-selection into the icon picker modal.

### Tests for Phase 4

> **Write these tests FIRST, ensure they FAIL before implementation**

- [x] T039 Write test: EditModal renders with pre-selected foodType when `initialFoodType` prop is provided (component mount test) — `foodLookup.test.ts` or component test
- [x] T040 Write test: EditModal opens fresh (no pre-selection) when `initialFoodType` is undefined — regression check — `foodLookup.test.ts`

### Implementation for Phase 4

- [x] T041 Add optional `initialFoodType?: FoodType` and `initialIcon?: string` props to `EditModal`
- [x] T042 When props are provided, pre-select the matching food type tab in the icon picker grid
- [x] T043 When props are provided, highlight the matching icon in the grid
- [x] T044 When props are not provided, existing behavior is preserved (no regression)
- [x] T045 Run Phase 4 tests (T039-T040) — all pass

**Checkpoint**: FR-014 (icon picker always available for override) satisfied.

---

## Phase 5: Add-Item Flow Integration — FR-006

**Purpose**: Wire the resolver into the add-item flow so pre-selection happens before the picker opens.

### Tests for Phase 5

> **Write these tests FIRST, ensure they FAIL before implementation**

- [x] T046 Write test: add-item flow calls `resolveName()` with the typed description — integration test with store mock — `foodLookup.test.ts`
- [x] T047 Write test: when user overrides pre-selection, the item is saved with the overridden values — `foodLookup.test.ts`

### Implementation for Phase 5

- [x] T048 In ListDetailScreen's "add item" handler, call `resolveName(description, lang, foodNameIndex)` before opening EditModal
- [x] T049 Pass the `ResolutionResult.foodType` and `ResolutionResult.icon` as `initialFoodType` and `initialIcon` to EditModal
- [x] T050 User override is handled naturally — item saves whatever values the user chooses in the modal
- [x] T051 Run Phase 5 tests (T046-T047) — all pass

**Checkpoint**: FR-006 (override saved back) satisfied.

---

## Phase 6: Integration & Polish

**Purpose**: Final verification, full test suite, docs.

- [x] T052 Run full test suite: `npm test` — all tests pass (244 tests, 19 suites)
- [x] T053 Run TypeScript: `npx tsc --noEmit` — clean
- [x] T054 Run coverage: `npm run test:coverage` — threshold met (94.81% useStore, 75%+ overall)
- [x] T055 Run docs build: `npm run docs:build` — clean
- [x] T056 Update `CHANGELOG.md` with spec 002 entry
- [ ] T057 Commit all changes to branch — **WAITING ON USER APPROVAL**

**Checkpoint**: Full verification gates pass, branch ready for PR.

---

## Dependencies & Execution Order

```
Phase 1 (Static tables)       ─→ no deps
Phase 2 (Learned index)       ─→ no deps
     │
     └─→ Phase 3 (Resolver)   ─→ needs Phase 1 + 2
              │
              └─→ Phase 4 (EditModal) ─→ needs Phase 3
                       │
                       └─→ Phase 5 (Add flow) ─→ needs Phase 3 + 4
                                │
                                └─→ Phase 6 (Integration) ─→ needs all
```

### Parallel Opportunities

- T001/T002: EN and DE lookup count tests — `[P]`
- T003/T004: EN and DE entry validation — `[P]`
- T005/T006: Regex positive and negative tests — `[P]`
- T008/T009: EN and DE lookup derivation — `[P]`
- T012-T016: All Phase 2 tests — `[P]`
- T021-T030: Resolution chain tests — `[P]` (different assertions)

### TDD Ordering

Within each phase, test tasks MUST be written and FAIL before their corresponding implementation tasks.

### Test Count

| Phase | Tests |
|-------|-------|
| Phase 1 (static tables) | 6 (T001-T006) |
| Phase 2 (learned index) | 5 (T012-T016) |
| Phase 3 (resolution chain) | 10 (T021-T030) |
| Phase 4 (EditModal) | 2 (T039-T040) |
| Phase 5 (add flow) | 2 (T046-T047) |
| Phase 6 (integration) | 5 (T052-T056) |
| **Total** | **30 tests** |
