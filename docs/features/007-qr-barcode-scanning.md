# Feature 007: QR/Barcode Scanning and Name Lookup

## Research on Free APIs

To implement product lookup via barcode/QR code, we need a reliable, free database that can resolve EAN/UPC barcodes to product names and categories.

**Chosen Provider: Open Food Facts**
- **Endpoint:** `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- **Cost:** Free, open data (ODbL license).
- **Features:** Huge database of global food products. Provides `product_name`, `brands`, `image_url`, `categories`, and more.
- **Authentication:** None required for read access.
- **Limitations:** Primarily food products. Non-food items (like electronics or hardware) will likely not be found. Rate limits are generous but should be respected.

**Alternative Providers Evaluated:**
- **UPCItemDB:** Free tier available (100 req/day), good for general items, but low limit.
- **Edamam:** Requires API keys, more focused on nutrition.

## Usefulness Rating
**Rating:** 4/5 (High)

*Pros:*
- Speeds up item entry for physical items you already have on hand (e.g., when you run out of something and want to add it to the list).
- Reduces typos and normalizes product names.

*Cons:*
- Users don't always have the empty packaging when building a shopping list (often built from memory or recipes).
- Slower than quick-typing for fast power-users.

## Cost and Time Required
**Time to Implement:**
- **Prototype:** ~1-2 hours (React Native Expo Camera setup, basic API fetch).
- **Production-Ready:** ~4-6 hours (handling camera permissions gracefully, offline fallbacks, loading states, error handling for unknown barcodes, mapping Open Food Facts categories to ShadowList categories).

**Financial Cost:** $0
- Open Food Facts API is free.
- `expo-camera` is included in the Expo SDK ecosystem.

**Technical Cost:**
- Increases app bundle size slightly due to the camera native module.
- Requires user to grant camera permissions (needs clear UX explanation).
