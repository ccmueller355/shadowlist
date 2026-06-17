# 8. Cross-cutting Concepts

## State Management

**Zustand store** (`useStore.ts`) is the single source of truth. Key design patterns:

- **Selector pattern**: Components subscribe to slices via `useStore(s => s.xxx)` — avoids unnecessary re-renders
- **Actions as store methods**: All state mutation happens inside `create()` callbacks; no external reducers
- **Fire-and-forget persistence**: Every write action calls the corresponding `save*()` function *after* `set()`. Persistence failures do not block UI updates
- **Hydration gate**: `hydrated` flag prevents rendering until AsyncStorage data is loaded

## Theming

- **Theme definitions** in `themes.ts`: three `Theme` objects with colors, spacing, borderRadius, fontFamily
- **Theme hook** (`useAppTheme`): reads `settings.theme` from Zustand, returns the corresponding `Theme`
- **Style hook** (`useThemeStyles`): returns memoized common style objects (`bg`, `surface`, `text`, `border`, etc.) for the current theme
- **Static styles** use `StyleSheet.create` at module level (frozen after first render with default theme — acceptable tradeoff)
- **Legacy re-export**: `cyberpunkTheme.ts` re-exports `fixerTheme` as `cyberpunkTheme` for backward compatibility

## Persistence

- **Keys**: `@shadowlist/lists`, `@shadowlist/items`, `@shadowlist/settings`
- **Format**: JSON-serialized arrays/objects
- **Load**: `loadAllData()` runs `Promise.all` for parallel reads; falls back to defaults if settings are missing
- **Save**: Individual `save*()` functions; no batching, no debouncing (adequate for single-user local storage)
- **Clear**: `clearAllData()` uses `AsyncStorage.multiRemove()`

## Error Handling

- **Persistence errors**: Silently swallowed (AsyncStorage is reliable on modern RN; failure = corrupted device)
- **Input validation**: `description.trim()` with empty-string guard; no Zod/yup runtime validation
- **Alert dialogs**: Used for destructive actions (delete list, delete item)
- **Toast notifications**: Used for success/error feedback on every action

## Navigation

- **Stack**: React Navigation native stack with `slide_from_right` animation
- **Two screens**: `Home` and `ListDetail`
- **Type-safe params**: `RootStackParamList` with typed route params
- **Back button handling**: Android back button closes open modals before navigating away (`BackHandler` in `ListDetailScreen`)
