# 2. Architecture Constraints

## Technical Constraints

| Constraint | Detail |
|-----------|--------|
| Platform | Android + iOS via Expo managed workflow |
| SDK | Expo SDK 54 (targets Expo Go compatibility on Play Store) |
| Language | TypeScript 5 with strict mode |
| State management | Zustand (no Redux, no Context-heavy solutions) |
| Persistence | AsyncStorage only (no SQLite, no MMKV) |
| Navigation | React Navigation 7 native stack |
| Package manager | npm |
| Node.js | ≥ 18 |

## Organizational Constraints

- Single-developer project
- AI-assisted development (CodeWhale, Copilot)
- Agent instruction files (`AGENTS.md`, `WHALE.md`) constrain how AI agents modify the codebase
- Surgical edits preferred — no unsolicited refactors
- Changelog maintained in `CHANGELOG.md`

## Conventions

- One component, one file, one concern
- Plain React hooks + Zustand — no HOCs, render props, or premature abstractions
- `StyleSheet.create` for static styles; `useThemeStyles` hook for dynamic theming
- UUIDs for all entity IDs (`crypto.randomUUID()` with fallback)
- Code style: no semicolons (standard React Native convention)
