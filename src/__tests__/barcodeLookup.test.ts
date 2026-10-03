// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { lookupBarcode } from '../utils/barcodeLookup';

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
});
