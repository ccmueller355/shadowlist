#!/usr/bin/env bash
# ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
# Switch app.json between Expo Go and APK build config.
# Expo Go: no EAS projectId (avoids remote update errors)
# APK build: includes EAS projectId (required for EAS Build)

set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: ./scripts/switch-config.sh [expo|apk]"
  echo ""
  echo "  expo   → app.json.expo  (Expo Go, no projectId, no remote update)"
  echo "  apk    → app.json.apk   (EAS Build, with projectId)"
  exit 1
fi

TARGET="$1"
SOURCE="app.json.$TARGET"

if [ ! -f "$SOURCE" ]; then
  echo "❌ Config file '$SOURCE' not found"
  exit 1
fi

cp "$SOURCE" app.json
echo "✅ Switched to $TARGET config → app.json"

if [ "$TARGET" = "expo" ]; then
  echo "   You can now run: npx expo start"
  echo "   (or reconnect Expo Go if server is running)"
elif [ "$TARGET" = "apk" ]; then
  echo "   You can now run: ./scripts/build-android.sh"
fi
