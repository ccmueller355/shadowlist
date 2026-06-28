#!/usr/bin/env bash
# ─── [ NEURAL DECK v4.6 $ AI::GENERATED :: NO COPYRIGHT ] ───
# eas.json structure validation — run before any build to ensure profiles are correct

set -euo pipefail

EAS_JSON="./eas.json"
FAILED=0

if [ ! -f "$EAS_JSON" ]; then
  echo "❌ FAIL: $EAS_JSON not found"
  exit 1
fi

echo "==> Validating $EAS_JSON..."

# Test 1: preview profile with android.buildType: apk
PREVIEW_TYPE=$(python3 -c "
import json
with open('$EAS_JSON') as f:
    d = json.load(f)
print(d.get('build', {}).get('preview', {}).get('android', {}).get('buildType', 'MISSING'))
")
if [ "$PREVIEW_TYPE" = "apk" ]; then
  echo "  ✅ preview → android.buildType = apk"
else
  echo "  ❌ FAIL: preview.android.buildType should be 'apk', got '$PREVIEW_TYPE'"
  FAILED=1
fi

# Test 2: production profile with android.buildType: app-bundle
PROD_TYPE=$(python3 -c "
import json
with open('$EAS_JSON') as f:
    d = json.load(f)
print(d.get('build', {}).get('production', {}).get('android', {}).get('buildType', 'MISSING'))
")
if [ "$PROD_TYPE" = "app-bundle" ]; then
  echo "  ✅ production → android.buildType = app-bundle"
else
  echo "  ❌ FAIL: production.android.buildType should be 'app-bundle', got '$PROD_TYPE'"
  FAILED=1
fi

# Test 3: eas.json has required top-level keys
python3 -c "
import json
with open('$EAS_JSON') as f:
    d = json.load(f)
assert 'build' in d, 'Missing top-level \"build\" key'
assert 'submit' in d, 'Missing top-level \"submit\" key'
assert 'cli' in d, 'Missing top-level \"cli\" key'
print('  ✅ eas.json has build, submit, cli keys')
" || { echo "  ❌ FAIL: missing required keys"; FAILED=1; }

if [ $FAILED -eq 0 ]; then
  echo "✅ All eas.json checks passed"
else
  echo "❌ Some checks failed — fix before building"
  exit 1
fi
