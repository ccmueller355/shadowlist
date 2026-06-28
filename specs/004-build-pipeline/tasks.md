# Tasks: Build Pipeline Setup

**Input**: Plan from `specs/004-build-pipeline/plan.md`

**Prerequisites**: spec.md, plan.md, research.md, data-model.md

**Tests**: Test tasks are included and MUST be written and FAIL before implementation (TDD discipline).

**Organization**: Tasks are grouped by phase with user story alignment. Parallelizable tasks marked `[P]`.

---

## Phase 1: Setup — EAS CLI & Project Linking

**Purpose**: Install tooling, link the project to Expo servers, configure the EAS project.

- [ ] T001 Verify EAS CLI availability — `npx eas --version` or install via `npm install -g eas-cli`
- [ ] T002 **[P]** Run `eas init` — link shadowlist to EAS project on Expo servers
      ⚠️ **Human gate**: opens browser for Expo account authentication
- [ ] T003 Run `eas build:configure` — generate initial `eas.json` at project root
- [ ] T004 **[P]** Review generated `eas.json` structure and verify it exists

**Checkpoint**: EAS CLI confirmed, project linked to Expo, `eas.json` generated.

---

## Phase 2: Foundation — Build Profile Configuration

**Purpose**: Configure eas.json with correct build profiles for dev preview and production release.

### Tests

- [ ] T005 Write test: validate `eas.json` has `build.preview` profile with `android.buildType: "apk"` — test script in `scripts/test-eas-config.sh`
- [ ] T006 Write test: validate `eas.json` has `build.production` profile with `android.buildType: "app-bundle"` — test script in `scripts/test-eas-config.sh`

### Implementation

- [ ] T007 **[P]** Configure `preview` profile in `eas.json` — `android.buildType: "apk"`
- [ ] T008 **[P]** Configure `production` profile in `eas.json` — `android.buildType: "app-bundle"`
- [ ] T009 Configure `submit.production` placeholder in `eas.json`
- [ ] T010 Add `cli.version: ">= 14.0.0"` constraint to `eas.json`
- [ ] T011 Run config validation test — `scripts/test-eas-config.sh` passes
- [ ] T012 Commit `eas.json` to version control on branch

**Checkpoint**: `eas.json` has two profiles, config validated, committed to repo.

---

## Phase 3: User Story 1 — Build Installable Preview APK (Priority: P1) 🎯 MVP

**Goal**: Developer runs a single command and gets an installable APK via EAS cloud build.

**Independent Test**: Run `./scripts/build-android.sh preview` → EAS build starts → APK download URL returned → install on device.

### Tests for US1

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 **[P]** **[US1]** Test: pre-build gates pass (tsc + npm test) — verify `scripts/build-android.sh` gates section works in isolation
- [ ] T014 **[P]** **[US1]** Test: build script exits with non-zero when tsc fails — introduce deliberate type error, run gate section, verify abort
- [ ] T015 **[P]** **[US1]** Test: build script exits with non-zero when test fails — break a test, run gate section, verify abort

### Implementation for US1

- [ ] T016 **[P]** **[US1]** Create `scripts/build-android.sh` — bash script with `set -euo pipefail`
- [ ] T017 **[P]** **[US1]** Implement gate section: `npx tsc --noEmit` with error surfacing
- [ ] T018 **[P]** **[US1]** Implement gate section: `npm test` with error surfacing
- [ ] T019 **[US1]** Implement EAS build launch: `npx eas build -p android --profile "$PROFILE"` with profile argument support
- [ ] T020 **[US1]** Wire profile argument — `./scripts/build-android.sh` defaults to `preview`, `./scripts/build-android.sh production` uses production
- [ ] T021 **[US1]** Add echo feedback steps: "Gate: TypeScript check...", "Gate: Running tests...", "Launching EAS build..."
- [ ] T022 Make executable `chmod +x scripts/build-android.sh`
- [ ] T023 **[US1]** Run gate tests (T013, T014, T015) — all pass
- [ ] T024 **[US1]** Run full build script — `./scripts/build-android.sh preview`
      ⚠️ **Human gate**: EAS cloud build takes ~10-15 min, returns APK download URL
- [ ] T025 **[US1]** **Manual verification**: Download APK → install on Android device → app boots, create list, add items, change theme, verify AsyncStorage persistence

**Checkpoint**: First installable APK on device. All core features verified.

---

## Phase 4: User Story 2 — CI Gates Integration (Priority: P2)

**Goal**: Pre-build gates prevent broken builds from wasting cloud build minutes.

**Independent Test**: Introduce a deliberate type error → `./scripts/build-android.sh` → "TypeScript check failed" → build aborted before EAS is called.

### Tests for US2

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T026 **[P]** **[US2]** Test: build script runs tsc gate first (before npm test) — already covered by T014 ordering test
- [ ] T027 **[P]** **[US2]** Test: build script does NOT call `eas build` if gates fail — capture stdout, confirm absence of "Launching EAS" string on gate failure
- [ ] T028 **[P]** **[US2]** Test: `scripts/test-eas-config.sh` validates eas.json structure

### Implementation for US2

