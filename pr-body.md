## Fix Streak Week 30 — 8 fixes, all gates green

Closes #34, #35, #36, #37, #38, #46

### Changes

1. **Auto-suggest dropdown contrast** — suggestion text/labels/container/rows use theme colors
2. **Herbs & Spices lookup (#46)** — 60 EN + 35 DE regex patterns for common Kräuter und Gewürze
3. **Compact view search filter (#34)** — search now filters items in compact view
4. **"No results" empty state** — all 3 views show search-aware message
5. **Unthemed text color sweep** — SettingsModal + SuggestionDialog text now themed
6. **Category sort by default (#35)** — `sortByCategory` defaults to `true`
7. **Missing category picker entries (#36, #37)** — Frozen, Bakery, Deli, International, Snacks
8. **Convenience & Snacks data (#36, #37)** — 12 convenience + 10 snack items, 9 reclassifications, 29 new regex patterns

### Verification
- `tsc --noEmit` — zero errors
- `jest` — 273/273 tests passing
