# 9. Architecture Decisions

## DD-1: Zustand over React Context + useReducer

**Decision**: Use Zustand for all state management.

**Alternatives considered**:
- React Context + useReducer: Too much boilerplate for multi-slice state; re-render performance issues without memoization
- Redux Toolkit: Overkill for < 10 state slices; larger bundle

**Consequences**: Clean, minimal API. No provider needed. Selectors prevent unnecessary re-renders.

## DD-2: AsyncStorage over SQLite

**Decision**: Persist all data as JSON in AsyncStorage.

**Alternatives considered**:
- SQLite (expo-sqlite): Schema migrations, query overhead. Shopping lists rarely exceed 500 items — JSON is fast enough
- MMKV: Native module, not available in Expo Go

**Consequences**: No migration system needed. Risk of data corruption if JSON gets too large, but shopping data is inherently bounded.

## DD-3: Fire-and-forget persistence

**Decision**: Save to AsyncStorage after `set()`, not before. Do not await the save.

**Rationale**: The user's perception of speed is determined by the UI update, not the disk write. AsyncStorage writes complete in < 5ms on modern devices. If a write fails (extremely rare), the data loss is at most one action.

**Consequences**: Theoretically possible data loss on crash between `set()` and `save()`. In practice, this has never been observed. The tradeoff is worth the perceived snappiness.

## DD-4: Expo managed workflow

**Decision**: Use Expo managed workflow, not bare React Native.

**Rationale**: Faster development, Expo Go for testing, OTA updates via EAS, no native build toolchain to maintain.

**Consequences**: Limited to Expo-compatible native modules. `react-native-draggable-flatlist` is the most complex dependency and works in managed workflow.

## DD-5: DraggableFlatList for reordering

**Decision**: Use `react-native-draggable-flatlist` instead of custom gesture handler implementation.

**Rationale**: Drag-to-reorder is complex (gesture recognition, animation, scroll interaction). The library handles all of this correctly. It's the de facto standard for React Native.

**Consequences**: Dependency on `react-native-gesture-handler` and `react-native-reanimated`. Bundle size increase of ~150KB.

## DD-6: No i18n library (custom key-value maps instead)

**Decision**: Use a custom `useTranslation` hook with static key-value maps. Not react-intl, not i18next, not Polyglot.

**Alternatives considered**:
- **react-intl** (FormatJS): Full ICU message syntax, locale data loading. Overkill for 2 languages with ~50 strings each.
- **i18next**: Popular, but designed for web apps with dynamic loading. Extra bundle weight for an offline mobile app.
- **Hard-coded strings**: Simplest option, but blocks the EN+DE requirement from 001 spec.

**Rationale**: Two languages (EN+DE) at launch, roughly 50 UI strings per language. A custom hook over a plain key-value map is ~30 lines of code — less than any library's import overhead. No locale data, no plural rules, no ICU syntax needed. Zero network calls, fully offline. The `lang` field lives in `AppSettings` alongside `activeDiet`, persisted via the existing AsyncStorage layer.

Originally (pre-001 spec) strings were hard-coded English only. The 001 spec introduced EN+DE support. No external library was added — the custom hook approach keeps the bundle lean and avoids adding a dependency for what is essentially a dictionary lookup.

**Consequences**: 
- Two files: `src/i18n/en.ts` and `src/i18n/de.ts`
- One hook: `src/i18n/useTranslation.ts` — wraps the current language and returns a `t(key)` function
- Adding FR+ES later: add two new files, no architecture changes
- FR-010/FR-011 from 001 spec are satisfied without a library dependency

## DD-7: scancode-toolkit for license & snippet compliance

**Context**: The project relies heavily on AI agents (deepseek-v4-flash via CodeWhale) for code generation. This introduces a compliance risk: AI models may inadvertently reproduce open-source code patterns from their training data, potentially violating license terms of the original works. The 002 spec (name-based food type lookup) explicitly requires assurance that AI-generated code contains no copied OSS snippets.

On the dependency side, the app bundles 980+ npm packages (direct + transitive), and F-Droid requires all dependencies to be FOSS-compatible. A two-layer scan is needed: (1) dependency license compliance and (2) source code snippet detection.

**Investigated tools**:

| Tool | Type | Snippet scanning | Cost |
|------|------|:----------------:|:----:|
| **scancode-toolkit** (nexB) | CLI | ✅ File-level + partial matches | Free, open-source |
| **Fossology** (Linux Foundation) | Web UI + Docker | ✅ File-level + diff-based | Free, open-source |
| **Black Duck** (Synopsys) | SaaS | ✅ Full enterprise snippet matching | Enterprise-only, no free tier |
| **FOSSA** | SaaS + CLI | ❌ Dependencies only | Free for public repos |
| **license-checker** (npm) | CLI | ❌ Dependencies only | Free, open-source |

**Evaluation**:
- **Black Duck** was mentioned as a known brand, but investigation confirmed it has no free tier — enterprise licensing only. Rejected on cost.
- **Fossology** was positively known from the user's corporate environment (Linux Foundation, institutional standard). However, it runs as a Docker stack (web server + database + UI) — too heavy for a solo project where scans happen ad-hoc on a development machine. Rejected on operational overhead.
- **FOSSA** was discussed but found to be dependency-focused only — it doesn't scan source code for copied snippets. Insufficient for the AI codegen use case.
- **scancode-toolkit** won: CLI-native (`pip install`), 6,000+ license reference DB (LicenseDB), file-level snippet detection, actively maintained by nexB (v32.x, 10+ years). First scan completed in ~7 seconds over the entire `src/` directory.

The two free snippet scanners on the market are scancode-toolkit and Fossology. scancode won on CLI ergonomics and speed for a solo workflow.

