# Feature 007: QR & Barcode Scanning and Product Lookup

## Overview

ShadowList Feature #007 integrates real-time optical barcode and QR code scanning directly into the item entry workflow. Users can scan product barcodes in-store, query product metadata from the Open Food Facts API, and automatically populate the item description with brand and product details.

## User Story

As a runner navigating the aisles:
1. Tap the scan trigger in the item entry bar.
2. Grant camera permissions if requested.
3. Aim the camera reticle at a product's barcode or QR code.
4. The scanner detects the code, queries product metadata via the Open Food Facts API, and automatically populates the input field (e.g. "Oatly Oat Milk Barista").
5. If the product is not in the database or the network is unavailable, the scanned barcode number is pre-filled as fallback text with immediate toast feedback.

## Architecture & Components

```
┌────────────────────────────────────────────────────────┐
│                      AddItemBar                        │
│   [Input: "Search or add..."] [Scan Button] [+]        │
└──────────────────────────┬─────────────────────────────┘
                           │ presses scan button
                           ▼
┌────────────────────────────────────────────────────────┐
│                 BarcodeScannerModal                    │
│   - expo-camera / CameraView (back camera)             │
│   - Cyberpunk HUD Reticle & Corner Brackets            │
│   - SYS://OPTICAL_MATRIX_ACTIVE status display         │
│   - Torch / Flashlight toggle                          │
│   - Android Hardware BackHandler support               │
└──────────────────────────┬─────────────────────────────┘
                           │ onBarcodeScanned(barcode)
                           ▼
┌────────────────────────────────────────────────────────┐
│              lookupBarcode(barcode)                    │
│   - Target: https://world.openfoodfacts.org/api/v0/    │
│   - Supported types: QR, EAN-13, EAN-8, UPC-A, UPC-E,  │
│     Code 128, Code 39                                  │
│   - Resolves: { productName, brand, error }            │
└──────────────────────────┬─────────────────────────────┘
                           │ result
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Toast & Input Fill                   │
│   - Success: "Found: Oatly Oat Milk Barista"           │
│   - Info: "Product not found" (inputs raw barcode)     │
│   - Error: "Lookup failed"                             │
└────────────────────────────────────────────────────────┘
```

### 1. Camera Engine (`expo-camera`)
- Uses `CameraView` and `useCameraPermissions` from `expo-camera` (~57.0.5).
- Configured with plugin permissions in `app.json` (`cameraPermission: "Allow ShadowList to access your camera to scan barcodes."`).
- Barcode types enabled: `qr`, `ean13`, `ean8`, `upc_a`, `upc_e`, `code128`, `code39`.

### 2. Scanner Interface (`src/components/BarcodeScannerModal.tsx`)
- Full-screen modal conforming to the ShadowList cyberpunk aesthetic across all themes.
- Interactive flashlight toggle with state indicators.
- In-HUD permission request dialog if camera authorization is not yet granted.
- Single-scan debouncing: immediately prevents duplicate rapid captures once a valid barcode is locked.
- Clean dismissal via close button, abort button, or Android hardware back navigation.

### 3. Barcode Lookup Utility (`src/utils/barcodeLookup.ts`)
- Multi-source resolution chain:
  1. Open Food Facts World REST API (`https://world.openfoodfacts.org/api/v0/product/{barcode}.json`).
  2. Open Food Facts DE REST API (`https://de.openfoodfacts.org/api/v0/product/{barcode}.json`).
  3. Open GTIN DB (`https://opengtindb.org/` EAN database) with HTML entity decoding.
  4. Curated EU / German retail fallback catalog for common retail items (e.g. Landliebe Milch, Haribo, Nutella, Ritter Sport).
- Includes custom `User-Agent: ShadowList - Mobile - Version 0.19.9`.
- Integrates with local food resolution engine (`src/utils/foodLookup.ts`):
  - Automatically derives `foodType` and `category` (via `FOOD_TYPE_TO_CATEGORY`, e.g. dairy -> 'Groceries').
  - Supports both full product name and canonical clean name (`preferCleanName`), while preserving brand and category metadata.
- Graceful offline and failure handling returning structured `{ productName, brand, cleanName, fullName, foodType, icon, category, source, error }` payloads.

### 4. Input & Screen Integration (`src/components/AddItemBar.tsx` & `src/screens/ListDetailScreen.tsx`)
- Dynamic scan icon (`barcode-scan`) displayed when the search/add input field is empty.
- Automatically hides scan icon and displays clear button (`close-circle`) when user types text.
- Prefills resolved product name in `AddItemBar` and passes resolved category and foodType to `ListDetailScreen`.
- Displays immediate toast notifications (`react-native-toast-message`) indicating lookup progress, success, or offline fallbacks.

### 5. Internationalization (`src/i18n/en.ts`, `src/i18n/de.ts`)
- All scanner UI labels, status messages, permission prompts, and toast strings are fully translated into English and German under the `scanner.*` namespace.

## Verification & Test Coverage

- **`src/__tests__/barcodeLookup.test.ts`**: Complete suite covering empty strings, HTTP errors, 404/not found responses, missing fields, fallbacks to English/generic product names, and URL encoding.
- **`src/__tests__/barcodeScannerModal.test.tsx`**: Tests permission grant/denial flows, loading states, torch toggle states, scanning event handler de-duplication, and Android hardware back button handler.
- **`src/__tests__/interactions.test.tsx`**: Verifies dynamic scan button visibility, modal opening, barcode scan event processing, mock API responses, and input value setting.
- **`src/__tests__/i18n.test.ts`**: Validates 100% key parity between English and German translation files for scanner keys.
