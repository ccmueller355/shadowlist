# 3. System Scope and Context

## System Context

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│   End User   │────▶│   ShadowList     │────▶│  AsyncStorage │
│  (shopper)   │     │   (Expo App)     │     │  (on-device)  │
└──────────────┘     └──────────────────┘     └──────────────┘
```

ShadowList is a standalone mobile app. It has no backend, no API, and no external dependencies beyond the Expo/React Native runtime. The only external system is the device's AsyncStorage, which is a built-in key-value store.

## External Interfaces

| Interface | Protocol | Purpose |
|-----------|----------|---------|
| AsyncStorage | Native module | Persist lists, items, and settings as JSON |
| Expo Vector Icons | Bundled font | Render MaterialCommunityIcons |
| Expo Go / dev client | Expo runtime | Development and testing |

## Business Context — Out of Scope

- Multi-device sync
- User accounts / authentication
- Sharing lists with other users
- Barcode scanning
- Price tracking / budgeting
- Push notifications
- Server-side anything
