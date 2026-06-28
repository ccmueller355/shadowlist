# Data Model: Data Backup & Restore

**Date**: 2026-06-28 | **Spec**: `005-data-backup`

## Entities

### BackupPayload (serialized JSON)

```typescript
interface BackupPayload {
  version: number;           // Schema version (currently 1)
  lists: ShoppingList[];     // All user lists
  items: ShoppingItem[];     // All items across all lists
  settings: AppSettings;     // All app settings
  learnedMappings: Record<string, LearnedMapping>;  // Name→food type (from spec 002, may be empty)
}
```

### LearnedMapping (from spec 002, included in backup for completeness)

```typescript
interface LearnedMapping {
  foodType: FoodType;
  icon: string;
  count: number;
}
```

### New Entities (005-specific)

No new database/persistent entities. Export/Import is a transient process — data flows through JSON, not into new storage tables.

---

## File Format

### Naming

`shadowlist-backup-YYYY-MM-DD.json`

Example: `shadowlist-backup-2026-06-28.json`

### Full example

```json
{
  "version": 1,
  "lists": [
    {
      "id": "list_abc123",
      "name": "Weekly Groceries",
      "createdAt": 1719500000000,
      "updatedAt": 1719586400000
    }
  ],
  "items": [
    {
      "id": "item_def456",
      "listId": "list_abc123",
      "description": "Milk",
      "qualifier": "2x",
      "icon": "cheese",
      "foodType": "dairy",
      "purchased": false,
      "order": 0,
      "category": "Groceries",
      "createdAt": 1719500000000,
      "updatedAt": 1719586400000
    }
  ],
  "settings": {
    "theme": "fixer",
    "sortByCategory": false,
    "defaultIcon": "cart",
    "activeDiet": null,
    "lang": "en"
  },
  "learnedMappings": {}
}
```

---

## Validation Rules

| Check | Code rule | Error message |
|-------|-----------|--------------|
| File extension is `.json` | `fileName.endsWith('.json')` | "Please select a JSON backup file" |
| Valid JSON | `JSON.parse()` succeeds | "Invalid backup file — could not parse" |
| Has `version` field | `typeof payload.version === 'number'` | "Invalid backup file — missing version" |
| `lists` is array | `Array.isArray(payload.lists)` | "Invalid backup file — lists must be an array" |
| `items` is array | `Array.isArray(payload.items)` | "Invalid backup file — items must be an array" |
| `settings` is object | `typeof payload.settings === 'object'` | "Invalid backup file — settings must be an object" |

## State Changes

| Event | Action | Persistence |
|-------|--------|------------|
| Export | Read store state → write JSON file → share | None (written to temp, shared then deleted) |
| Import (confirmed) | `clearAllData()` → restore from JSON → persist | `saveLists()`, `saveItems()`, `saveSettings()` called |
| Import (cancelled) | Nothing | No change |
