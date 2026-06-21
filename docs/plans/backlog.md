# Backlog — Future Topics

Items deferred from v1.0, parked here for later exploration.

---

## Pre-Release Readiness Checklist (v1.0 Gate)

Items to resolve before the first public release. Requires research — exact requirements vary by store.

### Legal & Compliance

- [ ] **Impressum / Legal notice** — required for EU-based developers on both F-Droid and Google Play. What info must be disclosed (name, address, contact)?
- [ ] **Contact channel** — where do users reach the maintainer? Options to decide:
  - Email — classic, required for store listings. E.g. support@shadowlist.app
  - X / Twitter — public, good for announcements and quick reach
  - GitHub Issues — public, bundles support with bug tracking. Already exists
  - GitLab — if migrating later
  - Decision: primary + secondary channel (e.g. GitHub Issues primary, email fallback)
- [ ] **Privacy policy** — even though the app collects zero data, stores need a privacy policy URL. Draft a minimal "we don't collect anything" policy.
- [ ] **Licensing** — app is MIT licensed. Confirm F-Droid's metadata (LICENSE file, license tag in metadata) is correct.

### F-Droid Specific

- [ ] **F-Droid inclusion requirements** — repo must have a clear build recipe, no proprietary dependencies, reproducible builds where possible.
- [ ] **Fastlane metadata** — F-Droid prefers `fastlane/metadata/android/` with store listing, screenshots, changelog. Structure required.
- [ ] **No ads / no tracking / no analytics** — verify and document in the metadata.
- [ ] **Reproducible builds** — does the current build pipeline produce deterministic APKs? If not, what changes are needed?

### Google Play Specific

- [ ] **Developer account** — one-time $25 fee. Register under personal or entity name.
- [ ] **Content ratings questionnaire** — complete the Google Play ratings survey.
- [ ] **App signing** — Google Play App Signing or self-managed keystore?
- [ ] **Store listing** — description, screenshots (phone + tablet), feature graphic, icon.

### GitHub / Repository State

- [ ] **README polish** — does it clearly describe the project, how to build, how to contribute?
- [ ] **Issue templates** — create `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`
- [ ] **Support channel** — where do users go for help? GitHub Issues only? Add a support section to README.
- [ ] **CONTRIBUTING.md** — guidelines for PRs, code style, commit messages.
- [ ] **CHANGELOG.md** — already exists. Confirm it's up to date and follows Keep a Changelog format.
- [ ] **Security policy** — `.github/SECURITY.md` for reporting vulnerabilities.
- [ ] **CI status badge** — does README show build status / test status?
- [ ] **Release workflow** — automate GitHub Releases with `eas build` artifacts attached.

### Documentation

- [ ] **User manual** — end-user documentation covering: adding items, icon picker, categories, diet profiles, language switching, drag-to-reorder, backup/restore. Format: in-app (help screen) + web (GitHub Pages / VitePress). F-Droid packaging guidelines recommend shipping docs alongside the app.
- [ ] **Quick-start guide** — one-page cheat sheet for new users. Could live as the README hero section or a "first launch" screen in-app.

### App Internals

- [ ] **App versioning** — `app.json` version + build number. Strategy for semantic versioning vs build numbers.
- [ ] **In-app credits** — Settings → About screen with version, license, open-source acknowledgements.
- [ ] **Sentry / crash reporting** — opt-in crash reporting? For a paid offline app this is a privacy decision.
- [ ] **App icon design** — the app needs a proper icon: cyberpunk/SR-themed, recognizable at small sizes, works on both light and dark launchers. Options: commission, AI-assisted concept, or community contest.
- [ ] **App icon assets** — once designed, generate all required sizes (F-Droid: 1024x1024 PNG, Play: 512x512, iOS: various, adaptive icon for Android).

---

---

## Pre-Release — Open Questions (to resolve together)

### 💰 Monetization & Store Strategy — DECIDED

- [x] **v1.0 strategy**: MIT license, F-Droid only, completely free. No ads, no paywall, no tracking.
- [ ] **v2.x sponsor link** — optional, only if the app gains traction. GitHub Sponsors / Ko-fi.
- [ ] **v2.x Google Play branch** — parallel branch with ads + premium model to remove ads. Only if legal framework is in place. Not before.
- [ ] **v3.x Apple App Store** — much later, if at all.

### 🚀 First-Launch & Onboarding — Decided

- [x] **No setup wizard** — straight to list, zero prompts.
- [x] **Remove "Load Demo Data"** button from the UI. Not needed for release.
- [x] **Autocomplete from static lookup** — as user types, show suggestions from the 002 static lookup table AND past items. "Br" → Bread, Broccoli, Bratwurst, etc. Makes the add bar useful from day one, even with zero history.
- [ ] **Autocomplete UI** — dropdown below the AddItemBar showing matching names from the static lookup + learned index. Tap adds the item with pre-selected icon/food type. Requires: new AutoCompleteDropdown component or modification of AddItemBar.

