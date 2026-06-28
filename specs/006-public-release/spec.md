# Feature Specification: Public Release Path (v1.0)

**Feature Branch**: `006-public-release`

**Created**: 2026-06-28

**Status**: Draft

**Input**: Mark the 1.0 release path to go public — GitHub Releases, F-Droid build configuration, IzzyOnDroid submission, multi-store deployment strategy, and release process automation.

## User Scenarios & Testing

### User Story 1 — Developer cuts a public release from main (Priority: P1)

A developer tags `v1.0.0` on `main`. The release workflow automatically:
1. Builds a release-ready APK via EAS cloud (signed with production keystore) 
2. Attaches the APK to the GitHub Release
3. Publishes the release notes from CHANGELOG.md

Users see the release on the GitHub Releases page and can download the APK directly.

**Why this priority**: Without a release process, every deploy is manual. This makes "shipping" a one-command action with zero friction.

**Independent Test**: Tag `v1.0.0` → `git push --tags` → GitHub Release appears with APK → download and install.

**Acceptance Scenarios**:

1. **Given** `main` is green (tsc + tests + docs) and version is bumped, **When** the developer runs the release script, **Then** a GitHub Release draft is created with the version tag
2. **Given** the release is published, **When** a user visits the releases page, **Then** they see release notes and a downloadable APK
3. **Given** an existing release, **When** the user installs the APK over a previous install, **Then** AsyncStorage data persists

---

### User Story 2 — F-Droid builds the app from source (Priority: P2)

The F-Droid build farm clones the repo, runs `npx expo prebuild && cd android && ./gradlew assembleRelease`, and produces a reproducible APK without any Expo cloud dependency. The F-Droid metadata file (`.fdroid.yml` or `metadata/`) is committed to the repo.

**Why this priority**: F-Droid reaches the FOSS community. Requires zero EAS quota and builds independently of any cloud service.

**Independent Test**: Fresh clone → `npx expo prebuild` → `cd android && ./gradlew assembleRelease` → APK installs on device.

**Acceptance Scenarios**:

1. **Given** a clean checkout of the repo, **When** `npx expo prebuild` runs, **Then** a valid `android/` directory is generated
2. **Given** the `android/` directory, **When** `cd android && ./gradlew assembleRelease` runs, **Then** a release APK is produced
3. **Given** the APK, **When** installed on an Android device, **Then** all features work identically to the EAS-built APK

---

### User Story 3 — IzzyOnDroid repo auto-updates from GitHub Releases (Priority: P3)

Once a GitHub Release is published, the APK is also available on IzzyOnDroid (a popular F-Droid-compatible repo). The submitter uploads the APK once via IzzyOnDroid's submission form, and subsequent updates are pulled from the GitHub Releases page via built-in update detection.

**Why this priority**: IzzyOnDroid appears in the F-Droid client with one repo tap. Users get automatic update notifications without needing Obtainium. Less critical because GitHub Releases + Obtainium already covers this.

**Independent Test**: Submit APK to IzzyOnDroid → repo appears in F-Droid client → install → future releases auto-detect.

**Acceptance Scenarios**:

1. **Given** a signed APK from EAS, **When** submitted to IzzyOnDroid via their form, **Then** the app appears in the IzzyOnDroid repo
2. **Given** the app is on IzzyOnDroid, **When** a new GitHub Release publishes, **Then** IzzyOnDroid detects the new version and offers the update

---

### Edge Cases

- **Local build fails**: `expo prebuild` requires all native deps resolvable at runtime — if a package lacks Android native support, the Gradle build fails. Fallback: build via EAS.
- **F-Droid license check**: F-Droid requires a recognized FOSS license. We have `LICENSE` (MIT) — this should be fine.
- **Play Store requirement**: Not in scope for v1.0 — would need `$25` and store screenshots.
- **iOS**: Not in scope for v1.0 — requires Mac + Apple Developer membership.
- **Version skew between stores**: Each store will have slightly different timing for release approval. Track the version across all stores to ensure consistency.

## Requirements

### Functional Requirements

- **FR-001**: Release script MUST create a GitHub Release with the version tag, APK artifact, and release notes from CHANGELOG.md
- **FR-002**: The project MUST have a release script at `scripts/release.sh` that: (a) verifies gates, (b) bumps version, (c) creates tag, (d) triggers EAS build, (e) attaches APK to release
- **FR-003**: The repo MUST include an F-Droid build script at `scripts/build-fdroid.sh` that runs `npx expo prebuild && cd android && ./gradlew assembleRelease`
- **FR-004**: The F-Droid metadata file MUST be committed at `.fdroid.yml` or `metadata/` in the repo root
- **FR-005**: The `android/` directory MUST NOT be committed to the repo — it MUST be generatable via `npx expo prebuild`
- **FR-006**: All verification gates (tsc, tests, coverage, docs) MUST pass before any release script proceeds
- **FR-007**: The release APK MUST be signed with the EAS production keystore (not debug) for store compatibility
- **FR-008**: Release notes MUST be auto-generated from CHANGELOG.md entries for the current version
- **FR-009**: The IzzyOnDroid submission process MUST be documented in `docs/release/izzyondroid.md`
- **FR-010**: The release process SHALL be documented in `docs/release/workflow.md`

### Key Entities

- **Release**: A GitHub Release object containing a version tag, APK artifact, and markdown notes
- **F-Droid Metadata**: A configuration file (`.fdroid.yml`) describing the repo, license, categories, and build commands for F-Droid's build farm
- **EAS Build Artifact**: The signed APK produced by `eas build -p android --profile production`
- **Gradle Artifact**: The unsigned (or locally-signed) APK produced by `./gradlew assembleRelease`

## Success Criteria

### Measurable Outcomes

- **SC-001**: A first-time release (tag → build → publish) takes under 30 minutes of developer time
- **SC-002**: F-Droid build completes from a clean checkout in under 15 minutes (Expo prebuild + Gradle compile)
- **SC-003**: APK size is under 80 MB (current baseline: ~78 MB)
- **SC-004**: Release notes are generated automatically and require zero manual editing
- **SC-005**: Zero additional dependencies beyond what `npm install --legacy-peer-deps` provides are needed for the F-Droid build

## Assumptions

- The app is already stable enough for a 1.0 release (feature-complete and tested on device)
- No Play Store submission is planned for v1.0 — distribution via GitHub Releases + F-Droid + IzzyOnDroid
- The developer has an Expo account and EAS credits for the production build
- F-Droid's build farm runs Ubuntu with standard Android SDK (build-tools, platform-tools, NDK)
- iOS release is deferred entirely — not in scope for v1.0 or the public release path
- The app icon and assets are finalized before the 1.0 release
- IzzyOnDroid accepts APKs submitted manually via their web form — no automated CI pipeline needed
