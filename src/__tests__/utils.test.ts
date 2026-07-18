// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { debounce } from '../utils/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls the function after the specified delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('test');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('calls the function with the latest arguments', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');
    debounced('third');

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('resets the timer on each call', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    jest.advanceTimersByTime(200);
    debounced('second');
    jest.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });

  it('does not call the function before the delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 500);

    debounced('test');
    jest.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('uuid', () => {
  it('generates a string id', () => {
    const { generateId } = require('../utils/uuid');
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('generates unique ids', () => {
    const { generateId } = require('../utils/uuid');
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('falls back to manual UUID generation when crypto.randomUUID is unavailable', () => {
    // Store original
    const originalCrypto = (global as any).crypto;
    const originalRandomUUID = originalCrypto?.randomUUID;

    try {
      // Remove crypto.randomUUID to force fallback
      if (global.crypto) {
        delete (global.crypto as any).randomUUID;
      }

      const { generateId } = require('../utils/uuid');
      const id = generateId();
      expect(typeof id).toBe('string');
      // Fallback UUID format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    } finally {
      // Restore original
      if (originalRandomUUID && global.crypto) {
        (global.crypto as any).randomUUID = originalRandomUUID;
      }
    }
  });
});
