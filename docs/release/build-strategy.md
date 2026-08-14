# Build Strategy

shadowlist uses a single-build release pipeline. No redundant artifacts, no wasted EAS quota.

## Release Flow

```
feature → PR to main → merge (squash) → main
                                          │
                                          │ Tag main (e.g., v1.0.0)
                                          │  └→ EAS builds APK (preview profile)
                                          │     └→ GitHub Actions creates release artifact
                                          ▼
                                        main
```

## Key Decisions

**`main` is the single source of truth.** The legacy `release` branch has been deprecated. All builds and distribution artifacts are built from the `main` branch.

**Tags trigger automated builds.** Builds are automatically triggered on GitHub Actions when pushing semantic tags (`v*.*.*`). The suffix determines the profile:
- `-dev`: Development build (`development` profile)
- (none): Preview build (`preview` profile)
- `-prod`: Production build (`production` profile)

**Secondary option: On-Demand PR builds.** Every PR can trigger specific build actions using labels (e.g., `build:preview`) or comments (e.g., `/build-preview`). A bot comment with the EAS build URL persists on the PR page — permanent pointer to the APK.

**Squash-only merges.** One commit per feature on `main`. Full branch history stays local. This keeps the tree linear and makes build attribution trivial.

## Build Profile

| Profile | Trigger | Purpose |
|---------|---------|---------|
| `development` | Tag `v*.*.*-dev` or on-demand PR | Dev client for local testing |
| `preview` | Tag `v*.*.*` or on-demand PR | Test APK → release artifact |
| `production` | Tag `v*.*.*-prod` or on-demand PR | Future App Store / Play Store |

## Workflow File

See `.github/workflows/eas-build.yml` for the CI definition.
