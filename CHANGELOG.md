## v0.19.6 — 2026-08-22

### Changed
- Consolidated Dependabot updates for React and test utilities.

## v0.19.5 — 2026-08-21

### Changed
- Improved UX when editing or adding items: picking an icon now highlights the matching food type and category (and vice versa) without altering the user's explicit selections.

## v0.19.3 — 2026-08-14

### Changed
- Updated release strategy documentation to reflect the new workflow: single `main` branch with automated builds triggered by semantic tags (`v*.*.*`).
- Documented secondary on-demand build workflows via PR labels and comments.
- Updated `README.md` to reference `AGENTS.md` and contributors.

## v0.19.2 — 2026-08-13

### Added
- Added a GitHub Actions workflow (`eas-build-ondemand.yml`) to run EAS builds (preview, dev, production, and OTA update) directly from PR labels or slash commands (`/build-preview`, etc.).
- Documented the new on-demand workflow in `docs/release/workflow.md`.

## v0.19.0 — 2026-08-15

### Added
- Separated food and non-food icons in the icon picker.
- Implemented visual dimming for irrelevant icons based on the selected food type or category.

### Changed
- Reordered EditModal fields to Description -> Amount -> Food Type -> Icon Picker -> Category.

## v0.17.0 — 2026-08-09

### Refactor
- Reduced the shopping icons to a curated selection based on classic food aisles (Produce, Cooled/Dairy, Meat, Staple/Grains, Frozen, Snacks, Beverages, Non-Food).
- Selecting an icon automatically selects its associated food type for improved tracking and efficiency.

# Changelog

## v0.18.0 — 2026-08-12

### Workflow Refactor & AI Instructions
- **Release Triggers:** Deprecated the `release` branch. EAS builds are now triggered dynamically by semantic tags (`v*.*.*`) or via manual workflow dispatch dropdown.
- **Build Semantics:** Tags ending in `-dev` trigger `development` profile; tags ending in `-prod` trigger `production`; standard tags run `preview`.
- **AI Tooling:** Added `AGENTS.md` and updated `.codewhale/instructions.md` to reflect new release rules and project instructions.

## v0.16.0 — 2026-07-26

### Fix Streak Week 30 (PR #48)
- **8 issues addressed** across the board, full suite green (273 tests)
- **Auto-suggest dropdown contrast** — suggestion text, labels, container, rows now use theme colors
  (Fixes dark-on-dark text in the "recently bought" preview overlay)
- **Herbs & Spices lookup** — 60 EN + 35 DE regex patterns for common Kräuter und Gewürze
  (basil, oregano, thyme, rosemary, sage, dill, parsley, garlic, cumin, nutmeg, etc.)
  Fixes #46
