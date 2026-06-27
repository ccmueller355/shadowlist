# Research: Build Pipeline Setup

**Date**: 2026-06-27 | **Spec**: `004-build-pipeline`

## Research Items

### 1. EAS Build for Expo SDK 54 (Android)

| Item | Finding |
|------|---------|
| Build profiles | `eas.json` supports `development`, `preview`, `production` by default |
| Preview profile | Produces a debug APK signed with EAS dev keystore — installable directly on device |
| Production profile | Produces a release AAB (Android App Bundle) signed with production keystore |
| Keystore management | EAS auto-credentialing handles keystore generation and signing — no manual `.jks` file needed |
| Free tier limits | 30 Android builds/month, zero iOS builds |
| iOS builds | Require Hobby tier ($12/mo) + Apple Developer Program ($99/yr) |
| Build time | Cloud builds average 10-15 minutes, peak at ~20 |

**Decision**: Use two profiles (`preview` for dev testing, `production` for store). Android only for v1.

### 2. EAS CLI Workflow

| Step | Command | Notes |
|------|---------|-------|
| Link project | `eas init` | Opens browser for Expo account auth — one-time, user-interactive |
| Generate config | `eas build:configure` | Creates `eas.json` at project root |
| Build APK | `eas build -p android --profile preview` | Cloud build, returns download URL |
| Build AAB | `eas build -p android --profile production` | For Play Store submission |

**Decision**: Document the exact commands in the plan. The `eas init` step requires user interaction (browser login) — flag as a human-gate step.

### 3. CI Gate Integration

| Gate | Command | Current status |
|------|---------|---------------|
| TypeScript | `npx tsc --noEmit` | ✅ Already passes, exists as `npm run typecheck` |
| Unit tests | `npm test` | ✅ All 73 tests pass |
| Version sync | `npm version patch` (manual update) | ✅ Script exists: `npm run version` syncs to `app.json` |

**Decision**: Create a local build script `scripts/build-android.sh` that runs gates → triggers `eas build`. CI workflow (GitHub Actions) is deferred — can be added later from the manual script pattern.

### 4. iOS Status

iOS builds are **deferred** in this spec. Current blockers:
- No Apple Developer Program membership ($99/yr)
- No Mac available for local testing
- EAS iOS requires Hobby tier or a Mac build machine
- `app.json` already has `ios.supportsTablet: true` — minimal config is ready

**Decision**: Android-only for v1.0. iOS is tracked as a future feature when the user has the necessary hardware/account.

### 5. Alternatives Considered

| Alternative | Why rejected |
|-------------|-------------|
| Android Studio local build | Requires JDK + Android SDK + Gradle install (~8-12 GB). EAS cloud is zero-footprint on dev machine. |
| Bare RN CLI | No native modules needed — managed Expo workflow is sufficient. Extra complexity for zero gain. |
| Fastlane | Overkill for single-platform indie pipeline. EAS handles signing and submission natively. |
| CI-only builds (GitHub Actions) | Adds complexity to debug build failures without local feedback. Local script + manual EAS is simpler for indie workflow. |
