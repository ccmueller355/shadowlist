# Implementation Plan: Data Backup & Restore

**Branch**: `005-data-backup` | **Date**: 2026-06-28 | **Spec**: `specs/005-data-backup/spec.md`

**Input**: Feature specification for export/import of all user data — lists, items, settings, and learned name→food type mappings. File-based backup with system share sheet.

## Summary

Add export/import to shadowlist via three Expo packages. Export serializes store state to a JSON file and opens the system share sheet. Import picks a JSON file, validates structure, confirms with user, clears existing data, and restores. All data (lists, items, settings, learned mappings) included. The backup file lives outside the app sandbox — survives uninstall.

## Technical Context

**Language/Version**: TypeScript 6.0, React Native 0.85, Expo SDK 56

**Primary Dependencies**: `expo-file-system`, `expo-sharing`, `expo-document-picker` — all standard Expo SDK 56 packages

**Storage**: AsyncStorage (existing) + temporary cache file (via expo-file-system, auto-cleaned by OS)

**Testing**: Jest — add ~12 tests for export/import serialization, validation, edge cases

**Target Platform**: Android (iOS compatible with same API)

**Project Type**: Mobile app (React Native + Expo managed)

**Performance Goals**: Export < 100ms, Import < 200ms for typical dataset

**Constraints**: Zero network calls. File stored outside app sandbox. Maximum file size guard at 10MB.

**Scale/Scope**: Single utility file `src/utils/backup.ts` ~150 lines, Settings UI integration, i18n keys.

## Project Structure

```text
specs/005-data-backup/
├── spec.md              # ✅ Feature specification
├── research.md          # ✅ Research decisions
├── data-model.md        # ✅ Entity definitions
├── plan.md              # ← THIS FILE
└── tasks.md             # (created by speckit.tasks command)

src/
├── utils/
│   └── backup.ts                  # NEW — exportData(), importData() pure functions
├── store/
│   └── useStore.ts                # MODIFY — add exportData, importData actions
├── components/
│   └── SettingsModal.tsx          # MODIFY — add Export/Import Data buttons
├── types/
│   └── index.ts                   # NO CHANGE — reuses existing types
├── i18n/
│   ├── en.ts                      # MODIFY — add backup i18n keys
│   └── de.ts                      # MODIFY — add backup i18n keys
├── __tests__/
│   └── backup.test.ts             # NEW — ~12 tests for export/import logic
```

## Implementation Phases

### Phase 0: Dependencies

**Changes**:
1. Run `npx expo install expo-file-system expo-sharing expo-document-picker`
2. Verify installation with `npx tsc --noEmit`

---

### Phase 1: Export Function (FR-001, FR-002, FR-003, FR-004)

**FRs covered**: FR-001 (Export button), FR-002 (serialize all data), FR-003 (share sheet), FR-004 (filename pattern)

**Changes**:
1. Create `src/utils/backup.ts`
2. Implement `exportData(state): { success, filePath }` — serialize store state → write to cache file
3. Implement `shareFile(filePath)` — open share sheet via expo-sharing
4. Handle empty state: if no lists/items, return early with "No data to export"

---

### Phase 2: Import Function (FR-005, FR-006, FR-007, FR-008, FR-009, FR-010)

**FRs covered**: FR-005 (Import button + file picker), FR-006 (parse + validate + restore), FR-007 (full restore), FR-008 (validation), FR-009 (learned mappings), FR-010 (edge cases)

**Changes**:
1. Implement `pickAndReadFile()` — open file picker → read file content
2. Implement `validateBackup(json: string): BackupPayload | null` — parse + validate structure
3. Implement `restoreData(payload: BackupPayload, store)` — clear existing data → restore from payload → persist
4. Show confirmation dialog before restore
5. Handle edge cases: corrupted JSON, missing fields, permission denied

---

### Phase 3: Store Integration

**Changes**:
1. Add `exportData()` action to Zustand store — calls backup.ts export, opens share sheet
2. Add `importData()` action to Zustand store — calls file picker, validates, confirms, restores
3. Wire into existing `clearAllData()` flow for the "clear first" step of import

---

### Phase 4: Settings UI

**Changes**:
1. Add "Export Data" button in SettingsModal (icon: `file-export`)
2. Add "Import Data" button in SettingsModal (icon: `file-import`)
3. Both buttons gated the same as all other settings — visible in all builds
4. Buttons placed near "Clear All Data"

---

### Phase 5: i18n

**Changes**:
1. Add `settings.exportData`, `settings.importData` to EN translations
2. Add `settings.backupExported`, `settings.backupRestored`, `settings.confirmRestore` toast/dialog messages
3. Same keys in DE translations

---

### Phase 6: Tests

**New test file**: `src/__tests__/backup.test.ts`

| Test | FR |
|------|----|
| exportData produces valid JSON | FR-002 |
| exportData includes lists, items, settings | FR-002 |
| exportData filename follows pattern | FR-004 |
| exportData handles empty state | FR-001 |
| validateBackup returns null for invalid JSON | FR-008 |
| validateBackup returns null for missing version | FR-008 |
| validateBackup returns payload for valid input | FR-006 |
| restoreData clears then restores | FR-007 |
| restoreData handles missing learnedMappings gracefully | FR-009 |
| restoreData handles empty payload | FR-010 |
| Full round-trip: export → import → export produces identical payload | SC-005 |

## Rollout Order

| Phase | Type | Depends on |
|-------|------|-----------|
| 0. Dependencies | Setup | Nothing |
| 1. Export function | Core | Phase 0 |
| 2. Import function | Core | Phase 0 |
| 3. Store integration | Integration | Phase 1 + 2 |
| 4. Settings UI | UI | Phase 3 |
| 5. i18n | UI | Phase 4 |
| 6. Tests | Tests | All |

## Test Strategy

~12 tests covering: serialization, validation, restore flow, edge cases, round-trip integrity.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| expo-file-system path differs on Android/iOS | Use `cacheDirectory` which works on both |
| User picks non-JSON file | Validate extension and content before parsing |
| Import overwrites user data | Confirmation dialog (FR-007) |
| File too large (attack vector) | Cap read size at 10MB |
| learnedMappings not yet implemented (002 pending) | Field is optional — if empty, index rebuilds naturally on next boot |
