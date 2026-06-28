# Tasks: Data Backup & Restore

**Input**: Plan from `specs/005-data-backup/plan.md`

**Prerequisites**: spec.md, plan.md, research.md, data-model.md

**Tests**: Test tasks are included and MUST be written and FAIL before implementation (TDD discipline).

**Organization**: Tasks grouped by phase with user story alignment. Parallelizable tasks marked `[P]`.

---

## Phase 0: Dependencies

**Purpose**: Install the three Expo packages required for file I/O, sharing, and file picking.

- [ ] T001 Install `expo-file-system` — `npx expo install expo-file-system`
- [ ] T002 Install `expo-sharing` — `npx expo install expo-sharing`
- [ ] T003 Install `expo-document-picker` — `npx expo install expo-document-picker`
- [ ] T004 Verify: `npx tsc --noEmit` passes (no import errors)

**Checkpoint**: All three dependencies installed, TypeScript clean.

---

## Phase 1: Export Function — FR-001, FR-002, FR-003, FR-004

**Purpose**: Implement the data export flow — serialize store state → JSON file → system share sheet.

### Tests for Phase 1

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T005 Write test: `exportData()` produces valid JSON from mock state — `backup.test.ts`
- [ ] T006 Write test: exported JSON includes `version: 1` — `backup.test.ts`
- [ ] T007 Write test: exported JSON includes `lists`, `items`, `settings` fields — `backup.test.ts`
- [ ] T008 Write test: generated filename matches pattern `shadowlist-backup-YYYY-MM-DD.json` — `backup.test.ts`
- [ ] T009 Write test: `exportData()` returns early when state is empty (no lists) — `backup.test.ts`

### Implementation for Phase 1

- [ ] T010 **[P]** Create `src/utils/backup.ts` with `exportData()` function — serialize store state to JSON payload
- [ ] T011 **[P]** Implement filename generation — `shadowlist-backup-${date}.json`
- [ ] T012 Write JSON to cache directory via `expo-file-system.writeAsStringAsync()`
- [ ] T013 Open share sheet via `expo-sharing.shareAsync()` with mime type `application/json`
- [ ] T014 Handle empty state: if no lists, show toast and return without creating file
- [ ] T015 Run Phase 1 tests (T005-T009) — all pass

**Checkpoint**: FR-001 (Export button), FR-002 (serialize all data), FR-003 (share sheet), FR-004 (filename pattern) satisfied.

---

## Phase 2: Import Function — FR-005, FR-006, FR-007, FR-008, FR-009, FR-010

**Purpose**: Implement the data import flow — file picker → validate → confirm → restore.

### Tests for Phase 2

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T016 Write test: `validateBackup()` returns `null` for non-JSON string — `backup.test.ts`
- [ ] T017 Write test: `validateBackup()` returns `null` for JSON missing `version` field — `backup.test.ts`
- [ ] T018 Write test: `validateBackup()` returns `null` for JSON with non-array `lists` — `backup.test.ts`
- [ ] T019 Write test: `validateBackup()` returns payload for valid backup JSON — `backup.test.ts`
- [ ] T020 Write test: `validateBackup()` accepts learnedMappings as optional (missing = ignored) — `backup.test.ts`
- [ ] T021 Write test: `restoreData()` calls `clearAllData()` then restores lists + items + settings — `backup.test.ts`
- [ ] T022 Write test: `restoreData()` handles corrupted item entries (missing foodType) gracefully — `backup.test.ts`
- [ ] T023 Write test: full round-trip (serialize → validate → restore) produces identical data — `backup.test.ts`

### Implementation for Phase 2

- [ ] T024 Implement `validateBackup(raw: string): BackupPayload | null` — parse JSON, check structure, return null on any failure
- [ ] T025 Validation chain: `JSON.parse()` → `version` exists → `lists` is array → `items` is array → `settings` is object → return typed payload
- [ ] T026 Implement `restoreData(payload: BackupPayload)` — clear existing data → load from payload → persist
- [ ] T027 Handle `learnedMappings` — if present and non-empty, store for spec 002 consumption; if absent, ignore gracefully
- [ ] T028 Max file size guard — reject files over 10MB before reading
- [ ] T029 Run Phase 2 tests (T016-T023) — all pass

**Checkpoint**: FR-005 (Import button + file picker), FR-006 (parse + validate + restore), FR-007 (full restore), FR-008 (validation), FR-009 (learned mappings), FR-010 (edge cases) satisfied.

---

## Phase 3: Store Integration

**Purpose**: Wire export/import functions into Zustand store actions.

