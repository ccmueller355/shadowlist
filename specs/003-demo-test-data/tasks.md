# Tasks: Bilingual Demo Data & Statistical Test Data Generator

**Input**: Plan from `specs/003-demo-test-data/plan.md`

**Prerequisites**: spec.md, plan.md, research.md, data-model.md

**Tests**: Test tasks are included and MUST be written and FAIL before implementation (TDD discipline).

**Organization**: Tasks grouped by phase with user story alignment. Parallelizable tasks marked `[P]`.

---

## Phase 1: Demo Data Polish — FR-001, FR-002, FR-003

**Purpose**: Expand existing demo data to meet spec minimums (15+ items, 2+ lists, bilingual, diet-engine-compatible).

### Tests for Phase 1

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T001 **[P]** Write test: demo data has 15+ items across all lists — `demoData.test.ts`
- [ ] T002 **[P]** Write test: demo data has 2+ lists — `demoData.test.ts`
- [ ] T003 **[P]** Write test: every demo item has non-null foodType — `demoData.test.ts`
- [ ] T004 **[P]** Write test: demo data includes both EN and DE names — `demoData.test.ts`
- [ ] T005 **[P]** Write test: `getDemoData('de')` returns German names — `demoData.test.ts`
- [ ] T006 **[P]** Write test: `addDemoData()` runs without error — `demoData.test.ts` (integration, requires store mock)

### Implementation for Phase 1

- [ ] T007 **[P]** Create 2nd English demo list (`DEMO_LIST_2_EN`) in `demoData.ts` with 5+ new items (mix of purchased/unpurchased, various food types, at least 1 diet-incompatible item per common diet)
- [ ] T008 **[P]** Create 2nd German demo list (`DEMO_LIST_2_DE`) in `demoData.ts` with matching translated items
- [ ] T009 Update `getDemoData()` to return both lists in the dataset
- [ ] T010 Run Phase 1 tests (T001-T006) — all pass

**Checkpoint**: FR-001 (15+ items, 2+ lists), FR-002 (bilingual), FR-003 (loadable via existing flow) all satisfied.

---

## Phase 2: Item Pool — FR-004, FR-005, FR-009

**Purpose**: Build the 200-item bilingual grocery pool with tiered popularity distribution.

### Tests for Phase 2

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 **[P]** Write test: `TIER_1_ITEMS` has exactly 100 items — `testData.test.ts`
- [ ] T012 **[P]** Write test: `TIER_2_ITEMS` has at least 100 items — `testData.test.ts`
- [ ] T013 **[P]** Write test: all items have non-null `foodType` — `testData.test.ts`
- [ ] T014 **[P]** Write test: all items have non-empty `icon` — `testData.test.ts`
- [ ] T015 **[P]** Write test: all items have valid `category` (exists in CATEGORIES from icons.ts) — `testData.test.ts`
- [ ] T016 Write test: all tier-1 items have `tier: 1` — `testData.test.ts`
- [ ] T017 Write test: all tier-2 items have `tier: 2` — `testData.test.ts`
- [ ] T018 Write test: EN and DE names are non-empty for all items — `testData.test.ts`

### Implementation for Phase 2