### 🔒 Dependency & Supply Chain

- [ ] **Dependency audit** — lock all `^` ranges, audit 20+ npm packages for network calls or known issues. F-Droid requirement.
- [ ] **Package.json license field** — add `"license": "MIT"` to `package.json` (currently missing, shows as UNLICENSED in scans)
- [ ] **OSS license scan** — run `npx license-checker --summary` to verify all dependencies are FOSS-compatible. No GPL/AGPL viral licenses in the F-Droid build. ✅ Already validated: 980+ packages clean, only flagged items were our own package.json (missing field) and a dual-licensed transitive dep (BSD-3-Clause OR GPL-2.0, safe).
- [ ] **Snippet / source code scan** — run `scancode --license --copyright --classify --only-findings src/` to detect any copied snippets or third-party code in our own source. ✅ Already validated: 11 source files scanned, zero findings. Clean.
- [ ] **Tool decision**: **scancode-toolkit** (CLI, best-in-class detection, 6,000+ license DB, 7s scan time). Not Fossology (too heavy for solo dev). Not Black Duck (enterprise only).
- [ ] **SBOM generation** — generate CycloneDX SBOM (`npx @cyclonedx/cyclonedx-npm`) and commit it alongside each release. Machine-readable inventory for transparency and F-Droid auditability.
- [ ] **APK size budget** — target for download size?

### 🏗️ CI/CD Pipeline — Decided

- [x] **TypeScript check** — `npx tsc --noEmit` added to deploy-docs workflow, runs on every push to main
- [x] **Type-check locally** — added `npm run typecheck` script for pre-commit use
- [x] **Version bumping** — `npm version patch|minor|major` via `package.json` `"version"` script that auto-syncs `app.json`. One command, both files, git tag. No CI automation.
- [ ] **EAS Build integration** — deferred to release prep (manual `eas build` for now)
- [ ] **APK signing** — deferred to release prep
- [ ] **Test-on-PR workflow** — not needed. Local runs suffice for solo dev.

### ♿ Accessibility

- [ ] **Screen reader labels** — all icons, buttons, and interactive elements
- [ ] **Color contrast** — verify across all 3 themes meets WCAG AA
- [ ] **Touch targets** — minimum 48dp on all interactive elements

### 📦 Data Migration

- [x] **Schema version key** — add `@shadowlist/schema-version` to AsyncStorage. On app boot, read version and apply any pending migrations. For v1.0: version `1.0`, no migrations needed — infrastructure only.
- [x] **Risk assessment** — all planned v1.0 changes (001, 002) add fields only, no renames or removals. Null defaults handle backward compat. Schema version is a safety net for future breaking changes, not a v1.0 blocker.
- [ ] **Migration handler** — write a `migrate()` function called during store hydration that checks version and runs sequential migrators (e.g. `1.0→1.1`, `1.1→1.2`). Pattern: `if (v < target) { apply(v→v+1); }`.
- [ ] **Rollback safety** — migrations should be additive only (no destructive transforms). Old data survives even if the user downgrades.
- [ ] **Migration test suite** — `migrate()` with old-format fixture data, verify output matches new format.

---

## v1.1 — Export/Import & Recoverability

- **Versioned JSON export** of learned food name cache (`{ version, schema, created, entries }`)
- **Import with semver compatibility check** — detect version mismatch, warn user, still import
- **Merge strategy** — user's existing entries win over imported ones (manual overrides take priority)
- **Recoverability test suite:**
  - AsyncStorage wipe → does the app gracefully degrade to static lookup fallback?
  - Backup restore → does the learned index rebuild from restored items?
  - Version mismatch (export from v1.0, import into v1.2) → does semver check handle it?
  - Schema migration — `@shadowlist/food-cache-v1` key is versioned for future migration
- **Decision recorded**: No app-layer encryption (OS-level FDE on iOS/Android is sufficient for shopping list data)

---

## v1.1 — Android Studio / Native Test Integration

- Move from Jest-only to **Android Studio instrumentation tests** for native modules
- **UI automator tests** for the full add-item → icon picker → diet warning flow
- **Robolectric** for fast local JVM-based Android component tests
- **Espresso** for screenshot regression testing on key screens (HomeScreen, ListDetailScreen, Settings, EditModal)
- Goal: catch regressions in the actual Android runtime, not just the JS layer

---

## v1.1 — QR / Barcode Scanner (Exploration)

- **Camera-based item entry** — scan a product barcode (EAN-13, UPC, QR) to auto-fill item name
- **Free product database** — Open Food Facts API (openfoodfacts.org) for product name lookup
- **Privacy consideration** — camera permission, no image storage, no scan data sent anywhere except the public API
- **Offline fallback** — if no network, user types manually as usual. Scan is a shortcut, not a requirement
- **Tension with "no network" principle** — this is the one feature that requires network. Decision: opt-in, user is prompted before first scan. Default state: disabled.
- **Food type inference** — once name is retrieved, feed through the 002 name→foodType lookup chain
- **Icon pre-selection** — same pipeline, auto-suggest from the scanned name
- Requires: `expo-camera` or `react-native-camera`, API client for Open Food Facts, rate limiting
- **Deferred**: not before the core diet + name lookup is shipped and stable

