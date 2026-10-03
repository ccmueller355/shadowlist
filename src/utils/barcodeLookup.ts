// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───

export interface BarcodeLookupResult {
  productName: string | null;
  brand: string | null;
  error?: string;
}

/**
 * Looks up a barcode using the Open Food Facts API.
 * @param barcode The EAN or UPC barcode string
 * @returns A promise resolving to the product details or an error object.
 */
export async function lookupBarcode(barcode: string): Promise<BarcodeLookupResult> {
  const trimmed = barcode?.trim();
  if (!trimmed) {
    return { productName: null, brand: null, error: 'Empty barcode' };
  }

  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(trimmed)}.json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ShadowList - Mobile - Version 0.19.9',
      },
    });

    if (!response.ok) {
      return { productName: null, brand: null, error: `HTTP error ${response.status}` };
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
      return { productName: null, brand: null, error: 'Product not found' };
    }

    const product = data.product;
    const productName =
      product.product_name?.trim() ||
      product.product_name_en?.trim() ||
      product.generic_name?.trim() ||
      null;
    const brand = product.brands?.trim() || null;

    return {
      productName,
      brand,
    };
  } catch (error: any) {
    return { productName: null, brand: null, error: error?.message || 'Network error' };
  }
}
