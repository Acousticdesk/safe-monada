import { safe } from '../src/index';


describe('safe(func?).map', () => {
  test('should return safe object for safe().map()', () => {
    expect(safe().map().isSafe).toBe(true);
  });

  test('should return safe object for safe(1).map()', () => {
    expect(safe(1).map().isSafe).toBe(true);
  });

  test('shouldn\'t call the f() for safe().map(f)', () => {
    const f = jest.fn();
    const packed = safe();
    expect(packed.map(f).isSafe).toBe(true);
    expect(f.mock.calls.length).toEqual(0);
  });

  test('should call f(1) for safe(1).map(f)', () => {
    const f = jest.fn();
    const packed = safe(1);
    expect(packed.map(f).isSafe).toBe(true);
    expect(f.mock.calls).toEqual([[1]]);
  });
});