### Expanded: Macro Nutrition + Health Index

- **Open Food Facts nutrition data** — the API returns calories, protein, fat, carbs, fiber, salt per 100g. Could display these on the item row or in the edit modal as optional info.
- **Simple health/processing index** — not GI/GL (still off the table), but a single "caution" indicator for high sugar, high salt, ultra-processed, or low nutritional density. Could be derived from the NOVA classification (Open Food Facts includes it: 1=unprocessed, 2=cooked ingredients, 3=processed, 4=ultra-processed).
- **Tension with "no food database" principle** — the scanner introduces a live lookup, which changes the architecture. The health index could be computed from the same API return, but would only be available online. Offline: fall back to static name→foodType only.
- **No medical claims** — still advisory. "This item is classified as ultra-processed" is a fact from the NOVA system. "This item is bad for you" is a claim. Stay on the fact side.

### Expanded: Multiple People, Different Diets

- **Problem**: A household has one shared list. Person A is keto, Person B is vegetarian, Person C has no diet. Currently one active diet per app, so warnings are wrong for half the family.
- **Options**:
  - **Option A (simplest)**: Still one active diet per device. The person who does the shopping sets *their* diet. Others mentally filter.
  - **Option B (per-item tagging)**: Each item can be tagged with a person/initial. Warnings show "⚠️ Keto: grain" or "⚠️ Vegetarian: meat" per person. Requires person profiles.
  - **Option C (ShadowLink integration)**: Each linked user has their own diet profile. Shared list shows all warnings from all linked users.
- **Decision deferred** — revisit when 001 and 002 are built. Option A ships first, Option B/C is ShadowLink territory.

---

## v2.0 — ShadowLink / Multi-User (Speculative)

### The Vision

A **family group** — each member runs the app on their own device with their **own diet profile**. They add items to their personal list. The **family view** composes all members' items into one unified shopping list.

### Key Flows

- **Family group creation** — one user creates a group, others join via invite link or code
- **Multiple lists, each linked to a shop type** — not one family list, but many:
  - "Groceries" (REWE, Aldi, Edeka)
  - "DIY / Hardware" (Hornbach, Bauhaus, OBI)
  - "Pharmacy / Drugstore" (DM, Rossmann)
  - "Electronics" (MediaMarkt, Saturn)
  - Each list has a name, an optional shop hint, and is shared across the family
- **Anyone adds to any list** — Alice adds "almond milk" to Groceries, Bob adds "screws" to DIY. No per-person partitions — the list is the unit of sharing.
- **Items tagged with who added them** — "🧑 Alice: almond milk" so the shopper knows who wanted it
- **Diet warnings are per-person-per-item** — if Alice (keto) adds bread to Groceries, Alice sees ⚠ on her device. Bob (no diet) sees no warning. The shopper sees warnings for *their own* diet profile only.
- **Shopping session with timeout** — when someone taps "Shop this list":
  - They "claim" the list for a session (default: 30 min timeout)
  - Other members see: "🛒 Alice is shopping Groceries (20 min remaining)"
  - Items checked off sync in real-time to all members
  - If Alice closes the app / goes offline, the session times out after inactivity
  - After timeout, anyone else can start a new shopping session
  - If Bob starts shopping while Alice's session is still active: warning "Alice is already shopping this list — take over anyway?"
- **Real-time hints** — if Alice is shopping Groceries and Bob adds "eggs", Alice gets a live update. If Bob adds something Alice just checked off, the app warns "Alice just bought this (2 min ago)."

### Architecture Considerations

- **Sync model options**:
  - **Firebase Realtime / Firestore** — fast, managed, but Google dependency
  - **Matrix protocol** — fully decentralized, no central server, but heavy
  - **Custom lightweight sync** — simple CRDT-based or last-write-wins over WebSocket
  - **P2P / Bluetooth** — only works when in proximity, limited utility
- **No-account fallback** — every user can still use the app fully offline/solo without any account. ShadowLink is purely additive.
- **Data ownership** — items live on the user's device primarily, synced ephemerally. The server (if any) is a relay, not a database of record.
- **Encrypted transport** — TLS in transit. If using Matrix, E2EE is possible.
- **Deferred entirely** — requires 001 + 002 + barcode scanner to be stable first. This is the *long-term vision*, not v2.0 but v3.0+.

---

## v2.0 — Cross-Device Sync (Speculative)

- iCloud / Google Drive sync for single-user across devices
- No account required — leverages OS-native cloud

---

## v3.0 — Google Play / Apple App Store (Speculative)

- Parallel branch with ads + premium remove-ads model
- Only if legal framework (impressum, privacy policy, terms) is in place
- Apple App Store even further out
