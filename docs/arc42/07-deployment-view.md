# 7. Deployment View

## Development

```
Developer machine
    ├── Node.js ≥ 18
    ├── npm install
    ├── npx expo start
    └── Expo Go on physical device or emulator
```

## Production Build

```
npx expo export       # web (not primary target)
eas build -p android  # Android APK/AAB
eas build -p ios      # iOS IPA
```

## Infrastructure

- **No server infrastructure** — app is fully client-side
- **No database** — AsyncStorage on device
- **CI/CD via GitHub Actions** — automated builds on GitHub Actions trigger Expo EAS builds. This includes automated builds on tag pushes (`v*.*.*`) and on-demand PR label/comment triggers.
- **No analytics, no crash reporting** — pure local app