**Decision**: Use **scancode-toolkit** (nexB) for source-level license + snippet scanning. Use **license-checker** (npm) for dependency-level license scanning. Not Fossology, not Black Duck.

**Consequences**:
- Dev environment requires `pip install scancode-toolkit` (one-time, ~60s install)
- Pre-release checklist: run `scancode --license --copyright --classify --only-findings src/` before tagging
- Pre-release checklist: run `npx license-checker --summary` for dependency compliance
- Initial scans validated: 980+ dependencies clean (MIT/ISC/BSD/Apache), 11 source files zero findings
- Only flagged item: `package.json` missing `"license": "MIT"` field (self-inflicted, one-line fix)
- SBOM generation via `@cyclonedx/cyclonedx-npm` flagged for future automation

## DD-8: No separate food name cache — items ARE the cache

**Context**: The 002 spec (name-based food type pre-selection) requires the app to remember user's past food type and icon choices for item names. The naive approach is a separate key-value store mapping normalized names to `{ foodType, icon }`.

**Alternatives considered**:
- **Separate AsyncStorage key** (`@shadowlist/food-cache-v1`): Duplicate data. Every item already stores its own food type and icon. A separate cache means twin sources of truth that can drift.
- **Dedicated SQLite table**: Overkill for a flat key-value map with < 500 entries. AsyncStorage is already in use.
- **Scan items at startup (chosen)**: No extra storage. Build a `Map<normalizedName, { foodType, icon }>` by iterating all items across all lists on every app boot.

**Rationale**: Items already contain `name`, `foodType`, and `icon`. Scanning them at boot is `O(n)` where `n` is the user's total item count — under 50ms for realistic usage (< 2000 items). This eliminates sync bugs, ghost entries, and the migration burden of a second cache. When a user deletes the last instance of an item, its mapping naturally falls out of the index. No cleanup logic needed.

**Decision**: Derive the food name index at startup by scanning all saved items. No separate cache. The FoodNameIndex is an in-memory `Map<string, { foodType: FoodType, icon: string }>` rebuilt on every app boot.

**Consequences**:
- Zero extra AsyncStorage keys
- No migration needed for v1.0 → v1.1
- Items in completed/bought lists still contribute to the index
- Deleting all items with a given name automatically removes it from the index
- Index rebuild must run after AsyncStorage hydration on app boot

## DD-9: Three-layer food name lookup resolution

**Context**: When a user types an item name, the system needs to suggest a food type and icon. Multiple data sources exist: past user choices, shipped static lookup tables, and regex patterns for compound words.

**Alternatives considered**:
- **Single static lookup only**: Simple, but ignores user learning. Same item always suggests the same icon, even if the user consistently overrides it.
- **Learned-first only**: Fragile on first use — no suggestions for new items until the user has classified them manually.
- **Three-layer chain (chosen)**: Learned (past items) → Static keyword (shipped lookup) → Regex (compound fallback) → No match (icon picker opens fresh).

**Rationale**: Each layer is a strict superset of specificity. Learned choices are the user's explicit decisions → win over everything. Static keywords cover ~70% of common items with curated accuracy. Regex catches German compounds (käse, milch, brot, fleisch, wurst) without needing every variant in the keyword list. The chain terminates gracefully — if nothing matches, the icon picker opens fresh with no pre-selection, preserving the original behavior.

Cross-language: current active language's table is checked first. On miss, the other language's table is tried as fallback (FR-011, FR-015 from 002 spec).

**Decision**: Three-layer resolution: (1) learned from past items → (2) static keyword lookup → (3) regex pattern fallback → (none) icon picker opens fresh. Within each language layer, exact keyword matches resolve before regex matches.

**Consequences**:
- Resolution is synchronous and completes under 1ms (plain Map + Array lookups)
- No network calls at any layer
- Static lookup is versioned for future expansion without breaking cache compatibility
- Cross-language fallback adds one extra lookup on miss — negligible cost

## DD-10: No app-layer encryption

**Context**: The app stores shopping items, food type classifications, and diet preferences locally. No cloud, no accounts, no PII (no emails, no passwords, no payment data). The app targets F-Droid and will not have a Google Play paid tier in v1.0.

**Alternatives considered**:
- **expo-secure-store**: Encrypted key-value store on both platforms. Intended for tokens, passwords, and secrets. Overhead of key management, recovery UX, and a password prompt on every app open.
- **react-native-keychain**: Similar to SecureStore, with face ID / fingerprint support. Adds a biometric dependency and a UX gate before every shopping list open — unacceptable for a quick-grab shopping app.
- **OS-level encryption (chosen)**: iOS enables Data Protection by default for all app data. Android has had full-disk encryption since 6.0 and file-based encryption since 10.0. AsyncStorage data at rest is already encrypted.

**Rationale**: The data stored ("bread → grain", "milk → dairy") is not PII, not financial, not health data under GDPR/HIPAA. Neither Google Play nor F-Droid require app-layer encryption for this data category. OS-level encryption covers the at-rest requirement. Adding a crypto layer would introduce: (a) a password prompt or biometric gate on every launch, (b) key recovery UX if the user forgets their passphrase, (c) data loss if keys are rotated. None of these tradeoffs are justified for a shopping list.

**Decision**: No app-layer encryption. Rely on OS-level full-disk encryption (iOS Data Protection, Android FDE/FBE). This decision is recorded here and in the v1.1 export/import backlog item.

**Consequences**:
- No crypto dependencies in the bundle
- No password prompt or biometric gate — app opens instantly
- Data is encrypted at rest by the OS, no additional action needed
- If a future feature adds cloud sync or user accounts, transport encryption (TLS) will be required at that point
