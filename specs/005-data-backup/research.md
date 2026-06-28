# Research: Data Backup & Restore

**Date**: 2026-06-28 | **Spec**: `005-data-backup`

## Research Items

### 1. Required Dependencies

| Package | Purpose | Status |
|---------|---------|--------|
| `expo-file-system` | Write JSON to temporary file for sharing | ❌ Not installed |
| `expo-sharing` | Open system share sheet | ❌ Not installed |
| `expo-document-picker` | Pick backup file for import | ❌ Not installed |

**Decision**: Install all three via `npx expo install expo-file-system expo-sharing expo-document-picker`. Standard Expo SDK 56 packages, no native module issues.

### 2. Export Flow

```
Settings → "Export Data"
  ↓
Serialize store state:
  { version: 1, lists, items, settings, learnedMappings }
  ↓
Write to temp file via expo-file-system
  File://cache/.../shadowlist-backup-YYYY-MM-DD.json
  ↓
Open share sheet via expo-sharing
  ↓
User saves/sends/uploads the file
  └→ Toast: "Backup exported"
```

### 3. Import Flow

```
Settings → "Import Data"
  ↓
Open file picker via expo-document-picker
  ↓
User selects .json file
  ↓
Read file content via expo-file-system
  ↓
Parse JSON + validate structure
  ↓
Confirm dialog: "Replace all current data?"
  ↓
YES → clearAllData() → restore lists, items, settings, learnedMappings → persist → rebuild name index
  ↓
Toast: "Backup restored"
```

### 4. Validation Strategy

| Check | What it prevents |
|-------|-----------------|
| File extension `.json` | Non-JSON files rejected early |
| Valid JSON parse | Corrupted/malformed files |
| Top-level `version` field exists | Non-backup JSON files |
| `version` is a number | Schema compatibility check |
| `lists` is an array | Structure validation |
| `items` is an array | Structure validation |
| `settings` is an object | Structure validation |

### 5. Learned Mappings

Spec 005's `learnedMappings` field depends on spec 002 (not yet implemented). During import:
- If the backup file has `learnedMappings` and spec 002 exists → restore them
- If the backup file has `learnedMappings` but spec 002 doesn't exist → ignore the field gracefully
- If the backup file doesn't have `learnedMappings` → nothing lost

This means 005 is **forward-compatible with 002** regardless of implementation order.

### 6. Performance

| Operation | Expected time |
|-----------|--------------|
| Serialize (10 lists, 200 items) | < 50ms |
| Write to cache file | < 10ms |
| Read from picked file | < 50ms |
| Parse + validate JSON | < 20ms |
| Restore to store + persist | < 100ms |
| **Total export** | **< 100ms** |
| **Total import** | **< 200ms** |

### 7. Settings Backup

AppSettings currently has: `theme`, `sortByCategory`, `defaultIcon`, `activeDiet`, `lang`. These are all serialized as-is. No transformation needed — the settings type is simple and flat.

### 8. Edge Case: Existing Data on Import

FR-07 specifies: import clears existing data before restoring. This means:
- Current items/lists/settings are lost after import confirmation
- User is warned via dialog
- AsyncStorage is cleared, then new data is saved
- This is the safe default — merge logic is complex and error-prone