- [ ] T019 Create `src/constants/testData.ts` with TestItem interface
- [ ] T020 **[P]** Define `TIER_1_ITEMS` — 100 top-frequency grocery items (bread, milk, eggs, chicken, apples, bananas, coffee, rice, pasta, onions, tomatoes, potatoes, cheese, butter, yogurt, lettuce, cucumbers, carrots, eggs, salmon, tuna, olive oil, salt, pepper, garlic, lemons, oranges, strawberries, blueberries, mushrooms, zucchini, bell peppers, broccoli, cauliflower, spinach, celery, sweet potatoes, beans, lentils, oats, honey, sugar, flour, baking soda, vanilla, cinnamon, basil, oregano, thyme, rosemary, cocoa, chocolate, tea, orange juice, applesauce, peanut butter, jam, corn, peas, green beans, avocado, mango, pineapple, watermelon, grapes, kiwi, peaches, plums, cherries, raspberries, blackberries, coconut, almonds, walnuts, cashews, sunflower seeds, quinoa, barley, couscous, tortillas, bagels, croissants, muffins, cereal, oatmeal, granola, crackers, pretzels, popcorn, dark chocolate, milk chocolate, almond milk, oat milk, soy sauce, vinegar, mustard, ketchup, mayonnaise, hot sauce)
- [ ] T021 **[P]** Define `TIER_2_ITEMS` — 100+ long-tail items (artichoke, arugula, asparagus, beets, brussels sprouts, cabbage, chard, collard greens, endive, fennel, ginger, jicama, kale, leeks, okra, parsnips, radicchio, radishes, rutabaga, shallots, turnips, watercress, yams, bok choy, edamame, fava beans, garbanzo beans, kidney beans, pinto beans, black-eyed peas, mung beans, tahini, miso, tempeh, tofu, seitan, nutritional yeast, chia seeds, flax seeds, hemp seeds, poppy seeds, sesame seeds, pumpkin seeds, pine nuts, macadamia nuts, pecans, pistachios, dried apricots, dried mango, dates, figs, prunes, raisins, cranberries, goji berries, acai powder, spirulina, matcha, chai, kombucha, cider, ginger beer, tonic water, seltzer, coconut water, electrolyte drink, protein powder, collagen, bone broth, sardines, anchovies, mackerel, cod, halibut, trout, shrimp, scallops, mussels, clams, crab, lobster, duck, lamb, veal, pork chops, pork belly, bacon, sausage, salami, prosciutto, pepperoni, pate, liverwurst, corned beef, pastrami, brisket, ribs, ground beef, ground turkey, ground pork, tofu, tempeh, halloumi, feta, goat cheese, brie, camembert, gouda, edam, havarti, swiss cheese, provolone, mozzarella, ricotta, mascarpone, creme fraiche, sour cream, cottage cheese, cream cheese, clotted cream, condensed milk, evaporated milk, coconut milk, heavy cream, half-and-half)
- [ ] T022 Run Phase 2 tests (T011-T018) — all pass

**Checkpoint**: 200+ items across 2 tiers, all fully typed with foodType, icon, category.

---

## Phase 3: Generator Function — FR-006, FR-007, FR-008, FR-010, FR-011

**Purpose**: Implement the statistical test list generator that draws from the pool with weighted tier selection.

### Tests for Phase 3

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T023 **[P]** Write test: `generateTestLists()` returns `listCount` lists — `testData.test.ts`
- [ ] T024 **[P]** Write test: each generated list has 8-25 items — `testData.test.ts`
- [ ] T025 Write test: no duplicate items within a single generated list — `testData.test.ts`
- [ ] T026 Write test: every generated item has non-null foodType — `testData.test.ts`
- [ ] T027 Write test: `generateTestLists()` accepts custom params (listCount=2, minItems=5, maxItems=10, highTierWeight=90) — `testData.test.ts`
- [ ] T028 Write test: over 50 generated lists, tier-1 items appear in ≥60% of lists (statistical) — `testData.test.ts`
- [ ] T029 Write test: over 50 generated lists, tier-2 items appear in ≤30% of lists (statistical) — `testData.test.ts`
- [ ] T030 Write test: `generateTestLists()` completes in under 50ms for default params — `testData.test.ts` (performance)

### Implementation for Phase 3

- [ ] T031 Implement `generateTestLists(params?: Partial<TestListParams>): TestDataResult` in `testData.ts`
- [ ] T032 Algorithm: draw `listSize` items per list with `highTierWeight`% chance of tier-1 pick, no duplicates within list
- [ ] T033 Generated items get unique IDs via `generateId()` from existing uuid utility
- [ ] T034 Generated lists get sequential names ("Test List 1", "Test List 2", etc.) with timestamp
- [ ] T035 Run Phase 3 tests (T023-T030) — all pass

**Checkpoint**: Generator function works, statistically biased toward tier-1 items, configurable params.

---

## Phase 4: Store Integration — FR-012 (backend)

**Purpose**: Add `generateTestData()` action to Zustand store that calls the generator and injects results.

