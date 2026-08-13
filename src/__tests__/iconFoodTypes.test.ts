// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import { ICON_FOOD_TYPE_MAP } from '../constants/icons';

describe('ICON_FOOD_TYPE_MAP', () => {
  it('maps meat icons', () => {
    expect(ICON_FOOD_TYPE_MAP['food-drumstick-outline']).toBe('meat');
  });

  it('maps dairy icons', () => {
    expect(ICON_FOOD_TYPE_MAP['cheese']).toBe('dairy');
  });

  it('maps grain icons', () => {
    expect(ICON_FOOD_TYPE_MAP['bread-slice-outline']).toBe('grain');
  });

  it('maps fruit icons', () => {
    expect(ICON_FOOD_TYPE_MAP['fruit-cherries']).toBe('fruit');
  });

  it('maps vegetable icons', () => {
    expect(ICON_FOOD_TYPE_MAP['carrot']).toBe('vegetable');
  });

  it('maps beverage icons', () => {
    expect(ICON_FOOD_TYPE_MAP['cup']).toBe('beverage');
  });

  it('maps fish icons', () => {
    expect(ICON_FOOD_TYPE_MAP['fish']).toBe('seafood');
  });

  it('unrelated icons are not in the map', () => {
    expect(ICON_FOOD_TYPE_MAP['hammer']).toBeUndefined();
    expect(ICON_FOOD_TYPE_MAP['alien']).toBeUndefined();
  });

  it('new non-food icons are mapped to non_food', () => {
    expect(ICON_FOOD_TYPE_MAP['car']).toBe('non_food');
    expect(ICON_FOOD_TYPE_MAP['paw']).toBe('non_food');
  });
});
