# Implementation Plan: Build Pipeline Setup

**Branch**: `004-build-pipeline` | **Date**: 2026-06-27 | **Spec**: `specs/004-build-pipeline/spec.md`

**Input**: Feature specification from `specs/004-build-pipeline/spec.md` — set up EAS Build deployment pipeline for shadowlist (Expo SDK 54), create installable APK via cloud build, configure build profiles, enable CI-backed builds for indie deployment.

## Summary

Set up a complete Android build pipeline for shadowlist using Expo's EAS Build cloud service. The pipeline consists of: (1) one-time EAS project initialization, (2) `eas.json` with two profiles (preview/production), (3) a local build script that gates on TypeScript + tests before launching the cloud build, (4) the first APK build, and (5) README documentation. iOS is explicitly deferred.

Approach: managed Expo workflow, zero local native toolchain. All compilation runs on Expo's cloud infrastructure. Free tier covers 30 Android builds/month.

## Technical Context

**Language/Version**: TypeScript 6.0, React Native 0.81, Expo SDK 54

**Primary Dependencies**: EAS CLI (`eas-cli` installed globally), Expo CLI (already available)

**Storage**: No storage changes — build artifacts live on EAS cloud, not in repo

**Testing**: Existing Jest suite (73 tests) + `tsc --noEmit` as pre-build gates

**Target Platform**: Android 11+ (API 30-34) via APK/AAB

**Project Type**: Mobile app (React Native + Expo managed workflow)

**Performance Goals**: N/A — infrastructure setup, no runtime performance target

**Constraints**: iOS builds blocked (no Apple Developer account); free tier caps at 30 Android builds/month; `eas init` requires user browser interaction for Expo auth

**Scale/Scope**: Single developer, single platform (Android), single app (shadowlist)

## Constitution Check

*GATE: This project uses CodeWhale Constitution + `.codewhale/instructions.md` as its governing documents, not the ShadowLink Rust Core constitution found in `.specify/memory/constitution.md`.*

The ShadowLink Rust Core constitution (`.specify/memory/constitution.md`) is from a different project — it does not apply to shadowlist.

shadowlist's governing rules are:
- **Constitution of CodeWhale** (Articles I-VII)
- **Statutes** (mode, approval, tool-use discipline)
- **Local Law** (`.codewhale/instructions.md` — Valerie Decker persona, Karpathy protocol, verification gates)
- **Evidence** (tool output, file contents)

**Relevant local-law gates for this feature**:
- Type-check must pass (`npx tsc --noEmit`)
- Tests must pass (`npm test`)
- Coverage must be above threshold (15% lines)
- Build docs must be clean (`npm run docs:build`)
- Copyright header (`NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT`) not needed on config files (eas.json, build scripts are exempt)

## Project Structure

### Documentation (this feature)

```text
specs/004-build-pipeline/
├── spec.md              # ✅ done — feature specification
├── research.md          # ✅ done — research findings & decisions
├── data-model.md        # ✅ done — eas.json structure & config
├── plan.md              # ← THIS FILE
├── quickstart.md        # (skipped — integration guide not needed for infrastructure)
├── tasks.md             # (created by speckit.tasks command)
└── contracts/           # (skipped — no external interfaces)
```

### Source changes (touched files)

```text
shadowlist/
├── eas.json                     # NEW — build profile config (committed)
├── scripts/
│   └── build-android.sh         # NEW — local build script (gates + deploy)
├── .gitignore                   # MODIFY — ensure EAS cache dirs are ignored
├── README.md                    # MODIFY — add "Building from source" section
└── specs/004-build-pipeline/    # ✅ spec + research + data-model + plan
```

**Structure Decision**: All build config files sit at the project root (standard Expo convention). Build script lives in `scripts/` alongside any future tooling. No new source code directories needed.

## Implementation Phases

### Phase 1: EAS Initialization

**Steps**:
1. Install/verify EAS CLI: `npm install -g eas-cli` or `npx eas --version`
2. Link project: `eas init` — creates EAS project on Expo servers
   ⚠️ **Human gate**: Opens browser for Expo account login
3. Generate config: `eas build:configure` — creates `eas.json`

**Outcome**: EAS project linked, `eas.json` created at project root.

**FRs covered**: FR-001 (EAS project linked), FR-008 (eas.json in VCS)

---

### Phase 2: Build Profile Configuration

**Steps**:
1. Edit `eas.json` with two profiles:
   - `preview`: Android APK build for dev testing
   - `production`: Android AAB build for store release
2. Verify config: `npx eas build:version get` or similar

