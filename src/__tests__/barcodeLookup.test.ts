// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { lookupBarcode, parseOpenGtinDbResponse, EU_BARCODE_FALLBACKS } from '../utils/barcodeLookup';

describe('barcodeLookup', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('returns error for empty barcode', async () => {
    const result = await lookupBarcode('');
    expect(result.error).toBe('Empty barcode');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns error for whitespace barcode', async () => {
    const result = await lookupBarcode('   ');
    expect(result.error).toBe('Empty barcode');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles product not found (status 0)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 0, status_verbose: 'product not found' }),
    });

    const result = await lookupBarcode('1234567890123');
    expect(result.error).toBe('Product not found');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
  });

  it('handles response without product object', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 1 }),
    });

    const result = await lookupBarcode('1234567890123');
    expect(result.error).toBe('Product not found');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
  });

  it('handles HTTP error status codes', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await lookupBarcode('123');
    expect(result.error).toBe('HTTP error 500');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
  });

  it('handles network / fetch exceptions', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await lookupBarcode('123');
    expect(result.error).toBe('Network error');
    expect(result.productName).toBeNull();
    expect(result.brand).toBeNull();
  });

  it('handles network exceptions without message', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown failure');

    const result = await lookupBarcode('123');
    expect(result.error).toBe('Network error');
  });

  it('successfully returns product name and brand', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          product_name: 'Peanut Butter',
          brands: 'Skippy',
        },
      }),
    });

    const result = await lookupBarcode('737628064502');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Peanut Butter');
    expect(result.brand).toBe('Skippy');
  });

  it('falls back to english product name if product_name is missing', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          product_name_en: 'English Butter',
          brands: 'Brand B',
        },
      }),
    });

    const result = await lookupBarcode('111');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('English Butter');
    expect(result.brand).toBe('Brand B');
  });

  it('falls back to generic name if both localized and english product names are missing', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          generic_name: 'Almond Milk',
          brands: 'Silk',
        },
      }),
    });

    const result = await lookupBarcode('222');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Almond Milk');
    expect(result.brand).toBe('Silk');
  });

  it('handles product when brand is missing', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          product_name: 'Organic Honey',
        },
      }),
    });

    const result = await lookupBarcode('333');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Organic Honey');
    expect(result.brand).toBeNull();
  });

  it('handles product when all name fields are missing but brand is present', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          brands: 'Mystery Brand',
        },
      }),
    });

    const result = await lookupBarcode('444');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBeNull();
    expect(result.brand).toBe('Mystery Brand');
  });

  it('encodes barcode parameter properly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 1,
        product: {
          product_name: 'Test Product',
        },
      }),
    });

    await lookupBarcode('  123 456  ');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://world.openfoodfacts.org/api/v0/product/123%20456.json',
      expect.objectContaining({
        headers: expect.objectContaining({
          'User-Agent': expect.stringContaining('ShadowList'),
        }),
      })
    );
  });

  // ── EU / German Barcode Lookup & Local Category Resolution Tests ───────

  it('resolves test barcode 4008452027466 with EU product info and local dairy category', async () => {
    // When Open Food Facts returns not found (status 0)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 0 }),
    });

    const result = await lookupBarcode('4008452027466');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Landliebe Haltbare fettarme Milch 1.5% 1L');
    expect(result.brand).toBe('Landliebe');
    expect(result.cleanName).toBe('Milch');
    expect(result.foodType).toBe('dairy');
    expect(result.category).toBe('Groceries');
    expect(result.icon).toBeTruthy();
  });

  it('resolves test barcode 4008452027442 with EU product info and local dairy category', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 0 }),
    });

    const result = await lookupBarcode('4008452027442');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Landliebe Haltbare fettarme Milch 1.5% 1L');
    expect(result.brand).toBe('Landliebe');
    expect(result.cleanName).toBe('Milch');
    expect(result.foodType).toBe('dairy');
    expect(result.category).toBe('Groceries');
  });

  it('supports preferCleanName option for concise product naming', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 0 }),
    });

    const result = await lookupBarcode('4008452027466', { preferCleanName: true });
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Milch');
    expect(result.fullName).toBe('Landliebe Haltbare fettarme Milch 1.5% 1L');
    expect(result.brand).toBe('Landliebe');
    expect(result.foodType).toBe('dairy');
    expect(result.category).toBe('Groceries');
  });

  it('falls back to Open Food Facts DE when world endpoint returns not found', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 0 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 1,
          product: {
            product_name_de: 'Bio Vollmilch 3.8%',
            brands: 'Berchtesgadener Land',
          },
        }),
      });

    const result = await lookupBarcode('4040404040404');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Bio Vollmilch 3.8%');
    expect(result.brand).toBe('Berchtesgadener Land');
    expect(result.cleanName).toBe('Milch');
    expect(result.foodType).toBe('dairy');
    expect(result.category).toBe('Groceries');
  });

  it('falls back to Open GTIN DB when Open Food Facts endpoints fail', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 0 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 0 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          'error=0\n---\nname=Nat&uuml;rliches Mineralwasser\ndetailname=Bad Vilbeler RIED Quelle\nvendor=H. Kroner GmbH & CO. KG\n',
      });

    const result = await lookupBarcode('4001234567890');
    expect(result.error).toBeUndefined();
    expect(result.productName).toBe('Bad Vilbeler RIED Quelle');
    expect(result.brand).toBe('H. Kroner GmbH & CO. KG');
    expect(result.cleanName).toBe('Wasser');
    expect(result.foodType).toBe('beverage');
    expect(result.category).toBe('Beverages');
  });

  it('correctly parses Open GTIN DB response with HTML entities', () => {
    const raw =
      'error=0\n---\nname=K&auml;se Sp&auml;tzle\ndetailname=Original K&auml;sesp&auml;tzle 400g\nvendor=B&uuml;rger GmbH\n';
    const parsed = parseOpenGtinDbResponse(raw);
    expect(parsed).toEqual({
      productName: 'Original Käsespätzle 400g',
      brand: 'Bürger GmbH',
      genericName: 'Käse Spätzle',
    });
  });

  it('returns null from parseOpenGtinDbResponse on error code', () => {
    const raw = 'error=1\n---\n';
    const parsed = parseOpenGtinDbResponse(raw);
    expect(parsed).toBeNull();
  });
});
