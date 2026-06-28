# Data Model: Build Pipeline Setup

**Date**: 2026-06-27 | **Spec**: `004-build-pipeline`

This feature is infrastructure — the "data model" is the build configuration structure.

## eas.json

```json
{
  "cli": {
    "version": ">= 14.0.0"
  },
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Profiles

| Profile | Build Type | Output | Use Case |
|---------|-----------|--------|----------|
| `preview` | `apk` | `.apk` file | Dev testing, sideload on device |
| `production` | `app-bundle` | `.aab` file | Play Store submission |

### Environment Channels

Each profile maps to an EAS Update channel (for OTA JS bundle updates, if enabled later):

| Profile | Channel |
|---------|---------|
| `preview` | `preview` |
| `production` | `production` |

## Build Artifacts

Not stored in repo. Generated on demand via EAS cloud.

| Artifact | Profile | Description |
|----------|---------|-------------|
| `shadowlist-*-preview.apk` | preview | Debug-signed APK, installable on any Android device |
| `shadowlist-*-release.aab` | production | Release-signed Android App Bundle for Play Store |

## Version Sync Chain

```
package.json: version = "0.9.2"
         │
         │ npm run version (node script)
         ▼
app.json: expo.version = "0.9.2"
         │
         │ used by eas build
         ▼
APK manifest: versionName = "0.9.2"
```

No database or persistent data model changes. The build pipeline touches only config files.
