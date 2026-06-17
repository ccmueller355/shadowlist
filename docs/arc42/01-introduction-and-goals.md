# 1. Introduction and Goals

ShadowList is a local-first mobile shopping list app. It replaces paper lists and generic notes apps with a focused, category-aware shopping experience. The app runs entirely on-device — no accounts, no cloud sync, no network calls.

## Business Goals

- Provide a fast, focused shopping list experience on Android and iOS
- Zero onboarding friction — open the app and start typing
- On-device persistence with no account or sign-in required
- Delight users with a distinct Shadowrun pen-and-paper aesthetic

## Quality Goals

| ID | Quality | Motivation |
|----|---------|-----------|
| Q1 | Snappy input | Adding an item must feel instant (tap → visible in list < 100ms) |
| Q2 | Offline-first | Full functionality without network; zero cloud dependencies |
| Q3 | Data safety | Items must persist across app restarts; no data loss on crash |
| Q4 | Visual polish | Themed, consistent UI across screens; smooth animations |
| Q5 | Maintainability | Clean separation of concerns; typed interfaces; surgical edits |

## Stakeholders

| Role | Interest |
|------|----------|
| End user | Fast shopping list with category icons |
| Developer (me) | Clean codebase, easy to extend |
| AI coding agents | Legible structure for automated contributions |