- **Compact view search filter** — typing in search now visually filters items in the compact view
  instead of showing unfiltered data (Fixes #34)
- **"No results" empty state** — all 3 views (compact, category, full draggable) show a
  search-aware "No results for 'query'" message when no items match
- **Unthemed text color sweep** — SettingsModal title, row labels, section labels, theme descriptions,
  and SuggestionDialog title now use theme colors instead of system defaults
- **Category sort by default** — `sortByCategory` now defaults to `true`, so items are grouped by
  shopping category out of the box (Fixes #35)
- **Missing category picker entries** — Frozen, Bakery, Deli, International, Snacks added to
  the manual category picker. `.codewhale/state/` gitignored (Fixes #36, #37)
- **Convenience & Snacks data** — 12 convenience items (Canned Soup, Instant Noodles, TV Dinner,
  Fish Sticks, etc.) + 10 new snack items (Gummy Bears, Licorice, Potato Chips, etc.) in lookup.
  9 items reclassified from `grain`/`dairy`/`fruit` to proper `snacks` type (Chocolate, Cookies,
  Candy, Chips, Granola Bar, Ice Cream, Popcorn, Protein Bar, Dark Chocolate, Dried Mango).
  7 EN + 22 DE regex patterns for auto-classification (Fixes #36, #37)

## v0.15.0 — 2026-07-18

### Bugfix Cluster + Food Type System Redesign (PR #39)
- **6 issues closed**: #33 (input contrast), #34 (debounce race), #35 (category sort),
  #36 (convenience food), #37 (snacks), #38 (picker order)
- **14-type food system** — healthy-first sort: vegetable → fruit → legume → grain →
  meat → seafood → egg → dairy → fat → convenience → snacks → beverage →
  supplement → non_food
- **4 new shopping categories**: Bakery, Deli, International, Snacks (24 total)
- **Input text color** — TextInput now uses theme textPrimary, readable on all themes
- **Debounce race** — `.cancel()` method on debounce utility, called on submit
- **Category sort** — items within category groups sorted by food type order
  (fresh → refrigerated → dry goods → treats → drinks → other), then alphabetically
- **German regex** — `brot`→grain, `nudeln/reis`→grain, `fisch`→seafood, `milch`→dairy
- **Diet profiles** — all 7 updated to 14-type system
- **268 tests** — all passing, TypeScript clean

## v0.14.0 — 2026-07-09

### CI & Release Infrastructure
- **EAS build pipeline** — CI fixes for build URL extraction, jq array indexing,
  pull-requests:write permission for bot PR comments
- **Release branch protocol** — non-negotiable marker branch rules documented
- **German plural recognition** — `germanPluralVariants()` for -el→-eln, -e→-en, -er→-ern
- **Bug fixes**: #19 (Kartoffeln), #20 (category auto-sync), #21 (sort by category),
  #24 (AddItemBar keyboard overlap)

## v0.13.0 — 2026-06-29

### Spec 002 — Name-Based Food Type Pre-Selection (fully implemented)
- **Static lookup tables** — 379 EN + 379 DE entries derived from testData pool (FR-007, FR-008, FR-009)
- **German regex patterns** — 10 suffix patterns (käse, milch, brot, fleisch, wurst, nudeln, saft, wasser, öl, salat) for compound word matching (FR-010)
- **Learned name index** — `rebuildNameIndex()` scans all items at boot, builds in-memory Map, skips null foodType entries. No separate storage (FR-005, FR-013)
- **5-layer resolution chain** — learned → static exact → static regex → cross-language fallback → none. All offline, all synchronous (FR-001, FR-002, FR-003, FR-011, FR-012, FR-015)
- **EditModal pre-selection** — `initialFoodType`/`initialIcon`/`initialDescription` props for new-item flow with override (FR-014)
- **Add-item flow** — `resolveName()` called before opening EditModal, pre-selects food type and icon (FR-006)
- **32 new tests** — foodLookup.test.ts (22) + modals.test.tsx (2) + screens.test.tsx (1 updated) passing

## v0.12.0 — 2026-06-29

### CI & Release Infrastructure
- **Release branch** — `release` branch triggers EAS preview builds via `eas-build.yml` workflow
- **CI coverage threshold** — raised from 15% to 70% lines / 60% branches / 55% functions / 70% statements
- **EAS profiles** — `image: latest` added to all build profiles
- **Release docs** — `docs/release/workflow.md` documents branch strategy, dev client, and store matrix

### Test Coverage
- **Component tests** — 9 component files covered with smoke + interaction tests
- **User-story tests** — diet change, language switch, clear data, demo/test data flows, purchase toggle, diet warnings
- **Utility tests** — debounce, uuid (including crypto.randomUUID fallback), i18n
- **Screen tests** — HomeScreen and ListDetailScreen rendering and interactions
- Coverage: **22.64% → 75% lines** (user-facing stories, not coverage-filling)

## v0.18.1 — 2025-02-15

### Fixed
- Fixed version mismatches in expo dependencies (react-native-screens, expo, expo-dev-client, expo-splash-screen).

### Changed
- Replaced per-food icons with exactly 12 high-level shopping category icons (Electronics, DIY, Pets, Gardening, etc.) up to a hard limit of 30 icons to avoid UI overload.

## v0.11.0 — 2026-06-28

### Performance
- **Compact default view** — loads only the last 50 items (TO SHOP + BOUGHT) on list entry, "View all" toggle for full list with drag-to-reorder (no lag with 5,000 items)
- **Diet warnings** only compute for active items, not purchased history
- **Scrolling fix** — DraggableFlatList no longer nested inside ScrollView (nested list no longer clips)

### Icon Cleanup
- All 12+ invalid MaterialCommunityIcons names fixed across `testData.ts` and `demoData.ts`
- Food-specific icons added to icon picker grid (cheese, bread, meat, fish, fruit, veg, legume, bakery, grain)
- Selected icon now shows accent border in picker

### Demo Data
- 3 new bilingual lists: Pharmacy & Health, Household & Cleaning, Pet Supplies (5 items each)
- Demo data now spans 5 lists across 3 additional categories

### Dev Tools
- `generateExtremeData(totalItems)` store action with **__DEV__** buttons for 500 / 5,000 item stress tests
- Settings modal consolidated to HomeScreen only (removed from ListDetailScreen)

## v0.10.0 — 2026-06-28

### Spec 003 — Demo Data & Test Generator (fully implemented)
- **Bilingual demo data** — expanded to 18 items across 2 lists (FR-001, FR-002, FR-003)
- **200-item grocery pool** — `src/constants/testData.ts` with 100 top-tier + 100+ long-tail items (FR-004, FR-005, FR-009)
- **Statistical test list generator** — `generateTestLists()` with weighted tier selection, configurable params, no duplicates (FR-006, FR-007, FR-008, FR-010, FR-011)
- **Store integration** — `generateTestData()` Zustand action (FR-012)
- **`__DEV__`-gated Settings button** — "Generate Test Data" in Settings modal, visible in dev builds only
- **29 new tests** — `demoData.test.ts` (11 tests), `testData.test.ts` (18 tests); 111 total, all passing
- **i18n** — `settings.generateTestData`, `settings.testDataGenerated` in EN/DE

### Spec 004 — Build Pipeline (implemented)
- EAS project linked, `eas.json` with preview/production profiles
- Build script with tsc + test gates (`scripts/build-android.sh`)
- Config validation (`scripts/test-eas-config.sh`)
- Config switcher for Expo Go vs APK (`scripts/switch-config.sh`)
- SDK 56 upgrade (Expo 56, RN 0.85.3, jest-expo 56, all tests passing)
- First APK built and installed on device

### Spec 005 — Data Backup (spec only)
- Specification written for export/import of all user data

### Spec 006 — Public Release (spec only)
- Specification written for GitHub Releases, F-Droid, IzzyOnDroid path

### Other
- Theme system redesign: Solarized-style 5-theme palette, live switching, WCAG contrast
- AsynchStorage schema migration system with 9 tests
- Splash: dark background (#121216) via expo-splash-screen plugin
- Dependency cleanup: remove duplicates, pin SDK 56 versions
- Build script updated with quota check, clean install, upgrade-sdk commands

---

## v0.9.2 — 2026-06-22

### Specs
- **004-build-pipeline** — spec, research, data model, and implementation plan for EAS Build Android deployment pipeline (Expo SDK 54, two build profiles, CI gates, first APK)
- **005-data-backup** — specification for export/import of all user data (lists, items, settings, learned name→food type mappings) with share sheet and file picker integration

### Added
- **Bilingual demo data** — `src/constants/demoData.ts` now exports EN (`DEMO_LISTS_EN`/`DEMO_ITEMS_EN`) and DE (`DEMO_LISTS_DE`/`DEMO_ITEMS_DE`) sets
- **Language-aware demo loading** — `addDemoData()` reads current `lang` setting and loads matching language version; re-loading replaces old demo data with the new language's data
- **Food types + matching icons on all demo items** — 15 items across 2 lists with proper `foodType` and diet-aware icons (e.g., Bread→grain, Chicken→meat, Apples→fruit)
- **`getDemoData(lang)` helper** — exported from `demoData.ts` for programmatic language selection

### Changed
- **Demo item icons** — updated from generic (`food-variant`, `cart`) to food-type-matched icons (`carrot`, `cheese`, `bread-slice-outline`, `fruit-cherries`, etc.)
- **`addDemoData` store action** — replaces existing demo lists/items instead of skipping duplicates, enabling clean language switching

---

## v0.9.1 — 2026-06-21

### Added
- **Dietary Rules feature** (spec 001) — 7 diet profiles (keto, low-carb, slow-carb, vegetarian, vegan, gluten-free, paleo)
- **13 FoodType constants** — `src/constants/foodTypes.ts` with icons and i18n keys
- **Diet engine** — `src/utils/dietEngine.ts` — pure function `checkItem(diet, foodType)` with full test coverage
- **Diet picker** in SettingsModal — select active diet or "No Diet"
- **Language toggle** in SettingsModal — EN/DE switching
- **Food type tag** in EditModal — assign/change food type per item with icon chips
- **⚠ Warning badge** on ItemRow — red alert icon when item incompatible with active diet
- **SuggestionDialog** — tap warning badge to see alternatives
- **Diet header** in ListDetailScreen — shows active diet name and incompatible item count
- **i18n system** — `src/i18n/en.ts`, `src/i18n/de.ts`, `useTranslation()` hook with `{placeholder}` interpolation
- **Zustand store actions** — `setActiveDiet`, `setLang` with AsyncStorage persistence
- **32 new tests** — diet engine, food types, diet profiles, i18n, icon→foodType mapping
- **CI TypeScript check** — `npx tsc --noEmit` runs on push to main
- **`npm run typecheck`** script + auto-sync `npm version` script for `app.json`

### Changed
- **SettingsModal** — diet picker, language toggle; removed "Load Demo Data" button
- **EditModal** — food type selector added after category; `foodType` saved with item
- **ItemRow** — optional `showDietWarning` + `onDietWarningPress` props
- **Icon constants** — added `ICON_FOOD_TYPE_MAP` connecting icon names to food types
- **AsyncStorage** — migration-safe settings fallback with `activeDiet` + `lang` defaults
- **Zustand store** — `DEFAULT_SETTINGS` includes `activeDiet: null` and `lang: 'en'`
- **tsconfig.json** — excludes `src/__tests__` from `tsc` check
- **docs/plans/backlog.md** — pre-release checklist, next session tasks

### Fixed
- **TypeScript strict** — demo data items missing `foodType` field (added `foodType: null`)
- **Variable ordering** — `listItems` used before declaration in ListDetailScreen

---

## v0.9.0 — 2026-06-17

### Added
- **3-theme system**: Fixer's Notebook (dark noir), Stuffer Shack (paper/ink), Decker's Den (synth terminal)
- **Theme picker** in Settings modal with radio buttons
- **Settings accessible from HomeScreen** via gear icon in header
- **Inline qualifier editor**: tap qualifier text → edit directly in the row
- **54 shopping category icons** across 19 categories (groceries, pharmacy, OBI/DIY, clothing, electronics, pets, baby, etc.)
- **19 categories** for grouping items
- **Back button behavior**: Android back closes modals (Edit/Settings) before navigating away
- **Safe-area padding** on bottom input bar and EditModal (avoids Android nav bar overlap)

### Changed
- **Themes**: Replaced neon green cyberpunk with Shadowrun pen-and-paper noir palettes
- **Icons**: Replaced per-food icons (apple, carrot, fish) with high-level category icons (Groceries, Pharmacy, Home & DIY)
- **Header**: Replaced three-dot menu with gear icon; removed item count from list header
- **Delete button**: Moved from item row to EditModal
- **Search/add bar**: Merged into single input at bottom of screen
- **Layout**: Add/search input moved to bottom with safe-area padding

### Added
- **Dietary Rules spec** — `specs/001-dietary-rules/spec.md` with 5 user stories, 12 FRs, edge cases, success criteria
- **Dietary Feature Plan** — `docs/plans/dietary-feature-plan.md` — architecture overview, 6 phases, 7 diet profiles
- **Types: FoodType, DietProfile, DietRule** — 13 food types (meat, fish, egg, dairy, grain, sugar, fruit, veg, legume, fat, beverage, supplement, non_food)
- **ShoppingItem.foodType** — user-driven food classification via icon picker
- **AppSettings.activeDiet + lang** — diet selection and language (EN/DE) in config
- **arc42 architecture docs** — 12-split documentation under `docs/arc42/`, one file per section
- **VitePress docs site** — hero home, Mermaid diagrams, local search, nav+sidebar for arc42
- **Test suite** — 27 Jest tests (uuid, types, Zustand store), coverage via `jest --coverage`
- **GitHub Pages deploy workflow** — auto-builds VitePress docs + coverage on push to main
- **`coverage/` iframe page** — lcov report embedded in VitePress via iframe
- **`VERSION` file** — standalone version tracking at project root
- **`docs:dev` / `docs:build` / `docs:preview` / `docs:build:full`** scripts

### Changed
- **README** — rewritten with features, tech stack, project structure (license TBD)
- **package.json** — version pinned to 0.9.0; added vitepress, vue, mermaid, jest deps

### Fixed
- **SDK compatibility**: Downgraded to Expo SDK 54 for Play Store Expo Go compatibility
- **Keyboard disappearing**: `Pressable` wrapper forces `TextInput.focus()` on tap, bypassing gesture handler
- **Duplicate items**: Dedup logic — active items skip, bought items re-add, new items create
- **Demo data dedup**: `addDemoData()` now checks for existing IDs before adding
- **Qualifier visibility**: Fixed flex layout so qualifier always displays next to description
- **Back button in modals**: Added `onRequestClose` to `<Modal>` for native Android back handling
- **Qualifier editing**: Inline TextInput replaces tap-to-modal for qualifier changes
