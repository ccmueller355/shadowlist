# Data Model: Name-Based Food Type Pre-Selection

**Date**: 2026-06-28 | **Spec**: `002-name-food-lookup`

## Entities

### StaticLookupEntry (stored in foodLookup.ts)

| Field | Type | Description |
|-------|------|-------------|
| `keywords` | `string[]` | Item names that map to this entry (e.g. `['bread', 'whole wheat bread', 'toast']`) |
| `foodType` | `FoodType` | The suggested food type |
| `icon` | `string` | The suggested MaterialCommunityIcons name |
| `lang` | `'en' \| 'de'` | Language of the keywords |
| `regex` | `RegExp` | Optional regex pattern for compound matching (e.g. `/käse$/i` for German) |

**Source**: Derived from `testData.ts` items + manually curated regex patterns.

---

### FoodNameIndex (in-memory, rebuilt on boot)

```typescript
// Key: normalized item name (lowercase, trimmed)
// Value: the most recent food type + icon assigned by the user
type FoodNameIndex = Map<string, {
  foodType: FoodType | null;
  icon: string;
}>;
```

**Source**: Built by scanning all `items` in the Zustand store. For each item, if its `foodType` is not null, it's added to the index. If multiple items share a normalized name, the last one in array wins (most recent user intent).

---

### ResolutionResult (return type of resolveName)

```typescript
interface ResolutionResult {
  foodType: FoodType | null;   // null if no match
  icon: string | null;         // null if no match
  source: 'learned' | 'static_exact' | 'static_regex' | 'cross_lang' | 'none';
}
```

---

### StaticLookupTable (file structure)

```typescript
interface StaticLookupEntry {
  keywords: string[];
  foodType: FoodType;
  icon: string;
  lang: 'en' | 'de';
  regex?: RegExp;
}

// Exported arrays
const EN_LOOKUP: StaticLookupEntry[] = [];  // ~200 entries from testData
const DE_LOOKUP: StaticLookupEntry[] = [];  // ~200 entries from testData
const EN_REGEX: { pattern: RegExp; foodType: FoodType; icon: string }[] = [];
const DE_REGEX: { pattern: RegExp; foodType: FoodType; icon: string }[] = [];
```

---

## Validation Rules

| Rule | Where | Effect |
|------|-------|--------|
| Static lookup entries must have non-empty keywords | Build time | Compile error |
| Static lookup entries must have valid foodType | Build time | Compile error |
| Regex patterns must not produce false positives on 500 common non-matching words | Code review | Manual check |
| Learned index must not contain entries with `foodType: null` | `rebuildNameIndex()` | Skip null entries |
| `resolveName` must return `{ source: 'none' }` for completely unknown names | Runtime | Fallback handled |
| Cross-language results must not shadow learned results | `resolveName()` | Learned layer checked first |

## State Changes (in-memory only)

| Event | Effect on FoodNameIndex |
|-------|------------------------|
| App boots | Index rebuilt by scanning all items |
| User adds item | No immediate effect — index is rebuilt on next boot |
| User edits item foodType | No immediate effect — index is rebuilt on next boot |
| User deletes item | No immediate effect — index is rebuilt on next boot |
| User renames item | No immediate effect — index is rebuilt on next boot |

The index is **read-only** during the session. It's rebuilt fresh on every boot. This avoids any syncing complexity between the mutable item array and the lookup index.
