#!/usr/bin/env bash
# ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
# Build Android APK — gates on TypeScript + tests, then launches EAS cloud build
# Usage: ./scripts/build-android.sh [preview|production]
#   preview    (default) → debug APK for dev testing
#   production           → release AAB for Play Store

set -euo pipefail

PROFILE="${1:-preview}"

echo "╔══════════════════════════════════════════════╗"
echo "║   shadowlist Android Build Pipeline          ║"
echo "╠══════════════════════════════════════════════╣"
echo "║  Profile: $PROFILE"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Gate 1: TypeScript check ──
echo "==> Gate 1/2: TypeScript check..."
if ! npx tsc --noEmit; then
  echo ""
  echo "❌ TypeScript check failed — run 'npx tsc --noEmit' to see errors"
  exit 1
fi
echo "  ✅ TypeScript check passed"
echo ""

# ── Gate 2: Unit tests ──
echo "==> Gate 2/2: Running tests..."
if ! npm test; then
  echo ""
  echo "❌ Tests failed — run 'npm test' to see details"
  exit 1
fi
echo "  ✅ All tests passed"
echo ""

# ── Config validation ──
echo "==> Validating eas.json..."
if bash scripts/test-eas-config.sh; then
  echo ""
  echo "  ✅ Config validated"
else
  echo ""
  echo "❌ eas.json validation failed — fix before building"
  exit 1
fi
echo ""

# ── Launch EAS build ──
echo "╔══════════════════════════════════════════════╗"
echo "║   Launching EAS Build (profile: $PROFILE)    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Build runs on Expo cloud (~10-15 min)"
echo "  You will receive a download URL when complete."
echo ""
npx eas build -p android --profile "$PROFILE"
