# Data Model: Bilingual Demo Data & Statistical Test Data Generator

**Date**: 2026-06-28 | **Spec**: `003-demo-test-data`

## Entities

### DemoItem (existing in demoData.ts)

Enhanced to meet FR-001 (15+ items, 2+ lists):

| Field | Type | Description |
|-------|------|-------------|
| `listId` | `string` | Links to a demo list — 2nd list uses new ID |
| `description` | `string` | English item name |
| `qualifier` | `string` | Amount/unit |
| `icon` | `string` | MaterialCommunityIcons name |
| `foodType` | `FoodType` | One of 13 existing food types |
| `purchased` | `boolean` | Mix of bought/unbought for demo realism |
| `order` | `number` | Sort order within list |
| `category` | `string` | Category key from i18n |

**Change**: Add 5+ items + create 2nd list (total: 15 items across 2 lists).

---

### TestItem (new — testData.ts)

| Field | Type | Valid Values | Description |
|-------|------|-------------|-------------|
| `nameEn` | `string` | Any English grocery name | Display name when lang='en' |
| `nameDe` | `string` | Any German grocery name | Display name when lang='de' |
| `foodType` | `FoodType` | `grain`, `dairy`, `meat`, `fish`, `fruit`, `vegetable`, `egg`, `sugar`, `beverage`, `oil`, `nuts`, `legume`, `spice`, `non_food` | Diet engine compatibility |
| `icon` | `string` | Valid MaterialCommunityIcons name | Display icon |
| `category` | `string` | From `CATEGORIES` in icons.ts | Grouping category |
| `tier` | `1 \| 2` | `1` (top 100), `2` (long-tail 100+) | Statistical frequency weight |

**Constraints**:
- `foodType` MUST NOT be `null` (FR-009)
- `icon` MUST NOT be empty string (FR-009)
- `category` MUST be a valid category key (FR-009)

---

### TestListGenerator (new — testData.ts)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `listCount` | `number` | `3` | Number of lists to generate |
| `minItems` | `number` | `8` | Min items per list |
| `maxItems` | `number` | `25` | Max items per list |
| `highTierWeight` | `number` | `70` | Probability (0-100) of picking from tier 1 |

**Output**: `{ lists: ShoppingList[], items: ShoppingItem[] }`

---

### TestDataResult (return type)

```typescript
interface TestDataResult {
  lists: ShoppingList[];   // Generated lists with short names ("Test List 1", etc.)
  items: ShoppingItem[];   // Generated items with unique IDs, linked to lists
}
```

---

## Existing Store Actions (reused)

| Action | Used by | Description |
|--------|---------|-------------|
| `addList(name)` | Demo/Test data loader | Creates a new list |
| `addItem(params)` | Demo/Test data loader | Creates a new item in a list |
| `getDemoData(lang)` | Demo data loader | Returns bilingual demo data set |

---

## Validation Rules

| Rule | Enforced where | Error if violated |
|------|---------------|-------------------|
| TestItem tier must be 1 or 2 | `generateTestLists()` | Skip item, log warning |
| TestItem foodType must not be null | TypeScript | Compile-time check |
| Generated list must have 8-25 items | `generateTestLists()` | Clamp to bounds |
| No duplicate items within a list | `generateTestLists()` | Re-roll duplicate pick |
