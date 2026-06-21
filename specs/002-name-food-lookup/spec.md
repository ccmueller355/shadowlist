# Feature Specification: Name-Based Food Type Pre-Selection

**Feature Branch**: `002-name-food-lookup`

**Created**: 2026-06-21

**Status**: Draft

**Input**: Extend the dietary rules feature with a name → food type lookup that pre-selects the icon and food type when a user types an item name. The system learns from past user choices without a separate cache — the existing items ARE the cache. EN + DE static lookup tables for common items, regex fallback for compounds. Resolution chain: learned (past items) → static lookup → no match (icon picker opens fresh). The icon picker always remains available to override.

---

## User Scenarios & Testing

### User Story 1 — Name types, icon pre-selected (Priority: P1)

A user types "Bread" into the add bar. Before the icon picker opens, the system looks up "bread" — finds it in the static lookup → pre-selects `grain` food type and `bread-slice-outline` icon. The user sees the icon picker already on the Grains tab with the bread icon highlighted. One tap to confirm.

**Why this priority**: This is the core UX flow — eliminates icon browsing for common items, makes add-item fast.

**Independent Test**: Open app → type "Bread" → icon picker opens on grain tab with bread icon pre-selected → tap confirm → item added with grain food type.

**Acceptance Scenarios**:

1. **Given** a user typing an item name that exists in the static lookup, **When** the icon picker opens, **Then** the matching food type tab is active and the matching icon is pre-selected
2. **Given** a user typing an item name not in any lookup, **When** the icon picker opens, **Then** it opens fresh with no pre-selection (current fallback behavior)
3. **Given** a user typing an item name matched by regex (e.g. "Schnittlauchkäse" → `/käse$/i`), **When** the icon picker opens, **Then** the matching food type `dairy` is pre-selected

---

### User Story 2 — Learned name persists across sessions (Priority: P1)

A user adds "Spätzle" for the first time. It's not in the static lookup. They pick `grain` + noodles icon manually. Next time they type "Spätzle", the system uses their past choice — pre-selects grain with the noodle icon. The app gets smarter with use.

**Why this priority**: Without learning, the static lookup is static. Learning closes the loop.

**Independent Test**: Day 1 → add "Spätzle" → pick grain manually → close app. Day 2 → open app → type "Spätzle" → icon pre-selected from yesterday's choice.

**Acceptance Scenarios**:

1. **Given** a user has previously added an item with a specific food type and icon, **When** they type the same normalized name again, **Then** the past food type and icon are pre-selected
2. **Given** a user previously added "Milk" as `dairy`, **When** they later override it to `beverage` in EditModal, **Then** the next "Milk" add pre-selects `beverage`
3. **Given** a user deletes the last item with a given name, **When** they type that name again, **Then** the lookup falls back to static (item no longer contributes to the learned index)

---

### User Story 3 — Bilingual static lookup (Priority: P2)

A German user types "Brot". The DE lookup matches → grain pre-selected. They switch to English → type "Bread" → EN lookup matches → grain pre-selected. A user types an English item while language is German → EN lookup checked as cross-language fallback.

**Why this priority**: EN+DE are launch languages. Both need parity in the lookup.

**Independent Test**: Settings → DE → type "Brot" → grain pre-selected. Settings → EN → type "Bread" → grain pre-selected. Settings → DE → type "Milk" → EN fallback → dairy pre-selected.

**Acceptance Scenarios**:

1. **Given** language set to DE, **When** user types a German item name in the static lookup, **Then** food type and icon are pre-selected from the DE table
2. **Given** language set to EN, **When** user types an English item name in the static lookup, **Then** food type and icon are pre-selected from the EN table
3. **Given** an item name not found in the current language's lookup, **When** the other language's lookup has a match, **Then** the match is used as cross-language fallback

---

### User Story 4 — Regex catches compounds (Priority: P2)

A German user types "Hüttenkäse". The regex pattern `/käse$/i` matches → pre-selects `dairy`. A user types "Sojamilch" → `/milch$/i` matches → pre-selects `beverage` (user may override to `dairy` — their choice persists on the item).

**Why this priority**: German compound words multiply vocabulary. A handful of regex patterns (käse, milch, brot, fleisch, wurst) catch hundreds of variants.

**Independent Test**: Type "Hüttenkäse" → regex match on käse → dairy pre-selected. Type "Apfelsaft" → no match → opens fresh.

**Acceptance Scenarios**:

1. **Given** a German compound word ending in a known suffix with an attached regex rule, **When** the exact keyword lookup misses, **Then** the regex rule fires and suggests the mapped food type
2. **Given** a name matched by both exact keyword and regex, **When** resolved, **Then** exact keyword match wins (more specific overrides pattern)

---

### Edge Cases

