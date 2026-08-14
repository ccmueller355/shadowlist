# Release Workflow

## Branch Strategy

| Branch | Purpose | CI Trigger |
|--------|---------|------------|
| `main` | Active development | Type-check + tests + coverage + docs build (`deploy-docs.yml`) |
| `release` | EAS preview builds | Type-check + tests + EAS build (`eas-build.yml`) |

The same `release` branch serves all distribution channels. Differentiation
happens through build profiles:

| Build Type | Trigger | Profile | What you get |
|-----------|---------|---------|-------------|
| Dev client | Manual `eas build -p android --profile development` | `development` | Install-once dev app. Then `npx expo start` for hot reload — fast iteration |
| Preview APK | Push to `release` | `preview` | Standalone APK. Install on device, test without dev server |
| Production | Later (deferred) | `production` | Signed AAB for store submission |

## Prerequisites

- `EXPO_TOKEN` secret set in **GitHub → Settings → Secrets and variables → Actions**
- One successful `eas build -p android` run locally (project initialized on EAS)
- Local `.env` with `EXPO_TOKEN` if running builds from CLI

## Cutting a Preview Release

```bash
# 1. Ensure main is green
git checkout main
npm run typecheck
npm test

# 2. Merge to release
git checkout release
git merge main
git push
```

Wait for the CI run. It:
1. Installs dependencies
2. Runs TypeScript check
3. Runs tests
4. Fires `eas build --platform android --profile preview`

Build progress: https://expo.dev/accounts/ccmueller/projects/shadowlist/builds

## Setting Up the Dev Client (One-Time)

```bash
eas build --platform android --profile development --non-interactive
# Install the APK on device.
# After that: npx expo start  → scan QR code → hot reload
```

The dev client needs to be built once per Expo SDK version bump.
For daily development, just `npx expo start` — no EAS build needed.

## Future Stores

| Store | Method | Branch Needed? | Notes |
|-------|--------|:-------------:|-------|
| Google Play | EAS Submit + production AAB | ❌ Tag-based | Requires Google Play Console account ($25 fee) |
| F-Droid | Build farm (gradle, no EAS) | ❌ Any branch | Repo has `.fdroid.yml` metadata |
| IzzyOnDroid | Auto-detect from GitHub Releases | ❌ Tag-based | One-time manual submission, then auto-updates |

## Rollback

If a release has issues after EAS build started:

```bash
git push --delete origin release
# force-push previous good state
git checkout release
git reset --hard <last-good-commit>
git push -f origin release
```

Or skip the EAS build entirely by fixing on `main` and re-merging.
