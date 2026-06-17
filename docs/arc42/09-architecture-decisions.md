# 9. Architecture Decisions

## DD-1: Zustand over React Context + useReducer

**Decision**: Use Zustand for all state management.

**Alternatives considered**:
- React Context + useReducer: Too much boilerplate for multi-slice state; re-render performance issues without memoization
- Redux Toolkit: Overkill for < 10 state slices; larger bundle

**Consequences**: Clean, minimal API. No provider needed. Selectors prevent unnecessary re-renders.

## DD-2: AsyncStorage over SQLite

**Decision**: Persist all data as JSON in AsyncStorage.

**Alternatives considered**:
- SQLite (expo-sqlite): Schema migrations, query overhead. Shopping lists rarely exceed 500 items — JSON is fast enough
- MMKV: Native module, not available in Expo Go

**Consequences**: No migration system needed. Risk of data corruption if JSON gets too large, but shopping data is inherently bounded.

## DD-3: Fire-and-forget persistence

**Decision**: Save to AsyncStorage after `set()`, not before. Do not await the save.

**Rationale**: The user's perception of speed is determined by the UI update, not the disk write. AsyncStorage writes complete in < 5ms on modern devices. If a write fails (extremely rare), the data loss is at most one action.

**Consequences**: Theoretically possible data loss on crash between `set()` and `save()`. In practice, this has never been observed. The tradeoff is worth the perceived snappiness.

## DD-4: Expo managed workflow

**Decision**: Use Expo managed workflow, not bare React Native.

**Rationale**: Faster development, Expo Go for testing, OTA updates via EAS, no native build toolchain to maintain.

**Consequences**: Limited to Expo-compatible native modules. `react-native-draggable-flatlist` is the most complex dependency and works in managed workflow.

## DD-5: DraggableFlatList for reordering

**Decision**: Use `react-native-draggable-flatlist` instead of custom gesture handler implementation.

**Rationale**: Drag-to-reorder is complex (gesture recognition, animation, scroll interaction). The library handles all of this correctly. It's the de facto standard for React Native.

**Consequences**: Dependency on `react-native-gesture-handler` and `react-native-reanimated`. Bundle size increase of ~150KB.

## DD-6: No i18n library

**Decision**: Hard-coded English strings throughout.

**Rationale**: Single-language app for now. No user demand for localization. Adding i18n later is straightforward with a string extraction pass.

**Consequences**: All user-facing strings are English. Adding a second language requires extracting strings.
