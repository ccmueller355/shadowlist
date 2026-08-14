# IzzyOnDroid Submission Guide

IzzyOnDroid is an F-Droid compatible repository that serves pre-built APKs directly from developer sources (like GitHub Releases). Unlike the main F-Droid repository, IzzyOnDroid does not build the app from source. Instead, it regularly scans GitHub Releases for updates.

## One-Time Submission Process

To get ShadowList added to IzzyOnDroid, a one-time manual submission is required.

1.  **Ensure a Release Exists**: A public GitHub Release must exist with an attached APK. The release must use a semantic version tag (e.g., `v1.0.0`).
2.  **Go to the Submission Form**: Open the [IzzyOnDroid App Submission Form](https://apt.izzysoft.de/fdroid/index/apk?action=add).
3.  **Provide the Repository URL**: Enter the GitHub repository URL (`https://github.com/aethelred-cybernetics/shadowlist`).
4.  **Wait for Review**: The IzzyOnDroid maintainer will review the app for inclusion. The app must be open-source, not contain tracking/ads, and pass their scanner.

## Automated Updates

Once the app is accepted into the IzzyOnDroid repository, **no further manual action is needed for updates**.

IzzyOnDroid's automated systems will periodically ping the GitHub repository. When a new GitHub Release is created containing an updated APK artifact, IzzyOnDroid will automatically download it, scan it, and make it available to users via the F-Droid client.

## Requirements Checklist for IzzyOnDroid

*   [x] Open-source license (MIT in our case).
*   [x] Public GitHub repository.
*   [x] GitHub Releases used for distribution.
*   [x] APK artifacts attached to the GitHub Releases.
*   [x] App is signed with a consistent release key (handled via EAS production profile).
*   [x] No tracking SDKs, analytics, or ads.
*   [x] Fastlane structure with metadata and images (in `fastlane/metadata/android/`).
