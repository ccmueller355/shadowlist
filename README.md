# ShadowList

A Shadowrun-themed shopping list app for Android and iOS, built with React Native and Expo.

Keep your grocery runs clean and your deck cooler. Three hand-crafted themes, drag-to-reorder, 54 category icons — all running on-device with zero cloud dependencies.

## Features

- **Three themes** — Fixer's Notebook (dark noir), Stuffer Shack (aged parchment), Decker's Den (synth terminal)
- **Drag-to-reorder** — Pivot your list mid-run with `react-native-draggable-flatlist`
- **54 category icons** — Groceries, pharmacy, OBI/DIY, clothing, electronics, pets, and more
- **19 categories** — Group items and sort by category
- **Fast add with dedup** — Type-and-enter; already-in-list items skip, bought items re-add
- **Inline qualifier editing** — Tap a qualifier to edit it right in the row
- **On-device persistence** — AsyncStorage, local-only, no account needed
- **Toast notifications** — Clean confirmations on every action
- **Demo data** — One-tap load for testing and screenshots

## Screenshots

<!-- TODO: add screenshots -->
*Screenshots coming soon.*

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.81 + Expo SDK 54 |
| Language | TypeScript 5 |
| Navigation | React Navigation 7 (native stack) |
| State | Zustand 5 |
| Persistence | AsyncStorage |
| Gestures | react-native-gesture-handler + reanimated |
| Icons | @expo/vector-icons (MaterialCommunityIcons) |
| Toast | react-native-toast-message |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Expo Go on your phone, or an Android/iOS emulator

### Install

```bash
git clone https://github.com/ccmueller/shadowlist.git
cd shadowlist
npm install
```

### Run

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). Or press `a` for Android emulator / `i` for iOS simulator.

### Verify

```bash
npx tsc --noEmit   # type-check
```

## Project Structure

```
shadowlist/
├── App.tsx                          # Root component
├── index.ts                         # Entry point
├── src/
│   ├── components/                  # Reusable UI surfaces
│   │   ├── AddItemBar.tsx           # Search/add input bar
│   │   ├── CyberpunkCard.tsx        # Styled card wrapper
│   │   ├── EditModal.tsx            # Item edit modal
│   │   ├── EmptyPlaceholder.tsx     # Empty-state view
│   │   ├── IconPickerGrid.tsx       # Icon picker grid
│   │   ├── ItemRow.tsx              # Single item row
│   │   ├── ListCard.tsx             # List card (HomeScreen)
│   │   └── SettingsModal.tsx        # Settings modal
│   ├── constants/
│   │   ├── demoData.ts              # Demo lists and items
│   │   └── icons.ts                 # 54 icons + 19 categories
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Stack navigator
│   ├── screens/
│   │   ├── HomeScreen.tsx           # List overview
│   │   └── ListDetailScreen.tsx     # Single list with items
│   ├── storage/
│   │   └── asyncStorage.ts          # Persistence layer
│   ├── store/
│   │   └── useStore.ts              # Zustand state store
│   ├── theme/
│   │   ├── cyberpunkTheme.ts        # Legacy re-export
│   │   ├── themes.ts                # 3 theme definitions
│   │   ├── useTheme.ts              # Theme hook
│   │   └── useThemeStyles.ts        # Style memoization hook
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── utils/
│       ├── debounce.ts              # Debounce utility
│       └── uuid.ts                  # ID generation
├── assets/                          # App icons and images
├── docs/                            # Architecture documentation
└── package.json
```

## Architecture

See [docs/arc42.md](docs/arc42.md) for the full arc42 architecture documentation.

## Contributing

1. Read `AGENTS.md` for AI agent instructions
2. Match existing code style — surgical edits, no unsolicited refactors
3. TypeScript strict mode is on — keep it that way
4. Test on both iOS and Android simulators before submitting

## License

TBD