### Tests for Phase 4

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T036 Write test: `generateTestData()` store action exists and is callable — `testData.test.ts` (store mock)
- [ ] T037 Write test: after `generateTestData()`, store lists count increases by `listCount` — `testData.test.ts`

### Implementation for Phase 4

- [ ] T038 Add `generateTestData()` action to Zustand useStore — import generator, call `addList()` + `addItem()` for each generated item
- [ ] T039 Action returns the number of generated lists for toast feedback
- [ ] T040 Run Phase 4 tests (T036-T037) — all pass

**Checkpoint**: Store action generates and persists test data.

---

## Phase 5: Settings UI — FR-012 (frontend)

**Purpose**: Add "Generate Test Data" button in SettingsModal with i18n support.

### Tests for Phase 5

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T041 Write test: `settings.generateTestData` key exists in EN translations — `i18n.test.ts`
- [ ] T042 Write test: `settings.generateTestData` key exists in DE translations — `i18n.test.ts`

### Implementation for Phase 5

- [ ] T043 **[P]** Add `settings.generateTestData` to `src/i18n/en.ts`
- [ ] T044 **[P]** Add `settings.testDataGenerated` to `src/i18n/en.ts` (toast message: "{n} test lists generated")
- [ ] T045 **[P]** Add `settings.generateTestData` to `src/i18n/de.ts` ("Testdaten generieren")
- [ ] T046 **[P]** Add `settings.testDataGenerated` to `src/i18n/de.ts` ("{n} Testlisten erstellt")
- [ ] T047 Add "Generate Test Data" button in `SettingsModal.tsx` near existing "Load Demo Data" — calls store action, shows toast on completion
- [ ] T048 Run Phase 5 tests (T041-T042) — all pass

**Checkpoint**: Settings UI allows one-tap test data generation with bilingual labels and toast feedback.

---

## Phase 6: Integration & Polish

**Purpose**: Final test run, full verification, docs update.

- [ ] T049 Run full test suite: `npm test` — all 82 + 15 new = 97 tests pass
- [ ] T050 Run TypeScript: `npx tsc --noEmit` — clean
- [ ] T051 Run coverage: `npm run test:coverage` — verify threshold (70% lines)
- [ ] T052 Run docs build: `npm run docs:build` — clean
- [ ] T053 Update `CHANGELOG.md` with v0.10.1 entry covering spec 003 implementation
- [ ] T054 Commit all changes to branch

**Checkpoint**: Full verification gates pass, CHANGELOG updated, branch ready for PR.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Demo Polish)      ─→ no deps, starts first (modifies existing demoData.ts)
     │
Phase 2 (Item Pool)        ─→ no deps (new file testData.ts)
     │
     ├─→ Phase 3 (Generator) ─→ needs Phase 2 (uses pool)
     │
     └─→ ... continues ...
     │
     ▼
Phase 4 (Store action)     ─→ needs Phase 3 (calls generator)
     │
     ▼
Phase 5 (Settings UI)      ─→ needs Phase 4 (calls store action)
     │
     ▼
Phase 6 (Integration)      ─→ needs all phases done
```

### Parallel Opportunities

- T001-T006: All Phase 1 tests — `[P]`, independent test assertions
- T007/T008: EN and DE 2nd list creation — `[P]`, independent files
- T011-T018: All Phase 2 tests — `[P]`, independent assertions
- T020/T021: TIER_1 and TIER_2 data entry — `[P]`, independent arrays
- T023/T024: Generator tests — `[P]`, different assertions
- T043/T044 vs T045/T046: EN and DE i18n — `[P]`, different files

### TDD Ordering

Within each phase, test tasks MUST be written and FAIL before their corresponding implementation tasks. This is non-negotiable.

### Test Count

| Phase | Tests |
|-------|-------|
| Phase 1 (demo data) | 6 (T001-T006) |
| Phase 2 (item pool) | 8 (T011-T018) |
| Phase 3 (generator) | 8 (T023-T030) |
| Phase 4 (store) | 2 (T036-T037) |
| Phase 5 (UI) | 2 (T041-T042) |
| Phase 6 (integration) | 5 (T049-T053) |
| **Total** | **31 tests** |
