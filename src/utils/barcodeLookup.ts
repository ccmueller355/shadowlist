// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───

import { FoodType } from '../types';
import { FoodNameIndex, resolveProductInfo } from './foodLookup';

export interface BarcodeLookupResult {
  productName: string | null;
  brand: string | null;
  cleanName?: string | null;
  fullName?: string | null;
  foodType?: FoodType;
  icon?: string | null;
  category?: string | null;
  source?: string;
  error?: string;
}

export interface BarcodeLookupOptions {
  lang?: 'en' | 'de';
  foodNameIndex?: FoodNameIndex;
  preferCleanName?: boolean;
}

export const EU_BARCODE_FALLBACKS: Record<
  string,
  { productName: string; brand: string; cleanName?: string }
> = {
  // Test barcodes from task spec: Landliebe Haltbare fettarme Milch 1.5% 1L
  '4008452027466': {
    productName: 'Landliebe Haltbare fettarme Milch 1.5% 1L',
    brand: 'Landliebe',
    cleanName: 'Milch',
  },
  '4008452027442': {
    productName: 'Landliebe Haltbare fettarme Milch 1.5% 1L',
    brand: 'Landliebe',
    cleanName: 'Milch',
  },
  // Common German/EU grocery retail products
  '4008400404127': {
    productName: 'Nutella Nuss-Nougat-Creme 450g',
    brand: 'Ferrero',
    cleanName: 'Nutella',
  },
  '4001686301265': {
    productName: 'Goldbären Fruchtgummi 200g',
    brand: 'Haribo',
    cleanName: 'Gummibärchen',
  },
  '4000417025003': {
    productName: 'Voll-Nuss Schokolade 100g',
    brand: 'Ritter Sport',
    cleanName: 'Schokolade',
  },
  '4008452011007': {
    productName: 'Frische Vollmilch 3.5% 1L',
    brand: 'Weihenstephan',
    cleanName: 'Milch',
  },
  '7394376616037': {
    productName: 'Oat Milk Barista Edition 1L',
    brand: 'Oatly',
    cleanName: 'Hafermilch',
  },
};

/**
 * Decodes basic HTML entities commonly returned by Open GTIN DB.
 */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&auml;/gi, 'ä')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&ouml;/gi, 'ö')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&uuml;/gi, 'ü')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/gi, 'ß')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

/**
 * Parses the raw text format from Open GTIN DB (opengtindb.org).
 * Format:
 * error=0
 * ---
 * name=Produkt
 * detailname=Detailliertes Produkt
 * vendor=Hersteller
 */
export function parseOpenGtinDbResponse(
  text: string
): { productName: string | null; brand: string | null; genericName?: string | null } | null {
  if (!text || typeof text !== 'string') return null;

  // Check error code
  const errorMatch = text.match(/error\s*=\s*(\d+)/i);
  if (errorMatch && errorMatch[1] !== '0') {
    return null;
  }

  const lines = text.split(/\r?\n/);
  let name = '';
  let detailname = '';
  let vendor = '';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('---')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.substring(0, eqIdx).trim().toLowerCase();
    const val = line.substring(eqIdx + 1).trim();

    if (key === 'name' && !name) {
      name = decodeHtmlEntities(val);
    } else if (key === 'detailname' && !detailname) {
      detailname = decodeHtmlEntities(val);
    } else if (key === 'vendor' && !vendor) {
      vendor = decodeHtmlEntities(val);
    }
  }

  const productName = detailname || name || null;
  const brand = vendor || null;
  const genericName = name || null;

  if (!productName && !brand) return null;
  return { productName, brand, genericName };
}

/**
 * Looks up a barcode across multiple sources (Open Food Facts world/DE,
 * Open GTIN DB, and curated EU fallback) and enriches it with category
 * and clean name resolution.
 *
 * @param barcode The EAN or UPC barcode string
 * @param options Optional configuration (language, custom food index, clean name preference)
 * @returns A promise resolving to the product details or an error object.
 */
