#!/usr/bin/env bash
# ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
# shadowlist Release Script
# Verifies gates, extracts release notes, tags the release, builds via EAS, and creates a GitHub Release.
#
# Usage: ./scripts/release.sh [development|preview|production]
# Default profile is 'preview'.

set -euo pipefail

PROFILE="${1:-preview}"
VERSION=$(node -p "require('./package.json').version")
TAG="v${VERSION}"

# Adjust tag based on profile
if [ "$PROFILE" == "development" ]; then
  TAG="${TAG}-dev"
elif [ "$PROFILE" == "production" ]; then
  TAG="${TAG}-prod"
fi

echo "╔══════════════════════════════════════════════╗"
echo "║   shadowlist Release Pipeline                ║"
echo "╠══════════════════════════════════════════════╣"
echo "║  Target Version : $VERSION"
echo "║  Target Tag     : $TAG"
echo "║  EAS Profile    : $PROFILE"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Check for required tools ──
if ! command -v gh &> /dev/null; then
  echo "❌ Error: GitHub CLI ('gh') is not installed. Please install it first."
  exit 1
fi
if ! command -v jq &> /dev/null; then
  echo "❌ Error: 'jq' is not installed. Please install it first."
  exit 1
fi

# ── Gate 1: Git Status ──
echo "==> Gate 1/4: Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Working directory is not clean. Commit or stash changes before releasing."
  exit 1
fi
echo "  ✅ Working directory clean"
echo ""

# ── Gate 2: TypeScript check ──
echo "==> Gate 2/4: TypeScript check..."
if ! npm run typecheck; then
  echo ""
  echo "❌ TypeScript check failed."
  exit 1
fi
echo "  ✅ TypeScript check passed"
echo ""

# ── Gate 3: Unit tests ──
echo "==> Gate 3/4: Running tests..."
if ! npm test; then
  echo ""
  echo "❌ Tests failed."
  exit 1
fi
echo "  ✅ All tests passed"
echo ""

# ── Gate 4: Extract Release Notes ──
echo "==> Gate 4/4: Extracting release notes from CHANGELOG.md..."
# Extract notes for the current version using awk
NOTES_FILE=$(mktemp)
awk -v ver="v$VERSION" '
  $0 ~ "^## " ver {flag=1; next}
  /^## v[0-9]+\.[0-9]+\.[0-9]+/ && flag {flag=0; exit}
  flag {print}
' CHANGELOG.md | sed -e '/^[[:space:]]*$/d' > "$NOTES_FILE"

if [ ! -s "$NOTES_FILE" ]; then
  echo "❌ Error: Could not find release notes for v$VERSION in CHANGELOG.md"
  rm "$NOTES_FILE"
  exit 1
fi
echo "  ✅ Release notes extracted"
echo ""

# ── Tag the Release ──
echo "==> Tagging release $TAG..."
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "⚠️  Tag $TAG already exists."
  read -p "Do you want to delete the existing tag and recreate it? (y/N) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git tag -d "$TAG"
    # Also attempt to delete from origin, ignoring errors
    git push origin --delete "$TAG" 2>/dev/null || true
  else
    echo "❌ Release aborted."
    rm "$NOTES_FILE"
    exit 1
  fi
fi

git tag "$TAG"
echo "  ✅ Tagged $TAG"
echo "==> Pushing tag to origin..."
git push origin "$TAG"
echo "  ✅ Tag pushed"
echo ""

# ── EAS Build ──
echo "╔══════════════════════════════════════════════╗"
echo "║   Launching EAS Build (profile: $PROFILE)    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  This will take ~10-15 minutes..."
echo ""

BUILD_OUTPUT_FILE=$(mktemp)
if ! npx eas build --platform android --profile "$PROFILE" --non-interactive --wait --json > "$BUILD_OUTPUT_FILE"; then
  echo "❌ EAS Build failed. See output above."
  rm "$NOTES_FILE" "$BUILD_OUTPUT_FILE"
  exit 1
fi

echo "  ✅ EAS Build completed"
echo ""

# Parse the JSON output to get the download URL
APK_URL=$(jq -r '.[0].artifacts.buildUrl // ""' "$BUILD_OUTPUT_FILE")

if [ -z "$APK_URL" ] || [ "$APK_URL" == "null" ]; then
  echo "❌ Could not extract APK download URL from EAS build output."
  cat "$BUILD_OUTPUT_FILE"
  rm "$NOTES_FILE" "$BUILD_OUTPUT_FILE"
  exit 1
fi

echo "==> Downloading APK from $APK_URL..."
APK_FILENAME="shadowlist-${TAG}.apk"
curl -sL "$APK_URL" -o "$APK_FILENAME"
echo "  ✅ Downloaded $APK_FILENAME"
echo ""

# ── Create GitHub Release ──
echo "==> Creating GitHub Release for $TAG..."
gh release create "$TAG" "$APK_FILENAME" \
  --title "ShadowList $VERSION" \
  --notes-file "$NOTES_FILE"

echo ""
echo "🎉 Release $TAG published successfully to GitHub Releases!"
echo "https://github.com/aethelred-cybernetics/shadowlist/releases/tag/$TAG"

rm "$NOTES_FILE" "$BUILD_OUTPUT_FILE"
exit 0
