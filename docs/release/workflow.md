# Release Workflow

## Branch Strategy

| Branch | Purpose | CI Trigger |
|--------|---------|------------|
| `main` | Single source of truth / Active development | Type-check + tests + coverage + docs build + tags trigger EAS builds |

The `main` branch serves all distribution channels, maintaining a clean linear history. The legacy `release` branch has been deprecated. Differentiation happens through tags and their corresponding build profiles:

| Build Type | Trigger | Profile | What you get |
|-----------|---------|---------|-------------|
| Dev client | Semantic tag `v*.*.*-dev` | `development` | Install-once dev app. Then `npx expo start` for hot reload — fast iteration |
| Preview APK | Semantic tag `v*.*.*` | `preview` | Standalone APK. Install on device, test without dev server |
| Production | Semantic tag `v*.*.*-prod` | `production` | Signed AAB/IPA for store submission |

*Note: All profiles can also be triggered manually via GitHub Actions UI (`workflow_dispatch`) by selecting the profile from the dropdown.*

## Prerequisites

- `EXPO_TOKEN` secret set in **GitHub → Settings → Secrets and variables → Actions**
- One successful `eas build -p android` run locally (project initialized on EAS)
- Local `.env` with `EXPO_TOKEN` if running builds from CLI

## Cutting a Release

To cut a release, tag a commit on `main` and push the tag.

```bash
# 1. Ensure main is green
git checkout main
npm run typecheck
npm test

# 2. Tag for the required profile (e.g., preview)
git tag v1.2.3

# 3. Push the tag
git push origin v1.2.3
```

Wait for the CI run. It:
1. Installs dependencies
2. Runs TypeScript check
3. Runs tests
4. Fires `eas build --platform android` (or `all`) with the corresponding profile

Build progress: https://expo.dev/accounts/aethelred-cybernetics/projects/shadowlist/builds

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

If a release has issues, simply push a new tag pointing to the last known good commit or revert the changes on `main` and cut a new patch release.

## On-Demand Workflow

You can trigger specific EAS actions on Pull Requests via labels or comments. This provides a secondary option to generate test builds without needing to push tags manually.

| Trigger | Label | Comment | Action |
|---------|-------|---------|--------|
| Preview Build | `build:preview` | `/build-preview` | `eas build -p android --profile preview` |
| Development Build | `build:dev` | `/build-dev` | `eas build -p android --profile development` |
| Production Build | `build:production` | `/build-production` | `eas build -p all --profile production` |
| Over-The-Air Update | `eas:update` | `/eas-update` | `eas update --auto` |

**Security Note:** On-demand workflows will only execute for project members or collaborators (`OWNER`, `MEMBER`, `COLLABORATOR`). Bot triggers or comments from public contributors will be ignored for security reasons.

**Output:** Upon completion, the bot will post the build link, a download URL, and an installation QR code directly back to the pull request.
