# Changelog

## v0.9.2 — 2026-06-22

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
