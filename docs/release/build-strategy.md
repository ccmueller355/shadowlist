# Build Strategy

shadowlist uses a single-build release pipeline. No redundant artifacts, no wasted EAS quota.

## Release Flow

```
feature → PR to main → merge (squash) → main
                                          │
                                          │ PR main → release
                                          │  └→ EAS builds APK (preview profile)
                                          │     └→ bot comments build URL on PR
                                          │        └→ download APK, test on device
                                          │           └→ merge (squash)
                                          ▼
                                       release
```

## Key Decisions

**`release` is a marker branch, not a build trigger.** The APK is built once — during the PR from `main` to `release`. After testing, you merge the PR. No second build on the merge commit; the PR's artifact IS the release artifact.

**No CI triggers on `main`.** `main` is a clean integration branch. Builds only happen when cutting a release (PR against `release`).

**Breadcrumb comments.** Every PR against `release` gets a bot comment with the EAS build URL. Even after the PR is merged and the branch deleted, the comment persists on the PR page — permanent pointer to the APK.

**Squash-only merges.** One commit per feature on `main` and `release`. Full branch history stays local. This keeps the tree linear and makes build attribution trivial.

## Build Profile

| Profile | Trigger | Purpose |
|---------|---------|---------|
| `preview` | PR against `release` | Test APK → release artifact |
| `development` | Manual (`eas build`) | Dev client for local testing |
| `production` | Deferred | Future App Store / Play Store |

## Workflow File

See `.github/workflows/eas-build.yml` for the CI definition.
