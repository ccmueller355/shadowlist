# Feature Specification: Build Pipeline Setup

**Feature Branch**: `004-build-pipeline`

**Created**: 2026-06-27

**Status**: Draft

**Input**: Set up EAS Build deployment pipeline for shadowlist (Expo SDK 54). Create installable APK via cloud build, configure build profiles, enable CI-backed builds for indie deployment. Data must survive app updates; backup/export mechanism to survive uninstall/reinstall is tracked separately (spec 005).

## User Scenarios & Testing

### User Story 1 — Developer builds an installable APK from the terminal (Priority: P1)

A developer runs `eas build -p android --profile preview` from the project root. The build runs on Expo's cloud infrastructure, completes in ~15 minutes, and returns a download URL for a signed APK. The developer installs it on their Android device.

**Why this priority**: Without an installable APK, no one can run the app outside of Expo Go. This is the gate to all real-world testing.

**Independent Test**: Run `eas build -p android --profile preview` → receive APK download URL → install on Android device → app boots, AsyncStorage data from previous install survives.

**Acceptance Scenarios**:

1. **Given** an Expo project with EAS configured, **When** developer runs `eas build -p android --profile preview`, **Then** the build completes successfully and returns a signed APK URL
2. **Given** the APK installed on a device, **When** the app launches, **Then** all features work identically to Expo Go (lists, items, settings, dietary rules, themes, i18n)
3. **Given** an existing APK install with user data, **When** a new APK is installed over it (version update), **Then** all AsyncStorage data persists intact

---

### User Story 2 — CI gates prevent a broken build from shipping (Priority: P2)

A developer makes a change and runs the build pipeline. Before the cloud build starts, TypeScript check and Jest tests run locally. If either fails, the build is aborted with a clear error message listing what broke.

**Why this priority**: Saves 15-minute cloud build cycles on preventable errors. Keeps the feedback loop tight.

**Independent Test**: Introduce a deliberate type error → run the pipeline → build is aborted at the tsc gate with the error surfaced.

**Acceptance Scenarios**:

1. **Given** a TypeScript error in the codebase, **When** the build pipeline runs, **Then** `tsc --noEmit` fails and the build is aborted before any cloud minutes are consumed
2. **Given** a failing test, **When** the build pipeline runs, **Then** `npm test` fails and the build is aborted
3. **Given** all gates pass, **When** the build pipeline runs, **Then** `eas build` proceeds to cloud compilation

---

### User Story 3 — Developer builds for production release (Priority: P3)

A developer prepares a version bump and runs `eas build -p android --profile production`. The build uses the production keystore (auto-managed by EAS), produces a release-grade APK/AAB ready for Play Store upload.

**Why this priority**: v1.0 store submission needs a production build. Lower priority because this is only needed once — all iterative testing happens on preview builds.

**Independent Test**: Bump version in `package.json` → run `eas build -p android --profile production` → verify APK is signed with production keystore.

**Acceptance Scenarios**:

1. **Given** a version bump, **When** the production build runs, **Then** it produces a Play Store-compatible AAB (Android App Bundle)
2. **Given** the production build, **When** inspected, **Then** the APK is signed with EAS-managed production credentials

---

### Edge Cases

- **EAS init not run**: If `eas init` has not been executed, `eas build` fails with a clear error directing the developer to run it first
- **No Expo account**: Running `eas build` without being logged in prompts browser-based OAuth login
- **Build failure (network/timeout)**: Cloud build fails mid-way — retry with `eas build --retry` or fix the error and rebuild
- **Free tier exhausted**: After 30 builds/month, the free tier blocks new builds — developer gets a clear error about quota and upgrade options
- **Android only**: iOS builds are out of scope for v1.0 (no Mac available for local testing, iOS EAS builds require Hobby tier)
- **Store submission**: Play Store upload and store listing are explicitly out of scope — this spec covers only generating the build artifact

## Requirements

### Functional Requirements

- **FR-001**: Project MUST have an EAS project linked via `eas init` before any build can proceed
- **FR-002**: System MUST provide at least two build profiles in `eas.json`: `preview` (debug APK for testing) and `production` (release AAB for store)
- **FR-003**: The `preview` profile MUST produce a standalone APK installable on any Android device without Expo Go
- **FR-004**: Before any build, the pipeline MUST run `npx tsc --noEmit` and `npm test` as local gates
- **FR-005**: If either gate fails, the build MUST abort with the gate output surfaced
- **FR-006**: Android keystore MUST be managed by EAS auto-credentialing (no manual keystore file in repo)
- **FR-007**: The app version MUST be settable via `package.json` and auto-synced to `app.json` via `npm version` script
- **FR-008**: The project MUST have a valid `eas.json` checked into version control
- **FR-009**: AsyncStorage data MUST persist across app version updates (installing APK over existing install)
- **FR-010**: The build script MUST be documented in README under a "Building from source" section

### Key Entities

- **eas.json**: Build profile configuration file at project root; must be committed to VCS
- **app.json**: Expo configuration with version auto-synced from package.json
- **APK/AAB artifact**: The output build file, not stored in repo, distributed via EAS download URL or store upload

## Success Criteria

### Measurable Outcomes

- **SC-001**: A first-time developer can go from `git clone` to installable APK in under 30 minutes, including Expo account creation and EAS setup
- **SC-002**: `eas build -p android --profile preview` completes in under 20 minutes (Expo cloud SLA)
- **SC-003**: All 73 tests pass and `tsc --noEmit` produces zero errors before any build proceeds
- **SC-004**: Version bump (`npm version patch`) correctly propagates to both `package.json` and `app.json`
- **SC-005**: Installed APK launches without crash on Android 11, 12, 13, 14 (API 30-34), verified by manual install test

## Assumptions

- Developer has an Expo account (free, created at expo.dev)
- Developer has Node.js ≥ 18 and npm installed locally
- Android device or emulator available for install testing
- No custom native modules — the current all-managed-workflow dependencies are sufficient
- iOS builds are deferred to a future spec (requires Apple Developer Program membership + $99/yr)
- Cloud build network is available (Expo's EAS servers)
