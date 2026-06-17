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
- **No CI/CD pipeline configured** — builds run locally via EAS
- **No analytics, no crash reporting** — pure local app
