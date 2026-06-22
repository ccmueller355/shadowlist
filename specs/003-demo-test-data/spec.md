# Feature Specification: Bilingual Demo Data & Statistical Test Data Generator

**Feature Branch**: `003-demo-test-data`

**Created**: 2026-06-22

**Status**: Draft

**Input**: User description: Enhance the shadowlist demo and test data with bilingual (EN/DE) support, proper food type assignments for diet warning visibility, and a statistical test data generator that produces realistic shopping lists from a pool of ~200 grocery items split into two popularity tiers.

## User Scenarios & Testing

### User Story 1 - Load Bilingual Demo Data and See Diet Warnings (Priority: P1)

A user opens the app, loads demo data, and immediately sees diet warning badges on incompatible items (e.g., Bread flagged as grain-incompatible when Keto is active). The demo data works in both English and German depending on the app language setting.

**Why this priority**: This is the onboarding path — demo data must be demonstrable in both languages with diet warnings lighting up immediately, no manual tagging required.

**Independent Test**: Open app fresh install → tap Load Demo Data → switch language to DE → see German list names and item descriptions → switch diet to Keto → see warning badges on grain/sugar/fruit items.

**Acceptance Scenarios**:

1. **Given** default EN language, **When** user loads demo data, **Then** list names and item descriptions appear in English
2. **Given** DE language selected, **When** user loads demo data, **Then** list names and item descriptions appear in German
3. **Given** a diet profile active, **When** demo data loads, **Then** incompatible items display warning badges
4. **Given** demo items with assigned food types, **When** user inspects an item in EditModal, **Then** the food type tag shows the correct type

---

### User Story 2 - Generate Statistical Test Lists (Priority: P1)

A developer or tester generates randomized shopping lists from a large pool of grocery items with realistic statistical distribution — common items appear frequently, rare items appear occasionally. Lists vary in size and composition each generation.

**Why this priority**: Test data must reflect real shopping behavior so screenshots and test scenarios look authentic. Manual generation of 200 items is impractical.

**Independent Test**: Call the generator to produce 5 lists → verify each list has 8-25 items → verify high-tier items appear more frequently than low-tier items over 50 generated lists.

**Acceptance Scenarios**:

1. **Given** the generator, **When** called with default params, **Then** it produces a list with 8-25 items
2. **Given** 50 generated lists, **When** counting item frequencies, **Then** top-tier items appear in at least 60% of lists
3. **Given** 50 generated lists, **When** counting item frequencies, **Then** low-tier items appear in no more than 30% of lists
4. **Given** the item pool, **When** inspecting any item, **Then** it has both `nameEn` and `nameDe`

---

### User Story 3 - One-Tap Test Data Generation in Settings (Priority: P2)

A user can generate a batch of randomized test lists directly from the app Settings, useful for stress-testing the UI, taking screenshots, or demonstrating the app with realistic data.

**Why this priority**: Makes the generator accessible without developer tools. Not P1 because the core value is the generator itself, not the UI entry point.

**Independent Test**: Open app → Settings → "Generate Test Lists" → see 3-5 new lists appear on HomeScreen → tap one → see items with proper icons, categories, and food types.

**Acceptance Scenarios**:

1. **Given** the Settings screen, **When** user taps "Generate Test Data", **Then** N new lists appear on HomeScreen
2. **Given** generated lists, **When** inspecting items, **Then** each item has an icon, category, and foodType assigned
3. **Given** generated lists, **When** user deletes them, **Then** only test-generated lists are removed (demo lists preserved)

---

### Edge Cases

- What happens when the user generates test data, then changes language? New items' descriptions match the current language (items have both EN and DE names stored, display depends on `lang` setting)
- What happens when the item pool is depleted? The generator draws with replacement — items can repeat across lists but not within the same list
- What happens when a user has 10+ lists already? The generator appends, doesn't replace. User can clear test data manually
- What happens with diet warnings on test data? Items have foodTypes assigned, so diet engine fires normally — test data is fully compatible with the diet feature

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide demo data with at least 15 items across 2 lists, each item having a `foodType` and matching icon assigned
- **FR-002**: Demo data MUST include both English and German list names and item descriptions
- **FR-003**: Demo data MUST be loadable via a one-tap action (existing "Load Demo Data" flow in Settings)
- **FR-004**: System MUST provide a pool of at least 200 grocery items with both English and German names
- **FR-005**: The item pool MUST be split into two tiers: "top 100" (high-frequency staples) and "long-tail 100" (items ranked ~100-1000 in purchase frequency)
- **FR-006**: System MUST provide a `generateTestLists()` function that produces randomized shopping lists from the item pool
- **FR-007**: Generated lists MUST contain 8-25 items each by default
- **FR-008**: High-tier items MUST appear with higher statistical frequency than low-tier items across multiple generated lists
- **FR-009**: Every item in the pool MUST have `foodType`, `icon`, and `category` assigned
- **FR-010**: Generated items MUST be fully compatible with the diet warning engine — no manual tagging needed after generation
- **FR-011**: Test data generator MUST accept parameters: `listCount` (number of lists), `minItems`, `maxItems`, `highTierWeight` (probability boost for top-100 items)
- **FR-012**: System SHOULD provide a Settings entry "Generate Test Data" that calls the generator and appends lists to the store

### Key Entities

- **DemoItem**: A hand-curated shopping item with EN/DE descriptions, assigned foodType, icon, and category. Lives in `demoData.ts`.
- **TestItem**: An entry in the statistical pool with `nameEn`, `nameDe`, `foodType`, `icon`, `category`, and `tier` (1 = top 100, 2 = long-tail). Lives in `testData.ts`.
- **TestListGenerator**: A pure function that draws from the TestItem pool with weighted random selection, producing `ShoppingItem[]` arrays suitable for injecting into the Zustand store.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Demo data loads in under 200ms and displays with correct food types in both EN and DE language modes
- **SC-002**: The item pool contains exactly 200+ unique items (100 top-tier, 100+ long-tail)
- **SC-003**: Over 50 generated lists, top-tier items appear in ≥60% of lists and long-tail items appear in ≤30% of lists
- **SC-004**: All 200 pool items have non-null `foodType`, `icon`, and `category` — zero untyped items
- **SC-005**: The `generateTestLists()` function runs in under 50ms for default params (5 lists)

## Assumptions

- The existing Zustand store actions (`addItem`, `addList`) are reused — the generator feeds data into existing store infrastructure
- Demo data loading replaces the current "Load Demo Data" button in SettingsModal (already exists, no new UI needed)
- Both demo and test data are generated client-side with no network calls — zero cloud dependency
- The `lang` field in AppSettings controls which language variant displays for bilingual items; items store both names at rest
- Test data generation is additive — it does not clear existing user or demo lists
- The icon assigned to each test item comes from the existing `SHOPPING_ICONS` pool or the `ICON_FOOD_TYPE_MAP` for food-type matches
- The generator does not persist generated lists to AsyncStorage automatically — user can save by normal app persistence flow