### Tests for Phase 3

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T030 Write test: `exportData` store action exists and can be called — store mock test — `backup.test.ts`
- [ ] T031 Write test: `importData` store action exists and can be called — store mock test — `backup.test.ts`

### Implementation for Phase 3

- [ ] T032 Add `exportData: () => void` action to Zustand store interface and implementation — calls backup.ts `exportData()`
- [ ] T033 Add `importData: () => void` action to Zustand store — calls `pickAndReadFile()`, validates, shows Alert confirm, then restores
- [ ] T034 Wire confirmation dialog: "This will replace all current data. Continue?" → Cancel / Restore
- [ ] T035 Run Phase 3 tests (T030-T031) — all pass

**Checkpoint**: Store actions wired, confirmation dialog functional.

---

## Phase 4: Settings UI

**Purpose**: Add Export/Import Data buttons in SettingsModal.

### Tests for Phase 4

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T036 Write test: `settings.exportData` key exists in EN translations — `i18n.test.ts`
- [ ] T037 Write test: `settings.importData` key exists in DE translations — `i18n.test.ts`

### Implementation for Phase 4

- [ ] T038 **[P]** Add Export Data button in SettingsModal — icon: `file-export`, placed above Clear All Data
- [ ] T039 **[P]** Add Import Data button in SettingsModal — icon: `file-import`, placed above Clear All Data
- [ ] T040 Wire `exportData` prop from HomeScreen (same pattern as generateTestData in 003)
- [ ] T041 Wire `importData` prop from HomeScreen
- [ ] T042 Run Phase 4 tests (T036-T037) — all pass

**Checkpoint**: Settings UI functional with both buttons.

---

## Phase 5: i18n

**Purpose**: Add bilingual translation keys for all backup-related UI text.

### Tests for Phase 5

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T043 Write test: `settings.backupExported` key exists in EN — `i18n.test.ts`
- [ ] T044 Write test: `settings.backupRestored` key exists in DE — `i18n.test.ts`
- [ ] T045 Write test: `settings.confirmRestore` key exists in EN — `i18n.test.ts`
- [ ] T046 Write test: `settings.confirmRestore` key exists in DE — `i18n.test.ts`

### Implementation for Phase 5

- [ ] T047 **[P]** Add EN keys: `settings.exportData`, `settings.importData`, `settings.backupExported`, `settings.backupRestored`, `settings.confirmRestore` — `src/i18n/en.ts`
- [ ] T048 **[P]** Add DE keys: same keys with German translations — `src/i18n/de.ts`
- [ ] T049 Run Phase 5 tests (T043-T046) — all pass

**Checkpoint**: Full bilingual UI for backup feature.

---

## Phase 6: Integration & Polish

**Purpose**: Final verification, full test suite, docs.

- [ ] T050 Run full test suite: `npm test` — all tests pass
- [ ] T051 Run TypeScript: `npx tsc --noEmit` — clean
- [ ] T052 Run coverage: `npm run test:coverage` — verify threshold
- [ ] T053 Run docs build: `npm run docs:build` — clean
- [ ] T054 Update `CHANGELOG.md` with spec 005 entry
- [ ] T055 Commit all changes to branch

**Checkpoint**: Full verification gates pass, branch ready for PR.

---

## Dependencies & Execution Order

```
Phase 0 (Dependencies)        ─→ no deps
     │
     ├─→ Phase 1 (Export)     ─→ needs Phase 0
     ├─→ Phase 2 (Import)     ─→ needs Phase 0
     │
     └─→ Phase 3 (Store)      ─→ needs Phase 1 + 2
              │
              └─→ Phase 4 (UI) ─→ needs Phase 3
                       │
                       └─→ Phase 5 (i18n) ─→ needs Phase 4
                                │
                                └─→ Phase 6 (Integration) ─→ needs all
```

### Parallel Opportunities

- T010/T011: Export function and filename generation — `[P]`, same file, different concerns
- T038/T039: Export and Import buttons — `[P]`, different rows in Settings
- T047/T048: EN and DE i18n keys — `[P]`, different files

### TDD Ordering

Within each phase, test tasks MUST be written and FAIL before their corresponding implementation tasks.

### Test Count

| Phase | Tests |
|-------|-------|
| Phase 1 (export) | 5 (T005-T009) |
| Phase 2 (import) | 8 (T016-T023) |
| Phase 3 (store) | 2 (T030-T031) |
| Phase 4 (UI) | 2 (T036-T037) |
| Phase 5 (i18n) | 4 (T043-T046) |
| Phase 6 (integration) | 5 (T050-T054) |
| **Total** | **26 tests** |
