# Changelog

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