**Profile structure** (from data-model.md):
```json
{
  "cli": { "version": ">= 14.0.0" },
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {}
  }
}
```

**Outcome**: Clean `eas.json` with both profiles, committed to repo.

**FRs covered**: FR-002 (two build profiles), FR-003 (preview produces APK), FR-008 (committed)

---

### Phase 3: Build Script & Gates

**Steps**:
1. Create `scripts/build-android.sh`:
   ```bash
   #!/usr/bin/env bash
   set -euo pipefail
   
   PROFILE="${1:-preview}"
   
   echo "==> Gate: TypeScript check..."
   npx tsc --noEmit
   
   echo "==> Gate: Running tests..."
   npm test
   
   echo "==> Launching EAS build (profile: $PROFILE)..."
   npx eas build -p android --profile "$PROFILE"
   ```

2. Make executable: `chmod +x scripts/build-android.sh`

3. Test: run `scripts/build-android.sh` (should pass gates and prompt to start EAS build — or show "not logged in" error if EAS not set up yet)

**Outcome**: One command (`./scripts/build-android.sh` or `./scripts/build-android.sh production`) gates then builds.

**FRs covered**: FR-004 (gates before build), FR-005 (abort on gate failure), FR-010 (build script documented)

---

### Phase 4: First Build

**Steps**:
1. Run: `./scripts/build-android.sh preview`
2. EAS cloud compiles the APK (~10-15 min)
3. Receive download URL from EAS
4. Download APK, install on Android device
5. Verify: app boots, scrolls, creates lists, data persists

**Outcome**: First installable APK on device.

**FRs covered**: FR-003 (preview APK), FR-009 (AsyncStorage survives update)

---

### Phase 5: Documentation

**Steps**:
1. Update `README.md` with "Building from source" section:
   - Prerequisites (Node.js, Expo account)
   - Quick start: `git clone`, `npm install`, `./scripts/build-android.sh`
   - Build profiles explained
   - Note about iOS (future)
2. Commit `eas.json`, `scripts/build-android.sh`, and README changes

**Outcome**: Documentation in README for future developer (or future you).

**FRs covered**: FR-010 (README documentation)

---

### Phase 6: Version Sync (validation)

**Steps**:
1. Verify `npm run version` script correctly syncs package.json → app.json
2. Document the version bump workflow in README:
   ```bash
   npm version patch   # bumps to 0.9.3
   # then build
   ./scripts/build-android.sh preview
   ```

**Outcome**: Clear version bump workflow for releases.

**FRs covered**: FR-007 (version sync via npm version)

---

## Rollout Order

| Phase | Depends on | Auto/human |
|-------|-----------|------------|
| 1. EAS Init | Nothing | **Human**: needs Expo browser login |
| 2. Profile config | Phase 1 | Auto (writes) |
| 3. Build script | Nothing | Auto (writes) |
| 4. First build | Phase 1 + 2 + 3 | **Human**: wait 10-15 min for build |
| 5. Documentation | Phase 2 + 3 | Auto (writes) |
| 6. Version verification | None | Auto (read + verify) |

## Test Strategy

| Test | How | When |
|------|-----|------|
| TypeScript gate | `npx tsc --noEmit` passes | Before every build |
| Jest suite | `npm test` — 73 tests pass | Before every build |
| Build script smoke | `./scripts/build-android.sh` runs gates to completion | After Phase 3 |
| APK install | Manual install on Android device | After Phase 4 (first build) |
| Data persistence | Install APK over existing install, check data intact | After first build |
| Version sync | `npm version patch` then check app.json | Phase 6 |

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `eas init` fails due to auth | Low | Clear instructions: sign up at expo.dev, then run command |
| EAS cloud build failure | Low | Retry with `--retry`; check build logs in Expo dashboard |
| Free tier exhausted | Medium after heavy use | Upgrade to Hobby tier ($12/mo) or batch builds |
| Expo SDK version incompatible | Low | App already uses SDK 54, fully compatible with current EAS |
| `eas.json` format change | Low | Follow Expo docs reference at docs.expo.dev/eas/json/ |

## Handoff Packet

For continuation by another agent or session:

- Current branch: `004-build-pipeline`
- Next action: Phase 1 — run `npm install -g eas-cli` then `eas init` (requires user browser interaction)
- Key config: `eas.json` will be created with `preview` (APK) and `production` (AAB) profiles
- Build script at `scripts/build-android.sh` — gates on tsc + tests, then launches EAS build
- Prompt-cache note: all plan artifacts are in `specs/004-build-pipeline/`