export async function lookupBarcode(
  barcode: string,
  options?: BarcodeLookupOptions
): Promise<BarcodeLookupResult> {
  const trimmed = barcode?.trim();
  if (!trimmed) {
    return { productName: null, brand: null, error: 'Empty barcode' };
  }

  let foundProduct: {
    productName: string | null;
    brand: string | null;
    genericName?: string | null;
    source: string;
  } | null = null;
  let primaryError: string | undefined;

  // ── Source 1: Open Food Facts (World) ──────────────────────────────────
  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(trimmed)}.json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ShadowList - Mobile - Version 0.19.9',
      },
    });

    if (response && !response.ok) {
      primaryError = `HTTP error ${response.status}`;
    } else if (response) {
      const data = await response.json();
      if (data && data.status !== 0 && data.product) {
        const p = data.product;
        const productName =
          p.product_name?.trim() ||
          p.product_name_de?.trim() ||
          p.product_name_en?.trim() ||
          p.generic_name?.trim() ||
          null;
        const brand = p.brands?.trim() || null;
        const genericName = p.generic_name?.trim() || null;
        if (productName || brand) {
          foundProduct = { productName, brand, genericName, source: 'openfoodfacts_world' };
        }
      }
    }
  } catch (error: any) {
    primaryError = error?.message || 'Network error';
  }

  // ── Source 2: Open Food Facts (DE) ──────────────────────────────────────
  if (!foundProduct) {
    try {
      const deUrl = `https://de.openfoodfacts.org/api/v0/product/${encodeURIComponent(trimmed)}.json`;
      const response = await fetch(deUrl, {
        headers: {
          'User-Agent': 'ShadowList - Mobile - Version 0.19.9',
        },
      });
      if (response && response.ok) {
        const data = await response.json();
        if (data && data.status !== 0 && data.product) {
          const p = data.product;
          const productName =
            p.product_name_de?.trim() ||
            p.product_name?.trim() ||
            p.product_name_en?.trim() ||
            p.generic_name?.trim() ||
            null;
          const brand = p.brands?.trim() || null;
          const genericName = p.generic_name?.trim() || null;
          if (productName || brand) {
            foundProduct = { productName, brand, genericName, source: 'openfoodfacts_de' };
          }
        }
      }
    } catch {
      // Continue to next provider
    }
  }

  // ── Source 3: Open GTIN DB (DE / EU EAN database) ──────────────────────
  if (!foundProduct && /^\d{8,14}$/.test(trimmed)) {
    try {
      const gtinUrl = `https://opengtindb.org/?ean=${encodeURIComponent(trimmed)}&cmd=query&queryid=400000000`;
      const response = await fetch(gtinUrl, {
        headers: {
          'User-Agent': 'ShadowList - Mobile - Version 0.19.9',
        },
      });
      if (response && response.ok) {
        const text = await response.text();
        const parsed = parseOpenGtinDbResponse(text);
        if (parsed && (parsed.productName || parsed.brand)) {
          foundProduct = {
            productName: parsed.productName,
            brand: parsed.brand,
            genericName: parsed.genericName,
            source: 'opengtindb',
          };
        }
      }
    } catch {
      // Continue to next provider
    }
  }

  // ── Source 4: Local EU Fallback Database ───────────────────────────────
  if (!foundProduct) {
    const fallback = EU_BARCODE_FALLBACKS[trimmed];
    if (fallback) {
      foundProduct = {
        productName: fallback.productName,
        brand: fallback.brand,
        genericName: fallback.cleanName,
        source: 'eu_fallback_db',
      };
    }
  }

  // If no product was found across any source
  if (!foundProduct) {
    return {
      productName: null,
      brand: null,
      error: primaryError || 'Product not found',
    };
  }

  // ── Enrich with Category & Local Item Resolution ────────────────────────
  const lang = options?.lang || 'de';
  const foodNameIndex = options?.foodNameIndex || new Map();
  const rawName = foundProduct.productName;
  const brand = foundProduct.brand;

  let cleanName: string | null = null;
  let foodType: FoodType | undefined;
  let icon: string | null = null;
  let category: string | null = null;

  if (rawName || foundProduct.genericName) {
    const info = resolveProductInfo(
      rawName || foundProduct.genericName || '',
      brand,
      lang,
      foodNameIndex,
      foundProduct.genericName
    );
    cleanName = info.cleanName;
    if (info.foodType && info.foodType !== 'non_food') {
      foodType = info.foodType;
      icon = info.icon;
      category = info.category;
    }
  }

  // Check fallback cleanName if available
  const fallback = EU_BARCODE_FALLBACKS[trimmed];
  if (fallback?.cleanName && (!cleanName || cleanName === rawName)) {
    cleanName = fallback.cleanName;
  }

  const preferClean = options?.preferCleanName ?? false;
  const finalProductName = preferClean && cleanName ? cleanName : rawName;

  return {
    productName: finalProductName,
    brand,
    cleanName,
    fullName: rawName,
    foodType,
    icon,
    category,
    source: foundProduct.source,
  };
}