- **No match**: Item name not found in learned index, static lookup, or regex → icon picker opens fresh with no pre-selection (existing behavior).
- **Multiple static matches**: First match wins, ordered by specificity — exact keyword > keyword list match > regex pattern match.
- **Learned vs static conflict**: Past item choice always wins — the user's explicit override is more specific than any shipped default.
- **Untagged item in learned index**: If the matching past item has `foodType: null`, skip the learned layer and fall through to static lookup.
- **Normalization**: Lowercase + trim, preserve numbers, preserve German umlauts. "2% Milk" → "2% milk". "Brötchen" → "brötchen". No decomposition of ß→ss or ü→ue.
- **Bought items**: Items in completed/purchased lists still contribute to the learned index — buying doesn't erase the mapping.
- **Deleted items**: When the last item with a given name is permanently deleted, its name mapping is removed from the index. Next add falls through to static lookup.
- **Large item base**: Index rebuild at startup scans all items across all lists. At ~2000 total items this is a synchronous Map build under 50ms — no async needed.
- **Cross-language tie**: If both EN and DE static lookups produce matches for the same normalized input (e.g. "mozzarella" exists in both), current language's match wins. The other language's match is only used as fallback when the current language has no match at all (FR-011).

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST pre-select a food type and icon based on the typed item name before the icon picker opens.
- **FR-002**: System MUST use a three-layer resolution chain: (1) learned entries from past items, (2) static lookup table, (3) no match → no pre-selection.
- **FR-003**: Resolution chain MUST NOT require network — all lookups are local, fully offline.
- **FR-004**: System MUST normalize item names for lookup (lowercase, trim, preserve numbers and umlauts).
- **FR-005**: The learned entries index MUST be derived from existing saved items at startup — no separate cache, no duplicate storage.
- **FR-006**: When a user overrides a pre-selected food type or icon, the override MUST be saved back to the item — and the index MUST reflect the latest choice on next recall.
- **FR-007**: Static lookup MUST include English entries (~200 common items) covering all 13 food types.
- **FR-008**: Static lookup MUST include German entries (~200 common items) covering all 13 food types.
- **FR-009**: Static lookup entries MUST include a `FoodType`, a suggested MaterialCommunityIcons icon name, and match patterns (keyword list + optional regex).
- **FR-010**: Regex patterns in the static lookup MUST be scoped per language and MUST NOT produce excessive false positives (use word-boundary or conservative patterns).
- **FR-011**: Current language's lookup is checked first; the other language's lookup is checked as a cross-language fallback on miss.
- **FR-012**: Within the same language lookup, exact keyword matches MUST be resolved before regex pattern matches.
- **FR-013**: System MUST rebuild the in-memory name index on every app boot by scanning all lists and their items.
- **FR-014**: The icon picker MUST always remain available for override — pre-selection is a suggestion, never a silent auto-confirm.
- **FR-015**: When both EN and DE static lookups return different results for the same normalized input, the current language's match takes priority. The other language is only consulted as a fallback when the current language has no match (see FR-011).

### Key Entities

- **FoodLookupEntry**: Static definition in `src/constants/foodLookup.ts`. Attributes — `keywords: string[]`, `regex?: RegExp`, `suggestedFoodType: FoodType`, `suggestedIcon: string`, `lang: 'en' | 'de'`.
- **FoodNameIndex**: In-memory `Map<string, { foodType: FoodType; icon: string }>` built at startup from all saved items. Key = normalized name, value = the most recent food type/icon assigned by the user.
- **ResolutionResult**: Outcome of the 3-layer chain — `{ foodType?: FoodType; icon?: string; source: 'learned' | 'static' | 'regex' | 'none' }`.
- **Static Lookup Table**: Versioned structure shipped with the app. Top-level object with `version: string`, `entries: { en: FoodLookupEntry[], de: FoodLookupEntry[] }`. Version field allows future expansion without breaking existing caches.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: 80% of common item additions (milk, bread, eggs, chicken, butter, apples, rice, pasta) pre-select the correct food type on first use without user override.
- **SC-002**: After 3 uses of an uncommon item that required manual icon picker selection, the name is learned and pre-selects on the 4th use.
- **SC-003**: No observable delay (>100ms) between typing the item name and the icon picker opening — all lookups are synchronous Map/array operations.
- **SC-004**: Static lookup covers at least 200 EN items and 200 DE items at launch.
- **SC-005**: Zero network requests triggered by the name lookup feature (verified by code review).
- **SC-006**: All existing tests + new foodLookup tests pass with TypeScript strict mode (`npx tsc --noEmit`).
- **SC-007**: German compound regex rules cover at least 5 suffix patterns (käse, milch, brot, fleisch, wurst) at launch.

## Assumptions

- Items database per user stays under ~2000 total items across all lists (realistic for household use over years).
- 200 EN + 200 DE static entries cover ~70% of daily shopping items for most target users.
- Users type item names that are real food/drink/household items (lookup maps grocery items, not random text).
- The icon picker is always displayed even when a match is found — the user can always override the suggestion.
- Normalization can safely lowercase without losing meaning (no proper nouns in food names that would break from lowercasing).
- Regex patterns are curated manually and are conservative — designed to avoid false positives over maximizing coverage.
- Export/Import of learned mappings is explicitly out of scope for v1.0 (deferred to v1.1 backlog).
- Cross-language fallback (FR-011) is a reasonable default; behavior can be tuned after user testing.
