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

**Fast-forward only on `release`.** Every PR against `release` MUST be a clean fast-forward from `main`. If it's not fast-forwardable, the PR is invalid. `release` is always a direct descendant of `main` — no independent commits, no merge commits, no divergence.

**If `release` diverges:** this is a critical state. Delete `release` and recreate from `main`:
```bash
gh api repos/ccmueller355/shadowlist/git/refs/heads/release -X DELETE
git push origin main:release
```
This is the only exception to the no-direct-push rule and requires operator acknowledgment.

## Build Profile

| Profile | Trigger | Purpose |
|---------|---------|---------|
| `preview` | PR against `release` | Test APK → release artifact |
| `development` | Manual (`eas build`) | Dev client for local testing |
| `production` | Deferred | Future App Store / Play Store |

## Workflow File

See `.github/workflows/eas-build.yml` for the CI definition.
