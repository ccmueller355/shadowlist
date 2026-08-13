// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { lookupBarcode } from '../utils/barcodeLookup';

describe('barcodeLookup', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns error for empty barcode', async () => {
    const result = await lookupBarcode('');
    expect(result.error).toBe('Empty barcode');
  });

  it('handles product not found (status 0)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 0, status_verbose: 'product not found' }),
    });

    const result = await lookupBarcode('1234567890123');
    expect(result.error).toBe('Product not found');
  });

  it('handles HTTP errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await lookupBarcode('123');
    expect(result.error).toBe('HTTP error 500');
  });

  it('handles network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await lookupBarcode('123');
    expect(result.error).toBe('Network error');
  });

  it('successfully returns product details', async () => {
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

  it('falls back to english or generic name if product_name is empty', async () => {
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
    expect(result.productName).toBe('English Butter');
    expect(result.brand).toBe('Brand B');
  });
});
