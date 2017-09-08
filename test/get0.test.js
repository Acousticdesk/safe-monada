import { safe } from '../src/index';


describe('safe(n: number).get()', () => {
  test('should return 0 for safe(0) for safe(0)', () => {
    expect(safe(0).get()).toEqual(0);
  });

  test('should return -1 for safe(-1)', () => {
    expect(safe(-1).get()).toEqual(-1);
  });

  test('should return 100 for safe(100)', () => {
    expect(safe(100).get()).toEqual(100);
  });

  test('should return 0xFFFFFFFF for safe(0xFFFFFFFF)', () => {
    expect(safe(0xFFFFFFFF).get()).toEqual(0xFFFFFFFF);
  });
});

describe('safe(b: boolean).get()', () => {
  test('should return false for safe(false)', () => {
    expect(safe(false).get()).toEqual(false);
  });

  test('should return true for safe(true)', () => {
    expect(safe(true).get()).toEqual(true);
  });
});

describe('safe(s: string).get()', () => {
  test('should return empty string for safe("")', () => {
    expect(safe('').get()).toEqual('');
  });

  test('should return "abc" for safe("abc")', () => {
    expect(safe('abc').get()).toEqual('abc');
  });
});

describe('safe(d: date).get()', () => {
  test('should return new Date for safe(new Date())', () => {
    const d = new Date();
    expect(safe(d).get()).toEqual(d);
  });
});

describe('safe(f: function).get()', () => {
  test('should return () => {} for safe(()=>{})', () => {
    const NOOP = () => {};
    expect(safe(NOOP).get()).toEqual(NOOP);
  });
});

describe('safe(obj: {}).get()', () => {
  test('should return {} for safe({})', () => {
    const obj = {};
    expect(safe(obj).get()).toEqual(obj);
  });

  test('should return { x: 1, y: 2 } for safe({ x: 1, y: 2 })', () => {
    expect(safe({ x: 1, y: 2 }).get()).toEqual({ x: 1, y: 2 });
  });
});

describe('safe(arr: [any]).get()', () => {
  test('should return [] for safe([])', () => {
    expect(safe([]).get()).toEqual([]);
  });

  test('should return [1, 2] for safe([1, 2])', () => {
    expect(safe([1, 2]).get()).toEqual([1, 2]);
  });
});

describe('safe(obj?).get()', () => {
  test('should return Symbol for safe(null)', () => {
    expect(safe(null).get()).toBeUndefined();
  });

  test('should return Symbol for safe()', () => {
    expect(safe().get()).toBeUndefined();
  });
});
