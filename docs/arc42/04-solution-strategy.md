# 4. Solution Strategy

## Architecture Pattern: Unidirectional Data Flow

```
User Action  ──▶  Zustand Store Action  ──▶  State Update
                                                    │
                                                    ▼
                                              AsyncStorage
                                              (side effect)
                                                    │
                                                    ▼
Screen/Component  ◀──  Zustand Selector  ◀──  New State
   (re-render)
```

Every user action dispatches a Zustand store action. The action:
1. Computes the new state immutably
2. Calls `set()` to update the Zustand store (triggers React re-renders)
3. Calls the corresponding AsyncStorage save function as a fire-and-forget side effect

## Key Architectural Decisions

1. **Zustand over Redux** — Minimal boilerplate, hooks-native, no provider wrapper needed
2. **AsyncStorage over SQLite** — Shopping lists are small (< 500 items typical); JSON serialization is adequate; no migration headaches
3. **Expo managed workflow over bare** — Faster development, OTA updates, Expo Go testing
4. **Component-level theme via hook** — `useAppTheme()` reads theme from Zustand; components re-render on theme change
5. **No DI container** — Store accessed directly via `useStore(selector)`; simplicity over testability

## Technology Stack Rationale

| Choice | Rationale |
|--------|-----------|
| Expo SDK 54 | Latest version available in Play Store Expo Go at time of downgrade |
| Zustand 5 | Tiny bundle, TypeScript-first, no boilerplate |
| React Navigation 7 | Native stack performance, type-safe params |
| react-native-draggable-flatlist | Only viable drag-to-reorder for RN; depends on gesture-handler + reanimated |
| react-native-paper | Only used for theming tokens in SettingsModal |
| react-native-toast-message | Lightweight toast; no UI framework dependency |