- [ ] T029 **[P]** **[US2]** Add `scripts/test-eas-config.sh` — JSON structure validation for eas.json
- [ ] T030 **[P]** **[US2]** Ensure pre-build gates execute before EAS call (verify T026-T027)
- [ ] T031 **[US2]** Add clear error messages per gate failure: "TypeScript check failed — run npx tsc --noEmit to see errors"
- [ ] T032 **[US2]** Run CI gate tests — all pass

**Checkpoint**: Build script gates prevent broken builds from reaching EAS.

---

## Phase 5: User Story 3 — Production Build Profile (Priority: P3)

**Goal**: Developer can produce a release-grade AAB for Play Store submission.

**Independent Test**: `./scripts/build-android.sh production` → EAS production build starts → AAB returned.

### Tests for US3

> **Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T033 **[P]** **[US3]** Test: production profile exists in eas.json with `buildType: "app-bundle"` — extend `scripts/test-eas-config.sh`
- [ ] T034 **[P]** **[US3]** Test: `./scripts/build-android.sh production` passes gates and calls `eas build` with `--profile production`

### Implementation for US3

- [ ] T035 **[P]** **[US3]** Verify production profile in `eas.json` produces `.aab` output
- [ ] T036 **[US3]** Verify EAS auto-credentialing is active for production keystore
      (EAS handles this by default — T036 is a documentation step: confirm no manual keystore config needed)
- [ ] T037 **[US3]** Test: production build profile passes config validation

**Checkpoint**: Production profile ready. Build command supports both `preview` and `production`.

---

## Phase 6: Polish & Documentation

**Purpose**: README, version sync, final verification.

### Tests

- [ ] T038 Test: `npm run version` syncs `package.json` version to `app.json` correctly
      Write test: change version → run `npm run version` → read `app.json` → confirm match
- [ ] T039 Test: `npm run typecheck` exits with zero on current codebase

### Implementation

- [ ] T040 **[P]** Add "Building from source" section to `README.md`:
      ```markdown
      ## Building from source

      ### Prerequisites
      - Node.js ≥ 18
      - Expo account (free at expo.dev)

      ### Build
      ```bash
      npm install
      ./scripts/build-android.sh        # preview APK
      ./scripts/build-android.sh production # release AAB
      ```

      iOS builds require an Apple Developer Program membership ($99/yr) and a Mac.
      See [specs/004-build-pipeline/](specs/004-build-pipeline/) for full spec.
      ```
- [ ] T041 **[P]** Verify `npm run version` workflow — document in README under "Versioning"
- [ ] T042 Update `.gitignore` if EAS generates any cache files that need ignoring
      (Known: `.expo/` already ignored, `android/` and `ios/` ignored — verify nothing extra)
- [ ] T043 **[P]** Verify `npm run docs:build` still passes after README changes
- [ ] T044 **[P]** Final run: `npm run typecheck && npm test && npm run docs:build` — all green
- [ ] T045 Commit all remaining changes to branch

**Checkpoint**: All gates pass, README documents build process, version workflow clear.

---

## Phase 7: Pull Request & Review

**Purpose**: Complete the feature branch lifecycle per `.codewhale/instructions.md` (Feature Branch & PR Protocol).

- [ ] T046 Push branch to origin — `git push origin 004-build-pipeline`
- [ ] T047 Create GitHub Pull Request
      URL: https://github.com/ccmueller355/shadowlist/pull/new/004-build-pipeline
- [ ] T048 PR body: summarize changes, link to spec, note decisions made
- [ ] T049 Wait for CI to pass on PR (type-check, tests, coverage, docs build)
- [ ] T050 Merge via squash: `gh pr merge --squash --delete-branch`

**Checkpoint**: Feature merged to `main`, branch deleted remotely. One clean commit.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)         ─→ no deps, starts first
     │
     ▼
Phase 2 (Foundation)    ─→ needs Phase 1 done
     │
     ▼
Phase 3 (US1: APK)      ─→ needs Phase 1 + 2 done ← MVP gate
     │
     ├─→ Phase 4 (US2: CI gates) ─→ needs Phase 3 done (reuses build script)
     │
     └─→ Phase 5 (US3: Production) ─→ needs Phase 3 done (reuses build script)
     │
     ▼
Phase 6 (Polish)        ─→ needs Phase 3, 4, 5 done
     │
     ▼
Phase 7 (PR & merge)    ─→ needs Phase 6 done
```

### Parallel Opportunities

- T002 and T003: `eas init` and `eas build:configure` — sequential (init must come first)
- T007/T008: preview and production profile config — `[P]`, independent files
- T013/T014/T015: gate tests — `[P]`, independent test cases
- T016/T017/T018: build script skeleton + gate sections — `[P]`, parallel file writes
- T040/T041: README and version verification — `[P]`, independent concerns

### TDD Ordering

Within each phase, test tasks (T005-T006, T013-T015, T026-T028, T033-T034, T038-T039) MUST be written and FAIL before their corresponding implementation tasks. This is non-negotiable per the Constitution's verification discipline.

### Test Count

| Category | Count |
|----------|-------|
| Config validation tests | 4 (T005, T006, T033, T034) |
| Gate behavior tests | 3 (T013, T014, T015) |
| CI gate tests | 3 (T026, T027, T028) |
| Version/doc tests | 2 (T038, T039) |
| **Total** | **12 tests** |
