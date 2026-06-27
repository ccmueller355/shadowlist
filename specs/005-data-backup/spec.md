# Feature Specification: Data Backup & Restore

**Feature Branch**: `005-data-backup`

**Created**: 2026-06-27

**Status**: Draft

**Input**: Add export/import mechanism for all user data in shadowlist — lists, items, settings, and learned name→food type mappings. Data must survive uninstall/reinstall, device transfer, and provide peace of mind against data loss.

## User Scenarios & Testing

### User Story 1 — User exports all data to a file (Priority: P1)

A user opens Settings, taps "Export Data", and the app serializes all their lists, items, settings, and learned name→food type mappings into a single JSON file. The system share sheet opens, letting them save to device storage, send via email/WhatsApp, or upload to a cloud drive. A toast confirms the export.

**Why this priority**: This is the primary backup mechanism — if a user reinstalls or switches devices, this file is their lifeline. Core value proposition for data ownership.

**Independent Test**: Create a list with several items, set a diet, add an uncommon item to trigger a learned mapping → Settings → Export Data → share sheet appears with the file → tap "Save to Files" → file exists on device.

**Acceptance Scenarios**:

1. **Given** a user with lists, items, settings, and learned mappings, **When** they tap "Export Data", **Then** a JSON file is generated containing all data
2. **Given** the export completes, **When** the share sheet opens, **Then** the user can save, send, or upload the file via any share target
3. **Given** the export file is saved, **When** inspected, **Then** it contains valid JSON with all lists, items, settings, and the learned name→food type index
4. **Given** the user has no data (fresh install), **When** they tap "Export Data", **Then** a toast says "No data to export" and no file is created

---

### User Story 2 — User imports data from a backup file (Priority: P1)

A user reinstalls shadowlist, opens it fresh (no data), taps "Import Data" in Settings, picks the exported JSON file from their device. The app restores all lists, items, settings, and learned name→food type mappings. They see their data exactly as before.

**Why this priority**: This completes the backup cycle — export is useless without import. Must restore the full app state to match pre-export exactly.

**Independent Test**: Fresh install → Settings → Import Data → pick previously exported file → lists appear with items → diet setting is active → type a previously learned item name → food type pre-selects from the restored mapping.

**Acceptance Scenarios**:

1. **Given** a fresh install with no data, **When** the user imports a valid backup file, **Then** all lists and items are restored exactly
2. **Given** a fresh install, **When** the user imports a backup, **Then** settings (theme, diet, language, sort order) match the exported state
3. **Given** a fresh install, **When** the user imports a backup that contained learned name→food type mappings, **Then** those mappings are restored and active
4. **Given** a device with existing data, **When** the user imports a backup, **Then** existing data is NOT overwritten (the import requires explicit data clearance or merge confirmation — NEUTRAL on merge strategy, to be clarified during implementation)
5. **Given** an invalid or corrupted file, **When** the user attempts import, **Then** a clear error toast says "Invalid backup file" and no data is modified

---

### User Story 3 — Automatic backup reminder (Priority: P3)

After the user closes a session with changes, a subtle reminder suggests exporting data. The reminder appears at most once per day. Tapping it opens the Export Data flow.

**Why this priority**: Users forget to back up until it's too late. A gentle nudge reduces data loss risk. Lowest priority because the manual export already works.

**Independent Test**: Make changes → leave the app → next day, open Settings → see the reminder → tap → Export Data flow opens.

**Acceptance Scenarios**:

1. **Given** the user made changes today, **When** they open Settings the next day, **Then** a non-blocking reminder suggests backing up
2. **Given** the user dismissed or completed a backup, **When** they open Settings again today, **Then** the reminder does not reappear

---

### Edge Cases

- **File too large**: What happens if the backup file is abnormally large (unlikely for a list app, but guard against GB-sized attack files)?
- **Partial corruption**: JSON parses but some items have missing fields — skip bad items, restore good ones, report count
- **Version mismatch**: Backup from a newer app version contains fields the current version doesn't understand — ignore unknown fields gracefully
- **Duplicate IDs**: Imported data has IDs that conflict with existing data — [NEEDS CLARIFICATION: overwrite, skip, or prefix?]
- **Empty import**: User imports a file with no valid data — toast "No data found in file"
- **Permission denied**: User denies file access permission — toast explaining why import failed and link to settings

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide an "Export Data" button in Settings
- **FR-002**: On export, system MUST serialize all data into a single UTF-8 JSON file: lists, items, settings, and learned name→food type index
- **FR-003**: The export MUST open the system share sheet for file distribution
- **FR-004**: The exported filename MUST follow the pattern `shadowlist-backup-YYYY-MM-DD.json`
- **FR-005**: System MUST provide an "Import Data" button in Settings that opens a file picker
- **FR-006**: On import, system MUST parse the JSON, validate structure, and restore all data: lists, items, settings, learned mappings
- **FR-007**: Imported data MUST replace ALL existing app data (full restore, not merge) — user must confirm with a dialog: "This will replace all current data. Continue?"
- **FR-008**: System MUST validate the backup file structure before applying any data — if parsing fails, show error and abort without modifying existing data
- **FR-009**: The learned name→food type mapping index MUST be included in the export and restored on import
- **FR-010**: System MUST handle edge cases: empty data, corrupted files, version differences with graceful error messages

### Key Entities

- **BackupPayload**: JSON structure containing `{ lists: ShoppingList[], items: ShoppingItem[], settings: AppSettings, learnedMappings: Record<string, LearnedMapping> }`
- **LearnedMapping**: `{ foodType: FoodType, icon: string, count: number }` — the learned name→food type association per canonical item name
- **ShareSheet**: System-native file sharing UI (via `expo-sharing`)
- **FilePicker**: System-native file selection UI (via `expo-document-picker`)
- **BackupFile**: Physical file on device at a user-chosen location, not in app sandbox

## Success Criteria

### Measurable Outcomes

- **SC-001**: Export completes in under 1 second for a typical dataset (10 lists, 200 items, 50 learned mappings)
- **SC-002**: Import completes in under 2 seconds for the same dataset
- **SC-003**: After export → uninstall → reinstall → import, the user sees identical data (spot-check: list names, item count, active diet, learned name mapping for at least one item)
- **SC-004**: File size for typical dataset is under 100 KB (JSON is compact)
- **SC-005**: Zero data loss in round-trip test (export → import → export again → diff the two files is empty)

## Assumptions

- User has access to the device file system or a share target (email, cloud drive) to store the backup file
- The export file is stored outside the app sandbox — it survives uninstall
- `expo-file-system`, `expo-sharing`, and `expo-document-picker` are sufficient for file I/O and picking — no custom native module needed
- Learned name→food type index is rebuilt lazily in the current version (spec 002); on import, the stored mappings replace the index directly
- Cloud backup (iCloud, Google Drive auto-backup) is explicitly out of scope for v1.0
- Automatic periodic backup is out of scope for v1.0 — only manual and reminder-based
