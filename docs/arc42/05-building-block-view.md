# 5. Building Block View

## Level 1 — Whitebox

```
┌───────────────────────────────────────────────┐
│                  App.tsx                       │
│  ┌─────────────────────────────────────────┐  │
│  │          AppNavigator                    │  │
│  │  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │  HomeScreen  │  │ ListDetailScreen│  │  │
│  │  └──────┬───────┘  └────────┬────────┘  │  │
│  │         │                   │            │  │
│  │         ▼                   ▼            │  │
│  │  ┌──────────────────────────────────┐   │  │
│  │  │         useStore (Zustand)       │   │  │
│  │  │  lists │ items │ settings │ ...  │   │  │
│  │  └──────────────┬───────────────────┘   │  │
│  │                 │                        │  │
│  │                 ▼                        │  │
│  │  ┌──────────────────────────────────┐   │  │
│  │  │      asyncStorage.ts             │   │  │
│  │  │  load/save lists, items, settings│   │  │
│  │  └──────────────────────────────────┘   │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

## Level 2 — Component Inventory

| Building Block | Type | Responsibility |
|---------------|------|---------------|
| `App.tsx` | Root | Mount store hydration, render navigator |
| `AppNavigator` | Navigation | Stack navigator with Home → ListDetail routes |
| `HomeScreen` | Screen | List overview: CRUD lists, settings access |
| `ListDetailScreen` | Screen | Single list: CRUD items, search, drag-reorder |
| `ListCard` | Component | Card for a shopping list on HomeScreen |
| `ItemRow` | Component | Single item row with checkbox, icon, description, qualifier |
| `AddItemBar` | Component | Search/add input bar with suggestions dropdown |
| `EditModal` | Component | Modal for editing item details (icon, category, description, qualifier, delete) |
| `IconPickerGrid` | Component | Grid of 54 icons for item icon selection |
| `SettingsModal` | Component | Modal for theme picker, sort toggle, demo data, clear all |
| `CyberpunkCard` | Component | Styled card wrapper with theme-aware colors |
| `EmptyPlaceholder` | Component | Empty-state message with icon |
| `useStore` | Store | Zustand store: lists, items, settings, all actions |
| `asyncStorage` | Storage | AsyncStorage wrapper with typed load/save functions |
| `themes.ts` | Theme | Three theme definitions (fixer, stuffer, decker) |
| `useAppTheme` | Hook | Returns current Theme object from store |
| `useThemeStyles` | Hook | Returns memoized common style objects for current theme |
| `types/index.ts` | Types | `ShoppingList`, `ShoppingItem`, `AppSettings`, `NewItemParams`, `ThemeName` |
| `icons.ts` | Constants | 54 icon definitions + 19 category names |
| `demoData.ts` | Constants | Pre-built demo lists and items |
| `uuid.ts` | Utility | UUID v4 generation |
| `debounce.ts` | Utility | Debounce helper |
